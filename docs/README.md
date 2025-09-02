# AppdeApostas.com.br - Portal de Notícias sobre Apostas Esportivas

## 📋 Visão Geral do Projeto

Portal de notícias e análises sobre aplicativos de apostas esportivas no Brasil, com foco em reviews, notícias do setor, análises de times e competições esportivas.

### 🎯 Objetivos

- **Primário**: Portal de notícias sobre apostas esportivas e apps de apostas
- **Secundário**: Reviews detalhados de aplicativos de apostas
- **Terciário**: Conteúdo sobre times, competições e análises esportivas
- **Público-alvo**: Apostadores brasileiros, fãs de esportes, usuários de apps de apostas

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.5.2 (App Router)
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS
- **Bibliotecas**: React 18.x
- **Build Tool**: Turbopack (Next.js 15)

### Backend/CMS

- **CMS**: Strapi v5.23.1 (Enterprise Edition)
- **API**: REST API (Content API)
- **Admin**: Strapi Admin Panel
- **Linguagem**: Node.js 20.19.4

### Banco de Dados

- **SGBD**: PostgreSQL 14-alpine
- **Schema**: public
- **Database**: appdeapostas

### Infraestrutura

- **Servidor**: AWS EC2 (t3.medium)
- **Containerização**: Docker + Docker Compose
- **Web Server**: Nginx
- **SSL**: Cloudflare (proxy)
- **CDN**: Cloudflare
- **Domínio**: appdeapostas.com.br

## 📁 Estrutura do Projeto

```
appdeapostas-complete/
├── frontend/                 # Aplicação Next.js
├── backend/                  # API Strapi
├── cms/                     # Configurações do CMS
├── nginx/                   # Configuração do proxy reverso
├── docker/                  # Arquivos Docker
├── scripts/                 # Scripts de automação
├── docs/                    # Documentação
└── data/                    # Dados de exemplo
```

## 🚀 Quick Start

### Pré-requisitos

- Docker e Docker Compose
- Node.js 18+
- PostgreSQL (ou usar container)

### 1. Clone e Setup

```bash
git clone [repository-url]
cd appdeapostas-complete
```

### 2. Configuração do Ambiente

```bash
cp .env.example .env
# Editar variáveis de ambiente
```

### 3. Deploy com Docker

```bash
docker-compose up -d
```

### 4. Acessar Aplicação

- **Frontend**: http://localhost:3000
- **Admin Strapi**: http://localhost:1337/admin
- **API**: http://localhost:1337/api

## 🔐 Credenciais

### Strapi Admin

- **Email**: caio.bessa@acroud.media
- **Senha**: [verificar arquivo .env]

### API Token

- **Token**: [verificar arquivo .env]

## 📊 Status do Projeto

### ✅ Funcional

- Infraestrutura AWS configurada
- Docker containers funcionando
- Página /apps operacional
- Admin Strapi acessível

### ❌ Problemas Identificados

- Content types não criados
- APIs retornando 404
- Rotas do frontend com problemas
- Integração frontend-backend quebrada

## 🎯 Próximos Passos

### Fase 1 - Correções Críticas (1-2 semanas)

1. Criar content types no Strapi
2. Corrigir rotas do Next.js
3. Estabelecer integração API
4. Configurar permissões

### Fase 2 - Funcionalidades Core (2-3 semanas)

1. Popular CMS com dados
2. Implementar navegação
3. SEO e performance

### Fase 3 - Melhorias (3-4 semanas)

1. Funcionalidades avançadas
2. UX/UI improvements
3. Performance & monitoring

## 📞 Contato

- **Desenvolvedor**: Caio Bessa
- **Email**: caio.bessa@acroud.media
- **Empresa**: Acroud Brasil

## 📄 Licença

Proprietário - Acroud Brasil
