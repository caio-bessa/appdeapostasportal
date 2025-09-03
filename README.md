# 🏆 AppdeApostas Portal - Setup Nativo

<div align="center">

![AppdeApostas Logo](https://images.pexels.com/photos/7594435/pexels-photo-7594435.jpeg?auto=compress&cs=tinysrgb&w=200)

**Portal completo de notícias, análises e reviews sobre aplicativos de apostas esportivas no Brasil**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Strapi](https://img.shields.io/badge/Strapi-4.25.9-blue?style=flat-square&logo=strapi)](https://strapi.io/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3+-blue?style=flat-square&logo=sqlite)](https://sqlite.org/)

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
- **React 18** - Biblioteca de UI

### Backend
- **Strapi 4.25.9** - Headless CMS
- **SQLite** - Database para desenvolvimento
- **PostgreSQL** - Database para produção (opcional)
- **Node.js 18+** - Runtime JavaScript

### Infraestrutura
- **Setup Nativo** - Sem containerização
- **PM2** - Gerenciador de processos
- **AWS EC2** - Hospedagem em produção
- **Cloudflare** - CDN e SSL
- **GitHub** - Versionamento e CI/CD

---

## 🚀 **Setup Rápido (15 minutos)**

### Pré-requisitos
- [Node.js 18+](https://nodejs.org/) (recomendado: 18.19.1)
- [npm 8+](https://npmjs.com/)
- [Git](https://git-scm.com/)

### 1. Clone o Repositório
```bash
git clone https://github.com/caio-bessa/appdeapostasportal.git
cd appdeapostasportal
```

### 2. Backend Strapi
```bash
cd backend
npm install
npm run develop
```
**Strapi Admin**: http://localhost:1337/admin

### 3. Frontend Next.js (nova janela de terminal)
```bash
cd frontend/appdeapostas  
npm install
npm run dev
```
**Frontend**: http://localhost:3005

### 4. Configurar Strapi Admin
1. Acesse [http://localhost:1337/admin](http://localhost:1337/admin)
2. Crie o primeiro usuário administrador
3. Configure permissões para APIs públicas

### 5. URLs do Projeto
- **Frontend:** [http://localhost:3005](http://localhost:3005)
- **Admin Strapi:** [http://localhost:1337/admin](http://localhost:1337/admin)
- **API:** [http://localhost:1337/api](http://localhost:1337/api)

---

## 📁 **Estrutura do Projeto**

```
appdeapostasportal/
├── 📁 frontend/appdeapostas/     # Frontend Next.js
│   ├── src/app/                 # App Router (Next.js 15)
│   ├── src/components/          # Componentes React
│   ├── src/lib/                 # Utilities e configs
│   └── package.json             # Dependências frontend
├── 📁 backend/                  # Backend Strapi
│   ├── src/api/                 # Content types e APIs
│   │   ├── category/            # Categorias
│   │   ├── article/             # Artigos
│   │   ├── author/              # Autores
│   │   ├── team/                # Times
│   │   └── tag/                 # Tags
│   ├── config/                  # Configurações Strapi
│   ├── .tmp/                    # SQLite database
│   └── package.json             # Dependências backend
├── deploy.sh                    # Script de deploy
├── ecosystem.config.js          # Configuração PM2
├── DEPLOY_GUIDE.md              # Guia de deploy
└── .env.production              # Variáveis produção
```

---

## 💻 **Comandos de Desenvolvimento**

### Backend (Strapi)
```bash
# Desenvolvimento com auto-reload
cd backend && npm run develop

# Produção
cd backend && npm run start

# Build do admin
cd backend && npm run build

# Dados de exemplo
cd backend && npm run seed
```

### Frontend (Next.js)
```bash
# Desenvolvimento
cd frontend/appdeapostas && npm run dev

# Build para produção
cd frontend/appdeapostas && npm run build

# Servidor de produção
cd frontend/appdeapostas && npm run start

# Linting
cd frontend/appdeapostas && npm run lint
```

---

## 🌐 **Deploy**

## 🔧 **Configuração**

### Variáveis de Ambiente

**Backend (.env)**:
```env
NODE_ENV=development
HOST=0.0.0.0
PORT=1337
API_TOKEN_SALT=your-token-salt
ADMIN_JWT_SECRET=your-admin-secret
JWT_SECRET=your-jwt-secret
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

**Frontend (.env.local)**:
```env
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3005
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

## 🔧 **Scripts Disponíveis**

### Backend
- `npm run develop` - Desenvolvimento com auto-reload
- `npm run start` - Produção
- `npm run build` - Build do admin
- `npm run seed` - Dados de exemplo

### Frontend  
- `npm run dev` - Desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Servidor de produção
- `npm run lint` - Linting

### Testes
```bash
# Testar API do Strapi
curl http://localhost:1337/api/categories

# Testar admin
curl http://localhost:1337/admin/init

# Testar frontend
curl http://localhost:3005
```

---

## 🚀 **Deploy em Produção**

### Desenvolvimento Local
```bash
# Start backend
cd backend && npm run develop

# Start frontend (nova janela)
cd frontend/appdeapostas && npm run dev
```

### Deploy Servidor VPS
```bash
# Build e deploy automatizado
./deploy.sh

# Ou com PM2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

### Deploy Cloud (Alternativo)
- **Frontend** → Vercel
- **Backend** → Railway/Render/AWS App Runner

---

## 📊 **Monitoramento**

### Health Checks
- **Frontend:** `http://localhost:3005`
- **Backend:** `http://localhost:1337/admin/init`
- **Admin:** `http://localhost:1337/admin`

### Logs
```bash
# PM2 logs
pm2 logs

# Logs específicos
pm2 logs appdeapostas-backend
pm2 logs appdeapostas-frontend

# Status dos processos
pm2 status
```

### Troubleshooting
```bash
# Verificar portas
netstat -tulpn | grep -E '(1337|3005)'

# Reiniciar PM2
pm2 restart all

# Monitorar recursos
pm2 monit
```

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