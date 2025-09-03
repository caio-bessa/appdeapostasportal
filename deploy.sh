#!/bin/bash

# Deploy Script para AppdeApostas Portal (Nativo - Sem Docker)

set -e

echo "🚀 Iniciando deploy do AppdeApostas Portal..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log com cores
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
}

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    error "Não foi encontrado package.json. Execute o script no diretório raiz do projeto."
    exit 1
fi

log "📁 Diretório atual: $(pwd)"

# 1. BUILD DO BACKEND (STRAPI)
log "🔨 Fazendo build do backend Strapi..."
cd backend
npm install --production=false
npm run build

log "✅ Backend build concluído"

# 2. BUILD DO FRONTEND (NEXT.JS)
log "🔨 Fazendo build do frontend Next.js..."
cd ../frontend/appdeapostas
npm install --production=false
npm run build

log "✅ Frontend build concluído"

# 3. VOLTAR PARA RAIZ
cd ../../

# 4. PREPARAR ARQUIVOS DE PRODUÇÃO
log "📦 Preparando arquivos para produção..."

# Criar diretório de distribuição
mkdir -p dist/backend
mkdir -p dist/frontend

# Copiar backend
cp -r backend/build dist/backend/
cp -r backend/config dist/backend/
cp -r backend/database dist/backend/ 2>/dev/null || true
cp -r backend/node_modules dist/backend/
cp -r backend/package*.json dist/backend/
cp -r backend/public dist/backend/ 2>/dev/null || true
cp -r backend/src dist/backend/
cp backend/.env dist/backend/ 2>/dev/null || true

# Copiar frontend build
cp -r frontend/appdeapostas/.next dist/frontend/
cp -r frontend/appdeapostas/public dist/frontend/
cp -r frontend/appdeapostas/package*.json dist/frontend/
cp frontend/appdeapostas/next.config.js dist/frontend/ 2>/dev/null || true

# 5. CRIAR SCRIPTS DE PRODUÇÃO
log "📜 Criando scripts de produção..."

# Script para iniciar backend
cat > dist/start-backend.sh << 'EOF'
#!/bin/bash
echo "🚀 Iniciando Strapi em produção..."
cd backend
NODE_ENV=production npm run start
EOF

# Script para iniciar frontend
cat > dist/start-frontend.sh << 'EOF'
#!/bin/bash
echo "🚀 Iniciando Next.js em produção..."
cd frontend
npm start
EOF

# Script principal
cat > dist/start-production.sh << 'EOF'
#!/bin/bash
echo "🚀 Iniciando AppdeApostas Portal em produção..."

# Iniciar backend em background
./start-backend.sh &
BACKEND_PID=$!

# Aguardar backend inicializar
sleep 10

# Iniciar frontend
./start-frontend.sh &
FRONTEND_PID=$!

echo "✅ Serviços iniciados:"
echo "   Backend (PID: $BACKEND_PID): http://localhost:1337"
echo "   Frontend (PID: $FRONTEND_PID): http://localhost:3005"

# Aguardar os processos
wait $BACKEND_PID $FRONTEND_PID
EOF

# Tornar scripts executáveis
chmod +x dist/*.sh

log "✅ Deploy preparado em ./dist/"
log "📋 Para executar em produção:"
log "   1. Copie a pasta 'dist' para seu servidor"
log "   2. Execute: ./start-production.sh"
log ""
log "🌐 URLs de produção:"
log "   Frontend: http://localhost:3005"
log "   Backend API: http://localhost:1337/api"
log "   Admin: http://localhost:1337/admin"

echo ""
log "🎉 Deploy concluído com sucesso!"