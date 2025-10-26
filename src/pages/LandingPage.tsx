import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoice } from '../contexts/VoiceContext';
import Button from '../components/Button';

export default function LandingPage() {
  const [videoError, setVideoError] = useState(false);
  const { toggleActive, playAudio, language } = useVoice();
  const navigate = useNavigate();

  const handleActivate = async () => {
    toggleActive();

    const welcomeMessage = language === 'es'
      ? 'Hola, bienvenido a Voz Hídrica. Soy Hidra, tu asistente bancario de voz. ¿En qué te puedo ayudar? Puedes decir: llévame al login, muéstrame las recompensas, o léeme la página.'
      : 'Hello, welcome to Voz Hídrica. I am Hydra, your voice banking assistant. How can I help you? You can say: take me to login, show me rewards, or read the page.';

    await playAudio(welcomeMessage, language);

    setTimeout(() => {
      navigate('/auth');
    }, 2000);
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

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8">
        <div className="bg-white bg-opacity-95 rounded-2xl p-8 sm:p-10 md:p-12 lg:p-16 shadow-2xl max-w-2xl w-full backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="bg-[#EB0029] bg-opacity-10 rounded-full p-8 mb-6">
              <svg
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="60" cy="60" r="55" stroke="#EB0029" strokeWidth="3" />
                <path d="M60 25L75 45H45L60 25Z" fill="#EB0029" />
                <path d="M60 95L45 75H75L60 95Z" fill="#EB0029" />
                <path d="M25 60L45 45V75L25 60Z" fill="#323E48" />
                <path d="M95 60L75 75V45L95 60Z" fill="#323E48" />
                <circle cx="60" cy="60" r="12" fill="#EB0029" />
              </svg>
            </div>

            <h2 className="font-gotham font-bold text-28 sm:text-32 md:text-36 text-[#EB0029] mb-4">
              Bienvenido a Voz Hídrica
            </h2>

            <p className="font-gotham font-medium text-16 sm:text-18 md:text-20 text-gray-700 mb-8 max-w-md">
              Tu asistente de accesibilidad está listo
            </p>

            <Button variant="primary" onClick={handleActivate} className="px-8 py-4 text-18">
              Haga clic para activar el asistente
            </Button>

            <p className="font-gotham font-book text-13 sm:text-14 text-gray-500 mt-6">
              Powered by Banorte Smart Cities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
