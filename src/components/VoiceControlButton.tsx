import { Mic, MicOff, Volume2, Square } from 'lucide-react';
import { useVoice } from '../contexts/VoiceContext';

export default function VoiceControlButton() {
  const {
    isActive,
    isListening,
    isSpeaking,
    toggleActive,
    language,
    currentTurn,
    maxTurns,
    volumeLevel,
    transcript
  } = useVoice();

  const translations = {
    es: {
      activate: 'Activar Asistente',
      stop: 'Detener Asistente',
      listening: 'Escuchando...',
      speaking: 'Hidri está hablando...',
      processing: 'Procesando...',
      hidriSpeaks: 'Hidri habla',
      ariaActivate: 'Activar asistente',
      ariaStop: 'Detener asistente',
      ariaStopVoice: 'Detener asistente de voz',
      audioVisualization: 'Visualización de audio',
      micActive: 'Micrófono activo',
      turnCounter: 'Turno',
      of: 'de',
    },
    en: {
      activate: 'Activate Assistant',
      stop: 'Stop Assistant',
      listening: 'Listening...',
      speaking: 'Hidri is speaking...',
      processing: 'Processing...',
      hidriSpeaks: 'Hidri speaks',
      ariaActivate: 'Activate assistant',
      ariaStop: 'Stop assistant',
      ariaStopVoice: 'Stop voice assistant',
      audioVisualization: 'Audio visualization',
      micActive: 'Microphone active',
      turnCounter: 'Turn',
      of: 'of',
    },
  };

  const t = translations[language];

  const getButtonContent = () => {
    if (!isActive) {
      return {
        icon: <MicOff className="w-5 h-5 sm:w-6 sm:h-6" />,
        text: t.activate,
        bgColor: 'bg-gray-500 hover:bg-gray-600',
      };
    }

    if (isSpeaking) {
      return {
        icon: <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />,
        text: t.speaking,
        bgColor: 'bg-blue-500',
      };
    }

    if (isListening) {
      return {
        icon: <Mic className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />,
        text: t.listening,
        bgColor: 'bg-red-500',
      };
    }

    return {
      icon: <Mic className="w-5 h-5 sm:w-6 sm:h-6" />,
      text: t.processing,
      bgColor: 'bg-green-500',
    };
  };

  const { icon, text, bgColor } = getButtonContent();

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end gap-2 sm:gap-3">
      <div className="relative group">
        <button
          onClick={toggleActive}
          className={`${bgColor} text-white rounded-full p-3 sm:p-4 shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
            isActive ? 'focus:ring-red-400' : 'focus:ring-gray-400'
          }`}
          aria-label={isActive ? t.ariaStop : t.ariaActivate}
        >
          {icon}
        </button>

        <div className="hidden sm:block absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap text-sm shadow-lg">
            {text}
          </div>
        </div>
      </div>

      {isActive && (
        <div className="flex flex-col items-end gap-2">
          <div className="bg-white rounded-full px-4 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {Array.from({ length: maxTurns }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index < currentTurn
                        ? 'bg-green-500'
                        : index === currentTurn
                        ? 'bg-blue-500 animate-pulse'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-gray-700">
                {currentTurn}/{maxTurns}
              </span>
            </div>
          </div>

          <button
            onClick={toggleActive}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-lg transition-all duration-300 text-xs sm:text-sm font-medium"
            aria-label={t.ariaStopVoice}
          >
            <Square className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
            <span className="hidden xs:inline">{t.stop}</span>
          </button>
        </div>
      )}

      {isActive && (isListening || isSpeaking) && (
        <div className="bg-white rounded-lg shadow-xl p-3 sm:p-4 max-w-xs w-auto" role="status" aria-live="polite">
          <div className="flex items-center gap-2 mb-2">
            {isSpeaking ? (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" aria-hidden="true" />
            ) : (
              <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" aria-hidden="true" />
            )}
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              {isSpeaking ? t.hidriSpeaks : t.listening}
            </span>
          </div>

          {isListening && volumeLevel > 0 && (
            <div className="mb-2">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-red-500 transition-all duration-100"
                  style={{ width: `${volumeLevel}%` }}
                />
              </div>
            </div>
          )}

          {isSpeaking && (
            <div className="flex gap-1 items-center justify-center h-6 sm:h-8" aria-label={t.audioVisualization}>
              <div className="w-1 bg-blue-500 rounded-full animate-waveform-1" style={{ height: '15px' }}></div>
              <div className="w-1 bg-blue-500 rounded-full animate-waveform-2" style={{ height: '25px' }}></div>
              <div className="w-1 bg-blue-500 rounded-full animate-waveform-3" style={{ height: '20px' }}></div>
              <div className="w-1 bg-blue-500 rounded-full animate-waveform-4" style={{ height: '30px' }}></div>
              <div className="w-1 bg-blue-500 rounded-full animate-waveform-1" style={{ height: '15px' }}></div>
            </div>
          )}

          {isListening && !isSpeaking && (
            <div className="flex items-center justify-center" aria-label={t.micActive}>
              <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {transcript && isListening && (
            <div className="mt-2 text-xs text-gray-600 italic line-clamp-2">
              "{transcript}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
