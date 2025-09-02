#!/bin/bash

# Apps de Apostas Brasil - EC2 Deployment Script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="appdeapostas"
DOMAIN="appdeapostas.com.br"
EC2_KEY_PATH="~/.ssh/caio-backlink-key.pem"
EC2_USER="ubuntu"
REMOTE_DIR="/home/ubuntu/appdeapostas"

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Check if AWS CLI is configured
check_aws_cli() {
    if ! command -v aws &> /dev/null; then
        log_error "AWS CLI not found. Please install it first."
        exit 1
    fi

    if ! aws sts get-caller-identity &> /dev/null; then
        log_error "AWS CLI not configured. Please run 'aws configure'"
        exit 1
    fi

    log_info "✅ AWS CLI configured"
}

# Find or create EC2 instance
setup_ec2_instance() {
    log_step "Setting up EC2 instance..."

    # Try to find existing instance
    INSTANCE_ID=$(aws ec2 describe-instances \
        --filters "Name=tag:Name,Values=${PROJECT_NAME}" \
                 "Name=instance-state-name,Values=running,pending,stopping,stopped" \
        --query 'Reservations[0].Instances[0].InstanceId' \
        --output text 2>/dev/null || echo "None")

    if [[ "$INSTANCE_ID" != "None" && "$INSTANCE_ID" != "null" ]]; then
        log_info "Found existing EC2 instance: $INSTANCE_ID"
        
        # Start instance if stopped
        STATE=$(aws ec2 describe-instances --instance-ids $INSTANCE_ID \
            --query 'Reservations[0].Instances[0].State.Name' --output text)
        
        if [[ "$STATE" == "stopped" ]]; then
            log_info "Starting stopped instance..."
            aws ec2 start-instances --instance-ids $INSTANCE_ID
            aws ec2 wait instance-running --instance-ids $INSTANCE_ID
        fi
    else
        log_info "Creating new EC2 instance..."
        
        # Get default VPC and subnet
        VPC_ID=$(aws ec2 describe-vpcs --filters "Name=isDefault,Values=true" \
            --query 'Vpcs[0].VpcId' --output text)
        
        SUBNET_ID=$(aws ec2 describe-subnets --filters "Name=vpc-id,Values=$VPC_ID" \
            --query 'Subnets[0].SubnetId' --output text)

        # Create security group if it doesn't exist
        SG_ID=$(aws ec2 describe-security-groups \
            --filters "Name=group-name,Values=${PROJECT_NAME}-sg" \
            --query 'SecurityGroups[0].GroupId' --output text 2>/dev/null || echo "None")

        if [[ "$SG_ID" == "None" || "$SG_ID" == "null" ]]; then
            log_info "Creating security group..."
            SG_ID=$(aws ec2 create-security-group \
                --group-name "${PROJECT_NAME}-sg" \
                --description "Security group for $PROJECT_NAME" \
                --vpc-id $VPC_ID \
                --query 'GroupId' --output text)

            # Add rules
            aws ec2 authorize-security-group-ingress \
                --group-id $SG_ID \
                --protocol tcp \
                --port 22 \
                --cidr 0.0.0.0/0

            aws ec2 authorize-security-group-ingress \
                --group-id $SG_ID \
                --protocol tcp \
                --port 80 \
                --cidr 0.0.0.0/0

            aws ec2 authorize-security-group-ingress \
                --group-id $SG_ID \
                --protocol tcp \
                --port 443 \
                --cidr 0.0.0.0/0
        fi

        # Launch instance
        INSTANCE_ID=$(aws ec2 run-instances \
            --image-id ami-0e86e20dae90224ad \
            --instance-type t3.small \
            --key-name caio-backlink-key \
            --security-group-ids $SG_ID \
            --subnet-id $SUBNET_ID \
            --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=$PROJECT_NAME}]" \
            --query 'Instances[0].InstanceId' \
            --output text)

        log_info "Waiting for instance to start..."
        aws ec2 wait instance-running --instance-ids $INSTANCE_ID
    fi

    # Get instance IP
    EC2_IP=$(aws ec2 describe-instances --instance-ids $INSTANCE_ID \
        --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)

    log_info "✅ EC2 Instance ready: $INSTANCE_ID ($EC2_IP)"
    echo "EC2_IP=$EC2_IP" > .env.deploy
    echo "INSTANCE_ID=$INSTANCE_ID" >> .env.deploy
}

# Install dependencies on EC2
setup_ec2_dependencies() {
    log_step "Installing dependencies on EC2..."

    ssh -i ~/.ssh/caio-backlink-key.pem -o StrictHostKeyChecking=no ubuntu@$EC2_IP << 'ENDSSH'
        # Update system
        sudo apt-get update

        # Install Docker
        if ! command -v docker &> /dev/null; then
            curl -fsSL https://get.docker.com -o get-docker.sh
            sudo sh get-docker.sh
            sudo usermod -aG docker ubuntu
        fi

        # Install Docker Compose
        if ! command -v docker-compose &> /dev/null; then
            sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
            sudo chmod +x /usr/local/bin/docker-compose
        fi

        # Install other tools
        sudo apt-get install -y git curl wget unzip

        echo "✅ Dependencies installed"
ENDSSH

    log_info "✅ EC2 dependencies installed"
}

# Upload project files
upload_project() {
    log_step "Uploading project files..."

    # Create remote directory
    ssh -i ~/.ssh/caio-backlink-key.pem ubuntu@$EC2_IP "mkdir -p $REMOTE_DIR"

    # Upload files (excluding node_modules and .git)
    rsync -avz --progress \
        --exclude 'node_modules' \
        --exclude '.git' \
        --exclude '.next' \
        --exclude 'build' \
        --exclude '.DS_Store' \
        -e "ssh -i ~/.ssh/caio-backlink-key.pem -o StrictHostKeyChecking=no" \
        . ubuntu@$EC2_IP:$REMOTE_DIR/

    log_info "✅ Project files uploaded"
}

# Deploy application
deploy_application() {
    log_step "Deploying application..."

    ssh -i ~/.ssh/caio-backlink-key.pem ubuntu@$EC2_IP << ENDSSH
        cd $REMOTE_DIR

        # Create environment file
        cat > .env << EOF
DB_PASSWORD=appdeapostas123!
JWT_SECRET=\$(openssl rand -base64 32)
ADMIN_JWT_SECRET=\$(openssl rand -base64 32)
APP_KEYS=\$(openssl rand -base64 32),\$(openssl rand -base64 32),\$(openssl rand -base64 32),\$(openssl rand -base64 32)
API_TOKEN_SALT=\$(openssl rand -base64 16)
STRAPI_API_TOKEN=\$(openssl rand -base64 32)
EOF

        # Create SSL directory and certificates
        mkdir -p nginx/ssl
        
        # Generate self-signed certificates (will be replaced by Cloudflare)
        if [ ! -f "nginx/ssl/cert.pem" ]; then
            sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
                -keyout nginx/ssl/key.pem \
                -out nginx/ssl/cert.pem \
                -subj "/C=BR/ST=SP/L=SaoPaulo/O=AppDeApostas/CN=$DOMAIN"
        fi

        # Stop existing containers
        docker-compose -f docker-compose.production.yml down 2>/dev/null || true

        # Build and start containers
        docker-compose -f docker-compose.production.yml up -d --build

        # Wait for services to start
        sleep 30

        # Check if services are running
        docker-compose -f docker-compose.production.yml ps

        echo "✅ Application deployed"
ENDSSH

    log_info "✅ Application deployed"
}

# Update Cloudflare DNS
update_cloudflare_dns() {
    log_step "Updating Cloudflare DNS..."

    # Check if Cloudflare CLI is available
    if command -v cf &> /dev/null; then
        log_info "Using Cloudflare CLI to update DNS..."
        # Add Cloudflare DNS update commands here
    else
        log_warn "Cloudflare CLI not found. Please manually update DNS:"
        log_warn "Point $DOMAIN to $EC2_IP"
        log_warn "Make sure to enable Cloudflare proxy (orange cloud) for SSL"
    fi
}

# Test deployment
test_deployment() {
    log_step "Testing deployment..."

    # Test direct IP access
    log_info "Testing direct server access..."
    if curl -k -s -o /dev/null -w "%{http_code}" https://$EC2_IP | grep -q "200\|301\|302"; then
        log_info "✅ Server responding"
    else
        log_warn "⚠️ Server not responding on HTTPS, trying HTTP..."
        if curl -s -o /dev/null -w "%{http_code}" http://$EC2_IP | grep -q "200\|301\|302"; then
            log_info "✅ Server responding on HTTP"
        else
            log_error "❌ Server not responding"
        fi
    fi

    # Test domain (if DNS is updated)
    log_info "Testing domain access..."
    if curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN | grep -q "200"; then
        log_info "✅ Domain accessible"
    else
        log_warn "⚠️ Domain not yet accessible (DNS propagation may take time)"
    fi
}

# Main execution
main() {
    log_info "🚀 Starting deployment of Apps de Apostas Brasil to EC2"
    
    check_aws_cli
    setup_ec2_instance
    setup_ec2_dependencies
    upload_project
    deploy_application
    update_cloudflare_dns
    test_deployment

    log_info "🎉 Deployment completed!"
    log_info "📋 Summary:"
    log_info "   - EC2 Instance: $INSTANCE_ID"
    log_info "   - IP Address: $EC2_IP"
    log_info "   - Domain: https://$DOMAIN"
    log_info "   - Strapi Admin: https://$DOMAIN/admin"
    log_info ""
    log_info "📝 Next steps:"
    log_info "   1. Update Cloudflare DNS to point to $EC2_IP"
    log_info "   2. Access https://$DOMAIN to verify the site"
    log_info "   3. Configure Strapi admin at https://$DOMAIN/admin"
}

# Run main function
main "$@"