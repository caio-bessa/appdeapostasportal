# Política de Segurança - AppdeApostas Portal

## 🔐 Informações Sensíveis

### ⚠️ NUNCA COMMITADAS NO REPOSITÓRIO:
- Credenciais de acesso (senhas, tokens)
- Chaves SSH privadas
- Configurações de banco de dados com senhas
- API tokens de terceiros
- Certificados SSL privados

### ✅ Armazenamento Seguro:
- Usar arquivo `.env` local (ignorado pelo Git)
- Variáveis de ambiente no servidor
- Sistemas de gerenciamento de segredos (AWS Secrets Manager)
- Documentação offline para credenciais

## 🛡️ Credenciais Necessárias

Para executar o projeto, você precisará configurar:

### 1. Admin Strapi
- **Email:** (ver documentação offline)
- **Senha:** (ver documentação offline)

### 2. Banco de Dados
- **Host:** localhost (desenvolvimento) / IP_SERVIDOR (produção)
- **Credenciais:** (ver arquivo .env)

### 3. AWS
- **Access Key:** (configurar via AWS CLI)
- **Secret Key:** (configurar via AWS CLI)
- **Região:** us-east-2

### 4. Cloudflare
- **API Token:** (dashboard Cloudflare)

## 📋 Configuração Segura

### Desenvolvimento Local:
1. Copie `.env.example` para `.env`
2. Preencha com suas credenciais
3. NUNCA commite o arquivo `.env`

### Produção:
1. Use variáveis de ambiente do sistema
2. Configure via Docker secrets
3. Use sistemas de gerenciamento de credenciais

## 🚨 Em Caso de Comprometimento

1. **Revogue imediatamente** todas as credenciais expostas
2. **Gere novas credenciais** para todos os serviços
3. **Atualize** todos os sistemas que usam as credenciais
4. **Documente** o incidente e ações tomadas

## 📞 Contato de Segurança

Para reportar vulnerabilidades de segurança:
- **Email:** caio.bessa@acroud.media
- **Assunto:** [SECURITY] AppdeApostas Portal

## 🔍 Auditoria de Segurança

- **Última revisão:** 02/09/2025
- **Próxima revisão:** 02/10/2025
- **Responsible:** Caio Bessa