# Plano de Correções - Deploy AppdeApostas.com.br
**Data:** 03 de setembro de 2025  
**Horário:** 00:58  
**Servidor:** AWS EC2 - 3.143.118.176  
**Status:** 📋 PLANO DE AÇÃO PARA CORREÇÕES

---

## 🎯 **OBJETIVO**

Corrigir os **2 problemas críticos** identificados no deploy para tornar a aplicação 100% funcional:

1. **Frontend:** Container em restart loop (Next.js não encontrado)
2. **Strapi:** Build admin extremamente lento/travado

---

## 🚨 **PROBLEMAS PRIORITÁRIOS**

### **CRÍTICO #1: Frontend Container Failing**
```bash
STATUS: Restarting (127) constantly
ERROR: sh: next: not found
IMPACT: Frontend completamente inacessível
```

### **CRÍTICO #2: Strapi Admin Build Lento**  
```bash
STATUS: Building admin for 30+ minutes
ERROR: Processo extremamente lento
IMPACT: Admin interface inacessível
```

---

## 🔧 **PLANO DE CORREÇÃO DETALHADO**

### **FASE 1: CORREÇÃO IMEDIATA (0-2 horas)**

#### **1.1 Corrigir Frontend Container**

**Ações específicas:**
```bash
# 1. Parar container atual
docker-compose -f docker-compose.simplified.yml stop frontend

# 2. Remover container e imagem
docker container rm appdeapostas-frontend-dev
docker image rm appdeapostas-frontend

# 3. Limpar cache Docker
docker system prune -f

# 4. Rebuild com --no-cache
docker-compose -f docker-compose.simplified.yml build --no-cache frontend

# 5. Verificar se node_modules foi criado
docker run -it appdeapostas-frontend ls -la /app/node_modules

# 6. Reiniciar container
docker-compose -f docker-compose.simplified.yml up frontend -d
```

**Checklist de verificação:**
- [ ] Container inicia sem restart
- [ ] Next.js command disponível
- [ ] Porta 3005 acessível
- [ ] Logs sem erros críticos

#### **1.2 Resolver Strapi Build Admin**

**Opção A - Aguardar (se < 1 hora restante):**
```bash
# Monitorar logs a cada 10 minutos
docker-compose -f docker-compose.simplified.yml logs -f strapi
```

**Opção B - Restart forçado (se > 1 hora travado):**
```bash
# 1. Restart container
docker-compose -f docker-compose.simplified.yml restart strapi

# 2. Monitorar novamente
docker-compose -f docker-compose.simplified.yml logs -f strapi

# 3. Se continuar lento, verificar recursos
htop
free -h
df -h
```

**Checklist de verificação:**
- [ ] Admin build finalizado
- [ ] URL http://localhost:1337/admin acessível
- [ ] Interface administrativa carregando
- [ ] API endpoints respondendo

---

### **FASE 2: CONFIGURAÇÃO DE PRODUÇÃO (2-4 horas)**

#### **2.1 Implementar Nginx Proxy**

**Criar arquivo nginx.conf no servidor:**
```nginx
events {
    worker_connections 1024;
}

http {
    upstream frontend {
        server localhost:3005;
    }

    upstream strapi {
        server localhost:1337;
    }

    server {
        listen 80;
        server_name 3.143.118.176;

        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        location /admin {
            proxy_pass http://strapi;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        location /api {
            proxy_pass http://strapi;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        location /health {
            return 200 "healthy";
            add_header Content-Type text/plain;
        }
    }
}
```

**Comandos para implementar:**
```bash
# 1. Instalar nginx
sudo yum install nginx -y

# 2. Configurar arquivo
sudo cp nginx.conf /etc/nginx/nginx.conf

# 3. Iniciar nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# 4. Verificar funcionamento
curl http://localhost/health
```

#### **2.2 Configurar Security Groups AWS**

**Portas para liberar:**
- Port 80 (HTTP) - 0.0.0.0/0
- Port 443 (HTTPS) - 0.0.0.0/0  
- Port 22 (SSH) - Apenas IPs específicos

**Comando AWS CLI:**
```bash
aws ec2 authorize-security-group-ingress \
  --group-id sg-xxxxx \
  --protocol tcp \
  --port 80 \
  --cidr 0.0.0.0/0
```

#### **2.3 Testes de Funcionalidade**

**URLs para testar:**
```bash
# Frontend
curl -I http://3.143.118.176/

# Admin Strapi  
curl -I http://3.143.118.176/admin

# API Strapi
curl -I http://3.143.118.176/api

# Health check
curl http://3.143.118.176/health
```

---

### **FASE 3: OTIMIZAÇÃO E MONITORAMENTO (4-6 horas)**

#### **3.1 Otimização de Performance**

**Verificar recursos do servidor:**
```bash
# CPU e RAM
htop
free -h

# Disk space
df -h

# Docker stats
docker stats
```

**Possíveis otimizações:**
- Aumentar RAM da instância EC2 (se necessário)
- Configurar swap file
- Otimizar configurações Node.js
- Cache Redis (futuro)

#### **3.2 Implementar Monitoramento**

**Health checks automatizados:**
```bash
#!/bin/bash
# health_check.sh

# Frontend
if curl -f http://localhost:3005 >/dev/null 2>&1; then
    echo "$(date): Frontend OK"
else
    echo "$(date): Frontend ERROR"
    docker-compose -f docker-compose.simplified.yml restart frontend
fi

# Strapi
if curl -f http://localhost:1337/admin >/dev/null 2>&1; then
    echo "$(date): Strapi OK"
else
    echo "$(date): Strapi ERROR"
    docker-compose -f docker-compose.simplified.yml restart strapi
fi
```

**Configurar crontab:**
```bash
# Executar a cada 5 minutos
*/5 * * * * /home/ec2-user/health_check.sh >> /var/log/health_check.log 2>&1
```

#### **3.3 Backup e Segurança**

**Backup automático:**
```bash
#!/bin/bash
# backup.sh

# Backup database
pg_dump -h external_db_host -U username dbname > backup_$(date +%Y%m%d).sql

# Backup uploads
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz /path/to/uploads

# Upload para S3
aws s3 cp backup_$(date +%Y%m%d).sql s3://backup-bucket/
```

---

## 📅 **CRONOGRAMA DE EXECUÇÃO**

### **Dia 1 (Hoje - 03/09)**
- **00:00-02:00:** Correção crítica Frontend + Strapi
- **02:00-04:00:** Implementação Nginx + Security Groups  
- **04:00-06:00:** Testes e validação funcional

### **Dia 2 (04/09)**  
- **Manhã:** Otimização performance
- **Tarde:** Monitoramento e health checks
- **Noite:** Backup e segurança

### **Dia 3 (05/09)**
- **Final:** Testes de carga e documentação

---

## ✅ **CRITÉRIOS DE SUCESSO**

### **Sucesso Mínimo (MVP):**
- [ ] Frontend acessível e funcionando
- [ ] Admin Strapi acessível e funcionando  
- [ ] API respondendo corretamente
- [ ] Todos containers estáveis

### **Sucesso Completo:**
- [ ] Nginx proxy funcionando
- [ ] SSL/HTTPS implementado
- [ ] Monitoramento ativo
- [ ] Performance otimizada
- [ ] Backups configurados

---

## 🚨 **PLANOS DE CONTINGÊNCIA**

### **Se Frontend não corrigir:**
1. Investigar logs detalhados Docker build
2. Testar build local primeiro
3. Usar imagem base diferente (node:18-alpine)
4. Build manual das dependências

### **Se Strapi continuar lento:**
1. Upgrade instância EC2 para mais RAM
2. Usar Strapi build pré-compilado
3. Configurar swap file temporário
4. Investigar database external issues

### **Se recursos insuficientes:**
1. Upgrade para t3.medium ou maior
2. Configurar swap file 2GB
3. Otimizar containers (remover devDependencies)
4. Usar builds multi-stage otimizados

---

## 📊 **ESTIMATIVAS DE TEMPO/CUSTO**

### **Tempo Estimado:**
- **Correções críticas:** 2 horas
- **Configuração produção:** 2 horas  
- **Otimização:** 2 horas
- **Total:** 6 horas

### **Recursos AWS:**
- **Atual:** t3.micro (1 vCPU, 1GB RAM)
- **Recomendado:** t3.small (2 vCPU, 2GB RAM)
- **Custo adicional:** ~$10-15/mês

---

## 🎯 **CONCLUSÃO**

Este plano de correção aborda sistematicamente todos os problemas identificados no deploy, priorizando:

1. **Funcionalidade básica** (Frontend + Strapi)
2. **Configuração de produção** (Nginx + Security)
3. **Otimização e monitoramento** (Performance + Health checks)

**Próximo passo:** Executar Fase 1 imediatamente para resolver problemas críticos.

---

**📝 Preparado por:** Claude Code Assistant  
**🕒 Última atualização:** 03/09/2025 - 00:58  
**🔗 Relacionado:** RELATORIO_DEPLOY_AWS_EC2.md