# PRD - AppdeApostas.com.br Portal de Notícias

**Product Requirements Document**  
**Versão:** 2.0  
**Data:** 2 de setembro de 2025  
**Status:** Em Desenvolvimento - Fase Crítica

---

## 📋 VISÃO GERAL DO PRODUTO

### Missão
Criar o principal portal brasileiro de notícias, análises e reviews sobre aplicativos de apostas esportivas, fornecendo informações confiáveis e atualizadas para apostadores brasileiros.

### Visão
Ser a referência #1 no Brasil para informações sobre apostas esportivas e aplicativos de apostas, combinando jornalismo esportivo de qualidade com tecnologia de IA para análises avançadas.

### Objetivos de Negócio
1. **Tráfego**: 100k visitantes únicos/mês em 6 meses
2. **Engajamento**: Tempo médio de sessão >3 minutos
3. **Conversão**: 5% dos visitantes clicam em links de apps
4. **Autoridade**: Top 3 no Google para "apps de apostas brasil"
5. **Receita**: Monetização via afiliação e publicidade

---

## 🎯 PÚBLICO-ALVO

### Persona Primária: "João Apostador" (60% do público)
- **Demografia**: Homem, 25-35 anos, classe B/C
- **Localização**: Grandes centros urbanos (SP, RJ, MG, RS)
- **Comportamento**: Aposta regularmente em futebol, busca informações antes de apostar
- **Dispositivos**: 70% mobile, 30% desktop
- **Interesses**: Futebol brasileiro, Libertadores, Champions League
- **Pain Points**: Dificuldade em escolher apps confiáveis, falta de análises imparciais

### Persona Secundária: "Maria Curiosa" (25% do público)
- **Demografia**: Mulher, 28-40 anos, classe B
- **Comportamento**: Iniciante em apostas, busca informações educativas
- **Interesses**: Reality shows, apostas casuais, segurança
- **Necessidades**: Guias didáticos, apps com depósito baixo

### Persona Terciária: "Carlos Expert" (15% do público)
- **Demografia**: Homem, 30-45 anos, classe A/B
- **Comportamento**: Apostador experiente, busca análises avançadas
- **Interesses**: Odds, estratégias, múltiplos esportes
- **Necessidades**: Comparações detalhadas, estatísticas

---

## 🚀 FUNCIONALIDADES PRINCIPAIS

### MVP - Versão 1.0 (Próximas 4 semanas)

#### Portal de Notícias ⭐⭐⭐
```typescript
// Funcionalidades core
interface NewsPortal {
  homepage: string;           // Feed principal de notícias
  categories: Category[];     // Futebol, Basquete, Reviews, etc.
  articles: Article[];       // Notícias completas com conteúdo
  search: SearchFunction;    // Busca por título, categoria, tags
  navigation: Navigation;    // Menu responsivo, breadcrumbs
}
```

#### Sistema de Reviews de Apps ⭐⭐⭐
```typescript
interface AppReviews {
  appList: App[];           // Lista completa de apps
  detailedReview: Review;   // Review completo com prós/contras
  comparison: Comparison;   // Comparação entre apps
  ratings: Rating;         // Sistema de avaliação 1-5 estrelas
  filters: Filter[];       // Por bônus, depósito mínimo, etc.
}
```

#### Content Management System ⭐⭐⭐
```typescript
interface CMS {
  contentTypes: ['articles', 'apps', 'authors', 'categories'];
  adminPanel: StrapiAdmin;  // Interface para editores
  apiEndpoints: RestAPI;    // APIs para frontend
  mediaLibrary: FileSystem; // Gestão de imagens
  workflow: Editorial;      // Processo de publicação
}
```

### Versão 1.5 (2-3 meses)

#### Funcionalidades IA ⭐⭐
```python
# Análise automática com LangGraph
def ai_features():
    return {
        'article_analysis': 'Extração automática de insights',
        'auto_tagging': 'Tags automáticas baseadas no conteúdo',
        'content_recommendations': 'Sugestão de artigos relacionados',
        'trend_detection': 'Identificação de tendências no setor'
    }
```

#### Sistema de Usuários ⭐
- Cadastro/login opcional
- Favoritos e bookmarks
- Newsletter personalizada
- Comentários em artigos

### Versão 2.0 (6 meses)

#### Portal Avançado ⭐⭐
- Sistema de busca avançado com IA
- Comparador de odds em tempo real
- Alertas personalizados
- Análises preditivas

---

## 🛠️ ESPECIFICAÇÕES TÉCNICAS

### Arquitetura Atual
```
Frontend: Next.js 15.5.2 (App Router) + TypeScript + Tailwind
Backend:  Strapi v5.23.1 (Node.js) + PostgreSQL
Deploy:   Docker + AWS EC2 + Cloudflare CDN
```

### Arquitetura Target (Roadmap)
```
AI Layer:    Python + LangGraph + FastAPI
Frontend:    Next.js (mantido)
Database:    PostgreSQL + pgvector (AI search)
Vector DB:   Pinecone/Milvus (para recomendações)
Storage:     R2 Cloudflare (arquivos estáticos)
Monitoring:  Sentry + Analytics personalizado
```

### Performance Requirements
- **Load Time**: < 2s para homepage
- **Mobile Performance**: Lighthouse score > 85
- **API Response**: < 500ms para queries simples
- **Uptime**: 99.5% disponibilidade
- **SEO**: Core Web Vitals "Good" em todas as páginas

---

## 📊 MÉTRICAS E KPIs

### Métricas de Produto
1. **Traffic Metrics**
   - Visitantes únicos mensais
   - Page views por sessão
   - Bounce rate < 60%
   - Session duration > 3 min

2. **Engagement Metrics**
   - Click-through rate em apps (target: 5%)
   - Social shares por artigo
   - Newsletter signup rate
   - Return visitor rate > 30%

3. **Content Metrics**
   - Artigos publicados por semana (target: 15)
   - Apps reviewed por mês (target: 10)
   - Search ranking para keywords principais
   - Organic traffic growth rate > 20% mensal

### Métricas Técnicas
1. **Performance**
   - Core Web Vitals scores
   - API response times
   - Error rates < 1%
   - Mobile usability score

2. **Business**
   - Affiliate conversion rate
   - Cost per acquisition
   - Lifetime value dos usuários
   - Revenue per visitor

---

## 🎨 DESIGN E UX REQUIREMENTS

### Design System
- **Paleta**: Azul primary (#1E40AF), Verde accent (#10B981), Cinzas neutros
- **Typography**: Inter (headings), Open Sans (body)
- **Componentes**: Design consistente entre páginas
- **Responsividade**: Mobile-first approach

### User Experience
```typescript
interface UXPrinciples {
  navigation: 'Máximo 3 cliques para qualquer conteúdo';
  loading: 'Loading states em todas as interações';
  feedback: 'Feedback visual imediato para ações';
  accessibility: 'WCAG 2.1 AA compliance';
  performance: 'Perceived performance < 1s';
}
```

### Mobile Experience (70% do tráfego)
- Menu hamburger intuitivo
- Cards otimizados para touch
- Swipe gestures para navegação
- PWA features (futuro)

---

## 🔄 JORNADA DO USUÁRIO

### Jornada Principal: "Descobrir App Confiável"
1. **Entrada**: Google search "melhores apps apostas 2025"
2. **Landing**: Homepage com artigos em destaque
3. **Navegação**: Click em "Reviews de Apps"
4. **Comparação**: Visualizar tabela comparativa
5. **Decisão**: Ler review detalhado do app escolhido
6. **Ação**: Click no link de download/cadastro
7. **Follow-up**: Newsletter com dicas de apostas

### Jornada Secundária: "Acompanhar Notícias"
1. **Entrada**: Bookmark ou busca direta
2. **Browse**: Homepage com últimas notícias
3. **Leitura**: Artigo completo sobre regulamentação
4. **Engajamento**: Share nas redes sociais
5. **Retenção**: Signup para newsletter
6. **Return**: Visitas regulares para novas notícias

---

## 📋 CONTENT STRATEGY

### Tipos de Conteúdo
1. **Notícias** (60% do conteúdo)
   - Regulamentação de apostas no Brasil
   - Novos lançamentos de apps
   - Parcerias entre apps e times
   - Mudanças na legislação

2. **Reviews** (25% do conteúdo)
   - Reviews completos de apps
   - Comparações entre plataformas
   - Guias de uso
   - Análises de bônus

3. **Conteúdo Educativo** (15% do conteúdo)
   - Como apostar responsavelmente
   - Glossário de apostas
   - Estratégias básicas
   - Gestão de banca

### Calendar Editorial
- **Segunda**: Notícias da semana anterior
- **Terça**: Review de app ou comparativo
- **Quarta**: Análise de jogos/competições
- **Quinta**: Conteúdo educativo
- **Sexta**: Resumo semanal + newsletter
- **Sábado**: Conteúdo sobre jogos do final de semana
- **Domingo**: Planejamento da próxima semana

---

## 🚨 PROBLEMAS CRÍTICOS ATUAIS

### Issues Bloqueadores (Resolver em 2 semanas)
1. **Content Types Ausentes** 
   - Strapi não reconhece schemas criados
   - APIs retornando 404 para todos os endpoints
   - Admin panel sem content types disponíveis

2. **Frontend Quebrado**
   - Homepage com timeout constante
   - 6 de 7 páginas retornando 404
   - Navegação completamente não funcional

3. **Integração API Falhando**
   - Zero conectividade entre Next.js e Strapi
   - Sem error handling implementado
   - Loading states não funcionais

### Workaround Temporário
- Usar página /apps (única funcional) como modelo
- Implementar content types manualmente no Strapi
- Criar dados de exemplo para testes

---

## 🎯 DEFINITION OF DONE

### Para Funcionalidades
- [ ] Desenvolvido e testado localmente
- [ ] Testes Playwright passando
- [ ] Performance Lighthouse > 80
- [ ] Responsivo (mobile + desktop)
- [ ] SEO meta tags implementadas
- [ ] Documentação atualizada
- [ ] Deploy em produção funcionando
- [ ] Monitoramento configurado

### Para Releases
- [ ] Todas as user stories concluídas
- [ ] Bug críticos resolvidos
- [ ] Performance targets atingidos
- [ ] Security review aprovado
- [ ] Stakeholder approval
- [ ] Rollback plan preparado

---

## 📅 ROADMAP E TIMELINE

### Fase 0 - Correções Críticas (2 semanas)
**Sprint 1 (Semana 1)**
- [x] Organização da documentação
- [ ] Criação dos content types no Strapi
- [ ] Correção da homepage (resolver timeout)
- [ ] Implementação das páginas 404

**Sprint 2 (Semana 2)**
- [ ] Integração das APIs funcionais
- [ ] População do CMS com dados de exemplo
- [ ] Testes end-to-end com Playwright
- [ ] Deploy e validação em produção

### Fase 1 - MVP Launch (4 semanas)
**Sprint 3-4**
- [ ] Sistema de navegação completo
- [ ] SEO e meta tags dinâmicas
- [ ] Sistema de busca básico
- [ ] 20 artigos de exemplo
- [ ] 10 reviews de apps

### Fase 2 - Growth Features (8 semanas)
- [ ] Newsletter signup
- [ ] Social media integration
- [ ] Analytics dashboard
- [ ] Performance optimization
- [ ] Content automation

### Fase 3 - AI Integration (12 semanas)
- [ ] LangGraph implementation
- [ ] Automated content tagging
- [ ] Recommendation engine
- [ ] Trend analysis
- [ ] Predictive insights

---

## 💰 BUSINESS MODEL

### Revenue Streams
1. **Affiliate Marketing** (70% da receita esperada)
   - Comissão por cadastros em apps de apostas
   - CPA: R$ 50-200 por conversão
   - Target: 100 conversões/mês

2. **Display Advertising** (20% da receita)
   - Google AdSense
   - Direct sponsorships
   - Native advertising

3. **Premium Content** (10% da receita - futuro)
   - Análises premium
   - Alertas personalizados
   - Estatísticas avançadas

### Business Metrics
- **CAC** (Customer Acquisition Cost): < R$ 10
- **LTV** (Lifetime Value): R$ 50
- **Monthly Recurring Revenue**: R$ 15k (target 12 meses)
- **Conversion Rate**: 5% de visitantes → affiliate clicks

---

## 🔒 COMPLIANCE E LEGAL

### Regulamentação Brasileira
- **Lei 14.790/23**: Apostas esportivas regulamentadas
- **Tributação**: Informar sobre impostos em ganhos
- **Publicidade**: Seguir diretrizes do setor
- **Proteção de Dados**: LGPD compliance

### Content Guidelines
- Promover apostas responsáveis
- Alertas sobre vício em jogos
- Informações claras sobre riscos
- Não promover apostas para menores

### Technical Compliance
- **LGPD**: Privacy policy e cookie consent
- **Accessibility**: WCAG 2.1 AA
- **Security**: HTTPS, data encryption
- **Performance**: Core Web Vitals

---

**🎯 SUCESSO = Portal funcional + 1000 visitantes diários + 50 conversões/mês em 3 meses**

---

*Product Requirements Document*  
*Produto: AppdeApostas.com.br Portal*  
*Versão: 2.0 - Atualizada com status atual*  
*Owner: Acroud Brasil Team*