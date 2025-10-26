/*
  # Create News Items Table

  ## New Tables
  
  ### news_items
  News articles displayed in the 3D carousel
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - News article title
  - `image_url` (text) - URL to the news image
  - `news_url` (text) - Link to the full news article
  - `color_card` (text) - RGB color values for card gradient (e.g., "142, 249, 252")
  - `display_order` (integer) - Order in which news items appear in carousel
  - `is_active` (boolean) - Whether the news item is currently visible
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  
  ### Row Level Security (RLS)
  - Enable RLS on news_items table
  - Create policy to allow public read access for active news items
  - Data is read-only for application users
  - Only authenticated users with proper permissions can manage news

  ## Notes
  
  1. Table uses uuid primary key with automatic generation
  2. Timestamp defaults to current time for created_at field
  3. Boolean is_active defaults to true
  4. Index created on display_order for performance
  5. color_card stores RGB values as comma-separated string for gradient backgrounds
*/

CREATE TABLE IF NOT EXISTS news_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text,
  news_url text NOT NULL,
  color_card text DEFAULT '142, 249, 252',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE news_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to active news items"
  ON news_items
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE INDEX IF NOT EXISTS idx_news_items_display_order ON news_items(display_order);
