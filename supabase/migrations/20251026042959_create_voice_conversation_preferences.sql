/*
  # Voice Conversation Preferences Table

  1. New Tables
    - `voice_conversation_preferences`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (uuid, references auth.users, unique) - User who owns these preferences
      - `silence_threshold` (decimal) - Seconds of silence before processing (default: 1.5)
      - `max_turns` (integer) - Maximum conversation turns (default: 4)
      - `vad_sensitivity` (text) - Voice activity detection sensitivity: 'low', 'medium', 'high' (default: 'medium')
      - `auto_restart` (boolean) - Auto-restart conversation after max turns (default: false)
      - `created_at` (timestamptz) - When preferences were created
      - `updated_at` (timestamptz) - When preferences were last updated

  2. Security
    - Enable RLS on voice_conversation_preferences table
    - Add policy for authenticated users to read their own preferences
    - Add policy for authenticated users to insert their own preferences
    - Add policy for authenticated users to update their own preferences

  3. Notes
    - Default values ensure good user experience out of the box
    - Preferences persist across devices and sessions
    - VAD sensitivity affects how easily voice is detected (low = less sensitive, high = more sensitive)
*/

CREATE TABLE IF NOT EXISTS voice_conversation_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL UNIQUE,
  silence_threshold decimal(3, 1) DEFAULT 1.5,
  max_turns integer DEFAULT 4,
  vad_sensitivity text DEFAULT 'medium',
  auto_restart boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE voice_conversation_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own voice preferences"
  ON voice_conversation_preferences
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own voice preferences"
  ON voice_conversation_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own voice preferences"
  ON voice_conversation_preferences
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_voice_preferences_user_id ON voice_conversation_preferences(user_id);