/*
  # Create authors table

  1. New Tables
    - `authors`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `bio` (text)
      - `specialization` (text)
      - `avatar_url` (text)
      - `social_links` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `authors` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  bio text,
  specialization text,
  avatar_url text,
  social_links jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE authors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authors are viewable by everyone"
  ON authors
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authors are editable by authenticated users"
  ON authors
  FOR ALL
  TO authenticated
  USING (true);

CREATE TRIGGER update_authors_updated_at
  BEFORE UPDATE ON authors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();