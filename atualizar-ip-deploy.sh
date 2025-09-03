#!/bin/bash

# 🔄 Script para Atualizar IP no Deploy - AppdeApostas Portal
# Uso: ./atualizar-ip-deploy.sh NOVO_IP

set -e

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +'%H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

warn() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

# Verificar se IP foi fornecido
if [ $# -eq 0 ]; then
    error "Uso: ./atualizar-ip-deploy.sh NOVO_IP"
fi

NOVO_IP=$1
SCRIPT_FILE="deploy-to-server.sh"

# Validar formato do IP
if ! [[ $NOVO_IP =~ ^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$ ]]; then
    error "IP inválido. Use formato: 123.456.789.123"
fi

log "🔄 Atualizando IP no script de deploy..."

# Verificar se arquivo existe
if [ ! -f "$SCRIPT_FILE" ]; then
    error "Arquivo $SCRIPT_FILE não encontrado!"
fi

# Backup do arquivo original
cp "$SCRIPT_FILE" "${SCRIPT_FILE}.backup"
log "📋 Backup criado: ${SCRIPT_FILE}.backup"

# Atualizar IP no script
sed -i.tmp "s/^SERVER_IP=.*/SERVER_IP=\"$NOVO_IP\"/" "$SCRIPT_FILE"
rm "${SCRIPT_FILE}.tmp" 2>/dev/null || true

# Verificar se foi atualizado
if grep -q "SERVER_IP=\"$NOVO_IP\"" "$SCRIPT_FILE"; then
    log "✅ IP atualizado com sucesso para: $NOVO_IP"
else
    error "❌ Falha ao atualizar IP no script"
fi

# Mostrar linha modificada
log "📝 Linha atualizada:"
grep "SERVER_IP=" "$SCRIPT_FILE"

log ""
log "🚀 Próximo passo: Execute o deploy"
log "   ./deploy-to-server.sh"
log ""
log "🔍 Para testar conectividade antes do deploy:"
log "   ssh -i ~/.ssh/aws-keys/acroud-brasil-server.pem ec2-user@$NOVO_IP"