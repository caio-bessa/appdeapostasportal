# 🚀 Migração para Amazon Linux 2023 - Instruções Executivas

**Objetivo:** Resolver incompatibilidade GLIBC e finalizar deploy  
**Tempo Estimado:** 30-45 minutos  
**Status:** Pronto para execução

---

## 📋 **INFORMAÇÕES DA INSTÂNCIA ATUAL**

```
Instance ID: i-0278265f91b913d99
AMI: ami-096566f39a31a283e (Amazon Linux 2)
Instance Type: t3.medium
AZ: us-east-2a
Security Group: acroud-brasil-sg
```

---

## 🎯 **PASSO A PASSO PARA EXECUÇÃO**

### **1. Criar Backup da Instância Atual**

**Via AWS Console:**
1. Acesse EC2 → Instances
2. Selecione instância `i-0278265f91b913d99`
3. Actions → Image and templates → Create image
4. **Nome**: `backup-appdeapostas-amazonlinux2-20250903`
5. **Descrição**: `Backup antes migração Amazon Linux 2023`
6. Clique **Create image**

**Via AWS CLI:** (se tiver permissões)
```bash
aws ec2 create-image \
  --instance-id i-0278265f91b913d99 \
  --name "backup-appdeapostas-amazonlinux2-20250903" \
  --description "Backup antes migração Amazon Linux 2023"
```

⏱️ **Tempo**: 5-10 minutos para criação do AMI

---

### **2. Obter AMI do Amazon Linux 2023**

**Via AWS Console:**
1. EC2 → Images → AMI Catalog
2. Busque: "Amazon Linux 2023"
3. Selecione: **Amazon Linux 2023 AMI** (x86_64)
4. Copie o AMI ID (exemplo: `ami-0abcdef1234567890`)

**Via AWS CLI:**
```bash
aws ec2 describe-images \
  --owners amazon \
  --filters "Name=name,Values=al2023-ami-*" \
  --query 'Images[?State==`available`]|sort_by(@, &CreationDate)[-1].{ImageId:ImageId,Name:Name}' \
  --region us-east-2
```

---

### **3. Criar Nova Instância Amazon Linux 2023**

**Via AWS Console:**
1. EC2 → Instances → Launch Instance
2. **Nome**: `appdeapostas-portal-al2023`
3. **AMI**: Amazon Linux 2023 (selecionar AMI obtido no passo 2)
4. **Instance Type**: `t3.medium`
5. **Key Pair**: `acroud-brasil-server` (mesmo atual)
6. **Security Group**: `acroud-brasil-sg` (mesmo atual)  
7. **Subnet**: Mesmo da instância atual (us-east-2a)
8. Clique **Launch Instance**

**Via AWS CLI:**
```bash
aws ec2 run-instances \
  --image-id ami-XXXXXX \
  --instance-type t3.medium \
  --key-name acroud-brasil-server \
  --security-group-ids sg-XXXXXX \
  --subnet-id subnet-XXXXXX \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=appdeapostas-portal-al2023}]'
```

⏱️ **Tempo**: 3-5 minutos para instância ficar running

---

### **4. Executar Deploy na Nova Instância**

**Aguardar instância estar "running" e obter novo IP:**

1. **Obter novo IP público** da instância
2. **Atualizar script de deploy:**

```bash
cd /Users/caiobessa/Desktop/appdeapostasportal
```

**Editar `deploy-to-server.sh` linha 10:**
```bash
# Trocar IP antigo pelo novo
SERVER_IP="NOVO_IP_AQUI"
```

**Executar deploy:**
```bash
./deploy-to-server.sh
```

⏱️ **Tempo**: 5-10 minutos para deploy completo

---

### **5. Verificar Funcionamento**

**Testar URLs (substituir pelo novo IP):**
```bash
# Backend Health Check
curl http://NOVO_IP:1337/admin/init

# Frontend  
curl http://NOVO_IP:3005

# API
curl http://NOVO_IP:1337/api/categories
```

**Resultado esperado:**
- ✅ Backend responde com HTML do admin
- ✅ Frontend responde com HTML da homepage  
- ✅ API responde com JSON (mesmo que vazio)

---

## ⚠️ **PONTOS DE ATENÇÃO**

### **Durante a Migração:**
1. **Manter instância antiga**: Não deletar até confirmar nova funcionando
2. **Security Group**: Garantir que ports 1337 e 3005 estão abertos
3. **SSH Key**: Usar mesma chave (`acroud-brasil-server.pem`)
4. **Backup**: AMI criado como segurança

### **Após Deploy:**
1. **Testar todas as URLs** listadas acima
2. **Verificar PM2 status**: `pm2 status` via SSH
3. **Consultar logs**: `pm2 logs` se houver problemas

---

## 🎯 **SCRIPT RÁPIDO DE VERIFICAÇÃO**

**Para executar na nova instância via SSH:**
```bash
ssh -i ~/.ssh/aws-keys/acroud-brasil-server.pem ec2-user@NOVO_IP << 'EOF'
echo "=== VERIFICAÇÃO PÓS-DEPLOY ==="
echo "Node.js: $(node --version)"
echo "NPM: $(npm --version)" 
echo "PM2 Status:"
pm2 status
echo ""
echo "Testando portas:"
netstat -tlpn | grep -E ':(1337|3005)'
EOF
```

---

## ✅ **RESULTADO ESPERADO**

**Após execução completa:**
- ✅ **Nova instância** Amazon Linux 2023 running
- ✅ **Node.js 18+** funcionando sem erros GLIBC
- ✅ **Aplicação deployed** e rodando via PM2
- ✅ **URLs funcionais**:
  - Frontend: http://NOVO_IP:3005
  - Backend: http://NOVO_IP:1337/admin
  - API: http://NOVO_IP:1337/api

**Status Final:** 🎉 **PROJETO 100% FUNCIONAL EM PRODUÇÃO**

---

## 🚨 **EM CASO DE PROBLEMAS**

### **Se deploy falhar:**
1. Verifique conexão SSH com novo IP
2. Execute: `ssh ec2-user@NOVO_IP "sudo yum update -y"`
3. Tente deploy novamente

### **Se aplicação não iniciar:**
1. SSH na instância: `ssh ec2-user@NOVO_IP`
2. Vá para diretório: `cd /home/ec2-user/appdeapostas-native`
3. Execute manualmente: `pm2 start ecosystem.config.js`
4. Verifique logs: `pm2 logs`

### **Rollback se necessário:**
1. Usar instância original (3.143.118.176)
2. Deletar nova instância para evitar custos

---

**⏰ Tempo total estimado: 30-45 minutos**  
**💰 Custo adicional: ~$0.50/dia pela nova instância**  
**🎯 Resultado: Portal 100% funcional em produção**