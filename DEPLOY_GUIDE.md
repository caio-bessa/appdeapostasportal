# 🚀 Guia de Deploy - AppdeApostas Portal

## ✅ Status Atual
- ✅ Setup nativo funcionando (sem Docker)
- ✅ Frontend build concluído
- ✅ Backend configurado com SQLite
- ✅ Todos os serviços testados localmente

---

## 🎯 Opções de Deploy

### **OPÇÃO 1: VPS/Servidor (Recomendado)**

#### Preparação Local:
```bash
# 1. Executar script de deploy
./deploy.sh

# 2. Compactar arquivos
tar -czf appdeapostas-portal.tar.gz dist/
```

#### No Servidor:
```bash
# 1. Instalar Node.js (se não instalado)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Transferir e extrair arquivos
scp appdeapostas-portal.tar.gz user@servidor:/home/user/
ssh user@servidor
tar -xzf appdeapostas-portal.tar.gz
cd dist/

# 3. Instalar PM2 para gerenciar processos
sudo npm install -g pm2

# 4. Configurar PM2
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

---

### **OPÇÃO 2: Plataformas Cloud**

#### Frontend (Vercel):
```bash
cd frontend/appdeapostas
npx vercel --prod
```

#### Backend (Railway/Render):
- Conectar repositório GitHub
- Configurar variáveis de ambiente
- Deploy automático

---

### **OPÇÃO 3: Servidor com Nginx (Produção)**

#### 1. Nginx Config:
```nginx
server {
    listen 80;
    server_name appdeapostas.com.br;

    # Frontend
    location / {
        proxy_pass http://localhost:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }

    # Admin
    location /admin {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔧 Configuração PM2

### ecosystem.config.js:
```javascript
module.exports = {
  apps: [
    {
      name: 'appdeapostas-backend',
      script: 'npm',
      args: 'start',
      cwd: './backend',
      env: {
        NODE_ENV: 'production',
        PORT: 1337
      }
    },
    {
      name: 'appdeapostas-frontend',  
      script: 'npm',
      args: 'start',
      cwd: './frontend',
      env: {
        NODE_ENV: 'production',
        PORT: 3005
      }
    }
  ]
};
```

---

## 🌍 Variáveis de Ambiente (Produção)

### Backend (.env):
```
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
API_TOKEN_SALT=EIdg7OK/iXVTg0lomRjw8w==
ADMIN_JWT_SECRET=CDIKtp+R0E+472OgYH24pQ==
JWT_SECRET=0d4QK88GRFjL3k4w0v2TWg==
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

### Frontend (.env.local):
```
NEXT_PUBLIC_API_URL=https://api.appdeapostas.com.br
NEXT_PUBLIC_SITE_URL=https://appdeapostas.com.br
```

---

## 🎉 Checklist de Deploy

- [ ] Executar ./deploy.sh
- [ ] Testar build local
- [ ] Configurar domínio/DNS
- [ ] Transferir arquivos para servidor
- [ ] Configurar variáveis de ambiente
- [ ] Instalar PM2/Nginx
- [ ] Configurar SSL (Let's Encrypt)
- [ ] Testar em produção
- [ ] Monitorar logs

---

**Qual opção você prefere?**
1. Servidor próprio com PM2
2. Vercel + Railway
3. Deploy local para teste