import { Mic, MicOff, Volume2, Square } from 'lucide-react';
import { useVoice } from '../contexts/VoiceContext';

export default function VoiceControlButton() {
  const { isActive, isListening, isSpeaking, toggleActive } = useVoice();

  const getButtonContent = () => {
    if (!isActive) {
      return {
        icon: <MicOff className="w-6 h-6" />,
        text: 'Activar Asistente',
        bgColor: 'bg-gray-500 hover:bg-gray-600',
      };
    }

    if (isSpeaking) {
      return {
        icon: <Volume2 className="w-6 h-6 animate-pulse" />,
        text: 'Hidra está hablando...',
        bgColor: 'bg-blue-500',
      };
    }

    if (isListening) {
      return {
        icon: <Mic className="w-6 h-6 animate-pulse" />,
        text: 'Escuchando...',
        bgColor: 'bg-red-500',
      };
    }

    return {
      icon: <Mic className="w-6 h-6" />,
      text: 'Procesando...',
      bgColor: 'bg-green-500',
    };
  };

  const { icon, text, bgColor } = getButtonContent();

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      <div className="relative group">
        <button
          onClick={toggleActive}
          className={`${bgColor} text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
            isActive ? 'focus:ring-red-400' : 'focus:ring-gray-400'
          }`}
          aria-label={isActive ? 'Detener asistente' : 'Activar asistente'}
        >
          {icon}
        </button>

        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap text-sm shadow-lg">
            {text}
          </div>
        </div>
      </div>

      {isActive && (
        <button
          onClick={toggleActive}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 text-sm font-medium"
        >
          <Square className="w-4 h-4" />
          Detener Asistente
        </button>
      )}

      {isActive && (isListening || isSpeaking) && (
        <div className="bg-white rounded-lg shadow-xl p-4 max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            {isSpeaking ? (
              <Volume2 className="w-5 h-5 text-blue-500" />
            ) : (
              <Mic className="w-5 h-5 text-red-500" />
            )}
            <span className="text-sm font-medium text-gray-700">
              {isSpeaking ? 'Hidra habla' : 'Te escucho'}
            </span>
          </div>
          {isSpeaking && (
            <div className="flex gap-1 items-center justify-center h-8">
              <div className="w-1 bg-blue-500 rounded-full animate-waveform-1" style={{ height: '20px' }}></div>
              <div className="w-1 bg-blue-500 rounded-full animate-waveform-2" style={{ height: '30px' }}></div>
              <div className="w-1 bg-blue-500 rounded-full animate-waveform-3" style={{ height: '25px' }}></div>
              <div className="w-1 bg-blue-500 rounded-full animate-waveform-4" style={{ height: '35px' }}></div>
              <div className="w-1 bg-blue-500 rounded-full animate-waveform-1" style={{ height: '20px' }}></div>
            </div>
          )}
          {isListening && (
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
