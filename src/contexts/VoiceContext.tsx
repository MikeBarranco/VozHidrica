import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

interface GeminiResponse {
  intent: 'navigate' | 'read' | 'query';
  route?: string;
  emotion: 'happy' | 'calm' | 'helpful';
  speech: string;
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

  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
        throw new Error('Failed to generate speech');
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
        if (isActive) {
          setTimeout(() => startListening(), 500);
        }
      };

      audio.onerror = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        if (isActive) {
          setTimeout(() => startListening(), 500);
        }
      };

      await audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsSpeaking(false);
      if (isActive) {
        setTimeout(() => startListening(), 500);
      }
    }
  }, [language, isSpeaking, isActive]);

  const processTranscript = useCallback(async (text: string) => {
    if (!text.trim()) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gemini-brain`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ prompt: text, lang: language, currentPage }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to process with Gemini');
      }

      const data: GeminiResponse = await response.json();
      setGeminiResponse(data);
      await playAudio(data.speech, language);
    } catch (error) {
      console.error('Error processing transcript:', error);
      const errorMessage = language === 'es'
        ? 'Lo siento, no pude procesar tu solicitud. ¿Puedes repetirlo?'
        : 'Sorry, I could not process your request. Can you repeat?';
      await playAudio(errorMessage, language);
    }
  }, [language, currentPage, playAudio]);

  const startListening = useCallback(() => {
    if (!isActive || isListening || isSpeaking) return;

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'es' ? 'es-ES' : 'en-US';
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processTranscript(text);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (isActive && event.error !== 'no-speech') {
          setTimeout(() => startListening(), 1000);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting recognition:', error);
      setIsListening(false);
    }
  }, [isActive, isListening, isSpeaking, language, processTranscript]);

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

  const toggleActive = useCallback(async () => {
    const newActiveState = !isActive;
    setIsActive(newActiveState);

    if (!newActiveState) {
      stopListening();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsSpeaking(false);
    } else {
      const greeting = language === 'es'
        ? 'Hola, soy Hidri, tu asistente de Voz Hídrica. ¿En qué puedo ayudarte hoy?'
        : 'Hello, I am Hidri, your Voz Hídrica assistant. How can I help you today?';
      await playAudio(greeting, language);
    }
  }, [isActive, stopListening, language, playAudio]);

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
    };
  }, []);

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
