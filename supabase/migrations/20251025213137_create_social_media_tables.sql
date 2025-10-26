/*
  # Create Social Media Tables

  ## New Tables
  
  ### 1. social_posts
  Social media posts from different platforms
  - `id` (uuid, primary key)
  - `platform` (text) - Platform name (Instagram, Facebook, Twitter, etc.)
  - `content` (text) - Post caption/text content
  - `image_url` (text) - URL to the post image
  - `post_url` (text) - Direct link to original post on platform
  - `published_at` (timestamptz) - When the post was published
  - `likes_count` (integer) - Number of likes
  - `shares_count` (integer) - Number of shares
  - `comments_count` (integer) - Number of comments
  - `created_at` (timestamptz) - Record creation timestamp

  ### 2. carousel_banners
  Promotional banners for the hero carousel
  - `id` (uuid, primary key)
  - `title` (text) - Banner title/description
  - `image_url` (text) - URL to the banner image
  - `link_url` (text, nullable) - Optional link when banner is clicked
  - `display_order` (integer) - Order in which banners should appear
  - `is_active` (boolean) - Whether banner is currently active
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. social_links
  Social media platform links and statistics
  - `id` (uuid, primary key)
  - `platform_name` (text) - Name of the social platform
  - `profile_url` (text) - URL to Banorte's profile on the platform
  - `follower_count` (integer) - Number of followers
  - `icon_name` (text) - Name of the lucide-react icon to use
  - `display_order` (integer) - Order in which links should appear
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  
  ### Row Level Security (RLS)
  - Enable RLS on all three tables
  - Create policies to allow public read access (SELECT)
  - Data is read-only for the application users
  - Only authenticated users with proper permissions can insert/update/delete

  ## Notes
  
  1. All tables use uuid primary keys with automatic generation
  2. Timestamps default to current time for created_at fields
  3. Integer counts default to 0 for engagement metrics
  4. Boolean fields default appropriately (is_active = true)
  5. Indexes created on published_at and display_order for performance
*/

CREATE TABLE IF NOT EXISTS social_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  content text NOT NULL,
  image_url text NOT NULL,
  post_url text NOT NULL,
  published_at timestamptz DEFAULT now(),
  likes_count integer DEFAULT 0,
  shares_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS carousel_banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  link_url text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_name text NOT NULL,
  profile_url text NOT NULL,
  follower_count integer DEFAULT 0,
  icon_name text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE carousel_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to social posts"
  ON social_posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to carousel banners"
  ON carousel_banners
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Allow public read access to social links"
  ON social_links
  FOR SELECT
  TO public
  USING (true);

CREATE INDEX IF NOT EXISTS idx_social_posts_published_at ON social_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_carousel_banners_display_order ON carousel_banners(display_order);
CREATE INDEX IF NOT EXISTS idx_social_links_display_order ON social_links(display_order);