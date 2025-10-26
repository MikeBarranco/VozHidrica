/*
  # Eco-Points and Challenges System

  1. New Tables
    - `eco_points_transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `points` (integer) - Points earned/spent (positive or negative)
      - `transaction_type` (text) - Type: 'water_saved', 'challenge_completed', 'streak_bonus', 'reward_redeemed', 'education_completed'
      - `description` (text) - Description of the transaction
      - `related_entity_id` (uuid) - Optional reference to challenge, reward, etc.
      - `created_at` (timestamptz)
    
    - `user_eco_balance`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users, unique)
      - `total_points` (integer) - Total eco-points balance
      - `lifetime_points` (integer) - All points ever earned
      - `level` (text) - User level: 'Bronce', 'Plata', 'Oro', 'Platino'
      - `points_to_next_level` (integer)
      - `updated_at` (timestamptz)
    
    - `challenges`
      - `id` (uuid, primary key)
      - `title` (text) - Challenge title
      - `description` (text) - Challenge description
      - `challenge_type` (text) - 'weekly', 'monthly', 'seasonal', 'community'
      - `target_value` (decimal) - Target to achieve (e.g., 20% reduction)
      - `reward_points` (integer) - Points awarded
      - `start_date` (date)
      - `end_date` (date)
      - `is_active` (boolean)
      - `icon` (text) - Icon name for UI
      - `created_at` (timestamptz)
    
    - `user_challenges`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `challenge_id` (uuid, references challenges)
      - `progress` (decimal) - Current progress percentage
      - `is_completed` (boolean)
      - `completed_at` (timestamptz)
      - `started_at` (timestamptz)
    
    - `leaderboard`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `period_type` (text) - 'weekly', 'monthly', 'all_time'
      - `period_start` (date)
      - `period_end` (date)
      - `points_earned` (integer)
      - `water_saved_liters` (decimal)
      - `rank` (integer)
      - `updated_at` (timestamptz)
    
    - `savings_goals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `goal_name` (text)
      - `target_amount` (decimal)
      - `current_amount` (decimal)
      - `category` (text) - 'emergency', 'vacation', 'investment', 'education', 'custom'
      - `auto_deposit_percentage` (decimal) - Percentage of eco-points converted to money
      - `target_date` (date)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `financial_education_modules`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `content` (text) - Educational content
      - `category` (text) - 'savings', 'investment', 'budget', 'credit', 'water'
      - `difficulty_level` (text) - 'beginner', 'intermediate', 'advanced'
      - `points_reward` (integer)
      - `estimated_minutes` (integer)
      - `order_index` (integer)
      - `is_published` (boolean)
      - `created_at` (timestamptz)
    
    - `user_education_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `module_id` (uuid, references financial_education_modules)
      - `is_completed` (boolean)
      - `progress_percentage` (integer)
      - `completed_at` (timestamptz)
      - `started_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Allow public read access for challenges and education modules
    - Restrict leaderboard to show anonymized data
*/

-- Eco Points Transactions Table
CREATE TABLE IF NOT EXISTS eco_points_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  points integer NOT NULL,
  transaction_type text NOT NULL,
  description text NOT NULL,
  related_entity_id uuid,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE eco_points_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own eco points transactions"
  ON eco_points_transactions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own eco points transactions"
  ON eco_points_transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_eco_points_user_id ON eco_points_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_eco_points_created_at ON eco_points_transactions(created_at);

-- User Eco Balance Table
CREATE TABLE IF NOT EXISTS user_eco_balance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL UNIQUE,
  total_points integer DEFAULT 0,
  lifetime_points integer DEFAULT 0,
  level text DEFAULT 'Bronce',
  points_to_next_level integer DEFAULT 1000,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_eco_balance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own eco balance"
  ON user_eco_balance
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own eco balance"
  ON user_eco_balance
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own eco balance"
  ON user_eco_balance
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_eco_balance_user_id ON user_eco_balance(user_id);

-- Challenges Table
CREATE TABLE IF NOT EXISTS challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  challenge_type text NOT NULL,
  target_value decimal(10, 2) NOT NULL,
  reward_points integer NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  is_active boolean DEFAULT true,
  icon text DEFAULT 'trophy',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active challenges"
  ON challenges
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE INDEX IF NOT EXISTS idx_challenges_active ON challenges(is_active);
CREATE INDEX IF NOT EXISTS idx_challenges_dates ON challenges(start_date, end_date);

-- User Challenges Table
CREATE TABLE IF NOT EXISTS user_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  challenge_id uuid REFERENCES challenges NOT NULL,
  progress decimal(5, 2) DEFAULT 0,
  is_completed boolean DEFAULT false,
  completed_at timestamptz,
  started_at timestamptz DEFAULT now(),
  UNIQUE(user_id, challenge_id)
);

ALTER TABLE user_challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own challenges"
  ON user_challenges
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own challenges"
  ON user_challenges
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own challenges"
  ON user_challenges
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_challenges_user_id ON user_challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_challenges_challenge_id ON user_challenges(challenge_id);

-- Leaderboard Table
CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  period_type text NOT NULL,
  period_start date NOT NULL,
  period_end date NOT NULL,
  points_earned integer DEFAULT 0,
  water_saved_liters decimal(10, 2) DEFAULT 0,
  rank integer,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, period_type, period_start)
);

ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view leaderboard"
  ON leaderboard
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_leaderboard_period ON leaderboard(period_type, period_start, period_end);
CREATE INDEX IF NOT EXISTS idx_leaderboard_rank ON leaderboard(rank);

-- Savings Goals Table
CREATE TABLE IF NOT EXISTS savings_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  goal_name text NOT NULL,
  target_amount decimal(10, 2) NOT NULL,
  current_amount decimal(10, 2) DEFAULT 0,
  category text NOT NULL,
  auto_deposit_percentage decimal(5, 2) DEFAULT 0,
  target_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE savings_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own savings goals"
  ON savings_goals
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own savings goals"
  ON savings_goals
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own savings goals"
  ON savings_goals
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own savings goals"
  ON savings_goals
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_savings_goals_user_id ON savings_goals(user_id);

-- Financial Education Modules Table
CREATE TABLE IF NOT EXISTS financial_education_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  difficulty_level text NOT NULL,
  points_reward integer DEFAULT 0,
  estimated_minutes integer DEFAULT 5,
  order_index integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE financial_education_modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published education modules"
  ON financial_education_modules
  FOR SELECT
  TO authenticated
  USING (is_published = true);

CREATE INDEX IF NOT EXISTS idx_education_modules_category ON financial_education_modules(category);
CREATE INDEX IF NOT EXISTS idx_education_modules_order ON financial_education_modules(order_index);

-- User Education Progress Table
CREATE TABLE IF NOT EXISTS user_education_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  module_id uuid REFERENCES financial_education_modules NOT NULL,
  is_completed boolean DEFAULT false,
  progress_percentage integer DEFAULT 0,
  completed_at timestamptz,
  started_at timestamptz DEFAULT now(),
  UNIQUE(user_id, module_id)
);

ALTER TABLE user_education_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own education progress"
  ON user_education_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own education progress"
  ON user_education_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own education progress"
  ON user_education_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_education_user_id ON user_education_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_education_module_id ON user_education_progress(module_id);