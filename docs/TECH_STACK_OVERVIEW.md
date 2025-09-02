# 📊 TECH STACK OVERVIEW - APPDEAPOSTAS.COM.BR

## 🏗️ ARQUITETURA ATUAL

### **Frontend Stack**
- **Framework**: Next.js 15.5.2 (App Router)
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS + Custom Components
- **Build**: Turbopack (experimental)
- **Deploy**: Docker + Standalone mode
- **Porta**: 3005 (dev) → 3000 (container)

### **Backend/CMS Stack**
- **CMS**: Strapi 4.x
- **Database**: PostgreSQL 15-alpine
- **Auth**: JWT + Admin JWT
- **API**: REST + GraphQL (auto-generated)
- **Uploads**: Local filesystem + S3 ready
- **Porta**: 1337 (Strapi admin)

### **Infrastructure Stack**
- **Server**: AWS EC2 (t3.medium, 200GB EBS)
- **IP**: 3.143.118.176
- **Proxy**: Nginx (Alpine)
- **SSL**: CloudFlare Origin + Auto SSL
- **CDN**: CloudFlare (Free Plan)
- **Container**: Docker + Docker Compose
- **Domain**: appdeapostas.com.br

### **Development Stack**
- **OS**: macOS (Darwin 23.6.0)
- **Node.js**: v20.11.0
- **Package Manager**: npm
- **Version Control**: Git (não inicializado)
- **Environment**: Local development + Production EC2

## 📋 CONTAINERS ATIVOS

| Container | Status | Porta | Função |
|-----------|---------|-------|--------|
| `appdeapostas-nginx` | ✅ ATIVO | 80,443 | Reverse Proxy + SSL |
| `appdeapostas-frontend` | ✅ ATIVO | 3005:3000 | Next.js App |
| `strapi-appdeapostas` | ✅ ATIVO | 1337 | CMS Backend |
| `strapiDB-appdeapostas` | ✅ ATIVO | 5433 | PostgreSQL DB |

## 🔧 CONFIGURAÇÕES ATUAIS

### **Docker Networks**
- `appdeapostas_app-network` (bridge)
- Comunicação interna entre containers

### **Volume Mounts**
```yaml
volumes:
  postgres_data:          # DB persistence
  strapi_uploads:         # Media uploads
```

### **Environment Variables**
```bash
# Production
NODE_ENV=production
DATABASE_CLIENT=postgres
JWT_SECRET=configured
ADMIN_JWT_SECRET=configured
PUBLIC_URL=https://appdeapostas.com.br

# Development  
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=https://appdeapostas.com.br
```

## 🗂️ ESTRUTURA DE ARQUIVOS

```
/Users/caiobessa/news-portal/
├── 📁 frontend/appdeapostas/     ← FRONTEND PRINCIPAL
│   ├── src/app/                  ← Next.js App Router
│   │   ├── page.tsx             ← Homepage ✅
│   │   ├── apps/page.tsx        ← Apps listing ✅
│   │   ├── bonus/page.tsx       ← Bonus page ✅
│   │   ├── analises/page.tsx    ← Analysis ✅
│   │   ├── tutoriais/page.tsx   ← Tutorials ✅
│   │   ├── odds/page.tsx        ← Live odds ✅
│   │   └── blog/page.tsx        ← Blog ✅
│   ├── src/lib/                 ← API Integration
│   │   ├── strapi.ts           ← Strapi client ✅
│   │   └── api/                ← API functions ✅
│   ├── src/components/         ← React components
│   ├── docker-compose.yml      ← Dev environment
│   └── Dockerfile.prod         ← Production build
├── 📁 cms/appdeapostas/        ← STRAPI CMS
│   ├── src/api/               ← Content types ✅
│   │   ├── article/           ← Articles CT ✅
│   │   ├── category/          ← Categories CT ✅
│   │   ├── author/            ← Authors CT ✅
│   │   ├── tag/               ← Tags CT ✅
│   │   └── app/               ← Apps CT ✅
│   ├── src/components/        ← Dynamic components ✅
│   └── docker-compose.yml     ← CMS environment
├── 📁 nginx/                  ← REVERSE PROXY
│   └── nginx.conf             ← Production config ✅
└── docker-compose.production.yml ← MAIN ORCHESTRATOR
```

## 🎯 CONTEÚDO IMPLEMENTADO

### **Strapi Content Types**
- ✅ **Articles** (title, slug, content, author, category, tags, SEO)
- ✅ **Categories** (name, slug, description, hierarchy, featured)
- ✅ **Authors** (name, bio, profile_image, social_links, expertise)
- ✅ **Tags** (name, slug, description, color)
- ✅ **Apps** (name, rating, features, pros/cons, screenshots, bonus)
- ✅ **Landing Pages** (dynamic zones, hero, CTA, FAQ)

### **Next.js Pages Criadas**
- ✅ **Homepage** (`/`) - Hero + Featured content
- ✅ **Apps** (`/apps`) - App listing with filters
- ✅ **Bonus** (`/bonus`) - Bonus comparison page
- ✅ **Análises** (`/analises`) - Reviews and analysis
- ✅ **Tutoriais** (`/tutoriais`) - Learning content
- ✅ **Odds** (`/odds`) - Live odds (coming soon)
- ✅ **Blog** (`/blog`) - News and articles

### **Dynamic Routes Implementadas**
- ✅ **Category pages** (`/categoria/[slug]`) - Category listings
- ✅ **Author pages** (`/autor/[slug]`) - Author profiles  
- ✅ **Article pages** (`/noticias/[category]/[slug]`) - Full articles
- ✅ **Tag pages** (`/tag/[slug]`) - Tagged content
- ✅ **App detail pages** (`/apps/[slug]`) - Individual app reviews

## 🟡 STATUS ATUAL: PARCIALMENTE FUNCIONAL

### **✅ RESOLVIDO: Containers Inicializados**
- ✅ Frontend container rodando na porta 3005:3000
- ✅ Strapi container rodando na porta 1337  
- ✅ PostgreSQL container rodando na porta 5433:5432
- ✅ Todas as páginas funcionando localmente

### **⚠️ PRODUÇÃO: Requer Atualização**
- ✅ Homepage funciona: https://appdeapostas.com.br/
- ❌ Páginas internas retornam 404 (container antigo)
- ✅ CloudFlare SSL funcionando corretamente
- ✅ Infrastructure sólida, precisa apenas deploy atualizado

## ✅ COMPONENTES FUNCIONAIS

### **Infraestrutura**
- ✅ **DNS**: appdeapostas.com.br → CloudFlare
- ✅ **CloudFlare**: Proxy + SSL termination
- ✅ **EC2**: Servidor rodando + acessível
- ✅ **Nginx**: Reverse proxy configurado
- ✅ **Docker**: Engine funcionando

### **Código**
- ✅ **Frontend**: Build local funciona perfeitamente
- ✅ **Content Types**: Todos os schemas Strapi criados
- ✅ **API Integration**: Client Strapi implementado
- ✅ **Styling**: Tailwind + componentes customizados
- ✅ **SEO**: Meta tags + Open Graph implementados

## 🎯 OBJETIVO FINAL

**Site 100% funcional com:**
- Homepage profissional ✅
- 6+ páginas internas funcionais ✅ (LOCAL) / ⚠️ (PRODUÇÃO - precisa deploy)
- CMS Strapi funcional para gestão de conteúdo ✅ (LOCAL) / ⚠️ (PRODUÇÃO)
- Admin Strapi acessível ✅ (LOCAL) / ⚠️ (PRODUÇÃO)
- Todas as rotas dinâmicas funcionando ✅ (LOCAL) / ⚠️ (PRODUÇÃO)
- SSL seguro ✅ (CloudFlare SSL funcionando corretamente)

**Status Atual**: 90% implementado - LOCAL 100% funcional, PRODUÇÃO precisa apenas de deploy atualizado