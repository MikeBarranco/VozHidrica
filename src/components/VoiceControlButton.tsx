import { useVoice } from '../contexts/VoiceContext';

export default function VoiceControlButton() {
  const {
    isActive,
    isListening,
    isSpeaking,
    toggleActive, // La función principal que necesitamos
  } = useVoice();

  // Define la ruta a tu imagen principal
  const defaultIcon = '/images/hidri-button.png'; // <-- ¡ASEGÚRATE QUE ESTA RUTA SEA CORRECTA!

  let iconSrc = defaultIcon;
  let buttonClasses = "bg-white text-gray-700 hover:bg-gray-100"; // Estilo base (inactivo)
  let imageClasses = "opacity-70 group-hover:opacity-100"; // Imagen un poco opaca si está inactivo

  if (isActive) {
    buttonClasses = "bg-red-500 hover:bg-red-600"; // Rojo cuando está activo/escuchando/procesando
    imageClasses = "opacity-100"; // Imagen totalmente visible

     if (isListening) {
         buttonClasses += " ring-4 ring-blue-400 ring-offset-2 animate-pulse"; // Borde azul pulsante si escucha
     } else if (isSpeaking) {
         buttonClasses += " ring-4 ring-green-400 ring-offset-2"; // Borde verde si habla
     }
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 group">
      <button
        onClick={toggleActive}
        // Aumentado el padding a p-5 sm:p-6
        className={`rounded-full p-5 sm:p-6 shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-offset-2 ${buttonClasses} ${isActive ? 'focus:ring-red-400' : 'focus:ring-gray-400'}`}
        aria-label={isActive ? 'Detener asistente de voz' : 'Activar asistente de voz'}
      >
        <img
          src={iconSrc}
          alt="Asistente de Voz Hidri"
          // Aumentado el tamaño de la imagen a w-14 h-14 sm:w-16 sm:h-16
          className={`w-14 h-14 sm:w-16 sm:h-16 object-contain transition-opacity duration-200 ${imageClasses}`}
        />
      </button>
    </div>
  );
}