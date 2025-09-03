# Dockerfile para desenvolvimento - Backend Strapi
FROM node:20-alpine

WORKDIR /opt/app

# Instalar dependências do sistema necessárias para Strapi
RUN apk update && apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    zlib-dev \
    libpng-dev \
    vips-dev \
    git \
    && rm -rf /var/cache/apk/*

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm install

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S strapi -u 1001 -G nodejs

# Copiar código fonte
COPY . .

# Criar diretório para uploads e ajustar permissões
RUN mkdir -p /opt/app/public/uploads && \
    chown -R strapi:nodejs /opt/app

# Mudar para usuário não-root
USER strapi

# Expor porta
EXPOSE 1337

# Comando para desenvolvimento
CMD ["npm", "run", "develop"]