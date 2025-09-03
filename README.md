# AppdeApostas.com.br - Portal de Notícias sobre Apostas Esportivas

<div align="center">

![AppdeApostas Logo](https://images.pexels.com/photos/7594435/pexels-photo-7594435.jpeg?auto=compress&cs=tinysrgb&w=200)

**Portal completo de notícias, análises e reviews sobre aplicativos de apostas esportivas no Brasil**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Strapi](https://img.shields.io/badge/Strapi-4.25.9-blue?style=flat-square&logo=strapi)](https://strapi.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker)](https://docker.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-336791?style=flat-square&logo=postgresql)](https://postgresql.org/)

[🚀 Demo](https://appdeapostas.com.br) • [📖 Docs](./docs/) • [🐛 Issues](https://github.com/caio-bessa/appdeapostasportal/issues)

</div>

---

## 🎯 **Sobre o Projeto**

O **AppdeApostas.com.br** é um portal completo dedicado ao universo das apostas esportivas no Brasil, oferecendo:

- 📰 **Notícias** - Últimas novidades do mercado de apostas
- 📱 **Reviews de Apps** - Análises detalhadas dos melhores aplicativos
- 📊 **Análises** - Insights sobre odds, estatísticas e tendências
- 🎓 **Tutoriais** - Guias para iniciantes e estratégias avançadas
- 💰 **Promoções** - Melhores bônus e ofertas disponíveis

---

## 🏗️ **Arquitetura**

### Frontend
- **Next.js 15.5.2** - React framework com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Axios** - Cliente HTTP para APIs

### Backend
- **Strapi 4.25.9** - Headless CMS
- **PostgreSQL 14** - Banco de dados relacional
- **Node.js 20** - Runtime JavaScript

### Infraestrutura
- **Docker & Docker Compose** - Containerização
- **Nginx** - Proxy reverso e load balancer
- **AWS EC2** - Hospedagem em produção
- **Cloudflare** - CDN e SSL

---

## 🚀 **Quick Start**

### Pré-requisitos
- [Docker](https://docker.com/) 20.10+
- [Docker Compose](https://docs.docker.com/compose/) 2.0+
- [Git](https://git-scm.com/)

### 1. Clone o Repositório
```bash
git clone https://github.com/caio-bessa/appdeapostasportal.git
cd appdeapostasportal
```

### 2. Setup Automático
```bash
./scripts/setup.sh
```

Este script irá:
- ✅ Verificar dependências
- ✅ Criar arquivo `.env` com secrets seguros
- ✅ Inicializar containers Docker
- ✅ Configurar banco de dados
- ✅ Verificar health dos serviços

### 3. Configurar Strapi Admin
1. Acesse [http://localhost:1337/admin](http://localhost:1337/admin)
2. Crie o primeiro usuário administrador
3. Configure permissões para APIs públicas

### 4. Acessar Aplicação
- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Admin Strapi:** [http://localhost:1337/admin](http://localhost:1337/admin)
- **API:** [http://localhost:1337/api](http://localhost:1337/api)

---

## 📁 **Estrutura do Projeto**

```
appdeapostasportal/
├── 📁 frontend/appdeapostas/     # Frontend Next.js
│   ├── src/app/                 # Páginas da aplicação
│   ├── src/components/          # Componentes React
│   ├── src/lib/                 # Utilities e configs
│   └── Dockerfile.*             # Containers Docker
├── 📁 backend/                  # Backend Strapi
│   ├── src/api/                 # Content types e APIs
│   ├── config/                  # Configurações Strapi
│   └── Dockerfile.*             # Containers Docker
├── 📁 nginx/                    # Configurações proxy
├── 📁 scripts/                  # Scripts de automação
├── 📁 docs/                     # Documentação técnica
├── docker-compose.yml           # Desenvolvimento
├── docker-compose.production.yml # Produção
└── .env.example                 # Template variáveis
```

---

## 🐳 **Comandos Docker**

### Desenvolvimento
```bash
# Iniciar ambiente de desenvolvimento
docker compose up -d

# Ver logs em tempo real
docker compose logs -f

# Parar containers
docker compose down

# Rebuild completo
docker compose up --build -d
```

### Produção
```bash
# Deploy para produção
./scripts/deploy.sh

# Monitorar produção
docker compose -f docker-compose.production.yml logs -f

# Health check
curl http://localhost/health
```

---

## 🔧 **Configuração**

### Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```bash
# URLs principais
NEXT_PUBLIC_SITE_URL=https://appdeapostas.com.br
NEXT_PUBLIC_STRAPI_URL=https://appdeapostas.com.br/api

# Database
DATABASE_NAME=appdeapostas
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password

# Strapi Secrets (gerados automaticamente)
JWT_SECRET=your_jwt_secret
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
```

### Content Types Strapi

O projeto inclui os seguintes content types pré-configurados:

- **📂 Categories** - Categorias de conteúdo
- **📰 Articles** - Artigos e notícias  
- **👤 Authors** - Autores do conteúdo
- **🏆 Teams** - Times esportivos
- **📱 Apps** - Aplicativos de apostas
- **🏷️ Tags** - Tags para organização

---

## 🧪 **Testes**

### Testes Automatizados
```bash
# Frontend (Jest + Testing Library)
cd frontend/appdeapostas && npm test

# E2E com Playwright
npm run test:e2e

# Testes de API
npm run test:api
```

### Testes Manuais
```bash
# Verificar saúde dos serviços
curl http://localhost/health

# Testar API do Strapi
curl http://localhost:1337/api/articles

# Testar frontend
curl http://localhost:3000
```

---

## 🚀 **Deploy**

### Deploy Automático (AWS EC2)

1. Configure as variáveis de ambiente de produção:
```bash
cp .env.example .env.production
# Edite .env.production com configurações de produção
```

2. Execute o deploy:
```bash
./scripts/deploy.sh
```

### Deploy Manual

1. Build das imagens:
```bash
docker compose -f docker-compose.production.yml build
```

2. Iniciar em produção:
```bash
docker compose -f docker-compose.production.yml up -d
```

---

## 📊 **Monitoramento**

### Health Checks
- **Application:** `http://localhost/health`
- **Database:** Verificação automática via Docker
- **Strapi:** `http://localhost:1337/admin`

### Logs
```bash
# Todos os serviços
docker compose logs -f

# Serviço específico
docker compose logs -f strapi
docker compose logs -f frontend
```

### Métricas
- Container resource usage: `docker stats`
- Application performance: Integração com ferramentas APM

---

## 🤝 **Contribuindo**

1. Fork o projeto
2. Crie uma branch para sua feature: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -am 'Adicionar nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

### Guidelines
- Use conventional commits
- Adicione testes para novas funcionalidades
- Mantenha documentação atualizada
- Siga os padrões ESLint/Prettier

---

## 📝 **License**

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 👥 **Time**

- **Caio Bessa** - *Desenvolvedor Principal* - [@caio-bessa](https://github.com/caio-bessa)

---

## 📞 **Suporte**

- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/caio-bessa/appdeapostasportal/issues)
- 💬 **Discussões:** [GitHub Discussions](https://github.com/caio-bessa/appdeapostasportal/discussions)
- 📧 **Email:** caio.bessa@acroud.media

---

<div align="center">

**Feito com ❤️ para a comunidade brasileira de apostas esportivas**

⭐ **Se este projeto te ajudou, considere dar uma estrela!** ⭐

</div>