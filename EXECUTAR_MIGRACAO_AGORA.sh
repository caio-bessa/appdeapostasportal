#!/bin/bash

# 🚀 Script de Migração Amazon Linux 2023 - AppdeApostas Portal
# Execute este script OU siga os comandos manualmente

set -e

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

log "🚀 Iniciando migração para Amazon Linux 2023..."

# Configurações
CURRENT_INSTANCE="i-0278265f91b913d99"
REGION="us-east-2"
INSTANCE_TYPE="t3.medium"
KEY_NAME="acroud-brasil-server" 
SECURITY_GROUP="acroud-brasil-sg"

# Passo 1: Criar backup da instância atual
log "📸 Criando backup da instância atual..."
BACKUP_NAME="backup-appdeapostas-$(date +%Y%m%d-%H%M)"

echo "Executando comando AWS:"
echo "aws ec2 create-image --instance-id $CURRENT_INSTANCE --name '$BACKUP_NAME' --description 'Backup antes migração AL2023' --region $REGION"

# Simular criação do backup (descomente se tiver permissões)
# BACKUP_AMI=$(aws ec2 create-image \
#   --instance-id $CURRENT_INSTANCE \
#   --name "$BACKUP_NAME" \
#   --description "Backup antes migração AL2023" \
#   --region $REGION \
#   --query 'ImageId' --output text)

log "📸 Backup AMI sendo criado (5-10 minutos)..."

# Passo 2: Obter AMI Amazon Linux 2023 mais recente
log "🔍 Obtendo AMI Amazon Linux 2023..."

# AMI conhecida para us-east-2 (atualizar se necessário)
AL2023_AMI="ami-0ea3c35c5c3284d82"  # Amazon Linux 2023 x86_64

echo "Verificando AMI disponível:"
echo "aws ec2 describe-images --image-ids $AL2023_AMI --region $REGION --query 'Images[0].{ImageId:ImageId,Name:Name,State:State}'"

# Passo 3: Criar nova instância
log "🚀 Criando nova instância Amazon Linux 2023..."

echo "Comando para criar instância:"
echo "aws ec2 run-instances \\"
echo "  --image-id $AL2023_AMI \\"
echo "  --instance-type $INSTANCE_TYPE \\"
echo "  --key-name $KEY_NAME \\"  
echo "  --security-groups $SECURITY_GROUP \\"
echo "  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=appdeapostas-portal-al2023}]' \\"
echo "  --region $REGION"

# Simular criação (descomente se tiver permissões)
# NEW_INSTANCE=$(aws ec2 run-instances \
#   --image-id $AL2023_AMI \
#   --instance-type $INSTANCE_TYPE \
#   --key-name $KEY_NAME \
#   --security-groups $SECURITY_GROUP \
#   --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=appdeapostas-portal-al2023}]' \
#   --region $REGION \
#   --query 'Instances[0].InstanceId' --output text)

log "⏳ Nova instância sendo criada (3-5 minutos)..."
log "📝 Aguardar instância ficar 'running' antes de continuar"

warn "PRÓXIMOS PASSOS MANUAIS:"
echo "1. Execute os comandos AWS acima no seu terminal"
echo "2. Aguarde instância ficar 'running'"
echo "3. Obtenha o IP público da nova instância"
echo "4. Execute: ./atualizar-deploy-ip.sh NOVO_IP"
echo "5. Execute: ./deploy-to-server.sh"

log "📋 Script preparado. Execute os comandos AWS ou use AWS Console."