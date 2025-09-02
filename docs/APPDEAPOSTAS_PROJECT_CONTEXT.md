# AppdeApostas.com.br - Contexto Completo do Projeto

**Última atualização:** 2 de setembro de 2025  
**Versão do documento:** 1.0  
**Status do projeto:** Em desenvolvimento (problemas críticos identificados)

---

## 📋 OVERVIEW GERAL DO PROJETO

### Descrição
Portal de notícias e análises sobre aplicativos de apostas esportivas no Brasil, com foco em reviews, notícias do setor, análises de times e competições esportivas.

### Objetivos do Portal
- **Primário**: Portal de notícias sobre apostas esportivas e apps de apostas
- **Secundário**: Reviews detalhados de aplicativos de apostas
- **Terciário**: Conteúdo sobre times, competições e análises esportivas
- **Público-alvo**: Apostadores brasileiros, fãs de esportes, usuários de apps de apostas

---

## 🛠️ TECH STACK COMPLETO

### Frontend
- **Framework**: Next.js 15.5.2 (App Router)
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS
- **Bibliotecas**: React 18.x
- **Build Tool**: Turbopack (Next.js 15)
- **Deployment**: Docker container

### Backend/CMS
- **CMS**: Strapi v5.23.1 (Enterprise Edition)
- **API**: REST API (Content API)
- **Admin**: Strapi Admin Panel
- **Linguagem**: Node.js 20.19.4
- **Runtime**: Alpine Linux container

### Banco de Dados
- **SGBD**: PostgreSQL 14-alpine
- **Schema**: public
- **Database**: appdeapostas
- **Conexão**: Via container network

### Infraestrutura
- **Servidor**: AWS EC2 (t3.medium)
  - IP: 3.143.118.176
  - AMI: Amazon Linux 2
  - Instance ID: i-0278265f91b913d99
- **Containerização**: Docker + Docker Compose
- **Web Server**: Nginx (alpine)
- **SSL**: Cloudflare (proxy)
- **CDN**: Cloudflare
- **Domínio**: appdeapostas.com.br

### DevOps & Deploy
- **Orquestração**: Docker Compose (production.yml)
- **Containers ativos**:
  - `appdeapostas-frontend` (Next.js)
  - `appdeapostas-strapi` (CMS)
  - `appdeapostas-postgres` (Database)
  - `appdeapostas-nginx` (Proxy)

---

## 📁 ESTRUTURA DE PASTAS DO PROJETO

### Servidor (AWS EC2)
```
/home/ec2-user/appdeapostas/
├── docker-compose.production.yml     # Orquestração dos containers
├── cms/
│   └── appdeapostas/                 # Projeto Strapi
│       ├── package.json              # Dependências (v5.23.1)
│       ├── src/
│       │   ├── api/                  # Content types (problemático)
│       │   ├── admin/                # Configurações do admin
│       │   └── extensions/
│       ├── config/                   # Configurações do Strapi
│       ├── database/                 # Arquivos de banco
│       ├── public/                   # Assets públicos
│       └── Dockerfile.prod          # Build para produção
├── frontend/
│   └── appdeapostas/                # Projeto Next.js
│       ├── package.json             # Dependências Next.js 15.5.2
│       ├── src/
│       │   └── app/                 # App Router (Next.js 15)
│       │       ├── layout.tsx       # Layout raiz
│       │       ├── page.tsx         # Homepage
│       │       ├── apps/            # Página de apps (FUNCIONAL)
│       │       └── noticias/        # Rotas de notícias (PROBLEMAS)
│       ├── components/              # Componentes React
│       ├── public/                  # Assets estáticos
│       └── Dockerfile              # Build para produção
└── nginx/
    └── nginx.conf                   # Configuração do proxy reverso
```

### Local (Desenvolvimento)
```
/Users/caiobessa/news-portal/
├── APPDEAPOSTAS_PROJECT_CONTEXT.md  # Este documento
├── COMPREHENSIVE_DIAGNOSTIC_REPORT.md
├── IMPLEMENTATION_GUIDE.md
├── strapi-bulk-import-script.js     # Script de importação de dados
├── create-content-types.js          # Script para criar content types
├── screenshots/                     # Screenshots do diagnóstico
└── tests/                          # Testes Playwright
```

---

## 🔐 CREDENCIAIS E TOKENS

### Strapi Admin
- **URL**: https://appdeapostas.com.br/admin
- **Email**: caio.bessa@acroud.media
- **Senha**: gIhmyj-dymtyp-gitqe0
- **Status**: ✅ Login funcionando

### API Token (Strapi)
```
5da051f16391ca01d8f0d9072a972299bf0d66677cef07bb2f67efb1134137f791ad6bc07b9474534b1551f6bf265e6bbc64cc638210e49f379204d92da05fd216dad0e67b74f4f6748446428431b33a35b83ae47869eb06056be88b309a9f93cac977cbaef8d0bc05067be44d1641ab452e3a499be89fd2d8c605d493567a4f
```
- **Tipo**: Full Access
- **Duração**: Unlimited
- **Status**: ✅ Token válido

### SSH Access (EC2)
- **Chave**: ~/.ssh/aws-keys/acroud-brasil-server.pem
- **Comando**: `ssh -i ~/.ssh/aws-keys/acroud-brasil-server.pem ec2-user@3.143.118.176`
- **Status**: ✅ Acesso funcionando

---

## 🌐 URLs E ENDPOINTS

### Principais URLs
- **Portal**: https://appdeapostas.com.br
- **Admin CMS**: https://appdeapostas.com.br/admin
- **API Base**: https://appdeapostas.com.br/api

### Páginas do Frontend (Status Atual)
- `/` - Homepage - ❌ **TIMEOUT** (não carrega)
- `/apps` - Apps de Apostas - ✅ **FUNCIONAL** 
- `/noticias` - Lista de Notícias - ❌ **404**
- `/noticias/[category]` - Categoria - ❌ **404**
- `/noticias/[category]/[slug]` - Artigo - ❌ **404**
- `/sobre` - Sobre - ❌ **404**
- `/contato` - Contato - ❌ **404**

### APIs do Strapi (Status Atual)
- `/api/categories` - ❌ **404 Not Found**
- `/api/articles` - ❌ **404 Not Found**
- `/api/authors` - ❌ **404 Not Found**
- `/api/teams` - ❌ **404 Not Found**
- `/api/apps` - ❌ **404 Not Found**
- `/api/tags` - ❌ **404 Not Found**
- `/admin/init` - ✅ **200 OK** (sistema)

---

## 📊 CONTENT TYPES NECESSÁRIOS

### 1. Categories (Categorias)
```typescript
interface Category {
  id: number
  name: string           // "Futebol", "Basquete", "Reviews"
  slug: string          // "futebol", "basquete", "reviews"
  description?: string  // Descrição da categoria
  seo_title?: string    // Título SEO
  seo_description?: string // Descrição SEO
  featured: boolean     // Categoria em destaque
  articles?: Article[]  // Relação com artigos
}
```

### 2. Articles (Artigos/Notícias)
```typescript
interface Article {
  id: number
  title: string                    // Título do artigo
  slug: string                    // URL-friendly
  content: string                 // Conteúdo rich text
  excerpt?: string                // Resumo
  seo_title?: string             // Título SEO
  seo_description?: string       // Descrição SEO
  featured_image_url?: string    // URL da imagem
  published_at: Date             // Data de publicação
  featured: boolean              // Artigo em destaque
  categories: Category[]         // Relação com categorias
  author: Author                 // Relação com autor
  related_apps?: App[]          // Apps relacionados
  related_teams?: Team[]        // Times relacionados
}
```

### 3. Authors (Autores)
```typescript
interface Author {
  id: number
  name: string              // Nome do autor
  slug: string             // URL-friendly
  bio?: string             // Biografia
  specialization?: string  // Especialização
  avatar_url?: string     // URL do avatar
  social_links?: object   // Redes sociais (JSON)
  articles?: Article[]    // Relação com artigos
}
```

### 4. Teams (Times)
```typescript
interface Team {
  id: number
  name: string            // Nome do time
  slug: string           // URL-friendly
  city?: string          // Cidade
  state?: string         // Estado
  league?: string        // Liga/campeonato
  logo_url?: string     // URL do logo
  founded_year?: number // Ano de fundação
  articles?: Article[]  // Artigos relacionados
}
```

### 5. Apps (Aplicativos de Apostas)
```typescript
interface App {
  id: number
  name: string                // Nome do app
  slug: string               // URL-friendly
  description?: string       // Descrição
  rating?: number           // Avaliação (1-5)
  pros?: string             // Pontos positivos
  cons?: string             // Pontos negativos
  bonus_info?: string       // Informações de bônus
  minimum_deposit?: number  // Depósito mínimo
  payment_methods?: string  // Métodos de pagamento
  license_info?: string     // Informações de licença
  download_url?: string     // URL de download
  featured: boolean         // App em destaque
  articles?: Article[]      // Artigos relacionados
}
```

---

## 📈 HISTÓRICO DO PROCESSO DE DESENVOLVIMENTO

### Fase 1: Setup Inicial (Agosto 2025)
- ✅ Criação da infraestrutura AWS (EC2, networking)
- ✅ Setup do domínio appdeapostas.com.br
- ✅ Configuração de SSL via Cloudflare
- ✅ Dockerização da aplicação

### Fase 2: Desenvolvimento Frontend (Setembro 2025)
- ✅ Setup do Next.js 15.5.2 com App Router
- ✅ Implementação da página /apps (funcional)
- ❌ Implementação incompleta das outras páginas
- ❌ Problemas de roteamento e navegação

### Fase 3: Setup do Backend (Setembro 2025)
- ✅ Instalação do Strapi v5.23.1
- ✅ Configuração do banco PostgreSQL
- ✅ Setup do admin panel (login funcional)
- ❌ Content types não foram criados/reconhecidos
- ❌ APIs não funcionais

### Fase 4: Integração e Debug (Setembro 2025)
- ❌ Integração frontend-backend falhou
- ✅ Diagnóstico completo com Playwright realizado
- ✅ Identificação das causas raiz
- ⏳ Correções pendentes

---

## 🚨 PROBLEMAS CRÍTICOS IDENTIFICADOS (DIAGNÓSTICO 02/09/2025)

### 1. Frontend Issues
**Problema**: 6 de 7 páginas retornam 404 ou timeout
- **Homepage (/)**: Timeout completo, não carrega
- **Páginas de notícias**: 404 Not Found
- **Navegação**: Inexistente ou quebrada
- **SEO**: Títulos genéricos "Create Next App"
- **JavaScript**: Erro React #418 detectado

### 2. Backend Issues  
**Problema**: Todos os content types ausentes/não funcionais
- **Content Types**: Não existem no Strapi (admin vazio)
- **APIs**: Todas retornam 404 Not Found
- **Banco**: Tabelas de content types não criadas
- **Permissões**: Plugin Users & Permissions com erro 503

### 3. Integração Issues
**Problema**: Zero conectividade entre frontend e backend
- **API Calls**: Frontend tenta chamar APIs inexistentes
- **Data Flow**: Nenhum fluxo de dados funcionando
- **Error Handling**: Sem tratamento de erros
- **Loading States**: Estados de loading não implementados

### 4. Infrastructure Issues
**Problema**: Configurações incompletas
- **Strapi Mode**: Em produção (impede edição via admin)
- **Content Types**: Arquivos existem no servidor mas não são reconhecidos
- **Database**: Conectividade OK mas estrutura incompleta
- **Nginx**: Proxy funcionando, mas rotas do app problemáticas

---

## 🎯 PLANO DE AÇÃO PRIORITÁRIO

### Fase 1 - Correções Críticas (URGENTE - 1-2 semanas)
1. **Criar Content Types no Strapi**
   - Categories, Articles, Authors, Teams, Apps
   - Configurar campos e relações
   - Testar criação via admin panel

2. **Corrigir Rotas do Next.js**
   - Implementar páginas faltantes
   - Corrigir roteamento dinâmico
   - Implementar error boundaries

3. **Estabelecer Integração API**
   - Conectar frontend às APIs do Strapi
   - Implementar error handling
   - Configurar loading states

4. **Configurar Permissões**
   - Habilitar acesso público às APIs
   - Configurar Users & Permissions plugin
   - Testar endpoints

### Fase 2 - Funcionalidades Core (2-3 semanas)
1. **Popular CMS com Dados**
   - Criar conteúdo de exemplo
   - Importar dados via script
   - Testar fluxo completo

2. **Implementar Navegação**
   - Header e footer globais
   - Menu de navegação
   - Breadcrumbs

3. **SEO e Performance**
   - Meta tags dinâmicas
   - Open Graph tags
   - Otimização de imagens

### Fase 3 - Melhorias e Otimização (3-4 semanas)
1. **Funcionalidades Avançadas**
   - Sistema de busca
   - Filtros por categoria
   - Paginação

2. **UX/UI Improvements**
   - Design responsivo
   - Loading skeletons
   - Error pages customizadas

3. **Performance & Monitoring**
   - Caching strategies
   - Performance monitoring
   - Error tracking

---

## 📋 CHECKLIST DE VERIFICAÇÃO

### Backend (Strapi)
- [ ] Content types criados e funcionais
- [ ] APIs retornando dados (não 404)
- [ ] Permissões configuradas corretamente
- [ ] Admin panel totalmente funcional
- [ ] Dados de exemplo populados

### Frontend (Next.js)
- [ ] Todas as páginas carregando (não 404)
- [ ] Navegação funcionando
- [ ] Integração com APIs estabelecida
- [ ] SEO meta tags implementadas
- [ ] Error handling implementado

### Integração
- [ ] Frontend consumindo APIs corretamente
- [ ] Fluxo de dados end-to-end funcionando
- [ ] Error handling robusto
- [ ] Performance aceitável (< 3s loading)

### Infrastructure
- [ ] Containers saudáveis
- [ ] SSL funcionando
- [ ] Domínio resolvendo corretamente
- [ ] Backup e monitoring configurados

---

## 🔧 FERRAMENTAS DE DEBUG E MONITORAMENTO

### Playwright Scripts
- `comprehensive-diagnosis.js` - Diagnóstico completo automatizado
- `test-strapi-admin.js` - Teste específico do admin Strapi
- `portal-analysis.spec.js` - Suite de testes do portal

### Comandos Úteis
```bash
# Verificar status dos containers
ssh -i ~/.ssh/aws-keys/acroud-brasil-server.pem ec2-user@3.143.118.176 'docker ps'

# Logs do Strapi
ssh -i ~/.ssh/aws-keys/acroud-brasil-server.pem ec2-user@3.143.118.176 'docker logs appdeapostas-strapi --tail 50'

# Testar APIs
curl -H "Authorization: Bearer [API_TOKEN]" "https://appdeapostas.com.br/api/categories"

# Executar diagnóstico
node comprehensive-diagnosis.js
```

### URLs de Monitoramento
- Admin: https://appdeapostas.com.br/admin
- API Status: https://appdeapostas.com.br/api/categories
- Frontend: https://appdeapostas.com.br

---

## 📞 CONTATOS E RECURSOS

### Documentação Técnica
- **Next.js 15**: https://nextjs.org/docs/app
- **Strapi v5**: https://docs.strapi.io/
- **PostgreSQL**: https://www.postgresql.org/docs/
- **Docker Compose**: https://docs.docker.com/compose/

### Repositórios e Assets
- **Servidor**: 3.143.118.176:/home/ec2-user/appdeapostas
- **Local**: /Users/caiobessa/news-portal/
- **Screenshots**: /Users/caiobessa/news-portal/screenshots/

---

**🎯 OBJETIVO FINAL**: Transformar o portal em uma plataforma totalmente funcional para notícias sobre apostas esportivas, com CMS robusto e experiência de usuário otimizada.

**⏰ PRAZO ESTIMADO**: 5-6 semanas de desenvolvimento full-time para resolução completa de todos os problemas identificados.

**📊 PRIORIDADE MÁXIMA**: Resolver problemas críticos de integração frontend-backend para estabelecer funcionalidade básica do portal.

---

*Documento mantido por: Claude Code Assistant*  
*Projeto: AppdeApostas.com.br Portal de Notícias*  
*Cliente: Acroud Brasil*