# Setup Nativo - AppdeApostas.com.br (SEM DOCKER)
**Problema identificado:** WebContainer não suporta Docker  
**Solução:** Execução nativa com Node.js + PostgreSQL local/remote

---

## 🚀 **SETUP RÁPIDO (15 minutos)**

### **1. Backend Strapi (Nativo)**
```bash
# Ir para backend
cd backend

# Instalar dependências
npm install

# Configurar banco (usar SQLite para desenvolvimento)
# Editar config/database.js para SQLite

# Executar Strapi
npm run develop
```

### **2. Frontend Next.js (Nativo)**
```bash
# Ir para frontend
cd frontend/appdeapostas

# Instalar dependências
npm install

# Executar Next.js
npm run dev
```

### **3. Configuração Database SQLite (Simples)**
```javascript
// backend/config/database.js
module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
    },
    useNullAsDefault: true,
  },
});
```

---

## ✅ **RESULTADO ESPERADO:**
- ✅ Strapi Admin: http://localhost:1337/admin
- ✅ Frontend: http://localhost:3000  
- ✅ API: http://localhost:1337/api
- ✅ **SEM DOCKER** - Funciona em WebContainer

---

## 🎯 **POR QUE ISSO RESOLVE:**
1. **Node.js nativo** funciona em WebContainer
2. **SQLite** não precisa de container
3. **Sem Docker** = Sem problemas de compatibilidade
4. **Desenvolvimento rápido** e direto

**Vamos implementar isso AGORA?**