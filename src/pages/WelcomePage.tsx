import { useState } from 'react';
import { useVoice } from '../contexts/VoiceContext';
import { useToast } from '../contexts/ToastContext';
import { requestMicrophonePermission, checkMicrophoneSupport } from '../utils/microphonePermissions';
import Button from '../components/Button';

interface WelcomePageProps {
  onContinue: () => void;
}

export default function WelcomePage({ onContinue }: WelcomePageProps) {
  const [videoError, setVideoError] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const { toggleActive, playAudio, language } = useVoice();
  const toast = useToast();

  const handleMeetHidri = async () => {
    setIsActivating(true);

    const supportCheck = checkMicrophoneSupport();
    if (!supportCheck.supported) {
      toast.error(supportCheck.error || 'El asistente de voz no está disponible');
      setIsActivating(false);
      return;
    }

    const permissionResult = await requestMicrophonePermission();
    if (!permissionResult.granted) {
      toast.error(permissionResult.error || 'No se pudo acceder al micrófono');
      setIsActivating(false);
      return;
    }

    try {
      toggleActive();

      const welcomeMessage = language === 'es'
        ? '¡Hola! Soy Hidri, tu asistente de Voz Hídrica. Estoy aquí para ayudarte a gestionar tu consumo de agua y ganar recompensas. ¿En qué puedo ayudarte hoy?'
        : 'Hello! I am Hidri, your Voz Hídrica assistant. I am here to help you manage your water consumption and earn rewards. How can I help you today?';

      await playAudio(welcomeMessage, language);
      toast.success('Asistente de voz activado');

      setTimeout(() => {
        onContinue();
      }, 1000);
    } catch (error) {
      console.error('Error activating voice assistant:', error);
      toast.error('Error al activar el asistente de voz');
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {!videoError ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setVideoError(true)}
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2364B5F6;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%230288D1;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1920' height='1080' fill='url(%23grad)' /%3E%3C/svg%3E"
        >
          <source
            src="https://cdn.pixabay.com/video/2021/01/30/63672-508249808_large.mp4"
            type="video/mp4"
          />
          <source
            src="https://cdn.pixabay.com/video/2022/11/07/138509-770157977_large.mp4"
            type="video/mp4"
          />
        </video>
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-blue-400 to-blue-600" />
      )}

      <div className="absolute inset-0 bg-black bg-opacity-30" />

      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 lg:top-30 lg:left-30 z-10">
        <svg
          className="w-24 h-8 sm:w-32 sm:h-10 md:w-36 md:h-10 lg:w-150 lg:h-40"
          viewBox="0 0 150 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" y="0" width="150" height="40" fill="white" rx="4" />
          <text
            x="75"
            y="25"
            textAnchor="middle"
            fill="#EB0029"
            fontSize="20"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
          >
            BANORTE
          </text>
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="bg-white bg-opacity-90 rounded-full p-6 sm:p-8 md:p-10 lg:p-30 shadow-2xl mb-6 sm:mb-8 md:mb-10 animate-float hover-scale">
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-30 lg:h-30 animate-pulse-glow"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="60" cy="60" r="55" stroke="#EB0029" strokeWidth="3" />
              <path
                d="M60 25L75 45H45L60 25Z"
                fill="#EB0029"
              />
              <path
                d="M60 95L45 75H75L60 95Z"
                fill="#EB0029"
              />
              <path
                d="M25 60L45 45V75L25 60Z"
                fill="#323E48"
              />
              <path
                d="M95 60L75 75V45L95 60Z"
                fill="#323E48"
              />
              <circle cx="60" cy="60" r="12" fill="#EB0029" />
            </svg>
          </div>
          <h1 className="font-gotham font-bold text-28 sm:text-32 md:text-36 lg:text-40 text-white mb-4 sm:mb-6 animate-slideInUp">
            Voz Hídrica
          </h1>
          <p className="font-gotham font-medium text-14 sm:text-16 md:text-18 lg:text-20 text-white mb-2 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 animate-slideInUp" style={{ animationDelay: '0.1s' }}>
            Controla tus servicios. Multiplica tus beneficios con Banorte.
          </p>
          <p className="font-gotham font-book text-12 sm:text-13 md:text-14 lg:text-15 text-white text-opacity-90 max-w-xs sm:max-w-sm md:max-w-md px-4 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            Powered by Banorte Smart Cities
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 lg:bottom-30 lg:right-30 z-10">
        <Button variant="welcome" onClick={handleMeetHidri} disabled={isActivating}>
          {isActivating ? 'Activando...' : 'Conoce a Hidri'}
        </Button>
      </div>
    </div>
  );
}
