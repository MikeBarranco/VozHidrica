import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { useVoiceActivityDetection } from '../hooks/useVoiceActivityDetection';
import { useVoicePreferences } from '../hooks/useVoicePreferences';

interface GeminiResponse {
  intent: 'navigate' | 'read' | 'query';
  route?: string;
  emotion: 'happy' | 'calm' | 'helpful';
  speech: string;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface VoiceContextType {
  language: 'es' | 'en';
  isListening: boolean;
  isSpeaking: boolean;
  isActive: boolean;
  transcript: string;
  speechResponse: string;
  currentPage: string;
  geminiResponse: GeminiResponse | null;
  conversationHistory: ConversationMessage[];
  currentTurn: number;
  maxTurns: number;
  volumeLevel: number;
  setLanguage: (lang: 'es' | 'en') => void;
  setCurrentPage: (page: string) => void;
  startListening: () => void;
  stopListening: () => void;
  toggleActive: () => void;
  playAudio: (text: string, lang?: 'es' | 'en') => Promise<void>;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function VoiceProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speechResponse, setSpeechResponse] = useState('');
  const [currentPage, setCurrentPage] = useState('/');
  const [geminiResponse, setGeminiResponse] = useState<GeminiResponse | null>(null);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const interimTranscriptRef = useRef<string>('');
  const shouldProcessRef = useRef<boolean>(false);

  const { preferences, loading: preferencesLoading } = useVoicePreferences();
  const maxTurns = preferences.max_turns;

  const handleSpeechStart = useCallback(() => {
    if (isActive && !isSpeaking && !isProcessing) {
      shouldProcessRef.current = true;
      interimTranscriptRef.current = '';
    }
  }, [isActive, isSpeaking, isProcessing]);

  const handleSpeechEnd = useCallback(() => {
    if (shouldProcessRef.current && interimTranscriptRef.current.trim()) {
      const textToProcess = interimTranscriptRef.current.trim();
      shouldProcessRef.current = false;
      interimTranscriptRef.current = '';

      setTranscript(textToProcess);
      processTranscript(textToProcess);
    }
  }, []);

  const handleVolumeChange = useCallback((volume: number) => {
    setVolumeLevel(volume);
  }, []);

  const vad = useVoiceActivityDetection({
    sensitivity: preferences.vad_sensitivity,
    silenceThreshold: preferences.silence_threshold,
    onSpeechStart: handleSpeechStart,
    onSpeechEnd: handleSpeechEnd,
    onVolumeChange: handleVolumeChange,
  });

  const playAudioFallback = useCallback((text: string, lang: 'es' | 'en') => {
    return new Promise<void>((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      try {
        window.speechSynthesis.cancel();
        const utterance = new window.SpeechSynthesisUtterance(text);
        utterance.lang = lang === 'es' ? 'es-ES' : 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.volume = 1.0;

        utterance.onend = () => {
          resolve();
        };

        utterance.onerror = (event) => {
          console.error('Speech synthesis error:', event);
          reject(event);
        };

        window.speechSynthesis.speak(utterance);
      } catch (error) {
        reject(error);
      }
    });
  }, []);

  const playAudio = useCallback(async (text: string, lang: 'es' | 'en' = language) => {
    if (!text || isSpeaking) return;

    try {
      setIsSpeaking(true);
      setSpeechResponse(text);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-speak`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ text, lang }),
        }
      );

      if (!response.ok) {
        console.warn('ElevenLabs API failed, using fallback speech synthesis');
        await playAudioFallback(text, lang);
        setIsSpeaking(false);
        if (isActive && currentTurn < maxTurns) {
          setTimeout(() => startListening(), 200);
        }
        return;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        if (isActive && currentTurn < maxTurns) {
          setTimeout(() => startListening(), 200);
        } else if (currentTurn >= maxTurns) {
          resetConversation();
        }
      };

      audio.onerror = async () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        console.warn('Audio playback failed, using fallback');
        try {
          await playAudioFallback(text, lang);
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
        }
        if (isActive && currentTurn < maxTurns) {
          setTimeout(() => startListening(), 200);
        }
      };

      await audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      try {
        await playAudioFallback(text, lang);
      } catch (fallbackError) {
        console.error('Fallback speech synthesis failed:', fallbackError);
      }
      setIsSpeaking(false);
      if (isActive && currentTurn < maxTurns) {
        setTimeout(() => startListening(), 200);
      }
    }
  }, [language, isSpeaking, isActive, currentTurn, maxTurns, playAudioFallback]);

  const processTranscript = useCallback(async (text: string) => {
    if (!text.trim() || isProcessing) return;

    setIsProcessing(true);
    stopListening();

    try {
      const userMessage: ConversationMessage = {
        role: 'user',
        content: text,
        timestamp: Date.now(),
      };

      const updatedHistory = [...conversationHistory, userMessage];
      setConversationHistory(updatedHistory);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gemini-brain`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            prompt: text,
            lang: language,
            currentPage,
            conversationHistory: updatedHistory,
            currentTurn: currentTurn + 1,
            maxTurns,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to process with Gemini');
      }

      const data: GeminiResponse = await response.json();
      setGeminiResponse(data);

      const assistantMessage: ConversationMessage = {
        role: 'assistant',
        content: data.speech,
        timestamp: Date.now(),
      };

      setConversationHistory([...updatedHistory, assistantMessage]);
      setCurrentTurn(prev => prev + 1);

      await playAudio(data.speech, language);
    } catch (error) {
      console.error('Error processing transcript:', error);
      const errorMessage = language === 'es'
        ? 'Lo siento, no pude procesar tu solicitud. ¿Puedes repetirlo?'
        : 'Sorry, I could not process your request. Can you repeat?';
      await playAudio(errorMessage, language);
    } finally {
      setIsProcessing(false);
    }
  }, [language, currentPage, conversationHistory, currentTurn, maxTurns, playAudio, isProcessing]);

  const startListening = useCallback(() => {
    if (!isActive || isListening || isSpeaking || isProcessing) return;

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error('Speech recognition not supported in this browser');
      const errorMsg = language === 'es'
        ? 'Tu navegador no soporta reconocimiento de voz. Usa Chrome, Edge o Safari.'
        : 'Your browser does not support speech recognition. Please use Chrome, Edge, or Safari.';
      setSpeechResponse(errorMsg);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language === 'es' ? 'es-ES' : 'en-US';
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            interimTranscriptRef.current += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (isActive && event.error !== 'no-speech' && currentTurn < maxTurns) {
          setTimeout(() => startListening(), 1000);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        if (isActive && !isSpeaking && !isProcessing && currentTurn < maxTurns) {
          setTimeout(() => {
            try {
              if (recognitionRef.current) {
                recognitionRef.current.start();
              }
            } catch (error) {
              console.error('Error restarting recognition:', error);
            }
          }, 100);
        }
      };

      recognitionRef.current = recognition;
    }

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting recognition:', error);
      setIsListening(false);
    }
  }, [isActive, isListening, isSpeaking, isProcessing, language, currentTurn, maxTurns]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }
    setIsListening(false);
  }, []);

  const resetConversation = useCallback(() => {
    setIsActive(false);
    stopListening();
    vad.stopVAD();

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setIsSpeaking(false);
    setIsProcessing(false);
    setConversationHistory([]);
    setCurrentTurn(0);
    setTranscript('');
    setSpeechResponse('');
    setVolumeLevel(0);
    interimTranscriptRef.current = '';
    shouldProcessRef.current = false;
  }, [stopListening, vad]);

  const toggleActive = useCallback(async () => {
    const newActiveState = !isActive;

    if (!newActiveState) {
      resetConversation();
    } else {
      setIsActive(true);
      setConversationHistory([]);
      setCurrentTurn(0);

      await vad.startVAD();

      const greeting = language === 'es'
        ? 'Hola, soy Hidri, tu asistente de Voz Hídrica. ¿En qué puedo ayudarte hoy?'
        : 'Hello, I am Hidri, your Voz Hídrica assistant. How can I help you today?';
      await playAudio(greeting, language);
    }
  }, [isActive, language, playAudio, vad, resetConversation]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.error('Cleanup error:', error);
        }
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      vad.stopVAD();
    };
  }, [vad]);

  if (preferencesLoading) {
    return null;
  }

  return (
    <VoiceContext.Provider
      value={{
        language,
        isListening,
        isSpeaking,
        isActive,
        transcript,
        speechResponse,
        currentPage,
        geminiResponse,
        conversationHistory,
        currentTurn,
        maxTurns,
        volumeLevel,
        setLanguage,
        setCurrentPage,
        startListening,
        stopListening,
        toggleActive,
        playAudio,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
}
