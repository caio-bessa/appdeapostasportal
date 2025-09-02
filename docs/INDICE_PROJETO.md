# Índice do Projeto AppdeApostas.com.br

**Localização:** `/Users/caiobessa/Desktop/appdeapostas-complete/`  
**Última atualização:** 2 de setembro de 2025  
**Status:** 📋 Organização Completa

---

## 📑 DOCUMENTAÇÃO PRINCIPAL

### 1. Contexto e Visão Geral
- **[APPDEAPOSTAS_PROJECT_CONTEXT.md](./APPDEAPOSTAS_PROJECT_CONTEXT.md)**
  - 📋 Contexto completo do projeto (v2.0)
  - 🛠️ Tech stack atual e recomendada
  - 🌐 URLs e endpoints
  - 🚨 Problemas críticos identificados
  - 📊 Content types necessários
  - 🎯 Plano de ação prioritário

### 2. Requisitos do Produto
- **[PRD_APPDEAPOSTAS_v2.md](./PRD_APPDEAPOSTAS_v2.md)**
  - 🎯 Visão e objetivos de negócio
  - 👥 Personas e público-alvo
  - 🚀 Funcionalidades principais
  - 📊 Métricas e KPIs
  - 📅 Roadmap e timeline
  - 💰 Business model

---

## 🔐 INFORMAÇÕES SENSÍVEIS

### 3. Credenciais e Tokens
- **[CREDENCIAIS_SEGURAS.md](./CREDENCIAIS_SEGURAS.md)** ⚠️ **CONFIDENCIAL**
  - 🔐 Credenciais Strapi Admin
  - 🔑 Tokens API (Strapi, Cloudflare)
  - 🖥️ Acesso SSH ao servidor AWS
  - 🐳 Docker Registry credentials
  - 🔒 Configurações de segurança

---

## 🛠️ ANÁLISE TÉCNICA

### 4. Stack Técnica Recomendada
- **[STACK_TECNICA_RECOMENDADA.md](./STACK_TECNICA_RECOMENDADA.md)**
  - 🚀 Python + LangGraph Framework
  - ⚡ FastAPI wrapper para backend
  - 🗄️ Estratégias de banco de dados
  - ☁️ Arquitetura serverless
  - 🤖 Modelos AI recomendados
  - 🔧 DevOps e CI/CD
  - 💰 Análise de custos

---

## 📈 EVOLUÇÃO DO PROJETO

### 5. Registro de Desenvolvimento
- **[EVOLUCAO_DESENVOLVIMENTO_02-09-2025.md](./EVOLUCAO_DESENVOLVIMENTO_02-09-2025.md)**
  - 📋 Atividades realizadas nesta sessão
  - 🎯 Principais melhorias implementadas
  - 🔍 Diagnóstico atual do projeto
  - 📊 Status dos componentes
  - ✅ Checklist de conclusão

---

## 📚 DOCUMENTAÇÃO EXISTENTE

### 6. Documentos Anteriores
- **[README.md](./README.md)**
  - 📖 Documentação básica do projeto
  - 🚀 Instruções de setup
  - 📋 Informações gerais

- **[STRUCTURE_SUMMARY.md](./STRUCTURE_SUMMARY.md)**
  - 📁 Resumo da estrutura de pastas
  - 🏗️ Organização dos componentes
  - 📝 Convenções adotadas

- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)**
  - 🛠️ Guia de implementação
  - 📋 Passos de desenvolvimento
  - 🔧 Configurações necessárias

---

## ⚙️ CONFIGURAÇÕES

### 7. Arquivos de Configuração
- **[docker-compose.yml](./docker-compose.yml)**
  - 🐳 Configuração Docker para desenvolvimento
  - 📋 Serviços: frontend, backend, database, nginx

- **[docker-compose.production.yml](./docker-compose.production.yml)**
  - 🚀 Configuração Docker para produção
  - 📦 Otimizações de performance
  - 🔒 Configurações de segurança

- **[env.example](./env.example)**
  - 🔑 Exemplo de variáveis de ambiente
  - 📋 Configurações necessárias
  - 🛡️ Variáveis de segurança

---

## 📁 ESTRUTURA DE PASTAS

### 8. Organização dos Arquivos
```
/Users/caiobessa/Desktop/appdeapostas-complete/
├── 📋 DOCUMENTAÇÃO PRINCIPAL
│   ├── APPDEAPOSTAS_PROJECT_CONTEXT.md
│   ├── PRD_APPDEAPOSTAS_v2.md
│   ├── CREDENCIAIS_SEGURAS.md
│   ├── STACK_TECNICA_RECOMENDADA.md
│   └── EVOLUCAO_DESENVOLVIMENTO_02-09-2025.md
│
├── 📚 DOCUMENTAÇÃO EXISTENTE
│   ├── README.md
│   ├── STRUCTURE_SUMMARY.md
│   └── IMPLEMENTATION_GUIDE.md
│
├── ⚙️ CONFIGURAÇÕES
│   ├── docker-compose.yml
│   ├── docker-compose.production.yml
│   └── env.example
│
├── 🖥️ ESTRUTURAS DE CÓDIGO
│   ├── backend/          # Configurações backend
│   ├── frontend/         # Estruturas frontend
│   ├── cms/             # Configurações CMS
│   ├── nginx/           # Configurações web server
│   └── scripts/         # Scripts de automação
│
└── 📊 DADOS E DOCUMENTOS
    ├── data/            # Dados de exemplo
    ├── docs/            # Documentação adicional
    └── docker/          # Dockerfiles específicos
```

---

## 🚦 STATUS ATUAL

### Componentes Funcionais ✅
- **Infraestrutura**: AWS EC2 + Docker + Cloudflare
- **Admin Strapi**: Login e interface funcionando
- **Página /apps**: Única página frontend funcional
- **SSL/CDN**: Cloudflare configurado corretamente

### Problemas Críticos ❌
- **Homepage**: Timeout constante
- **APIs**: Todas retornando 404
- **Content Types**: Não existem no Strapi
- **Integração**: Zero conectividade frontend-backend

### Próximas Prioridades 🎯
1. **Criar Content Types** no Strapi
2. **Corrigir homepage** e páginas 404
3. **Estabelecer integração** frontend-backend
4. **Popular CMS** com dados de exemplo

---

## 🔍 COMO USAR ESTA DOCUMENTAÇÃO

### Para Desenvolvedores
1. **Comece com**: `APPDEAPOSTAS_PROJECT_CONTEXT.md` para entender o projeto
2. **Consulte**: `CREDENCIAIS_SEGURAS.md` para acessos (cuidado com segurança)
3. **Implemente**: Siga `IMPLEMENTATION_GUIDE.md` para mudanças
4. **Documente**: Atualize `EVOLUCAO_DESENVOLVIMENTO_*.md` após mudanças

### Para Product Managers
1. **Visão geral**: `PRD_APPDEAPOSTAS_v2.md` tem requisitos completos
2. **Status atual**: `EVOLUCAO_DESENVOLVIMENTO_02-09-2025.md` tem último update
3. **Roadmap**: `STACK_TECNICA_RECOMENDADA.md` tem plano de evolução

### Para Stakeholders
1. **Contexto**: `APPDEAPOSTAS_PROJECT_CONTEXT.md` explica situação atual
2. **Objetivos**: `PRD_APPDEAPOSTAS_v2.md` define metas e métricas
3. **Progresso**: `EVOLUCAO_DESENVOLVIMENTO_*.md` mostra avanços

---

## 📞 CONTATOS E SUPORTE

### Acesso ao Servidor
- **SSH**: `ssh -i ~/.ssh/aws-keys/acroud-brasil-server.pem ec2-user@3.143.118.176`
- **Admin Strapi**: https://appdeapostas.com.br/admin
- **Portal**: https://appdeapostas.com.br

### Ferramentas de Debug
- **Logs Strapi**: `docker logs appdeapostas-strapi --tail 50`
- **Status Containers**: `docker ps`
- **Testes**: `npx playwright test --ui`

---

## ⚠️ IMPORTANTE

### Segurança
- **Nunca committar** o arquivo `CREDENCIAIS_SEGURAS.md`
- **Sempre usar SSH keys** para acesso ao servidor
- **Rotacionar tokens** periodicamente

### Backup
- **Documentação**: Esta pasta é o backup principal
- **Código**: Servidor tem código mais atualizado
- **Banco**: Fazer backup regular do PostgreSQL

### Versionamento
- **Documentos**: Sempre atualizar data de modificação
- **Evolução**: Criar novo arquivo para cada sessão significativa
- **PRD**: Incrementar versão a cada update maior

---

**📝 Este índice deve ser atualizado sempre que novos documentos forem criados ou modificados.**

---

*Índice mantido por: Claude Code Assistant*  
*Projeto: AppdeApostas.com.br Portal de Notícias*  
*Última sincronização: 2 de setembro de 2025*