#!/bin/bash
# Deploy script para produção - AppdeApostas.com.br

set -e

echo "🚀 Iniciando deploy para produção..."

# Verificar se estamos na branch correta
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "master" ]; then
    echo "⚠️  Você está na branch '$CURRENT_BRANCH'. Deseja continuar? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "Deploy cancelado."
        exit 1
    fi
fi

# Verificar se .env.production existe
if [ ! -f .env.production ]; then
    echo "❌ Arquivo .env.production não encontrado!"
    echo "   Crie o arquivo .env.production com as configurações de produção."
    exit 1
fi

# Backup do ambiente atual
echo "💾 Fazendo backup do ambiente atual..."
if [ -f .env ]; then
    cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
fi

# Usar configuração de produção
cp .env.production .env

echo "🏗️  Building aplicação..."

# Build dos containers de produção
docker compose -f docker-compose.production.yml build

echo "🔄 Parando containers atuais..."
docker compose -f docker-compose.production.yml down

echo "🚀 Iniciando containers de produção..."
docker compose -f docker-compose.production.yml up -d

echo "⏳ Aguardando serviços iniciarem..."
sleep 60

# Health checks
echo "🔍 Verificando health dos serviços..."

# Check Postgres
if docker compose -f docker-compose.production.yml exec postgres pg_isready -U postgres >/dev/null 2>&1; then
    echo "✅ PostgreSQL: Online"
else
    echo "❌ PostgreSQL: Offline"
    exit 1
fi

# Check Strapi
if curl -f http://localhost:1337/admin >/dev/null 2>&1; then
    echo "✅ Strapi: Online"
else
    echo "❌ Strapi: Offline - Verificar logs"
    docker compose -f docker-compose.production.yml logs strapi
    exit 1
fi

# Check Frontend
if curl -f http://localhost:3000 >/dev/null 2>&1; then
    echo "✅ Frontend: Online"
else
    echo "❌ Frontend: Offline - Verificar logs"
    docker compose -f docker-compose.production.yml logs frontend
    exit 1
fi

# Check Nginx
if curl -f http://localhost/health >/dev/null 2>&1; then
    echo "✅ Nginx: Online"
else
    echo "❌ Nginx: Offline"
    exit 1
fi

echo ""
echo "🎉 Deploy concluído com sucesso!"
echo ""
echo "📊 Status dos serviços:"
echo "   - Frontend: http://localhost"
echo "   - Admin: http://localhost/admin"  
echo "   - API: http://localhost/api"
echo "   - Health: http://localhost/health"
echo ""
echo "📚 Comandos úteis:"
echo "   - docker compose -f docker-compose.production.yml logs -f"
echo "   - docker compose -f docker-compose.production.yml ps"
echo "   - docker compose -f docker-compose.production.yml down"
echo ""