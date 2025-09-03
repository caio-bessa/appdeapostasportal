/*
  # Insert sample data

  1. Sample Data
    - Categories (Futebol, Basquete, Reviews, etc.)
    - Authors (João Silva, Ana Carolina, etc.)
    - Teams (Flamengo, Palmeiras, etc.)
    - Apps (Bet365, Betano, KTO, etc.)
    - Articles (sample news articles)

  2. Purpose
    - Provide working data for immediate testing
    - Demonstrate all functionality
    - Fix broken links identified in documentation
*/

-- Insert Categories
INSERT INTO categories (name, slug, description, featured) VALUES
('Futebol', 'futebol', 'Notícias e análises sobre futebol brasileiro e internacional', true),
('Basquete', 'basquete', 'Cobertura completa do basquete nacional e NBA', false),
('Reviews de Apps', 'reviews-apps', 'Reviews detalhados dos melhores apps de apostas', true),
('Regulamentação', 'regulamentacao', 'Notícias sobre leis e regulamentação de apostas', false),
('Promoções', 'promocoes', 'Melhores bônus e ofertas dos apps de apostas', true),
('Tecnologia', 'tecnologia', 'Inovações e tecnologia no mundo das apostas', false)
ON CONFLICT (slug) DO NOTHING;

-- Insert Authors
INSERT INTO authors (name, slug, bio, specialization, avatar_url, social_links) VALUES
('João Silva', 'joao-silva', 'Jornalista esportivo com 10 anos de experiência cobrindo futebol brasileiro', 'Futebol', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', '{"twitter": "@joaosilva", "instagram": "@joaosilva_sports"}'),
('Ana Carolina Santos', 'ana-carolina-santos', 'Especialista em regulamentação de apostas e segurança digital', 'Regulamentação', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', '{"linkedin": "ana-carolina-santos", "twitter": "@anacarol_legal"}'),
('Ricardo Silva', 'ricardo-silva', 'Analista técnico especializado em apps de apostas e UX/UI', 'Análises Técnicas', 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150', '{"twitter": "@ricardosilva_tech", "linkedin": "ricardo-silva-tech"}'),
('Carlos Eduardo Mendes', 'carlos-eduardo-mendes', 'Especialista em estratégias de apostas e gestão de banca', 'Estratégias', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150', '{"youtube": "ApostasEducativas_Carlos", "instagram": "@carlosmendes.apostas"}')
ON CONFLICT (slug) DO NOTHING;

-- Insert Teams
INSERT INTO teams (name, slug, city, state, league, logo_url, founded_year) VALUES
('Flamengo', 'flamengo', 'Rio de Janeiro', 'RJ', 'Série A', 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=100', 1895),
('Palmeiras', 'palmeiras', 'São Paulo', 'SP', 'Série A', 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=100', 1914),
('Corinthians', 'corinthians', 'São Paulo', 'SP', 'Série A', 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=100', 1910),
('São Paulo', 'sao-paulo', 'São Paulo', 'SP', 'Série A', 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=100', 1930),
('Santos', 'santos', 'Santos', 'SP', 'Série A', 'https://images.pexels.com/photos/6347707/pexels-photo-6347707.jpeg?auto=compress&cs=tinysrgb&w=100', 1912),
('Vasco', 'vasco', 'Rio de Janeiro', 'RJ', 'Série A', 'https://images.pexels.com/photos/7594435/pexels-photo-7594435.jpeg?auto=compress&cs=tinysrgb&w=100', 1898)
ON CONFLICT (slug) DO NOTHING;

-- Insert Apps
INSERT INTO apps (name, slug, description, rating, pros, cons, bonus_info, minimum_deposit, payment_methods, license_info, download_url, featured) VALUES
('Bet365', 'bet365', 'A casa de apostas mais completa do mundo com streaming ao vivo e cash out em tempo real.', 4.6, 'Interface intuitiva, Odds competitivas, Streaming de qualidade, Suporte 24/7', 'Bônus não tão atrativo, Verificação pode ser demorada', 'Até R$ 200 em créditos de apostas para novos clientes', 30, 'PIX, Cartão de Crédito, Transferência Bancária, AstroPay, Neteller, Skrill', 'Licenciada pela UK Gambling Commission e Malta Gaming Authority', 'https://mobile.bet365.com', true),
('Betano', 'betano', 'Patrocinador oficial do Brasileirão com foco total no mercado brasileiro.', 4.5, 'Bônus atrativo, Foco no mercado brasileiro, PIX sem taxas, Odds competitivas', 'Menor variedade de esportes, Interface pode ser lenta', 'Bônus de 100% até R$ 500 no primeiro depósito', 20, 'PIX, Cartão de Crédito, Pay4Fun, AstroPay', 'Licenciada pela Malta Gaming Authority', 'https://betano.com/br/app/', true),
('KTO', 'kto', 'Interface moderna e gamificada com recursos únicos de criação de apostas.', 4.3, 'Interface moderna, Recursos únicos, Cashback automático, Fácil de usar', 'Empresa relativamente nova, Cobertura limitada de esportes', 'Aposta grátis de R$ 200 sem rollover', 20, 'PIX, Cartão de Crédito, AstroPay, Muchbetter', 'Licenciada pela Antillephone N.V.', 'https://kto.com/br/mobile/', true),
('Sportingbet', 'sportingbet', 'Tradição em apostas esportivas com interface simples e confiável.', 4.2, 'Fácil de usar, Empresa confiável, Saque rápido, Bom atendimento', 'Bônus menor, Menos opções de streaming', 'Bônus de boas-vindas até R$ 150', 25, 'PIX, Cartão de Crédito, Transferência Bancária', 'Licenciada em Gibraltar', 'https://sportingbet.com/br/app', false),
('Betfair', 'betfair', 'Casa de apostas com exchange e mercados únicos no mundo.', 4.4, 'Exchange inovador, Odds competitivas, Muitas opções, Empresa sólida', 'Interface complexa, Curva de aprendizado', 'Até R$ 300 em apostas grátis', 25, 'PIX, Cartão de Crédito, Neteller, Skrill', 'Licenciada pela Malta Gaming Authority', 'https://betfair.com/br/app', false)
ON CONFLICT (slug) DO NOTHING;