# 🗺️ ROADMAP DE IMPLEMENTAÇÃO - APPDEAPOSTAS.COM.BR

## 🎯 OBJETIVO: SITE 100% FUNCIONAL EM PRODUÇÃO

### **Meta**: Tornar appdeapostas.com.br completamente funcional com todas as páginas criadas servidas corretamente, CMS operacional e admin acessível.

---

## 📋 FASE 1: CORREÇÃO IMEDIATA (ALTA PRIORIDADE)
**⏱️ Tempo Estimado: 30-45 minutos**
**🎯 Objetivo: Containers rodando e site básico funcional**

### 1.1 Inicializar Container Frontend ⚡ URGENTE
```bash
cd /Users/caiobessa/news-portal/frontend/appdeapostas
docker-compose up -d
```
**Expected Result**: Container `appdeapostas-frontend` rodando na porta 3005:3000

### 1.2 Inicializar Container Strapi ⚡ URGENTE  
```bash
cd /Users/caiobessa/news-portal/cms/appdeapostas
docker-compose up -d
```
**Expected Result**: Container `strapi-appdeapostas` rodando na porta 1337

### 1.3 Verificar Network Connectivity
```bash
# Verificar se containers estão na mesma rede
docker network ls
docker network inspect appdeapostas_app-network

# Conectar containers à rede se necessário
docker network connect appdeapostas_app-network appdeapostas-frontend
docker network connect appdeapostas_app-network strapi-appdeapostas
```

### 1.4 Testar Funcionalidade Local
```bash
# Frontend local
curl -I http://localhost:3005/
curl -I http://localhost:3005/apps
curl -I http://localhost:3005/bonus

# Strapi local
curl -I http://localhost:1337/admin
curl -I http://localhost:1337/api/articles
```

### 1.5 Verificar Logs e Debug
```bash
# Monitorar logs em tempo real
docker logs appdeapostas-frontend -f
docker logs strapi-appdeapostas -f
docker logs appdeapostas-nginx -f
```

**✅ DELIVERABLE FASE 1**: Site local 100% funcional, todas as páginas servindo corretamente

---

## 🔧 FASE 2: CONFIGURAÇÃO DOCKER PRODUÇÃO (ALTA PRIORIDADE)
**⏱️ Tempo Estimado: 45-60 minutos**
**🎯 Objetivo: Deploy correto no servidor EC2**

### 2.1 Corrigir docker-compose.production.yml
**Verificar e corrigir**:
- [ ] Paths dos contextos estão corretos
- [ ] Environment variables configuradas
- [ ] Volumes persistentes para Strapi uploads
- [ ] Network configuration
- [ ] Health checks

### 2.2 Build e Deploy para EC2
```bash
# Build images
docker-compose -f docker-compose.production.yml build --no-cache

# Deploy to EC2 (se script deploy-to-ec2.sh existir)
./deploy-to-ec2.sh

# OU deploy manual via SSH
ssh -i key.pem ec2-user@3.143.118.176 "cd /path/to/project && docker-compose -f docker-compose.production.yml up -d"
```

### 2.3 Verificar Deploy no Servidor
```bash
# Testar acesso direto ao EC2
curl -I http://3.143.118.176/apps
curl -I http://3.143.118.176/bonus

# Testar via CloudFlare
curl -I https://appdeapostas.com.br/apps
curl -I https://appdeapostas.com.br/bonus
```

### 2.4 Configurar Variáveis de Ambiente Produção
**No EC2, configurar:**
```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_STRAPI_URL=https://appdeapostas.com.br/api
STRAPI_API_TOKEN=<token_produção>
DATABASE_URL=postgresql://postgres:password@postgres:5432/appdeapostas
JWT_SECRET=<secret_produção>
ADMIN_JWT_SECRET=<admin_secret_produção>
```

**✅ DELIVERABLE FASE 2**: Site em produção 100% funcional via https://appdeapostas.com.br

---

## 🎨 FASE 3: CONFIGURAÇÃO STRAPI ADMIN (MÉDIA PRIORIDADE)
**⏱️ Tempo Estimado: 30-45 minutos**
**🎯 Objetivo: CMS operacional com admin acessível**

### 3.1 Acessar Strapi Admin
```bash
# Local
http://localhost:1337/admin

# Produção
https://appdeapostas.com.br/admin
```

### 3.2 Criar Usuário Admin Inicial
- Email: admin@appdeapostas.com.br
- Password: [senha segura]
- Role: Super Admin

### 3.3 Configurar Content Types
**Verificar se todos os content types estão ativos:**
- [ ] Articles
- [ ] Categories  
- [ ] Authors
- [ ] Tags
- [ ] Apps
- [ ] Landing Pages

### 3.4 Popular Dados de Exemplo
**Criar conteúdo inicial:**
- [ ] 3-5 categorias (Futebol, Basquete, Tênis, etc.)
- [ ] 2-3 autores de exemplo
- [ ] 5-10 apps de apostas
- [ ] 10-15 artigos de exemplo
- [ ] Tags relevantes

### 3.5 Configurar API Tokens
```bash
# No Strapi Admin -> Settings -> API Tokens
# Criar token "Frontend" com permissions read-only
# Atualizar STRAPI_API_TOKEN no frontend
```

**✅ DELIVERABLE FASE 3**: CMS 100% operacional com conteúdo de exemplo

---

## 🔐 FASE 4: SSL E SEGURANÇA (MÉDIA PRIORIDADE)
**⏱️ Tempo Estimado: 30-45 minutos**
**🎯 Objetivo: SSL seguro e configurações de segurança otimizadas**

### 4.1 Configurar SSL Adequado no EC2
```bash
# Remover certificado auto-assinado
sudo rm -f /etc/nginx/ssl/server.crt /etc/nginx/ssl/server.key

# Instalar CloudFlare Origin Certificate
# (será fornecido pelo CloudFlare dashboard)
sudo nginx -t && sudo systemctl reload nginx
```

### 4.2 Otimizar Configurações Nginx
**Corrigir warnings e otimizar:**
- [ ] Remover `http2` de `listen` directives
- [ ] Configurar buffer adequado para Strapi
- [ ] Implementar cache para assets estáticos
- [ ] Headers de segurança (CSP, HSTS, etc.)

### 4.3 Configurar Firewall e Rate Limiting
```bash
# No EC2, configurar iptables/ufw
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw deny 1337/tcp  # Bloquear acesso direto ao Strapi

# Rate limiting no nginx (já configurado)
```

**✅ DELIVERABLE FASE 4**: Site seguro com SSL válido e proteções ativas

---

## 📊 FASE 5: MONITORAMENTO E OTIMIZAÇÃO (BAIXA PRIORIDADE)
**⏱️ Tempo Estimado: 45-60 minutos**
**🎯 Objetivo: Site otimizado e monitorado**

### 5.1 Implementar Health Checks
```yaml
# docker-compose.production.yml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/"]
  interval: 30s
  timeout: 10s
  retries: 3
```

### 5.2 Configurar Logs Estruturados
```bash
# Configurar logrotate para Docker
# Implementar logging para nginx, strapi e frontend
# Configurar alertas básicos
```

### 5.3 Otimizar Performance
- [ ] Implementar cache Redis (opcional)
- [ ] Otimizar queries Strapi
- [ ] Configurar CDN para uploads
- [ ] Implementar compressão Gzip/Brotli

### 5.4 Backup Strategy
```bash
# Configurar backup automático PostgreSQL
# Backup dos uploads Strapi
# Backup das configurações Docker
```

**✅ DELIVERABLE FASE 5**: Site otimizado, monitorado e com backup

---

## 📋 FASE 6: DOCUMENTAÇÃO E HANDOFF (BAIXA PRIORIDADE)
**⏱️ Tempo Estimado: 30-45 minutos**
**🎯 Objetivo: Documentação completa para manutenção**

### 6.1 Atualizar Documentação
- [ ] Atualizar TECH_STACK_OVERVIEW.md ✅
- [ ] Atualizar SITE_STRUCTURE_ANALYSIS.md
- [ ] Criar DEPLOYMENT_GUIDE.md
- [ ] Criar STRAPI_ADMIN_GUIDE.md

### 6.2 Criar Runbooks
- [ ] Procedimento de deploy
- [ ] Troubleshooting guide
- [ ] Backup & recovery procedures
- [ ] Emergency contacts

### 6.3 Testar Disaster Recovery
- [ ] Simular falha de container
- [ ] Testar restore de backup
- [ ] Verificar procedimentos de rollback

**✅ DELIVERABLE FASE 6**: Documentação completa e procedimentos testados

---

## ⚡ QUICK WINS - COMANDOS PRIORITÁRIOS

### **🚀 START HERE - COMANDOS ESSENCIAIS:**

```bash
# 1. Verificar status atual
docker ps -a | grep appdeapostas

# 2. Inicializar frontend (URGENTE)
cd /Users/caiobessa/news-portal/frontend/appdeapostas
docker-compose up -d

# 3. Inicializar Strapi (URGENTE)  
cd /Users/caiobessa/news-portal/cms/appdeapostas
docker-compose up -d

# 4. Verificar funcionamento
curl -I http://localhost:3005/apps
curl -I http://localhost:1337/admin

# 5. Deploy se local funcionar
cd /Users/caiobessa/news-portal
docker-compose -f docker-compose.production.yml up -d

# 6. Testar produção
curl -I https://appdeapostas.com.br/apps
```

---

## 🎯 SUCCESS METRICS

### **Funcionalidade Básica** ✅
- [ ] Homepage carrega (https://appdeapostas.com.br)
- [ ] Página Apps funciona (https://appdeapostas.com.br/apps)
- [ ] Página Bonus funciona (https://appdeapostas.com.br/bonus)
- [ ] Página Análises funciona (https://appdeapostas.com.br/analises)
- [ ] Página Tutoriais funciona (https://appdeapostas.com.br/tutoriais)
- [ ] Página Odds funciona (https://appdeapostas.com.br/odds)
- [ ] Página Blog funciona (https://appdeapostas.com.br/blog)

### **CMS Funcional** ✅
- [ ] Admin acessível (https://appdeapostas.com.br/admin)
- [ ] Login funciona
- [ ] Content types visíveis
- [ ] API endpoints respondem (/api/articles, /api/categories)

### **Performance & Segurança** ✅  
- [ ] SSL válido (não auto-assinado)
- [ ] Tempo de carregamento < 3s
- [ ] Headers de segurança configurados
- [ ] Logs funcionais

---

## 🚨 TROUBLESHOOTING RÁPIDO

### **Se containers não subirem:**
```bash
# Verificar portas em uso
sudo lsof -i :3005
sudo lsof -i :1337

# Matar processos conflitantes
sudo kill -9 <PID>

# Verificar logs de erro
docker-compose logs
```

### **Se site retornar 404:**
```bash
# Verificar se nginx consegue resolver DNS
docker exec appdeapostas-nginx nslookup appdeapostas-frontend

# Reiniciar nginx
docker restart appdeapostas-nginx
```

### **Se Strapi não inicializar:**
```bash
# Verificar se PostgreSQL está rodando
docker logs strapiDB-appdeapostas

# Recriar banco se necessário
docker-compose down
docker volume rm appdeapostas_postgres_data
docker-compose up -d
```

---

## ⏰ TIMELINE REALISTA

| Fase | Duração | Dependências | Criticidade |
|------|---------|--------------|-------------|
| Fase 1 | 30-45min | Nenhuma | 🔴 CRÍTICA |
| Fase 2 | 45-60min | Fase 1 | 🔴 CRÍTICA |
| Fase 3 | 30-45min | Fase 2 | 🟡 ALTA |
| Fase 4 | 30-45min | Fase 2 | 🟡 MÉDIA |
| Fase 5 | 45-60min | Fase 3,4 | 🟢 BAIXA |
| Fase 6 | 30-45min | Todas | 🟢 BAIXA |

**⏱️ TOTAL ESTIMADO: 3-5 horas para site 100% funcional**

---

## ✅ FINAL DELIVERABLE

**Site appdeapostas.com.br 100% funcional com:**
- ✅ Todas as páginas servidas corretamente
- ✅ CMS Strapi operacional e acessível
- ✅ SSL seguro via CloudFlare
- ✅ Performance otimizada
- ✅ Monitoramento básico implementado
- ✅ Documentação completa atualizada