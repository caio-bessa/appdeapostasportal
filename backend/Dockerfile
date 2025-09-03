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

# Copiar código fonte
COPY . .

# Criar diretório para uploads
RUN mkdir -p /opt/app/public/uploads

# Expor porta
EXPOSE 1337

# Comando para desenvolvimento
CMD ["npm", "run", "develop"]