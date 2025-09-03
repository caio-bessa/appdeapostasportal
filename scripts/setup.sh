#!/bin/bash
# Setup inicial do projeto AppdeApostas.com.br

set -e

echo "🚀 Configurando AppdeApostas.com.br..."

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não encontrado. Instale o Docker primeiro."
    exit 1
fi

# Verificar se Docker Compose está disponível
if ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose não encontrado. Instale o Docker Compose primeiro."
    exit 1
fi

# Criar arquivo .env se não existir
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp .env.example .env
    
    # Gerar secrets aleatórios
    echo "🔐 Gerando secrets de segurança..."
    
    # Substitui placeholders com valores aleatórios
    if command -v openssl &> /dev/null; then
        JWT_SECRET=$(openssl rand -base64 32)
        API_TOKEN_SALT=$(openssl rand -base64 32)
        ADMIN_JWT_SECRET=$(openssl rand -base64 32)
        TRANSFER_TOKEN_SALT=$(openssl rand -base64 32)
        APP_KEY_1=$(openssl rand -base64 32)
        APP_KEY_2=$(openssl rand -base64 32)
        APP_KEY_3=$(openssl rand -base64 32)
        APP_KEY_4=$(openssl rand -base64 32)
        
        sed -i.bak "s/your_jwt_secret_here_min_32_characters_long/$JWT_SECRET/g" .env
        sed -i.bak "s/your_api_token_salt_here_min_32_characters/$API_TOKEN_SALT/g" .env
        sed -i.bak "s/your_admin_jwt_secret_here_min_32_characters/$ADMIN_JWT_SECRET/g" .env
        sed -i.bak "s/your_transfer_token_salt_here_min_32_characters/$TRANSFER_TOKEN_SALT/g" .env
        sed -i.bak "s/your_app_key_1,your_app_key_2,your_app_key_3,your_app_key_4/$APP_KEY_1,$APP_KEY_2,$APP_KEY_3,$APP_KEY_4/g" .env
        
        # Gerar senha de database
        DB_PASSWORD=$(openssl rand -base64 16)
        sed -i.bak "s/your_database_password_here/$DB_PASSWORD/g" .env
        
        rm .env.bak
    fi
    
    echo "⚠️  IMPORTANTE: Configure as credenciais no arquivo .env antes de continuar!"
    echo "   - AWS credentials (se usando AWS)"
    echo "   - Cloudflare token (se usando Cloudflare)"
    echo "   - Email e senha do admin"
fi

# Verificar se .env está configurado
if grep -q "your_" .env; then
    echo "⚠️  Arquivo .env contém placeholders. Configure as credenciais antes de prosseguir."
    echo "   Edite o arquivo .env e execute este script novamente."
    exit 1
fi

echo "🐳 Iniciando containers Docker..."

# Build e start dos containers
docker compose up --build -d

echo "⏳ Aguardando serviços iniciarem..."
sleep 30

# Verificar se os serviços estão funcionando
echo "🔍 Verificando status dos serviços..."

if curl -f http://localhost:1337/admin >/dev/null 2>&1; then
    echo "✅ Strapi Admin: http://localhost:1337/admin"
else
    echo "⚠️  Strapi ainda inicializando... Pode levar alguns minutos"
fi

if curl -f http://localhost:3000 >/dev/null 2>&1; then
    echo "✅ Frontend: http://localhost:3000"
else
    echo "⚠️  Frontend ainda inicializando..."
fi

echo ""
echo "🎉 Setup concluído!"
echo ""
echo "📋 Próximos passos:"
echo "   1. Acesse http://localhost:1337/admin para configurar o Strapi"
echo "   2. Crie o primeiro usuário administrador"
echo "   3. Configure os content types e permissões"
echo "   4. Acesse http://localhost:3000 para ver o frontend"
echo ""
echo "📚 Comandos úteis:"
echo "   - docker compose logs -f            # Ver logs"
echo "   - docker compose down               # Parar containers"
echo "   - docker compose up -d              # Iniciar containers"
echo "   - npm run seed                      # Popular dados de exemplo (após setup)"
echo ""