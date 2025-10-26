export async function requestMicrophonePermission(): Promise<{
  granted: boolean;
  error?: string;
}> {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return {
      granted: false,
      error: 'Tu navegador no soporta acceso al micrófono. Usa un navegador moderno como Chrome, Firefox, o Safari.',
    };
  }

  if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
    return {
      granted: false,
      error: 'El acceso al micrófono requiere una conexión HTTPS segura.',
    };
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
    return { granted: true };
  } catch (error: any) {
    let errorMessage = 'No se pudo acceder al micrófono.';

    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
      errorMessage = 'Permiso de micrófono denegado. Por favor, permite el acceso al micrófono en la configuración de tu navegador.';
    } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
      errorMessage = 'No se encontró ningún micrófono. Conecta un micrófono y vuelve a intentarlo.';
    } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
      errorMessage = 'El micrófono está siendo usado por otra aplicación. Cierra otras aplicaciones y vuelve a intentarlo.';
    }

    return { granted: false, error: errorMessage };
  }
}

export function checkMicrophoneSupport(): {
  supported: boolean;
  error?: string;
} {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    return {
      supported: false,
      error: 'Tu navegador no soporta reconocimiento de voz. Usa Chrome, Edge o Safari para la mejor experiencia.',
    };
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return {
      supported: false,
      error: 'Tu navegador no soporta acceso al micrófono.',
    };
  }

  return { supported: true };
}
