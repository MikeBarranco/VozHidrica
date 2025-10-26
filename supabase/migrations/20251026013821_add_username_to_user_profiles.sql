/*
  # Add Username Column to User Profiles

  1. Changes
    - Add `username` column to `user_profiles` table
      - Type: text
      - Unique constraint
      - Not null
      - Used for authentication instead of email
    
  2. Indexes
    - Add unique index on username for fast lookups
    
  3. Notes
    - Username will be the primary identifier for login
    - Email remains for recovery and communications
    - Existing data will need default usernames (timestamp-based)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'username'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN username text;
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS idx_user_profiles_username ON user_profiles(username);

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'username' AND is_nullable = 'YES'
  ) THEN
    UPDATE user_profiles 
    SET username = 'user_' || EXTRACT(EPOCH FROM created_at)::bigint 
    WHERE username IS NULL;
    
    ALTER TABLE user_profiles ALTER COLUMN username SET NOT NULL;
  END IF;
END $$;