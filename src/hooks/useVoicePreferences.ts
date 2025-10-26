// --- INICIO BYPASS HACKATHON ---
import { useState } from 'react';
// Comentamos todo lo que use Supabase o Auth
// import { useAuth } from '../contexts/AuthContext';
// import { supabase } from '../lib/supabase';

// Definimos la estructura de las preferencias (basado en VoiceContext.tsx)
interface VoicePreferences {
  vad_sensitivity: number;
  silence_threshold: number;
  max_turns: number;
  // Añade aquí cualquier otra preferencia que pueda faltar
}

// Creamos valores por defecto para que la app no crashee
const defaultPreferences: VoicePreferences = {
  vad_sensitivity: 0.8, // Es un valor común
  silence_threshold: 1000, // 1 segundo
  max_turns: 10, // Un número razonable
};

export function useVoicePreferences() {
  // Simplemente devolvemos los valores por defecto
  // y decimos que la carga ha terminado.
  const [preferences] = useState(defaultPreferences);
  const [loading] = useState(false);

  // Devolvemos la misma estructura que el hook original esperaba
  return { preferences, loading };
}
// --- FIN BYPASS HACKATHON ---