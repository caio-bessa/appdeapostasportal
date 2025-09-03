# 🚀 Relatório de Deploy - AppdeApostas Portal (Nativo)

**Data:** 03 de setembro de 2025  
**Horário:** 03:05  
**Método:** Deploy Nativo (sem Docker)  
**Servidor:** AWS EC2 (3.143.118.176)

---

## ✅ **STATUS DO DEPLOY**

### **Preparação Local: CONCLUÍDO**
- ✅ Setup nativo funcionando localmente
- ✅ Frontend buildado com Next.js 15.5.2
- ✅ Backend compilado com Strapi 4.25.9
- ✅ Content types criados (category, team, tag)  
- ✅ SQLite configurado para produção
- ✅ Arquivos compactados: `appdeapostas-portal-native.tar.gz`

### **Conectividade com Servidor: PENDENTE**
- ❌ Servidor AWS não respondendo ao ping
- ❌ Possíveis causas:
  - Security Group não permite ICMP
  - Servidor desligado
  - Firewall bloqueando conexões
- ⚠️  Deploy automatizado criado para executar quando servidor estiver disponível

---

## 📦 **ARQUIVOS PREPARADOS PARA DEPLOY**

### **Estrutura de Distribuição:**
```
dist/
├── backend/
│   ├── build/                 # Strapi compilado
│   ├── config/                # Configurações de produção
│   ├── node_modules/          # Dependências
│   ├── package.json           # Backend deps
│   └── src/                   # Source code
├── frontend/
│   ├── .next/                 # Next.js buildado
│   └── package.json           # Frontend deps
└── start-*.sh                 # Scripts de inicialização
```

### **Configurações de Produção:**
- **PM2**: `ecosystem.config.js` configurado
- **Environment**: `.env.production` com todas as variáveis
- **Database**: SQLite para simplicidade
- **Ports**: Frontend (3005), Backend (1337)

---

## 🔧 **COMANDOS PARA EXECUTAR NO SERVIDOR**

### **Quando o servidor estiver online:**
```bash
# 1. Executar deploy automatizado
./deploy-to-server.sh

# 2. OU manualmente:
scp appdeapostas-portal-native.tar.gz ec2-user@3.143.118.176:/home/ec2-user/
ssh ec2-user@3.143.118.176
tar -xzf appdeapostas-portal-native.tar.gz
cd appdeapostas-portal-native
pm2 start ecosystem.config.js
```

### **Verificação:**
```bash
# Status dos processos
pm2 status

# Logs
pm2 logs

# Testar endpoints
curl http://localhost:1337/admin/init
curl http://localhost:3005
```

---

## 🌐 **URLs APÓS DEPLOY**

### **Endpoints Esperados:**
- **Frontend**: http://3.143.118.176:3005
- **Backend API**: http://3.143.118.176:1337/api
- **Strapi Admin**: http://3.143.118.176:1337/admin
- **Health Check**: http://3.143.118.176:1337/admin/init

### **Nginx Configuration (Se Necessário):**
```nginx
upstream frontend {
    server localhost:3005;
}

upstream backend {
    server localhost:1337;
}

server {
    listen 80;
    server_name appdeapostas.com.br;

    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://backend;
    }

    location /admin {
        proxy_pass http://backend;
    }
}
```

---

## 🔍 **TROUBLESHOOTING**

### **Problema: Servidor não responde**
**Soluções:**
1. Verificar se instância EC2 está rodando
2. Verificar Security Group permite porta 22 (SSH)
3. Verificar se Elastic IP está associado
4. Tentar conectar via AWS Systems Manager (se configurado)

### **Problema: Aplicação não inicia**
**Soluções:**
1. Verificar logs: `pm2 logs`
2. Verificar Node.js version: `node --version` (precisa ser 18+)
3. Reinstalar dependências: `npm install`
4. Verificar portas disponíveis: `netstat -tulpn | grep :1337`

### **Problema: Frontend não conecta com Backend**
**Soluções:**
1. Verificar variável NEXT_PUBLIC_API_URL
2. Verificar CORS no Strapi
3. Testar API diretamente: `curl http://localhost:1337/admin/init`

---

## 📊 **MONITORAMENTO**

### **Logs Importantes:**
- **Backend**: `/home/ec2-user/appdeapostas-native/logs/backend-*.log`
- **Frontend**: `/home/ec2-user/appdeapostas-native/logs/frontend-*.log`
- **PM2**: `pm2 logs`

### **Comandos de Manutenção:**
```bash
# Reiniciar todos os serviços
pm2 restart all

# Ver uso de recursos
pm2 monit

# Backup do banco SQLite
cp dist/backend/.tmp/data.db backup-$(date +%Y%m%d).db

# Atualizar código
git pull origin main
./deploy.sh
pm2 restart all
```

---

## 🚨 **AÇÕES REQUERIDAS**

### **Imediato:**
1. **Verificar status do servidor AWS EC2**
   - Acessar AWS Console
   - Verificar se instância está "running"
   - Verificar Security Groups

2. **Testar conectividade SSH**
   ```bash
   ssh -i ~/.ssh/aws-keys/acroud-brasil-server.pem ec2-user@3.143.118.176
   ```

3. **Executar deploy quando servidor estiver online**
   ```bash
   ./deploy-to-server.sh
   ```

### **Pós-Deploy:**
1. **Configurar domínio** (se necessário)
2. **Configurar SSL** com Let's Encrypt
3. **Monitorar performance** e logs
4. **Testar todas as funcionalidades**

---

## 📈 **PRÓXIMOS PASSOS**

### **Fase 1: Verificar Deploy (1 dia)**
- [ ] Servidor online e acessível
- [ ] Aplicações rodando via PM2
- [ ] Frontend e Backend funcionais
- [ ] Strapi Admin acessível

### **Fase 2: Configurar Produção (2-3 dias)**
- [ ] Nginx proxy configurado
- [ ] SSL certificate instalado
- [ ] Domínio apontando corretamente
- [ ] Monitoring e alertas

### **Fase 3: Dados e Conteúdo (1 semana)**
- [ ] Popular CMS com dados reais
- [ ] Testar fluxo completo
- [ ] SEO e performance otimization
- [ ] Backup strategy implementada

---

## 🎯 **RESULTADO ESPERADO**

Após o deploy ser executado com sucesso:

✅ **Portal totalmente funcional em produção**  
✅ **CMS Strapi operacional com SQLite**  
✅ **Frontend Next.js servindo páginas estáticas e dinâmicas**  
✅ **APIs funcionando para content types criados**  
✅ **Setup nativo sem Docker (compatível com WebContainer)**  

**Deploy está PRONTO para execução assim que servidor estiver disponível!**

---

*Relatório gerado por: Claude Code Assistant*  
*Projeto: AppdeApostas.com.br - Deploy Nativo*  
*Data: 03/09/2025*