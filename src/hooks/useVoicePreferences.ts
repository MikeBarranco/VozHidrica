import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface VoicePreferences {
  silence_threshold: number;
  max_turns: number;
  vad_sensitivity: 'low' | 'medium' | 'high';
  auto_restart: boolean;
}

const DEFAULT_PREFERENCES: VoicePreferences = {
  silence_threshold: 1.5,
  max_turns: 4,
  vad_sensitivity: 'medium',
  auto_restart: false,
};

export function useVoicePreferences() {
  const [preferences, setPreferences] = useState<VoicePreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('voice_conversation_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error loading voice preferences:', error);
        setLoading(false);
        return;
      }

      if (data) {
        setPreferences({
          silence_threshold: data.silence_threshold,
          max_turns: data.max_turns,
          vad_sensitivity: data.vad_sensitivity as 'low' | 'medium' | 'high',
          auto_restart: data.auto_restart,
        });
      } else {
        await createDefaultPreferences(user.id);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error in loadPreferences:', error);
      setLoading(false);
    }
  };

  const createDefaultPreferences = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('voice_conversation_preferences')
        .insert({
          user_id: userId,
          ...DEFAULT_PREFERENCES,
        });

      if (error) {
        console.error('Error creating default preferences:', error);
      }
    } catch (error) {
      console.error('Error in createDefaultPreferences:', error);
    }
  };

  const updatePreferences = async (newPreferences: Partial<VoicePreferences>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const updatedPreferences = { ...preferences, ...newPreferences };

      const { error } = await supabase
        .from('voice_conversation_preferences')
        .update({
          ...updatedPreferences,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating preferences:', error);
        return;
      }

      setPreferences(updatedPreferences);
    } catch (error) {
      console.error('Error in updatePreferences:', error);
    }
  };

  return {
    preferences,
    loading,
    updatePreferences,
  };
}
