#!/bin/bash

echo "🚀 Installing Strapi Content Types..."

# Diretório base do Strapi (ajuste conforme necessário)
STRAPI_DIR="/home/ec2-user/appdeapostas/cms/appdeapostas"

# Criar diretórios para os content types
mkdir -p "$STRAPI_DIR/src/api/category/content-types/category"
mkdir -p "$STRAPI_DIR/src/api/team/content-types/team"
mkdir -p "$STRAPI_DIR/src/api/app/content-types/app"
mkdir -p "$STRAPI_DIR/src/api/author/content-types/author"
mkdir -p "$STRAPI_DIR/src/api/article/content-types/article"

# Copiar schemas
cp strapi-schemas/category-schema.json "$STRAPI_DIR/src/api/category/content-types/category/schema.json"
cp strapi-schemas/team-schema.json "$STRAPI_DIR/src/api/team/content-types/team/schema.json"
cp strapi-schemas/app-schema.json "$STRAPI_DIR/src/api/app/content-types/app/schema.json"
cp strapi-schemas/author-schema.json "$STRAPI_DIR/src/api/author/content-types/author/schema.json"
cp strapi-schemas/article-schema.json "$STRAPI_DIR/src/api/article/content-types/article/schema.json"

echo "✅ Content type schemas installed!"
echo "🔄 Restart your Strapi server to apply changes"
echo "💡 Run: docker-compose restart strapi"