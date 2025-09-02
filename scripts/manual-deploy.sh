#!/bin/bash

# Manual deployment script for existing EC2 instance
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Configuration - UPDATE THESE VALUES
EC2_IP="${1:-3.143.118.176}"  # Default to the known IP
EC2_USER="ec2-user"  # Amazon Linux uses ec2-user
EC2_KEY="~/.ssh/aws-keys/acroud-brasil-server.pem"
REMOTE_DIR="/home/ec2-user/appdeapostas"

if [[ -z "$EC2_IP" ]]; then
    echo "Usage: $0 <EC2_IP_ADDRESS>"
    echo "Example: $0 54.123.45.67"
    exit 1
fi

log_info "🚀 Manual deployment to EC2: $EC2_IP"

# Test SSH connection
log_step "Testing SSH connection..."
if ssh -i ~/.ssh/aws-keys/acroud-brasil-server.pem -o ConnectTimeout=10 -o StrictHostKeyChecking=no $EC2_USER@$EC2_IP "echo 'SSH connection successful'" &>/dev/null; then
    log_info "✅ SSH connection successful"
else
    log_warn "❌ Cannot connect to EC2. Please check:"
    log_warn "  - IP address: $EC2_IP"
    log_warn "  - Security group allows SSH (port 22)"
    log_warn "  - Key file exists: ~/.ssh/caio-backlink-key.pem"
    exit 1
fi

# Install Docker and dependencies
log_step "Installing dependencies on EC2..."
ssh -i ~/.ssh/aws-keys/acroud-brasil-server.pem -o StrictHostKeyChecking=no $EC2_USER@$EC2_IP << 'ENDSSH'
    # Update system (Amazon Linux)
    sudo yum update -y

    # Install Docker if not present
    if ! command -v docker &> /dev/null; then
        echo "Installing Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo usermod -aG docker $USER
        rm get-docker.sh
    else
        echo "Docker already installed"
    fi

    # Install Docker Compose if not present
    if ! command -v docker-compose &> /dev/null; then
        echo "Installing Docker Compose..."
        sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
    else
        echo "Docker Compose already installed"
    fi

    # Install additional tools (Amazon Linux)
    sudo yum install -y git curl wget unzip

    echo "✅ Dependencies installed successfully"
ENDSSH

log_info "✅ Dependencies installed"

# Upload project files
log_step "Uploading project files..."
ssh -i ~/.ssh/aws-keys/acroud-brasil-server.pem $EC2_USER@$EC2_IP "mkdir -p $REMOTE_DIR"

rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude '.next' \
    --exclude 'build' \
    --exclude '.DS_Store' \
    --exclude '*.log' \
    -e "ssh -i ~/.ssh/aws-keys/acroud-brasil-server.pem -o StrictHostKeyChecking=no" \
    . $EC2_USER@$EC2_IP:$REMOTE_DIR/

log_info "✅ Project files uploaded"

# Deploy application
log_step "Deploying application..."
ssh -i ~/.ssh/aws-keys/acroud-brasil-server.pem $EC2_USER@$EC2_IP << ENDSSH
    cd $REMOTE_DIR

    # Create environment variables
    cat > .env << 'EOF'
# Database
DB_PASSWORD=appdeapostas_secure_2024!
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=appdeapostas
DATABASE_USERNAME=postgres
DATABASE_SSL=false

# JWT Secrets (generated)
JWT_SECRET=\$(openssl rand -base64 32 | tr -d '\\n')
ADMIN_JWT_SECRET=\$(openssl rand -base64 32 | tr -d '\\n')
APP_KEYS=\$(openssl rand -base64 32 | tr -d '\\n'),\$(openssl rand -base64 32 | tr -d '\\n')
API_TOKEN_SALT=\$(openssl rand -base64 16 | tr -d '\\n')
STRAPI_API_TOKEN=\$(openssl rand -base64 32 | tr -d '\\n')

# URLs
PUBLIC_URL=https://appdeapostas.com.br
NEXT_PUBLIC_SITE_URL=https://appdeapostas.com.br
NEXT_PUBLIC_STRAPI_URL=https://appdeapostas.com.br

# Environment
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
STRAPI_TELEMETRY_DISABLED=true
NEXT_TELEMETRY_DISABLED=1
EOF

    # Create SSL directory with self-signed certificates
    mkdir -p nginx/ssl
    if [ ! -f "nginx/ssl/cert.pem" ]; then
        echo "Generating SSL certificates..."
        sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout nginx/ssl/key.pem \
            -out nginx/ssl/cert.pem \
            -subj "/C=BR/ST=SP/L=SaoPaulo/O=AppDeApostas/CN=appdeapostas.com.br"
        
        # Set proper permissions
        sudo chmod 644 nginx/ssl/cert.pem
        sudo chmod 600 nginx/ssl/key.pem
    fi

    # Stop any existing containers
    echo "Stopping existing containers..."
    docker-compose -f docker-compose.production.yml down 2>/dev/null || true

    # Clean up old images to free space
    docker image prune -f 2>/dev/null || true

    # Start the application
    echo "Starting application containers..."
    docker-compose -f docker-compose.production.yml up -d --build

    # Wait for services to stabilize
    echo "Waiting for services to start..."
    sleep 60

    # Check container status
    echo "Container status:"
    docker-compose -f docker-compose.production.yml ps

    # Test internal connectivity
    echo "Testing internal services..."
    timeout 30 bash -c 'until docker exec appdeapostas-postgres pg_isready -h localhost -p 5432; do sleep 2; done' 2>/dev/null || echo "PostgreSQL check timeout"
    
    # Check if nginx is responding
    if curl -k -s -f http://localhost/health > /dev/null 2>&1; then
        echo "✅ Application is responding"
    else
        echo "⚠️ Application health check failed, checking logs..."
        docker-compose -f docker-compose.production.yml logs --tail=50
    fi

    echo "✅ Deployment completed"
ENDSSH

log_info "✅ Application deployed"

# Final tests
log_step "Testing deployment..."
log_info "Testing HTTP access..."
if curl -s -o /dev/null -w "%{http_code}" http://$EC2_IP | grep -q "200\|301\|302"; then
    log_info "✅ HTTP responding"
else
    log_warn "⚠️ HTTP not responding"
fi

log_info "Testing HTTPS access..."
if curl -k -s -o /dev/null -w "%{http_code}" https://$EC2_IP | grep -q "200\|301\|302"; then
    log_info "✅ HTTPS responding"
else
    log_warn "⚠️ HTTPS not responding"
fi

log_info "🎉 Deployment completed!"
log_info ""
log_info "📋 Summary:"
log_info "   - Server IP: $EC2_IP"
log_info "   - HTTP: http://$EC2_IP"
log_info "   - HTTPS: https://$EC2_IP"
log_info ""
log_info "📝 Next steps:"
log_info "   1. Update Cloudflare DNS A record to point appdeapostas.com.br to $EC2_IP"
log_info "   2. Enable Cloudflare proxy (orange cloud) for SSL"
log_info "   3. Access https://appdeapostas.com.br"
log_info "   4. Set up Strapi admin at https://appdeapostas.com.br/admin"
log_info ""
log_info "🔧 Troubleshooting:"
log_info "   - SSH: ssh -i ~/.ssh/aws-keys/acroud-brasil-server.pem ec2-user@$EC2_IP"
log_info "   - Logs: docker-compose -f docker-compose.production.yml logs -f"
log_info "   - Status: docker-compose -f docker-compose.production.yml ps"