/*
  # Create apps table

  1. New Tables
    - `apps`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique)
      - `description` (text)
      - `rating` (numeric)
      - `pros` (text)
      - `cons` (text)
      - `bonus_info` (text)
      - `minimum_deposit` (integer)
      - `payment_methods` (text)
      - `license_info` (text)
      - `download_url` (text)
      - `featured` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `apps` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS apps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  rating numeric(3,2) CHECK (rating >= 1 AND rating <= 5),
  pros text,
  cons text,
  bonus_info text,
  minimum_deposit integer DEFAULT 0,
  payment_methods text,
  license_info text,
  download_url text,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE apps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Apps are viewable by everyone"
  ON apps
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Apps are editable by authenticated users"
  ON apps
  FOR ALL
  TO authenticated
  USING (true);

CREATE TRIGGER update_apps_updated_at
  BEFORE UPDATE ON apps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();