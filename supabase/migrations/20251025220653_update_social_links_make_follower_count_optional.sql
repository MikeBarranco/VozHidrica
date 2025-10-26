/*
  # Update Social Links Table

  ## Changes
  
  1. Modifications to social_links table
    - Make follower_count column nullable (no longer required)
    - Allows social links to be added without follower count data
  
  ## Notes
  
  1. This change maintains backward compatibility with existing data
  2. Follower count is no longer displayed in the UI
  3. Column is kept for potential future use but not required
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'social_links' AND column_name = 'follower_count'
  ) THEN
    ALTER TABLE social_links ALTER COLUMN follower_count DROP NOT NULL;
  END IF;
END $$;
