/*
  # Create teams table

  1. New Tables
    - `teams`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique)
      - `city` (text)
      - `state` (text)
      - `league` (text)
      - `logo_url` (text)
      - `founded_year` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `teams` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  city text,
  state text,
  league text,
  logo_url text,
  founded_year integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teams are viewable by everyone"
  ON teams
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Teams are editable by authenticated users"
  ON teams
  FOR ALL
  TO authenticated
  USING (true);

CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON teams
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();