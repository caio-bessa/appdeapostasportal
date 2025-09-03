/*
  # Insert sample articles

  1. Sample Articles
    - News articles with proper relationships
    - Fix for broken link: betano-super-odd-brasil-copa
    - Articles for all categories
    - Proper SEO and content

  2. Relationships
    - Link articles to categories and authors
    - Some articles linked to apps and teams
*/

-- Get category and author IDs for relationships
DO $$
DECLARE
    cat_futebol uuid;
    cat_promocoes uuid;
    cat_reviews uuid;
    cat_regulamentacao uuid;
    cat_tecnologia uuid;
    
    author_joao uuid;
    author_ana uuid;
    author_ricardo uuid;
    author_carlos uuid;
    
    app_betano uuid;
    app_bet365 uuid;
    
    team_flamengo uuid;
    team_palmeiras uuid;
BEGIN
    -- Get category IDs
    SELECT id INTO cat_futebol FROM categories WHERE slug = 'futebol';
    SELECT id INTO cat_promocoes FROM categories WHERE slug = 'promocoes';
    SELECT id INTO cat_reviews FROM categories WHERE slug = 'reviews-apps';
    SELECT id INTO cat_regulamentacao FROM categories WHERE slug = 'regulamentacao';
    SELECT id INTO cat_tecnologia FROM categories WHERE slug = 'tecnologia';
    
    -- Get author IDs
    SELECT id INTO author_joao FROM authors WHERE slug = 'joao-silva';
    SELECT id INTO author_ana FROM authors WHERE slug = 'ana-carolina-santos';
    SELECT id INTO author_ricardo FROM authors WHERE slug = 'ricardo-silva';
    SELECT id INTO author_carlos FROM authors WHERE slug = 'carlos-eduardo-mendes';
    
    -- Get app IDs
    SELECT id INTO app_betano FROM apps WHERE slug = 'betano';
    SELECT id INTO app_bet365 FROM apps WHERE slug = 'bet365';
    
    -- Get team IDs
    SELECT id INTO team_flamengo FROM teams WHERE slug = 'flamengo';
    SELECT id INTO team_palmeiras FROM teams WHERE slug = 'palmeiras';

    -- Insert Articles
    INSERT INTO articles (title, slug, content, excerpt, seo_title, seo_description, featured_image_url, published_at, featured, category_id, author_id) VALUES
    
    -- CRITICAL: Fix for broken link identified in documentation
    ('Betano Super Odd Brasil Copa: Como Aproveitar as Melhores Cotações', 'betano-super-odd-brasil-copa', 
     'A Betano oferece Super Odds especiais para jogos do Brasil em copas e competições internacionais. Neste guia completo, você aprenderá como identificar essas oportunidades, como funcionam as Super Odds e estratégias para maximizar seus ganhos.

As Super Odds da Betano são cotações turbinadas que oferecem retornos muito superiores às odds normais. Geralmente disponíveis para eventos especiais como jogos da Seleção Brasileira, finais de campeonatos e clássicos importantes.

**Como Funciona:**
1. A Betano seleciona mercados específicos
2. Aumenta significativamente as odds (ex: de 2.0 para 5.0)
3. Limita o valor máximo da aposta
4. Oferece por tempo limitado

**Estratégias para Aproveitar:**
- Cadastre-se com antecedência
- Ative notificações do app
- Tenha saldo disponível
- Aposte rapidamente (ofertas limitadas)

**Exemplo Prático:**
No último jogo Brasil vs Argentina, a Betano ofereceu:
- Vitória do Brasil: Odd normal 2.1 → Super Odd 5.0
- Limite: R$ 50 por cliente
- Retorno potencial: R$ 250 (vs R$ 105 normal)

Lembre-se sempre de apostar com responsabilidade e dentro de suas possibilidades financeiras.',
     'Descubra como aproveitar as Super Odds da Betano para jogos do Brasil em copas. Guia completo com estratégias e dicas práticas.',
     'Betano Super Odd Brasil Copa: Guia Completo 2025 | Melhores Cotações',
     'Aprenda a aproveitar as Super Odds da Betano para jogos do Brasil. Estratégias, dicas e como maximizar seus ganhos com as melhores cotações.',
     'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
     '2025-01-15 10:00:00+00', true, cat_promocoes, author_carlos),
    
    ('Brasileirão 2025: Palmeiras e Flamengo lideram odds para o título', 'brasileirao-2025-palmeiras-flamengo-odds-titulo',
     'Análise completa das cotações para o Campeonato Brasileiro 2025, com Palmeiras como favorito seguido de perto pelo Flamengo. O Verdão aparece com odds de 3.2 para o título, enquanto o Rubro-Negro tem cotação de 3.8.

**Principais Favoritos:**
1. Palmeiras - 3.2 (23.8% de probabilidade)
2. Flamengo - 3.8 (20.1% de probabilidade)  
3. Atlético-MG - 6.5 (11.7% de probabilidade)
4. São Paulo - 8.0 (9.5% de probabilidade)

**Análise Técnica:**
O Palmeiras mantém a base campeã e investiu em reforços pontuais. O Flamengo renovou o elenco mas ainda busca entrosamento. Ambos têm elencos qualificados para brigar pelo título.

**Mercados Alternativos:**
- Top 4: Palmeiras, Flamengo, Atlético-MG, São Paulo
- Rebaixamento: Cuiabá, Juventude, Criciúma como principais candidatos
- Artilheiro: Pedro (Flamengo) e Rony (Palmeiras) entre os favoritos',
     'Análise das cotações para o Campeonato Brasileiro 2025, com Palmeiras como favorito seguido pelo Flamengo.',
     'Brasileirão 2025: Odds e Favoritos para o Título | Análise Completa',
     'Confira as odds atualizadas para o Brasileirão 2025. Palmeiras lidera como favorito, seguido pelo Flamengo. Análise completa dos candidatos.',
     'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
     '2025-01-14 14:30:00+00', true, cat_futebol, author_joao),
    
    ('Review Completo: Bet365 é Confiável? Análise 2025', 'review-bet365-confiavel-analise-2025',
     'Análise técnica completa do aplicativo Bet365, uma das casas de apostas mais respeitadas mundialmente. Avaliamos interface, recursos, segurança, métodos de pagamento e tudo que você precisa saber.

**Pontos Fortes:**
- Interface intuitiva e responsiva
- Streaming ao vivo de alta qualidade
- Cash out disponível em tempo real
- Ampla cobertura de esportes
- Suporte 24/7 em português
- Empresa sólida e confiável

**Pontos de Melhoria:**
- Bônus de boas-vindas não tão competitivo
- Processo de verificação pode ser demorado
- Algumas funcionalidades premium requerem depósito alto

**Segurança e Licenças:**
A Bet365 é licenciada pela UK Gambling Commission e Malta Gaming Authority, duas das autoridades mais rigorosas do mundo. Utiliza criptografia SSL e tem histórico impecável de pagamentos.

**Métodos de Pagamento:**
- PIX (instantâneo)
- Cartões Visa/Mastercard
- Transferência bancária
- E-wallets (Neteller, Skrill)

**Veredicto Final:**
A Bet365 é uma escolha sólida para apostadores que valorizam confiabilidade, variedade de mercados e recursos avançados como streaming e cash out.',
     'Review completo da Bet365: análise da interface, recursos, segurança, métodos de pagamento, prós e contras.',
     'Review Bet365 2025: É Confiável? Análise Completa | Prós e Contras',
     'Review completo da Bet365: análise técnica da interface, recursos, métodos de pagamento, prós e contras. Vale a pena em 2025?',
     'https://images.pexels.com/photos/7594435/pexels-photo-7594435.jpeg?auto=compress&cs=tinysrgb&w=800',
     '2025-01-13 16:45:00+00', false, cat_reviews, author_ricardo),
    
    ('Nova Regulamentação de Apostas Online no Brasil: O que Mudou', 'nova-regulamentacao-apostas-online-brasil-2025',
     'A nova regulamentação das apostas esportivas no Brasil, estabelecida pela Lei 14.790/23, trouxe importantes mudanças para o setor. Entenda o que mudou e como isso afeta apostadores e operadoras.

**Principais Mudanças:**
1. **Licenciamento Obrigatório**: Todas as casas devem ter licença brasileira
2. **Tributação**: 12% sobre a receita bruta das operadoras
3. **Proteção ao Consumidor**: Regras mais rígidas para publicidade
4. **Apostas Responsáveis**: Ferramentas obrigatórias de autoexclusão

**Impacto para Apostadores:**
- Maior segurança e proteção
- Garantia de pagamento de prêmios
- Ferramentas de controle de gastos
- Atendimento em português obrigatório

**Cronograma de Implementação:**
- Janeiro 2024: Início da regulamentação
- Dezembro 2024: Prazo final para licenciamento
- 2025: Fiscalização plena em vigor

**Lista de Operadoras Licenciadas:**
Atualmente, mais de 100 empresas solicitaram licenças, incluindo Bet365, Betano, KTO e outras grandes marcas do mercado.',
     'Entenda as principais mudanças na legislação brasileira sobre apostas esportivas e como isso afeta os apostadores.',
     'Nova Regulamentação Apostas Brasil 2025: O que Mudou | Lei 14.790/23',
     'Análise completa da nova regulamentação de apostas no Brasil. Entenda as mudanças da Lei 14.790/23 e impactos para apostadores.',
     'https://images.pexels.com/photos/6347707/pexels-photo-6347707.jpeg?auto=compress&cs=tinysrgb&w=800',
     '2025-01-12 11:20:00+00', true, cat_regulamentacao, author_ana),
    
    ('PIX nas Apostas: Como o Pagamento Instantâneo Mudou o Jogo', 'pix-apostas-pagamento-instantaneo-mudou-jogo',
     'O PIX revolucionou a forma como os brasileiros fazem depósitos e saques em casas de apostas. Analisamos o impacto dessa tecnologia no mercado de apostas esportivas.

**Vantagens do PIX:**
- Transferências instantâneas 24/7
- Sem taxas na maioria das casas
- Segurança do Banco Central
- Facilidade de uso
- Disponível em todos os bancos

**Antes vs Depois do PIX:**
- **Antes**: TED/DOC (1-2 dias úteis), boleto (até 3 dias)
- **Depois**: PIX (segundos), disponível 24/7

**Casas que Oferecem PIX:**
Praticamente todas as principais casas de apostas brasileiras já oferecem PIX:
- Bet365: PIX instantâneo
- Betano: PIX sem taxas
- KTO: PIX 24/7
- Sportingbet: PIX rápido

**Dicas de Segurança:**
1. Sempre verifique o destinatário
2. Use apenas casas licenciadas
3. Mantenha comprovantes
4. Configure limites no seu banco

O PIX tornou as apostas mais acessíveis e práticas para o apostador brasileiro.',
     'Análise do impacto do PIX no mercado de apostas esportivas brasileiro e suas vantagens para apostadores.',
     'PIX nas Apostas: Como Mudou o Mercado | Vantagens e Segurança',
     'Descubra como o PIX revolucionou as apostas no Brasil. Vantagens, segurança e como usar com responsabilidade.',
     'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800',
     '2025-01-11 09:15:00+00', false, cat_tecnologia, author_carlos)
    
    ON CONFLICT (slug) DO NOTHING;

    -- Create relationships for articles
    -- Betano article -> Betano app
    IF app_betano IS NOT NULL THEN
        INSERT INTO article_apps (article_id, app_id)
        SELECT a.id, app_betano
        FROM articles a 
        WHERE a.slug = 'betano-super-odd-brasil-copa'
        ON CONFLICT DO NOTHING;
    END IF;
    
    -- Brasileirão article -> Flamengo and Palmeiras teams
    IF team_flamengo IS NOT NULL AND team_palmeiras IS NOT NULL THEN
        INSERT INTO article_teams (article_id, team_id)
        SELECT a.id, team_flamengo
        FROM articles a 
        WHERE a.slug = 'brasileirao-2025-palmeiras-flamengo-odds-titulo'
        ON CONFLICT DO NOTHING;
        
        INSERT INTO article_teams (article_id, team_id)
        SELECT a.id, team_palmeiras
        FROM articles a 
        WHERE a.slug = 'brasileirao-2025-palmeiras-flamengo-odds-titulo'
        ON CONFLICT DO NOTHING;
    END IF;
    
    -- Bet365 review -> Bet365 app
    IF app_bet365 IS NOT NULL THEN
        INSERT INTO article_apps (article_id, app_id)
        SELECT a.id, app_bet365
        FROM articles a 
        WHERE a.slug = 'review-bet365-confiavel-analise-2025'
        ON CONFLICT DO NOTHING;
    END IF;

END $$;