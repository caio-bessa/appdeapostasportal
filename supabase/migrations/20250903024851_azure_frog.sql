/*
  # Create article relationships tables

  1. New Tables
    - `article_apps` (many-to-many relationship)
    - `article_teams` (many-to-many relationship)

  2. Security
    - Enable RLS on relationship tables
    - Add policies for public read access
*/

-- Article-Apps relationship (many-to-many)
CREATE TABLE IF NOT EXISTS article_apps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  app_id uuid REFERENCES apps(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(article_id, app_id)
);

ALTER TABLE article_apps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Article apps are viewable by everyone"
  ON article_apps
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Article apps are editable by authenticated users"
  ON article_apps
  FOR ALL
  TO authenticated
  USING (true);

-- Article-Teams relationship (many-to-many)
CREATE TABLE IF NOT EXISTS article_teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(article_id, team_id)
);

ALTER TABLE article_teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Article teams are viewable by everyone"
  ON article_teams
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Article teams are editable by authenticated users"
  ON article_teams
  FOR ALL
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS article_apps_article_id_idx ON article_apps(article_id);
CREATE INDEX IF NOT EXISTS article_apps_app_id_idx ON article_apps(app_id);
CREATE INDEX IF NOT EXISTS article_teams_article_id_idx ON article_teams(article_id);
CREATE INDEX IF NOT EXISTS article_teams_team_id_idx ON article_teams(team_id);