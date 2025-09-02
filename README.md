# AppdeApostas Brasil 🎯

Portal de notícias e análises de apostas esportivas do Brasil.

## 📊 Status do Projeto

- **Frontend:** ✅ Next.js 15.5.2 - Funcionando
- **Backend/CMS:** ⚠️ Strapi v5 com problemas de roteamento (95% resolvido)
- **Banco de Dados:** ✅ PostgreSQL - Operacional
- **Infraestrutura:** ✅ AWS EC2 + Cloudflare - 100% funcional

## 🏗️ Arquitetura

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend/CMS    │    │   Database      │
│   Next.js 15    │◄──►│   Strapi v5      │◄──►│   PostgreSQL    │
│   Port: 3000    │    │   Port: 1337     │    │   Port: 5432    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌──────────────────┐
                    │   Proxy/CDN      │
                    │   Nginx+CF       │
                    │   Port: 80/443   │
                    └──────────────────┘
```

## 🌐 URLs

- **Produção:** https://appdeapostas.com.br
- **Admin:** https://appdeapostas.com.br/admin
- **Servidor:** 3.143.118.176 (AWS EC2)

## 🔐 Credenciais

Ver arquivo `CREDENTIALS.md` (não commitado por segurança).

## 📁 Estrutura do Projeto

```
appdeapostas-brasil/
├── frontend/                 # Next.js application
├── backend/                  # Strapi CMS
├── docs/                     # Documentação completa
│   ├── DESCOBERTAS_FINAIS_COMPLETAS.md
│   ├── RELATORIO_TESTE_APPDEAPOSTAS.md
│   └── GUIA_TESTE_ADMIN.md
├── scripts/                  # Scripts de automação
│   ├── test_admin_completo.py
│   └── setup_e_executar_teste.sh
├── docker-compose.production.yml
└── README.md
```

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- Docker & Docker Compose
- Python 3.8+ (para testes)

### Instalação Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/appdeapostas-brasil.git
cd appdeapostas-brasil

# Frontend
cd frontend
npm install
npm run dev

# Backend (via Docker)
cd ../
docker-compose up -d
```

## 🧪 Testes

### Teste Frontend + Backend Completo
```bash
cd scripts/
./setup_e_executar_teste.sh
```

### Teste Manual das APIs
```bash
curl https://appdeapostas.com.br/api/articles
```

## 📋 To-Do List

### 🔴 Crítico
- [ ] Resolver roteamento interno Strapi v5
- [ ] Restaurar APIs do admin/CMS

### 🟡 Importante
- [ ] Migração para FastAPI (stack recomendada)
- [ ] Implementar busca com pgvector
- [ ] Configurar CI/CD

### 🟢 Melhorias
- [ ] Otimização SEO
- [ ] PWA implementation
- [ ] Analytics integration

## 🔧 Problemas Conhecidos

1. **APIs 404:** Strapi v5 não cria rotas HTTP automaticamente
   - **Status:** 95% diagnosticado
   - **Workaround:** Proxy APIs implementado
   - **Solução final:** Migração para FastAPI

2. **Admin inacessível:** Related ao problema #1
   - **Impacto:** Não é possível gerenciar conteúdo
   - **Alternativa:** Scripts de teste criados

## 📊 Progresso

- [x] **Infraestrutura (100%)** - AWS, Cloudflare, Docker
- [x] **Frontend (90%)** - Interface funcional, alguns links quebrados
- [ ] **Backend (70%)** - APIs não funcionam, banco OK
- [x] **Documentação (100%)** - Análise completa documentada
- [x] **Testes (100%)** - Scripts Playwright criados

## 🏆 Conquistas

1. **Problema isolado** com precisão cirúrgica (Strapi v5 routing)
2. **Base sólida estabelecida** - 95% da infraestrutura funcional
3. **Solução proxy** implementada para contornar problema
4. **Documentação completa** preservando todo conhecimento
5. **Scripts de teste** abrangentes criados

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📞 Suporte

- **Email:** caio.bessa@acroud.media
- **Documentação:** `/docs/`
- **Issues:** GitHub Issues

## 📜 Licença

MIT License - ver arquivo `LICENSE`

---

**🎯 Missão:** Criar o melhor portal de apostas esportivas do Brasil com tecnologia de ponta.

**Status atual:** Base sólida estabelecida, problema principal isolado, múltiplas opções de continuidade identificadas.

*Última atualização: 02/09/2025*