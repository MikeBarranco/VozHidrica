/*
  # User Profiles and Water Tracking System

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `curp` (text, unique)
      - `address` (text)
      - `water_meter_number` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `water_consumption`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `consumption_date` (date)
      - `cubic_meters` (decimal)
      - `created_at` (timestamptz)
    
    - `water_streaks`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `current_streak` (integer)
      - `longest_streak` (integer)
      - `last_activity_date` (date)
      - `updated_at` (timestamptz)
    
    - `water_rewards`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `reward_type` (text)
      - `points_earned` (integer)
      - `streak_days` (integer)
      - `earned_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL UNIQUE,
  email text NOT NULL,
  full_name text NOT NULL,
  curp text UNIQUE NOT NULL,
  address text NOT NULL,
  water_meter_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS water_consumption (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  consumption_date date NOT NULL DEFAULT CURRENT_DATE,
  cubic_meters decimal(10, 2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, consumption_date)
);

ALTER TABLE water_consumption ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own consumption"
  ON water_consumption
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own consumption"
  ON water_consumption
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own consumption"
  ON water_consumption
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS water_streaks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL UNIQUE,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  last_activity_date date,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE water_streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own streaks"
  ON water_streaks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own streaks"
  ON water_streaks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own streaks"
  ON water_streaks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS water_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  reward_type text NOT NULL,
  points_earned integer NOT NULL DEFAULT 0,
  streak_days integer NOT NULL,
  earned_at timestamptz DEFAULT now()
);

ALTER TABLE water_rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own rewards"
  ON water_rewards
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own rewards"
  ON water_rewards
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_curp ON user_profiles(curp);
CREATE INDEX IF NOT EXISTS idx_water_consumption_user_id ON water_consumption(user_id);
CREATE INDEX IF NOT EXISTS idx_water_consumption_date ON water_consumption(consumption_date);
CREATE INDEX IF NOT EXISTS idx_water_streaks_user_id ON water_streaks(user_id);
CREATE INDEX IF NOT EXISTS idx_water_rewards_user_id ON water_rewards(user_id);
