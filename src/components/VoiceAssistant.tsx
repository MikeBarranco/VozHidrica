import { useEffect } from 'react';
import { useVoice } from '../contexts/VoiceContext';

export default function VoiceAssistant() {
  const { isActive, isListening, isSpeaking, startListening } = useVoice();

  useEffect(() => {
    if (isActive && !isListening && !isSpeaking) {
      const timer = setTimeout(() => {
        startListening();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isActive, isListening, isSpeaking, startListening]);

  return null;
}
