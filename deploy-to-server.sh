#!/bin/bash

# Deploy para Servidor AWS - AppdeApostas Portal
# Server: 3.143.118.176
# User: ec2-user

set -e

# Configurações
SERVER_IP="3.143.118.176"
SERVER_USER="ec2-user"
SERVER_PATH="/home/ec2-user/appdeapostas-native"
LOCAL_PACKAGE="appdeapostas-portal-native.tar.gz"
SSH_KEY="~/.ssh/aws-keys/acroud-brasil-server.pem"
SSH_OPTS="-i $SSH_KEY -o StrictHostKeyChecking=no"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

# Verificar se o arquivo existe
if [ ! -f "$LOCAL_PACKAGE" ]; then
    error "Arquivo $LOCAL_PACKAGE não encontrado. Execute primeiro: ./deploy.sh"
fi

log "🚀 Iniciando deploy para servidor AWS..."
log "📍 Servidor: $SERVER_IP"
log "👤 Usuário: $SERVER_USER"

# 1. Testar conectividade
log "🔍 Testando conectividade SSH..."
if ! ssh $SSH_OPTS -o ConnectTimeout=10 -o BatchMode=yes $SERVER_USER@$SERVER_IP exit 2>/dev/null; then
    error "Não foi possível conectar ao servidor. Verifique:"
    error "  1. Servidor está ligado"
    error "  2. Security Group permite SSH (porta 22)"
    error "  3. Chave SSH está configurada corretamente"
fi

log "✅ Conectividade OK"

# 2. Preparar diretório no servidor
log "📁 Preparando diretório no servidor..."
ssh $SSH_OPTS $SERVER_USER@$SERVER_IP << 'ENDSSH'
    # Parar processos existentes se houverem
    pkill -f "npm.*start" || true
    pkill -f "node.*strapi" || true
    
    # Criar diretório
    mkdir -p /home/ec2-user/appdeapostas-native
    cd /home/ec2-user/appdeapostas-native
    
    # Limpar arquivos antigos
    rm -rf dist/ logs/ *.tar.gz *.md *.js || true
    
    echo "Diretório preparado em $(pwd)"
ENDSSH

# 3. Transferir arquivos
log "📤 Transferindo arquivos para o servidor..."
scp $SSH_OPTS $LOCAL_PACKAGE $SERVER_USER@$SERVER_IP:$SERVER_PATH/

# 4. Instalar dependências e configurar
log "🔧 Configurando ambiente no servidor..."
ssh $SSH_OPTS $SERVER_USER@$SERVER_IP << 'ENDSSH'
    cd /home/ec2-user/appdeapostas-native
    
    # Extrair arquivos
    echo "Extraindo arquivos..."
    tar -xzf appdeapostas-portal-native.tar.gz
    
    # Verificar Node.js
    if ! command -v node &> /dev/null; then
        echo "Instalando Node.js 20..."
        curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
        sudo yum install -y nodejs
    fi
    
    # Verificar PM2
    if ! command -v pm2 &> /dev/null; then
        echo "Instalando PM2..."
        sudo npm install -g pm2
    fi
    
    # Criar diretório de logs
    mkdir -p logs
    
    # Copiar variáveis de ambiente
    cp .env.production .env
    
    echo "Node.js Version: $(node --version)"
    echo "NPM Version: $(npm --version)"
    echo "PM2 Version: $(pm2 --version)"
    
    echo "Setup concluído!"
ENDSSH

# 5. Instalar dependências de produção
log "📦 Instalando dependências..."
ssh $SSH_OPTS $SERVER_USER@$SERVER_IP << 'ENDSSH'
    cd /home/ec2-user/appdeapostas-native
    
    # Backend dependencies
    echo "Instalando dependências do backend..."
    cd dist/backend
    npm install --production
    cd ../..
    
    # Frontend dependencies (se necessário)
    echo "Frontend já buildado, não precisa instalar dependências"
ENDSSH

# 6. Configurar PM2
log "🚀 Configurando PM2..."
ssh $SSH_OPTS $SERVER_USER@$SERVER_IP << 'ENDSSH'
    cd /home/ec2-user/appdeapostas-native
    
    # Parar processos existentes
    pm2 delete all || true
    
    # Iniciar com PM2
    pm2 start ecosystem.config.js
    
    # Configurar auto-start
    pm2 startup
    pm2 save
    
    # Status
    pm2 status
ENDSSH

# 7. Verificar funcionamento
log "🔍 Verificando funcionamento..."
sleep 10

ssh $SSH_OPTS $SERVER_USER@$SERVER_IP << 'ENDSSH'
    echo "Status dos processos:"
    pm2 status
    
    echo ""
    echo "Testando backend..."
    curl -s http://localhost:1337/admin/init | head -20 || echo "Backend pode estar iniciando..."
    
    echo ""
    echo "Testando frontend..."
    curl -s http://localhost:3005 | head -20 || echo "Frontend pode estar iniciando..."
ENDSSH

log "✅ Deploy concluído!"
log ""
log "🌐 Para acessar:"
log "   Frontend: http://$SERVER_IP:3005"
log "   Backend API: http://$SERVER_IP:1337/api"  
log "   Admin: http://$SERVER_IP:1337/admin"
log ""
log "📋 Comandos úteis no servidor:"
log "   pm2 status          # Ver status dos processos"
log "   pm2 logs            # Ver logs"
log "   pm2 restart all     # Reiniciar todos os processos"
log "   pm2 stop all        # Parar todos os processos"

echo ""
log "🎉 Deploy finalizado com sucesso!"