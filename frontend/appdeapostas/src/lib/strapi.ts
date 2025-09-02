import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://appdeapostas.com.br/api'
const API_TOKEN = process.env.STRAPI_API_TOKEN

// Create axios instance
export const strapiApi = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
  }
})

// Types
export interface StrapiResponse<T> {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiSingleResponse<T> {
  data: T
  meta: {}
}

export interface Category {
  id: number
  attributes: {
    name: string
    slug: string
    description?: string
    seo_title?: string
    seo_description?: string
    featured: boolean
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface Article {
  id: number
  attributes: {
    title: string
    slug: string
    content: string
    excerpt?: string
    seo_title?: string
    seo_description?: string
    featured_image_url?: string
    published_at: string
    featured: boolean
    createdAt: string
    updatedAt: string
    publishedAt: string
    category?: {
      data: Category
    }
    author?: {
      data: Author
    }
  }
}

export interface Author {
  id: number
  attributes: {
    name: string
    slug: string
    bio?: string
    specialization?: string
    avatar_url?: string
    social_links?: any
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface Team {
  id: number
  attributes: {
    name: string
    slug: string
    city?: string
    state?: string
    league?: string
    logo_url?: string
    founded_year?: number
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface App {
  id: number
  attributes: {
    name: string
    slug: string
    description?: string
    rating?: number
    pros?: string
    cons?: string
    bonus_info?: string
    minimum_deposit?: number
    payment_methods?: string
    license_info?: string
    download_url?: string
    featured: boolean
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

// API Functions with error handling
export const fetchCategories = async (params?: any): Promise<Category[]> => {
  try {
    const response = await strapiApi.get<StrapiResponse<Category>>('/categories', { params })
    return response.data.data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export const fetchArticles = async (params?: any): Promise<Article[]> => {
  try {
    const response = await strapiApi.get<StrapiResponse<Article>>('/articles', { params })
    return response.data.data || []
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export const fetchArticleBySlug = async (slug: string): Promise<Article | null> => {
  try {
    const response = await strapiApi.get<StrapiResponse<Article>>('/articles', {
      params: {
        'filters[slug][$eq]': slug,
        'populate': '*'
      }
    })
    return response.data.data[0] || null
  } catch (error) {
    console.error('Error fetching article by slug:', error)
    return null
  }
}

export const fetchAuthors = async (params?: any): Promise<Author[]> => {
  try {
    const response = await strapiApi.get<StrapiResponse<Author>>('/authors', { params })
    return response.data.data || []
  } catch (error) {
    console.error('Error fetching authors:', error)
    return []
  }
}

export const fetchTeams = async (params?: any): Promise<Team[]> => {
  try {
    const response = await strapiApi.get<StrapiResponse<Team>>('/teams', { params })
    return response.data.data || []
  } catch (error) {
    console.error('Error fetching teams:', error)
    return []
  }
}

export const fetchApps = async (params?: any): Promise<App[]> => {
  try {
    const response = await strapiApi.get<StrapiResponse<App>>('/apps', { params })
    return response.data.data || []
  } catch (error) {
    console.error('Error fetching apps:', error)
    return []
  }
}

export const fetchAppBySlug = async (slug: string): Promise<App | null> => {
  try {
    const response = await strapiApi.get<StrapiResponse<App>>('/apps', {
      params: {
        'filters[slug][$eq]': slug,
        'populate': '*'
      }
    })
    return response.data.data[0] || null
  } catch (error) {
    console.error('Error fetching app by slug:', error)
    return null
  }
}

// Fallback data for when API is not available
export const fallbackData = {
  categories: [
    { id: 1, attributes: { name: 'Futebol', slug: 'futebol', featured: true, createdAt: '', updatedAt: '', publishedAt: '' } },
    { id: 2, attributes: { name: 'Basquete', slug: 'basquete', featured: false, createdAt: '', updatedAt: '', publishedAt: '' } },
    { id: 3, attributes: { name: 'Reviews', slug: 'reviews', featured: true, createdAt: '', updatedAt: '', publishedAt: '' } },
  ],
  articles: [
    {
      id: 1,
      attributes: {
        title: 'Melhores Apps de Apostas 2025',
        slug: 'melhores-apps-apostas-2025',
        content: 'Análise completa dos melhores aplicativos...',
        excerpt: 'Descubra quais são os melhores apps de apostas disponíveis no Brasil.',
        featured: true,
        published_at: '2025-01-15T10:00:00Z',
        createdAt: '',
        updatedAt: '',
        publishedAt: ''
      }
    }
  ],
  apps: [
    {
      id: 1,
      attributes: {
        name: 'Bet365',
        slug: 'bet365',
        description: 'Casa de apostas completa com streaming',
        rating: 4.6,
        featured: true,
        createdAt: '',
        updatedAt: '',
        publishedAt: ''
      }
    }
  ]
}