# 🏗️ ARQUITETURA - AppdeApostas.com.br

## 📊 **DIAGRAMA ARQUITETURAL**

```
┌─────────────────────────────────────────────────────────────────┐
│                        🌍 CLOUDFLARE CDN                        │
│  • SSL/TLS Termination   • DDoS Protection   • Global Cache    │
└─────────────────────────┬───────────────────────────────────────┘
                          │ HTTPS/HTTP2
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    🖥️  AWS EC2 INSTANCE                         │
│                 Amazon Linux 2023 (3.18.213.189)              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────────────────────────┐ │
│  │   🔄 PM2         │    │          🔧 NGINX                    │ │
│  │   Process Mgr    │    │      Reverse Proxy                  │ │
│  │                  │    │   Port 80 → SSL Redirect           │ │
│  │  ┌─────────────┐ │    │   Port 443 → Load Balance          │ │
│  │  │ Backend     │ │    │                                     │ │
│  │  │ (Strapi)    │◄┼────┼── :1337 ◄─┐                        │ │
│  │  │ Port 1337   │ │    │             │                       │ │
│  │  └─────────────┘ │    │             │                       │ │
│  │                  │    │             │                       │ │
│  │  ┌─────────────┐ │    │   :3005 ◄───┼─┐                     │ │
│  │  │ Frontend    │ │    │             │ │                     │ │
│  │  │ (Next.js)   │◄┼────┼─────────────┘ │                     │ │
│  │  │ Port 3005   │ │    │               │                     │ │
│  │  └─────────────┘ │    └───────────────┼─────────────────────┘ │
│  └─────────────────┘                     │                       │
│                                          │                       │
│  ┌─────────────────┐                     │                       │
│  │   📁 SQLITE      │                     │                       │
│  │   Database       │◄────────────────────┘                       │
│  │   .tmp/data.db   │                                             │
│  └─────────────────┘                                             │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐                     │
│  │  🔐 Certbot      │    │  📂 File System │                     │
│  │  Let's Encrypt   │    │  Static Assets  │                     │
│  │  Auto SSL        │    │  Uploads        │                     │
│  └─────────────────┘    └─────────────────┘                     │
└─────────────────────────────────────────────────────────────────┘
```

## 🔧 **STACK TÉCNICO**

### **Frontend Layer**
```
┌─────────────────────────────────────────┐
│             FRONTEND STACK              │
├─────────────────────────────────────────┤
│  Framework: Next.js 15.5.2             │
│  Language:  TypeScript                  │
│  Styling:   Tailwind CSS               │
│  UI Lib:    React 18                   │
│  Icons:     Lucide React               │
│  HTTP:      Axios                      │
│  Port:      3005                       │
└─────────────────────────────────────────┘
```

### **Backend Layer**
```
┌─────────────────────────────────────────┐
│             BACKEND STACK               │
├─────────────────────────────────────────┤
│  CMS:       Strapi 4.25.9              │
│  Runtime:   Node.js 20.19.4            │
│  Database:  SQLite                     │
│  Auth:      Strapi Built-in            │
│  API:       REST + GraphQL             │
│  Port:      1337                       │
└─────────────────────────────────────────┘
```

### **Infrastructure Layer**
```
┌─────────────────────────────────────────┐
│          INFRASTRUCTURE STACK          │
├─────────────────────────────────────────┤
│  Cloud:     AWS EC2                    │
│  OS:        Amazon Linux 2023          │
│  Proxy:     Nginx 1.28.0               │
│  Process:   PM2 6.0.10                 │
│  SSL:       Let's Encrypt (Certbot)    │
│  CDN:       Cloudflare                 │
└─────────────────────────────────────────┘
```

## 🌐 **FLUXO DE DADOS**

### **Requisição Web (https://appdeapostas.com.br)**
```
📱 Cliente
    ↓ HTTPS
🌍 Cloudflare CDN
    ↓ Cache Miss/Dynamic
☁️  AWS EC2 (3.18.213.189)
    ↓ Port 443
🔧 Nginx Reverse Proxy
    ↓ Proxy Pass
⚛️  Next.js Frontend (Port 3005)
    ↓ API Calls
🎯 Strapi Backend (Port 1337)
    ↓ Query
📁 SQLite Database (.tmp/data.db)
```

### **Admin CMS (https://appdeapostas.com.br/admin)**
```
👤 Admin User
    ↓ HTTPS
🌍 Cloudflare CDN
    ↓ 
☁️  AWS EC2
    ↓ Port 443
🔧 Nginx (/admin path)
    ↓ Proxy Pass
🎛️  Strapi Admin (Port 1337/admin)
    ↓ CRUD Operations
📁 SQLite Database
```

## 🔒 **SEGURANÇA**

### **Headers Implementados**
```
┌─────────────────────────────────────────┐
│            SECURITY HEADERS             │
├─────────────────────────────────────────┤
│  X-Frame-Options: SAMEORIGIN           │
│  X-Content-Type-Options: nosniff       │
│  X-XSS-Protection: 1; mode=block       │
│  Strict-Transport-Security: max-age=.. │
│  Referrer-Policy: strict-origin-when.. │
└─────────────────────────────────────────┘
```

### **SSL/TLS**
```
🔐 Let's Encrypt Certificate
   ├── Auto-renewal configurado
   ├── HSTS habilitado
   ├── HTTP → HTTPS redirect
   └── TLS 1.2+ only
```

## ⚡ **PERFORMANCE**

### **Cache Strategy**
```
┌─────────────────────────────────────────┐
│              CACHE LAYERS               │
├─────────────────────────────────────────┤
│  L1: Cloudflare Edge Cache (Global)    │
│  L2: Nginx Static Files (Local)        │
│  L3: Next.js Build Cache (App)         │
│  L4: SQLite Query Cache (DB)           │
└─────────────────────────────────────────┘
```

### **Otimizações**
- **Gzip/Brotli:** Compressão automática
- **HTTP/2:** Multiplexing habilitado  
- **Static Assets:** Cache de 1 ano
- **API Responses:** Cache inteligente

## 📁 **ESTRUTURA DE ARQUIVOS**

```
appdeapostasportal/
├── 📁 frontend/appdeapostas/     # Next.js App
│   ├── src/app/                 # App Router
│   ├── src/components/          # React Components  
│   ├── src/lib/                 # Utilities
│   └── package.json
├── 📁 backend/                  # Strapi CMS
│   ├── src/api/                 # Content Types
│   ├── config/                  # Configurations
│   ├── .tmp/                    # SQLite DB
│   └── package.json
├── 📁 scripts/                  # Deploy Scripts
├── 🔧 ecosystem.config.js       # PM2 Config
├── 🔧 deploy-to-server.sh       # Deploy Script
└── 📋 README.md                 # Documentation
```

## 🚀 **DEPLOYMENT FLOW**

```
1. 💻 Development
   └── Local: npm run dev (Frontend + Backend)

2. 📦 Build
   ├── Frontend: next build
   ├── Backend: strapi build  
   └── Package: tar.gz creation

3. 🚀 Deploy
   ├── SSH to EC2
   ├── Upload files
   ├── Install dependencies
   ├── PM2 restart
   └── Nginx reload

4. ✅ Verification
   ├── Health checks
   ├── SSL validation
   └── Performance tests
```

## 📊 **MONITORAMENTO**

### **Logs Locations**
```
/home/ec2-user/appdeapostas-native/logs/
├── backend-error.log      # Strapi errors
├── backend-out.log        # Strapi output  
├── frontend-error.log     # Next.js errors
├── frontend-out.log       # Next.js output
└── nginx/                 # Nginx access/error logs
```

### **Key Metrics**
- **Uptime:** PM2 status monitoring
- **Performance:** Response times < 1s
- **SSL:** Auto-renewal monitoring  
- **Security:** Header validation

---

*📐 Arquitetura robusta, escalável e production-ready!*