
# AppdeApostas.com.br - Critical Fixes Implementation Script
# This script provides the exact steps and code needed to fix all critical issues

## STEP 1: CREATE STRAPI CONTENT TYPES
# Access admin at: https://appdeapostas.com.br/admin
# Email: caio.bessa@acroud.media

### Content Types to Create:

#### CATEGORIES:
```json
{
  "kind": "collectionType",
  "collectionName": "categories",
  "info": {
    "singularName": "category",
    "pluralName": "categories",
    "displayName": "Category",
    "description": "News categories for the portal"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "unique": true
    },
    "slug": {
      "type": "uid",
      "targetField": "name",
      "required": true
    },
    "description": {
      "type": "text"
    },
    "color": {
      "type": "string",
      "default": "#000000"
    }
  }
}
```


#### AUTHORS:
```json
{
  "kind": "collectionType",
  "collectionName": "authors",
  "info": {
    "singularName": "author",
    "pluralName": "authors",
    "displayName": "Author",
    "description": "Article authors"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "name"
    },
    "bio": {
      "type": "text"
    },
    "avatar": {
      "type": "media",
      "multiple": false,
      "allowedTypes": [
        "images"
      ]
    },
    "email": {
      "type": "email"
    }
  }
}
```


#### TEAMS:
```json
{
  "kind": "collectionType",
  "collectionName": "teams",
  "info": {
    "singularName": "team",
    "pluralName": "teams",
    "displayName": "Team",
    "description": "Sports teams"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "name"
    },
    "logo": {
      "type": "media",
      "multiple": false,
      "allowedTypes": [
        "images"
      ]
    },
    "description": {
      "type": "text"
    },
    "sport": {
      "type": "enumeration",
      "enum": [
        "futebol",
        "basquete",
        "tenis",
        "volleyball",
        "outros"
      ],
      "default": "futebol"
    }
  }
}
```


#### APPS:
```json
{
  "kind": "collectionType",
  "collectionName": "apps",
  "info": {
    "singularName": "app",
    "pluralName": "apps",
    "displayName": "Betting App",
    "description": "Betting applications"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "name"
    },
    "description": {
      "type": "text",
      "required": true
    },
    "long_description": {
      "type": "richtext"
    },
    "logo": {
      "type": "media",
      "multiple": false,
      "allowedTypes": [
        "images"
      ]
    },
    "rating": {
      "type": "decimal",
      "min": 0,
      "max": 5,
      "default": 0
    },
    "features": {
      "type": "json"
    },
    "download_url": {
      "type": "string"
    },
    "bonus_info": {
      "type": "text"
    },
    "pros": {
      "type": "json"
    },
    "cons": {
      "type": "json"
    }
  }
}
```


#### ARTICLES:
```json
{
  "kind": "collectionType",
  "collectionName": "articles",
  "info": {
    "singularName": "article",
    "pluralName": "articles",
    "displayName": "Article",
    "description": "News articles"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "content": {
      "type": "richtext",
      "required": true
    },
    "excerpt": {
      "type": "text"
    },
    "featured_image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": [
        "images"
      ]
    },
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::category.category"
    },
    "author": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::author.author"
    },
    "teams": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::team.team"
    },
    "featured": {
      "type": "boolean",
      "default": false
    },
    "views": {
      "type": "integer",
      "default": 0
    },
    "meta_title": {
      "type": "string"
    },
    "meta_description": {
      "type": "text"
    }
  }
}
```


## STEP 2: POPULATE SAMPLE DATA

### CATEGORIES:
```json
[
  {
    "name": "Futebol",
    "slug": "futebol",
    "description": "Notícias de futebol nacional e internacional",
    "color": "#00A651"
  },
  {
    "name": "Basquete",
    "slug": "basquete",
    "description": "Notícias de basquete NBA, NBB e mundial",
    "color": "#FF8C00"
  },
  {
    "name": "Tênis",
    "slug": "tenis",
    "description": "Notícias de tênis profissional e torneios",
    "color": "#FFD700"
  },
  {
    "name": "Apostas",
    "slug": "apostas",
    "description": "Dicas e análises de apostas esportivas",
    "color": "#FF4500"
  },
  {
    "name": "E-sports",
    "slug": "e-sports",
    "description": "Notícias do mundo dos esportes eletrônicos",
    "color": "#9400D3"
  }
]
```


### AUTHORS:
```json
[
  {
    "name": "João Silva",
    "slug": "joao-silva",
    "bio": "Jornalista especializado em futebol há mais de 10 anos",
    "email": "joao@appdeapostas.com.br"
  },
  {
    "name": "Maria Santos",
    "slug": "maria-santos",
    "bio": "Especialista em basquete e apostas esportivas",
    "email": "maria@appdeapostas.com.br"
  },
  {
    "name": "Pedro Costa",
    "slug": "pedro-costa",
    "bio": "Analista de e-sports e tênis profissional",
    "email": "pedro@appdeapostas.com.br"
  }
]
```


### TEAMS:
```json
[
  {
    "name": "Flamengo",
    "slug": "flamengo",
    "description": "Clube de Regatas do Flamengo",
    "sport": "futebol"
  },
  {
    "name": "Palmeiras",
    "slug": "palmeiras",
    "description": "Sociedade Esportiva Palmeiras",
    "sport": "futebol"
  },
  {
    "name": "Lakers",
    "slug": "lakers",
    "description": "Los Angeles Lakers",
    "sport": "basquete"
  },
  {
    "name": "Warriors",
    "slug": "warriors",
    "description": "Golden State Warriors",
    "sport": "basquete"
  }
]
```


### APPS:
```json
[
  {
    "name": "bet365",
    "slug": "bet365",
    "description": "App completo com live streaming",
    "long_description": "A bet365 oferece uma das experiências mais completas no mundo das apostas esportivas...",
    "rating": 4.5,
    "features": [
      "Live Streaming",
      "Cash Out",
      "Apostas ao Vivo",
      "Múltiplas Modalidades"
    ],
    "bonus_info": "Bônus de boas-vindas até R$ 200",
    "pros": [
      "Streaming de qualidade",
      "Muitas opções de apostas",
      "App estável"
    ],
    "cons": [
      "Interface complexa",
      "Odds nem sempre as melhores"
    ]
  },
  {
    "name": "Betano",
    "slug": "betano",
    "description": "Odds competitivas e cash out",
    "long_description": "A Betano se destaca pelas odds competitivas e facilidade de uso...",
    "rating": 4.3,
    "features": [
      "Cash Out",
      "Streaming",
      "SuperOdds",
      "Apostas Múltiplas"
    ],
    "bonus_info": "Bônus de boas-vindas até R$ 300",
    "pros": [
      "Odds competitivas",
      "Interface amigável",
      "Bom suporte"
    ],
    "cons": [
      "Menos opções de streaming",
      "Limitações regionais"
    ]
  },
  {
    "name": "Sportingbet",
    "slug": "sportingbet",
    "description": "Interface intuitiva",
    "long_description": "A Sportingbet oferece uma experiência intuitiva para apostadores...",
    "rating": 4.1,
    "features": [
      "Interface Simples",
      "Apostas Rápidas",
      "Promoções",
      "Suporte 24/7"
    ],
    "bonus_info": "Bônus de boas-vindas até R$ 150",
    "pros": [
      "Fácil de usar",
      "Bom atendimento",
      "Processo de saque rápido"
    ],
    "cons": [
      "Menos opções de esportes",
      "App pode ser lento"
    ]
  }
]
```


## STEP 3: NEXT.JS FRONTEND FIXES

### File: pages/index.js
```javascript

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { fetchArticles, fetchCategories, fetchApps } from '../lib/api';

export default function Home({ featuredArticles, categories, apps }) {
  return (
    <>
      <Head>
        <title>AppdeApostas.com.br - Portal de Notícias e Apostas Esportivas</title>
        <meta name="description" content="O melhor portal de notícias esportivas e análises de apps de apostas do Brasil. Notícias de futebol, basquete, tênis e muito mais." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="py-6 border-b">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              📱 AppdeApostas.com.br
            </Link>
            <div className="flex space-x-6">
              <Link href="/noticias" className="hover:text-blue-600">Notícias</Link>
              <Link href="/apps" className="hover:text-blue-600">Apps</Link>
              <Link href="/sobre" className="hover:text-blue-600">Sobre</Link>
              <Link href="/contato" className="hover:text-blue-600">Contato</Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Portal de Notícias e Apostas Esportivas
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              As últimas notícias do mundo esportivo e análises dos melhores apps de apostas
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8">
          <h2 className="text-2xl font-bold mb-6">Categorias</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={'/noticias/' + category.attributes.slug}
                className="p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200 transition-colors"
              >
                <div className="font-semibold">{category.attributes.name}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-8">
          <h2 className="text-2xl font-bold mb-6">Notícias em Destaque</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {article.attributes.featured_image?.data && (
                  <img
                    src={article.attributes.featured_image.data.attributes.url}
                    alt={article.attributes.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">
                    <Link 
                      href={'/noticias/' + article.attributes.category?.data?.attributes?.slug + '/' + article.attributes.slug}
                      className="hover:text-blue-600"
                    >
                      {article.attributes.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {article.attributes.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{article.attributes.author?.data?.attributes?.name}</span>
                    <span>{new Date(article.attributes.publishedAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Apps Section */}
        <section className="py-8">
          <h2 className="text-2xl font-bold mb-6">Melhores Apps de Apostas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {apps.slice(0, 3).map((app) => (
              <div key={app.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  {app.attributes.logo?.data && (
                    <img
                      src={app.attributes.logo.data.attributes.url}
                      alt={app.attributes.name}
                      className="w-12 h-12 rounded-lg mr-4"
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-lg">{app.attributes.name}</h3>
                    <div className="text-yellow-500">
                      {'★'.repeat(Math.floor(app.attributes.rating))} {app.attributes.rating}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{app.attributes.description}</p>
                <Link 
                  href={'/apps/' + app.attributes.slug}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors inline-block"
                >
                  Saiba Mais
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/apps"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block"
            >
              Ver Todos os Apps
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 mt-12 border-t bg-gray-50">
          <div className="text-center">
            <p>&copy; 2025 AppdeApostas.com.br - Todos os direitos reservados</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const [articlesRes, categoriesRes, appsRes] = await Promise.all([
      fetchArticles({ 
        populate: '*',
        filters: { featured: { $eq: true } },
        sort: 'publishedAt:desc',
        pagination: { limit: 6 }
      }),
      fetchCategories(),
      fetchApps({ 
        sort: 'rating:desc',
        pagination: { limit: 3 }
      })
    ]);

    return {
      props: {
        featuredArticles: articlesRes.data || [],
        categories: categoriesRes.data || [],
        apps: appsRes.data || []
      },
      revalidate: 300 // Revalidate every 5 minutes
    };
  } catch (error) {
    console.error('Error fetching data for homepage:', error);
    return {
      props: {
        featuredArticles: [],
        categories: [],
        apps: []
      },
      revalidate: 60
    };
  }
}
            
```


### File: lib/api.js
```javascript

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://appdeapostas.com.br/api';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Helper function to build query string
const buildQuery = (params = {}) => {
  const query = new URLSearchParams();
  
  Object.keys(params).forEach(key => {
    if (params[key] !== null && params[key] !== undefined) {
      if (typeof params[key] === 'object') {
        query.append(key, JSON.stringify(params[key]));
      } else {
        query.append(key, params[key]);
      }
    }
  });
  
  return query.toString();
};

export const fetchCategories = async (params = {}) => {
  try {
    const queryString = buildQuery(params);
    const response = await api.get('/categories' + (queryString ? '?' + queryString : ''));
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { data: [] };
  }
};

export const fetchArticles = async (params = {}) => {
  try {
    const queryString = buildQuery(params);
    const response = await api.get('/articles' + (queryString ? '?' + queryString : ''));
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return { data: [] };
  }
};

export const fetchArticleBySlug = async (slug, populate = '*') => {
  try {
    const response = await api.get('/articles', {
      params: {
        'filters[slug][$eq]': slug,
        populate
      }
    });
    return response.data.data[0] || null;
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
};

export const fetchAuthors = async (params = {}) => {
  try {
    const queryString = buildQuery(params);
    const response = await api.get('/authors' + (queryString ? '?' + queryString : ''));
    return response.data;
  } catch (error) {
    console.error('Error fetching authors:', error);
    return { data: [] };
  }
};

export const fetchTeams = async (params = {}) => {
  try {
    const queryString = buildQuery(params);
    const response = await api.get('/teams' + (queryString ? '?' + queryString : ''));
    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    return { data: [] };
  }
};

export const fetchApps = async (params = {}) => {
  try {
    const queryString = buildQuery(params);
    const response = await api.get('/apps' + (queryString ? '?' + queryString : ''));
    return response.data;
  } catch (error) {
    console.error('Error fetching apps:', error);
    return { data: [] };
  }
};

export const fetchAppBySlug = async (slug, populate = '*') => {
  try {
    const response = await api.get('/apps', {
      params: {
        'filters[slug][$eq]': slug,
        populate
      }
    });
    return response.data.data[0] || null;
  } catch (error) {
    console.error('Error fetching app by slug:', error);
    return null;
  }
};
            
```


## STEP 4: IMPLEMENTATION SEQUENCE

### Phase 1 - Strapi Content Types Setup:
1. 1. Access Strapi admin at https://appdeapostas.com.br/admin
2. 2. Go to Content-Type Builder
3. 3. Create each content type using the schemas provided in getContentTypes()
4. 4. Save and restart Strapi server
5. 5. Check that API endpoints are now available
6. 6. Configure permissions for public access to read operations


### Phase 2 - Sample Data Population:
1. 1. Access Content Manager in Strapi admin
2. 2. Create entries for each content type using getSampleData()
3. 3. Ensure all relationships are properly linked
4. 4. Publish all entries
5. 5. Test API endpoints return data


### Phase 3 - Frontend Fixes:
1. 1. Navigate to frontend/appdeapostas directory
2. 2. Create/update files using getNextJSPages() code
3. 3. Install required dependencies (axios, tailwindcss)
4. 4. Update .env files with correct API URLs
5. 5. Test local development server
6. 6. Deploy to production


### Phase 4 - Verification:
1. 1. Test all pages load without 404 errors
2. 2. Verify API endpoints return data
3. 3. Check console for errors
4. 4. Test content creation in admin
5. 5. Verify frontend displays dynamic content


## VERIFICATION CHECKLIST:
- [ ] All content types created in Strapi
- [ ] API endpoints return data (test with: curl https://appdeapostas.com.br/api/categories)
- [ ] Sample data populated
- [ ] Frontend pages load without 404
- [ ] Homepage loads completely
- [ ] Navigation works between pages
- [ ] Console errors resolved
- [ ] Mobile responsive
- [ ] SEO meta tags working
