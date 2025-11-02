/*
  # Create Admin Content Management System

  ## Overview
  This migration creates the database schema for managing website content through an admin portal.

  ## New Tables

  ### `admin_users`
  Stores admin user credentials and information
  - `id` (uuid, primary key) - Unique admin identifier
  - `email` (text, unique) - Admin email address
  - `full_name` (text) - Admin full name
  - `role` (text) - Admin role (super_admin, admin, editor)
  - `created_at` (timestamptz) - Account creation timestamp
  - `last_login` (timestamptz) - Last login timestamp

  ### `news_articles`
  Stores news and updates
  - `id` (uuid, primary key) - Unique article identifier
  - `title` (text) - Article title
  - `excerpt` (text) - Short excerpt
  - `full_content` (text) - Full article content
  - `category` (text) - Article category
  - `image_url` (text) - Image URL
  - `date` (text) - Display date
  - `featured` (boolean) - Featured article flag
  - `published` (boolean) - Published status
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `gallery_images`
  Stores gallery images
  - `id` (uuid, primary key) - Unique image identifier
  - `url` (text) - Image URL
  - `title` (text) - Image title
  - `category` (text) - Image category
  - `display_order` (integer) - Display order
  - `published` (boolean) - Published status
  - `created_at` (timestamptz) - Creation timestamp

  ### `contact_messages`
  Stores contact form submissions
  - `id` (uuid, primary key) - Unique message identifier
  - `name` (text) - Sender name
  - `email` (text) - Sender email
  - `phone` (text) - Sender phone
  - `subject` (text) - Message subject
  - `message` (text) - Message content
  - `status` (text) - Message status (new, read, replied)
  - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - Enable RLS on all tables
  - Admin users can only be managed by authenticated admins
  - Content tables can be read publicly but only modified by admins
  - Contact messages can be submitted publicly but only read by admins
*/

-- Create update function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text DEFAULT 'editor',
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Create news_articles table
CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  full_content text NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  date text NOT NULL,
  featured boolean DEFAULT false,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  display_order integer DEFAULT 0,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_news_articles_published ON news_articles(published);
CREATE INDEX IF NOT EXISTS idx_gallery_images_published ON gallery_images(published);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_users
CREATE POLICY "Only authenticated admins can view admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Only authenticated admins can manage admin users"
  ON admin_users FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

-- RLS Policies for news_articles
CREATE POLICY "Anyone can view published news"
  ON news_articles FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authenticated admins can manage news"
  ON news_articles FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

-- RLS Policies for gallery_images
CREATE POLICY "Anyone can view published gallery images"
  ON gallery_images FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authenticated admins can manage gallery"
  ON gallery_images FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

-- RLS Policies for contact_messages
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can view contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users));

CREATE POLICY "Authenticated admins can update contact messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

-- Create trigger for news_articles updated_at
DROP TRIGGER IF EXISTS update_news_articles_updated_at ON news_articles;
CREATE TRIGGER update_news_articles_updated_at BEFORE UPDATE ON news_articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();