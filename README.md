# AppdeApostas.com.br - Portal de Notícias sobre Apostas Esportivas

<div align="center">

![AppdeApostas Logo](https://images.pexels.com/photos/7594435/pexels-photo-7594435.jpeg?auto=compress&cs=tinysrgb&w=200)

**Portal completo de notícias, análises e reviews sobre aplicativos de apostas esportivas no Brasil**

[![Next.js](https://img.shields.io/badge/Next.js-14.2.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green?style=flat-square&logo=supabase)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

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
- **Next.js 14.2.3** - React framework com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Lucide React** - Ícones modernos

### Backend
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Banco de dados relacional
- **Row Level Security** - Segurança nativa
- **Real-time** - Atualizações em tempo real

### Infraestrutura
- **Vercel** - Deploy e hospedagem
- **Cloudflare** - CDN e SSL
- **GitHub** - Versionamento e CI/CD

---

## 🚀 **Quick Start**

### Pré-requisitos
- [Node.js](https://nodejs.org/) 18.0+
- [Git](https://git-scm.com/)
- Conta no [Supabase](https://supabase.com/)

### 1. Clone o Repositório
```bash
git clone https://github.com/caio-bessa/appdeapostasportal.git
cd appdeapostasportal
```

### 2. Instale as Dependências
```bash
npm install
```

### 3. Configure o Ambiente
```bash
cp .env.example .env.local
# Edite .env.local com suas credenciais do Supabase
```

### 4. Configure o Supabase
1. Crie um novo projeto no [Supabase](https://supabase.com/)
2. Copie a URL e a chave anônima para o `.env.local`
3. Execute as migrações do banco de dados (veja seção Database)

### 5. Execute o Projeto
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver o resultado.

---

## 🗄️ **Database Schema**

O projeto usa Supabase com as seguintes tabelas:

### Categories
- `id` (uuid, primary key)
- `name` (text, unique)
- `slug` (text, unique)
- `description` (text)
- `featured` (boolean)

### Authors
- `id` (uuid, primary key)
- `name` (text)
- `slug` (text, unique)
- `bio` (text)
- `specialization` (text)
- `avatar_url` (text)
- `social_links` (jsonb)

### Teams
- `id` (uuid, primary key)
- `name` (text, unique)
- `slug` (text, unique)
- `city` (text)
- `state` (text)
- `league` (text)
- `logo_url` (text)
- `founded_year` (integer)

### Apps
- `id` (uuid, primary key)
- `name` (text, unique)
- `slug` (text, unique)
- `description` (text)
- `rating` (numeric)
- `pros` (text)
- `cons` (text)
- `bonus_info` (text)
- `minimum_deposit` (integer)
- `payment_methods` (text)
- `license_info` (text)
- `download_url` (text)
- `featured` (boolean)

### Articles
- `id` (uuid, primary key)
- `title` (text)
- `slug` (text, unique)
- `content` (text)
- `excerpt` (text)
- `seo_title` (text)
- `seo_description` (text)
- `featured_image_url` (text)
- `published_at` (timestamptz)
- `featured` (boolean)
- `category_id` (uuid, foreign key)
- `author_id` (uuid, foreign key)

---

## 📁 **Estrutura do Projeto**

```
appdeapostasportal/
├── 📁 src/
│   ├── 📁 app/                  # Páginas da aplicação (App Router)
│   │   ├── page.tsx             # Homepage
│   │   ├── apps/                # Seção de apps
│   │   ├── noticias/            # Seção de notícias
│   │   ├── analises/            # Seção de análises
│   │   └── layout.tsx           # Layout principal
│   ├── 📁 components/           # Componentes React
│   │   ├── Header.tsx           # Cabeçalho
│   │   ├── Footer.tsx           # Rodapé
│   │   └── ui/                  # Componentes de UI
│   ├── 📁 lib/                  # Utilities e configs
│   │   ├── supabase.ts          # Cliente Supabase
│   │   └── utils.ts             # Funções utilitárias
│   └── 📁 types/                # Definições TypeScript
├── 📁 docs/                     # Documentação
├── 📁 public/                   # Assets estáticos
├── package.json                 # Dependências
├── tailwind.config.js           # Configuração Tailwind
├── next.config.js               # Configuração Next.js
└── README.md                    # Este arquivo
```

---

## 🔧 **Comandos Disponíveis**

### Desenvolvimento
```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa ESLint
npm run type-check   # Verifica tipos TypeScript
```

### Database
```bash
# Conectar ao Supabase e executar migrações
# (Instruções detalhadas na seção Database)
```

---

## 🌐 **Deploy**

### Vercel (Recomendado)
1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push na branch main

### Outras Plataformas
- **Netlify**: Suporte nativo para Next.js
- **AWS Amplify**: Integração com AWS
- **Railway**: Deploy simples com banco incluído

---

## 🔐 **Variáveis de Ambiente**

Copie `.env.example` para `.env.local` e configure:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima

# Site
NEXT_PUBLIC_SITE_URL=https://appdeapostas.com.br
NEXT_PUBLIC_SITE_NAME=AppdeApostas Brasil

# Opcional
NEXT_PUBLIC_GA_ID=seu_google_analytics_id
CONTACT_EMAIL=contato@appdeapostas.com.br
```

---

## 📊 **Funcionalidades**

### ✅ Implementado
- [x] Homepage com apps em destaque
- [x] Seção de apps com filtros e comparação
- [x] Seção de notícias por categoria
- [x] Seção de análises especializadas
- [x] Design responsivo
- [x] SEO otimizado
- [x] Performance otimizada

### 🔄 Em Desenvolvimento
- [ ] Sistema de busca avançado
- [ ] Comentários em artigos
- [ ] Newsletter
- [ ] Painel administrativo
- [ ] Sistema de usuários

### 🎯 Roadmap
- [ ] Integração com APIs de odds
- [ ] Sistema de notificações
- [ ] App mobile (React Native)
- [ ] Dashboard de analytics

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