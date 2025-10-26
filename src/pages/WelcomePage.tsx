import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoice } from '../contexts/VoiceContext';
import { useToast } from '../contexts/ToastContext'; // Import useToast
import { requestMicrophonePermission, checkMicrophoneSupport } from '../utils/microphonePermissions'; // Asegúrate que esta ruta es correcta
import Button from '../components/Button'; // Asegúrate que la ruta es correcta

// Nota: Esta página ahora incluye la lógica de bienvenida y activación de voz.

export default function LandingPage() { // Renombrado a LandingPage
  const [videoError, setVideoError] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const { toggleActive, playAudio, language, isActive } = useVoice(); // Añadido isActive para verificar estado
  const toast = useToast(); // Hook para mostrar notificaciones
  const navigate = useNavigate();

  const handleMeetHidri = async () => {
    // Si ya está activo, simplemente continúa
    if (isActive) {
        onContinue();
        return;
    }

    setIsActivating(true);

    // 1. Revisar soporte de micrófono
    const supportCheck = checkMicrophoneSupport();
    if (!supportCheck.supported) {
      toast.error(supportCheck.error || 'El micrófono no es compatible en este navegador.');
      console.error("Micrófono no soportado:", supportCheck.error);
      // Aún así, continuamos sin voz para la demo
      onContinue(false); // Pasamos 'false' para indicar que la voz falló
      setIsActivating(false);
      return;
    }

    // 2. Pedir permiso
    const permissionResult = await requestMicrophonePermission();
    if (!permissionResult.granted) {
      toast.error(permissionResult.error || 'Permiso de micrófono denegado.');
      console.error("Permiso denegado:", permissionResult.error);
       // Aún así, continuamos sin voz para la demo
      onContinue(false); // Pasamos 'false' para indicar que la voz falló
      setIsActivating(false);
      return;
    }

    // 3. Activar y hablar (si se obtuvo permiso)
    try {
      toggleActive(); // Activa el estado local del asistente

      const welcomeMessage = language === 'es'
        ? 'Hola, mi nombre es Hidri y estoy aquí para ayudarte. Puedes decir: llévame al login.' // Mensaje más corto
        : 'Hello, my name is Hidri and I am here to help you. You can say: take me to login.';

      await playAudio(welcomeMessage, language); // Usará el fallback
      toast.success('Asistente de voz activado');

      // Espera un poco y continúa a /auth
      setTimeout(() => {
        onContinue(true); // Pasamos 'true' indicando éxito con voz
      }, 3000); // 3 segundos para escuchar

    } catch (error) {
      console.error('Error activating voice assistant or playing audio:', error);
      toast.error('Error al activar el asistente de voz.');
      // Continuamos sin voz si hay error
       setTimeout(() => {
           onContinue(false);
       }, 500); // Espera corta si hubo error
    } finally {
      // No ponemos setIsActivating(false) aquí porque navegamos
    }
  };

  // Función para navegar a /auth
  const onContinue = (voiceActivated = false) => {
      console.log(`Continuando a /auth. Asistente de voz ${voiceActivated ? 'activado' : 'no activado'}.`);
      navigate('/auth');
  };


  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* --- VIDEO LOCAL --- */}
      {!videoError ? (
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setVideoError(true)}
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' style='background-color:%230288D1;'/%3E"
        >
          <source src="/images/backgrounds/hero-video.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-blue-400 to-blue-600" />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* --- LOGO BANORTE REAL --- */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-10">
         <img
            src="/images/banorte-logo-white.png" // Logo real
            alt="Logo Banorte"
            className="h-8 sm:h-10 md:h-12 w-auto" // Ajusta tamaño
         />
      </div>

      {/* Contenido Central */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8 text-center">
        {/* Logo Voz Hídrica */}
        <div className="mb-6 sm:mb-8 md:mb-10 animate-float hover:scale-105 transition-transform">
           <img
                src="/images/voz-hidrica-white2.png" // Logo real
                alt="Logo Voz Hídrica"
                className="h-24 sm:h-32 md:h-40 w-auto mx-auto drop-shadow-lg" // Tamaño y sombra
           />
        </div>

        <h1 className="font-gotham font-bold text-28 sm:text-32 md:text-36 lg:text-40 text-white mb-4 sm:mb-6 animate-slideInUp" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}> {/* Sombra texto */}
            Voz Hídrica
        </h1>
        <p className="font-gotham font-medium text-14 sm:text-16 md:text-18 lg:text-20 text-white mb-2 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 animate-slideInUp" style={{ animationDelay: '0.1s', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            Controla tus servicios. Multiplica tus beneficios con Banorte.
        </p>
        <p className="font-gotham font-book text-12 sm:text-13 md:text-14 lg:text-15 text-white text-opacity-90 max-w-xs sm:max-w-sm md:max-w-md px-4 animate-slideInUp mb-8" style={{ animationDelay: '0.2s' }}> {/* Añadido mb-8 */}
            Una iniciativa Banorte
        </p>

        {/* Botón "Empieza" movido al centro */}
         <div className="animate-slideInUp" style={{ animationDelay: '0.4s' }}>
             <Button
                variant="primary" // Usando el estilo primario (rojo)
                onClick={handleMeetHidri}
                disabled={isActivating}
                className="px-10 py-4 text-18 shadow-lg hover:scale-105 transform transition-transform" // Clases de tamaño y animación
             >
                {isActivating ? 'Activando...' : 'Comenzar'}
             </Button>
         </div>

      </div>
    </div>
  );
}