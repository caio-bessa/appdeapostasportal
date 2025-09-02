#!/bin/bash

echo "🚀 STRAPI V5 DEVELOPMENT MODE FIX - URGENT IMPLEMENTATION"
echo "=========================================================="

# Update development compose for temporary development mode
cat > /tmp/docker-compose.development.yml << 'EOF'
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:14-alpine
    environment:
      POSTGRES_DB: appdeapostas
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD:-changeme123}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network
    restart: unless-stopped
    container_name: appdeapostas-postgres

  # Strapi CMS - DEVELOPMENT MODE
  strapi:
    build:
      context: ./cms/appdeapostas
      dockerfile: Dockerfile.prod
    environment:
      NODE_ENV: development  # CHANGED TO DEVELOPMENT
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: appdeapostas
      DATABASE_USERNAME: postgres
      DATABASE_PASSWORD: ${DB_PASSWORD:-changeme123}
      DATABASE_SSL: false
      JWT_SECRET: ${JWT_SECRET:-your-jwt-secret-key}
      ADMIN_JWT_SECRET: ${ADMIN_JWT_SECRET:-your-admin-jwt-secret}
      APP_KEYS: ${APP_KEYS:-app-key1,app-key2,app-key3,app-key4}
      API_TOKEN_SALT: ${API_TOKEN_SALT:-your-api-token-salt}
      HOST: 0.0.0.0
      PORT: 1337
      PUBLIC_URL: https://appdeapostas.com.br
    depends_on:
      - postgres
    volumes:
      - strapi_uploads:/app/public/uploads
    networks:
      - app-network
    restart: unless-stopped
    container_name: appdeapostas-strapi
    # DEVELOPMENT MODE COMMAND
    command: ["npm", "run", "develop"]

  # Next.js Frontend
  frontend:
    build:
      context: ./frontend/appdeapostas
      dockerfile: Dockerfile.prod
    environment:
      NODE_ENV: production
      NEXT_PUBLIC_SITE_URL: https://appdeapostas.com.br
      NEXT_PUBLIC_API_URL: https://appdeapostas.com.br/api/v1
      NEXT_PUBLIC_STRAPI_URL: https://appdeapostas.com.br/admin
      STRAPI_API_TOKEN: ${STRAPI_API_TOKEN:-}
    depends_on:
      - strapi
    networks:
      - app-network
    restart: unless-stopped
    container_name: appdeapostas-frontend

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - strapi_uploads:/var/www/uploads:ro
    depends_on:
      - frontend
      - strapi
    networks:
      - app-network
    restart: unless-stopped
    container_name: appdeapostas-nginx

networks:
  app-network:
    driver: bridge

volumes:
  postgres_data:
  strapi_uploads:
EOF

echo "✅ Development docker-compose.yml created"

# Create comprehensive content types setup
cat > /tmp/setup-content-types.js << 'EOF'
#!/usr/bin/env node

/**
 * COMPREHENSIVE STRAPI CONTENT TYPES SETUP
 * This script creates all content types via API when in development mode
 */

const axios = require('axios');

const ADMIN_URL = 'https://appdeapostas.com.br/admin';
const API_URL = 'https://appdeapostas.com.br/api';

// Admin credentials
const ADMIN_EMAIL = 'caio.bessa@acroud.media';
const ADMIN_PASSWORD = 'gIhmyj-dymtyp-gitqe0';

// Content types definitions
const CONTENT_TYPES = {
  category: {
    singularName: 'category',
    pluralName: 'categories',
    displayName: 'Category',
    description: 'Content categories for articles and sports',
    attributes: {
      name: { type: 'string', required: true, unique: true },
      slug: { type: 'uid', targetField: 'name', required: true },
      description: { type: 'text' },
      seo_title: { type: 'string' },
      seo_description: { type: 'text' },
      featured: { type: 'boolean', default: false },
      articles: {
        type: 'relation',
        relation: 'oneToMany',
        target: 'api::article.article',
        mappedBy: 'category'
      }
    }
  },
  author: {
    singularName: 'author',
    pluralName: 'authors',
    displayName: 'Author',
    description: 'Article authors and content creators',
    attributes: {
      name: { type: 'string', required: true },
      slug: { type: 'uid', targetField: 'name', required: true },
      bio: { type: 'richtext' },
      specialization: { type: 'string' },
      avatar_url: { type: 'string' },
      social_links: { type: 'json' },
      articles: {
        type: 'relation',
        relation: 'oneToMany',
        target: 'api::article.article',
        mappedBy: 'author'
      }
    }
  },
  team: {
    singularName: 'team',
    pluralName: 'teams',
    displayName: 'Team',
    description: 'Sports teams and organizations',
    attributes: {
      name: { type: 'string', required: true, unique: true },
      slug: { type: 'uid', targetField: 'name', required: true },
      city: { type: 'string' },
      state: { type: 'string' },
      league: { type: 'string' },
      logo_url: { type: 'string' },
      founded_year: { type: 'integer' },
      articles: {
        type: 'relation',
        relation: 'manyToMany',
        target: 'api::article.article',
        mappedBy: 'related_teams'
      }
    }
  },
  app: {
    singularName: 'app',
    pluralName: 'apps',
    displayName: 'App',
    description: 'Betting apps and platforms',
    attributes: {
      name: { type: 'string', required: true, unique: true },
      slug: { type: 'uid', targetField: 'name', required: true },
      description: { type: 'richtext' },
      rating: { type: 'decimal', min: 1, max: 5 },
      pros: { type: 'richtext' },
      cons: { type: 'richtext' },
      bonus_info: { type: 'richtext' },
      minimum_deposit: { type: 'integer' },
      payment_methods: { type: 'richtext' },
      license_info: { type: 'string' },
      download_url: { type: 'string' },
      featured: { type: 'boolean', default: false },
      articles: {
        type: 'relation',
        relation: 'manyToMany',
        target: 'api::article.article',
        mappedBy: 'related_apps'
      }
    }
  },
  article: {
    singularName: 'article',
    pluralName: 'articles',
    displayName: 'Article',
    description: 'News articles and blog posts',
    attributes: {
      title: { type: 'string', required: true },
      slug: { type: 'uid', targetField: 'title', required: true },
      content: { type: 'richtext', required: true },
      excerpt: { type: 'text' },
      seo_title: { type: 'string' },
      seo_description: { type: 'text' },
      featured_image_url: { type: 'string' },
      published_at: { type: 'datetime' },
      featured: { type: 'boolean', default: false },
      category: {
        type: 'relation',
        relation: 'manyToOne',
        target: 'api::category.category',
        inversedBy: 'articles'
      },
      author: {
        type: 'relation',
        relation: 'manyToOne',
        target: 'api::author.author',
        inversedBy: 'articles'
      },
      related_apps: {
        type: 'relation',
        relation: 'manyToMany',
        target: 'api::app.app',
        inversedBy: 'articles'
      },
      related_teams: {
        type: 'relation',
        relation: 'manyToMany',
        target: 'api::team.team',
        inversedBy: 'articles'
      }
    }
  }
};

async function loginAdmin() {
  try {
    const response = await axios.post(`${ADMIN_URL}/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    return response.data.token;
  } catch (error) {
    throw new Error(`Admin login failed: ${error.message}`);
  }
}

async function createContentType(token, contentType, definition) {
  try {
    const response = await axios.post(
      `${ADMIN_URL}/content-type-builder/content-types`,
      {
        contentType: {
          kind: 'collectionType',
          collectionName: definition.pluralName,
          info: {
            singularName: definition.singularName,
            pluralName: definition.pluralName,
            displayName: definition.displayName,
            description: definition.description
          },
          options: {
            draftAndPublish: false
          },
          attributes: definition.attributes
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create ${contentType}: ${error.message}`);
  }
}

async function setupPublicPermissions(token) {
  try {
    // Get public role
    const rolesResponse = await axios.get(`${ADMIN_URL}/users-permissions/roles`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const publicRole = rolesResponse.data.roles.find(role => role.type === 'public');
    
    if (!publicRole) {
      throw new Error('Public role not found');
    }

    // Set permissions for all content types
    const permissions = {};
    Object.keys(CONTENT_TYPES).forEach(contentType => {
      permissions[`api::${contentType}.${contentType}`] = {
        find: { enabled: true },
        findOne: { enabled: true }
      };
    });

    await axios.put(
      `${ADMIN_URL}/users-permissions/roles/${publicRole.id}`,
      {
        ...publicRole,
        permissions
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Public permissions configured');
  } catch (error) {
    console.error('⚠️  Failed to setup permissions:', error.message);
  }
}

async function main() {
  console.log('🚀 Starting Strapi Content Types Setup...');
  console.log('==========================================');

  try {
    // Login to admin
    console.log('🔐 Logging into Strapi admin...');
    const token = await loginAdmin();
    console.log('✅ Admin login successful');

    // Create content types in order (dependencies matter)
    const creationOrder = ['category', 'author', 'team', 'app', 'article'];
    
    for (const contentType of creationOrder) {
      console.log(`📝 Creating ${contentType} content type...`);
      try {
        await createContentType(token, contentType, CONTENT_TYPES[contentType]);
        console.log(`✅ ${contentType} created successfully`);
      } catch (error) {
        console.error(`❌ Failed to create ${contentType}:`, error.message);
      }
    }

    // Setup public permissions
    console.log('🔑 Setting up public permissions...');
    await setupPublicPermissions(token);

    console.log('\n🎉 Content types setup completed!');
    console.log('⚠️  Strapi will restart automatically to load new content types');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { CONTENT_TYPES, loginAdmin, createContentType };
EOF

echo "✅ Content types setup script created"

# Create sample data population script
cat > /tmp/populate-sample-data.js << 'EOF'
#!/usr/bin/env node

/**
 * SAMPLE DATA POPULATION SCRIPT
 * Populates Strapi with realistic sample data for testing
 */

const axios = require('axios');

const API_TOKEN = '5da051f16391ca01d8f0d9072a972299bf0d66677cef07bb2f67efb1134137f791ad6bc07b9474534b1551f6bf265e6bbc64cc638210e49f379204d92da05fd216dad0e67b74f4f6748446428431b33a35b83ae47869eb06056be88b309a9f93cac977cbaef8d0bc05067be44d1641ab452e3a499be89fd2d8c605d493567a4f';
const API_URL = 'https://appdeapostas.com.br/api';

const SAMPLE_DATA = {
  categories: [
    {
      name: 'Futebol',
      slug: 'futebol',
      description: 'Notícias e análises sobre futebol brasileiro e internacional',
      seo_title: 'Futebol - Notícias e Apostas',
      seo_description: 'Últimas notícias, análises e dicas de apostas no futebol',
      featured: true
    },
    {
      name: 'Reviews de Apps',
      slug: 'reviews-apps',
      description: 'Reviews detalhados dos melhores apps de apostas',
      seo_title: 'Reviews - Melhores Apps de Apostas',
      seo_description: 'Reviews completos dos principais aplicativos de apostas esportivas',
      featured: true
    },
    {
      name: 'Basquete',
      slug: 'basquete',
      description: 'Cobertura completa do basquete nacional e NBA',
      featured: false
    }
  ],
  authors: [
    {
      name: 'João Silva',
      slug: 'joao-silva',
      bio: 'Jornalista esportivo com 10 anos de experiência cobrindo futebol brasileiro',
      specialization: 'Futebol',
      avatar_url: 'https://via.placeholder.com/150',
      social_links: {
        twitter: '@joaosilva',
        instagram: '@joaosilva_sports'
      }
    },
    {
      name: 'Maria Santos',
      slug: 'maria-santos',
      bio: 'Especialista em apostas esportivas e análises de mercado',
      specialization: 'Análises de Apostas',
      avatar_url: 'https://via.placeholder.com/150'
    }
  ],
  teams: [
    {
      name: 'Flamengo',
      slug: 'flamengo',
      city: 'Rio de Janeiro',
      state: 'RJ',
      league: 'Série A',
      founded_year: 1895
    },
    {
      name: 'Palmeiras',
      slug: 'palmeiras', 
      city: 'São Paulo',
      state: 'SP',
      league: 'Série A',
      founded_year: 1914
    }
  ],
  apps: [
    {
      name: 'Bet365',
      slug: 'bet365',
      description: 'Uma das maiores casas de apostas do mundo',
      rating: 4.5,
      pros: 'Interface intuitiva, odds competitivas, streaming ao vivo',
      cons: 'Atendimento poderia ser melhor',
      bonus_info: '100% até R$ 500 no primeiro depósito',
      minimum_deposit: 30,
      payment_methods: 'PIX, Cartão de Crédito, Transferência Bancária',
      license_info: 'Licenciada em Gibraltar',
      download_url: 'https://bet365.com/app',
      featured: true
    },
    {
      name: 'Betfair',
      slug: 'betfair',
      description: 'Casa de apostas com exchange e mercados únicos',
      rating: 4.2,
      pros: 'Exchange de apostas, odds altas, cash out',
      cons: 'Interface mais complexa para iniciantes',
      minimum_deposit: 25,
      featured: false
    }
  ]
};

async function createContent(endpoint, data) {
  try {
    const response = await axios.post(`${API_URL}/${endpoint}`, { data }, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to create ${endpoint}:`, error.response?.data || error.message);
    return null;
  }
}

async function populateData() {
  console.log('🚀 Starting sample data population...');
  console.log('====================================');

  const createdData = {};

  // Create categories
  console.log('📂 Creating categories...');
  createdData.categories = [];
  for (const category of SAMPLE_DATA.categories) {
    const result = await createContent('categories', category);
    if (result) {
      createdData.categories.push(result.data);
      console.log(`✅ Created category: ${category.name}`);
    }
  }

  // Create authors
  console.log('👤 Creating authors...');
  createdData.authors = [];
  for (const author of SAMPLE_DATA.authors) {
    const result = await createContent('authors', author);
    if (result) {
      createdData.authors.push(result.data);
      console.log(`✅ Created author: ${author.name}`);
    }
  }

  // Create teams
  console.log('⚽ Creating teams...');
  createdData.teams = [];
  for (const team of SAMPLE_DATA.teams) {
    const result = await createContent('teams', team);
    if (result) {
      createdData.teams.push(result.data);
      console.log(`✅ Created team: ${team.name}`);
    }
  }

  // Create apps
  console.log('📱 Creating apps...');
  createdData.apps = [];
  for (const app of SAMPLE_DATA.apps) {
    const result = await createContent('apps', app);
    if (result) {
      createdData.apps.push(result.data);
      console.log(`✅ Created app: ${app.name}`);
    }
  }

  // Create sample articles
  if (createdData.categories.length > 0 && createdData.authors.length > 0) {
    console.log('📰 Creating sample articles...');
    
    const sampleArticles = [
      {
        title: 'Flamengo vence clássico e se aproxima do título',
        slug: 'flamengo-vence-classico-titulo',
        content: 'Em jogo emocionante no Maracanã, o Flamengo venceu por 2x1 e se aproximou do título do Brasileirão...',
        excerpt: 'Flamengo vence clássico por 2x1 no Maracanã',
        seo_title: 'Flamengo vence clássico - Brasileirão 2025',
        seo_description: 'Cobertura completa da vitória do Flamengo no clássico decisivo',
        published_at: new Date().toISOString(),
        featured: true,
        category: createdData.categories[0].id,
        author: createdData.authors[0].id
      },
      {
        title: 'Review completo: Bet365 é confiável?',
        slug: 'review-bet365-confiavel',
        content: 'Analisamos todos os aspectos da Bet365, desde interface até atendimento ao cliente...',
        excerpt: 'Review completo da casa de apostas Bet365',
        published_at: new Date().toISOString(),
        featured: false,
        category: createdData.categories[1]?.id || createdData.categories[0].id,
        author: createdData.authors[1]?.id || createdData.authors[0].id
      }
    ];

    for (const article of sampleArticles) {
      const result = await createContent('articles', article);
      if (result) {
        console.log(`✅ Created article: ${article.title}`);
      }
    }
  }

  console.log('\n🎉 Sample data population completed!');
}

if (require.main === module) {
  populateData().catch(console.error);
}
EOF

echo "✅ Sample data population script created"
echo ""
echo "📋 NEXT STEPS:"
echo "1. Copy development docker-compose to server"
echo "2. Switch to development mode"
echo "3. Run content types setup"
echo "4. Populate sample data"
echo "5. Test APIs"
echo "6. Switch back to production"