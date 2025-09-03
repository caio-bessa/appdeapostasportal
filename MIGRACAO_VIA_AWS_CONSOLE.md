# 🚀 Migração Amazon Linux 2023 - Via AWS Console

**Situação:** CLI não tem permissões suficientes  
**Solução:** Usar AWS Console (mais rápido)  
**Tempo:** 15-20 minutos

---

## 🎯 **PASSO A PASSO VIA AWS CONSOLE**

### **1. Acessar AWS Console**
1. Acesse: https://console.aws.amazon.com
2. Faça login com suas credenciais
3. Vá para **EC2** → **Instances**

### **2. Criar Nova Instância (Amazon Linux 2023)**

**Launch Instance:**
1. Clique **"Launch Instance"**
2. **Name**: `appdeapostas-portal-al2023`

**AMI Selection:**
3. **Application and OS Images**: "Amazon Linux"
4. Selecione: **"Amazon Linux 2023 AMI"** (primeira opção)
5. **Architecture**: x86_64

**Instance Type:**
6. **Instance type**: `t3.medium` (igual à atual)

**Key Pair:**
7. **Key pair name**: Selecione a chave existente (provavelmente `acroud-brasil-server` ou similar)

**Network Settings:**
8. **VPC**: Usar mesma da instância atual
9. **Subnet**: Usar mesma da instância atual (us-east-2a)
10. **Auto-assign public IP**: Enable
11. **Security group**: Usar existente `acroud-brasil-sg` ou criar nova com portas:
    - Port 22 (SSH)
    - Port 1337 (Strapi)
    - Port 3005 (Next.js)
    - Port 80 (HTTP)
    - Port 443 (HTTPS)

**Storage:**
12. Manter padrão (8 GB é suficiente)

**Advanced Details:**
13. Deixar padrão

14. Clique **"Launch Instance"**

---

### **3. Aguardar Instância Ficar Online**
- Status: **"Pending"** → **"Running"** (2-3 minutos)
- **Importante**: Anotar o **IP Público** da nova instância

---

### **4. Testar Conectividade SSH**

**Obter novo IP público** e testar:
```bash
# Substitua NOVO_IP pelo IP da nova instância
ssh -i ~/.ssh/aws-keys/acroud-brasil-server.pem ec2-user@NOVO_IP

# Dentro da instância, testar:
cat /etc/os-release  # Deve mostrar Amazon Linux 2023
node --version       # Deve mostrar Node.js compatível ou não instalado ainda
```

---

### **5. Atualizar Script de Deploy**

**Editar arquivo de deploy:**
```bash
cd /Users/caiobessa/Desktop/appdeapostasportal
nano deploy-to-server.sh
```

**Trocar linha 10:**
```bash
# De:
SERVER_IP="3.143.118.176"

# Para:
SERVER_IP="NOVO_IP_AQUI"
```

---

### **6. Executar Deploy na Nova Instância**

```bash
# Executar deploy automatizado
./deploy-to-server.sh
```

**Se der erro de Node.js, o script instalará automaticamente.**

---

### **7. Verificar Funcionamento**

**Testar URLs (substitua pelo novo IP):**
```bash
# Backend Health Check
curl http://NOVO_IP:1337/admin/init

# Frontend
curl http://NOVO_IP:3005

# API
curl http://NOVO_IP:1337/api/categories
```

**Resultado Esperado:**
- ✅ Status 200 em todas as URLs
- ✅ Aplicação funcionando sem erros GLIBC

---

## ✅ **RESULTADO FINAL**

**Após execução:**
- ✅ **Nova instância** Amazon Linux 2023 rodando
- ✅ **Node.js 18+** funcionando nativamente  
- ✅ **Aplicação deployed** via PM2
- ✅ **Portal funcionando**:
  - Frontend: http://NOVO_IP:3005
  - Admin: http://NOVO_IP:1337/admin
  - API: http://NOVO_IP:1337/api

---

## 🔧 **TROUBLESHOOTING**

### **Se Security Group der problema:**
1. EC2 → Security Groups
2. Encontrar grupo usado na nova instância  
3. **Inbound Rules** → Edit
4. Adicionar regras:
   - **SSH**: Port 22, Source: My IP
   - **Custom TCP**: Port 1337, Source: Anywhere
   - **Custom TCP**: Port 3005, Source: Anywhere

### **Se deploy falhar:**
```bash
# SSH na nova instância
ssh -i ~/.ssh/aws-keys/acroud-brasil-server.pem ec2-user@NOVO_IP

# Instalar Node.js manualmente se necessário
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Verificar versão
node --version  # Deve ser 20.x sem erro GLIBC
```

---

## 💰 **CUSTOS**

- **Nova instância**: ~$0.60/dia (t3.medium)
- **Manter ambas** temporariamente: ~$1.20/dia
- **Após confirmar funcionamento**: Deletar instância antiga

---

## 🎉 **PRÓXIMO PASSO**

Execute este guia e em **15-20 minutos** terá o portal 100% funcional em Amazon Linux 2023!

**Status esperado:** 🚀 **PROJETO FINALIZADO EM PRODUÇÃO**