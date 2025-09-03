import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Author {
  id: string
  name: string
  slug: string
  bio?: string
  specialization?: string
  avatar_url?: string
  social_links?: any
  created_at: string
  updated_at: string
}

export interface Team {
  id: string
  name: string
  slug: string
  city?: string
  state?: string
  league?: string
  logo_url?: string
  founded_year?: number
  created_at: string
  updated_at: string
}

export interface App {
  id: string
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
  created_at: string
  updated_at: string
}

export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  seo_title?: string
  seo_description?: string
  featured_image_url?: string
  published_at: string
  featured: boolean
  category_id?: string
  author_id?: string
  created_at: string
  updated_at: string
  
  // Relations
  category?: Category
  author?: Author
  related_apps?: App[]
  related_teams?: Team[]
}

// API functions with error handling and fallbacks
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    // Return fallback data
    return [
      { id: '1', name: 'Futebol', slug: 'futebol', featured: true, created_at: '', updated_at: '' },
      { id: '2', name: 'Basquete', slug: 'basquete', featured: false, created_at: '', updated_at: '' },
      { id: '3', name: 'Reviews', slug: 'reviews-apps', featured: true, created_at: '', updated_at: '' },
    ]
  }
}

export const fetchArticles = async (params?: {
  category?: string
  featured?: boolean
  limit?: number
}): Promise<Article[]> => {
  try {
    let query = supabase
      .from('articles')
      .select(`
        *,
        category:categories(*),
        author:authors(*)
      `)
      .order('published_at', { ascending: false })
    
    if (params?.category) {
      query = query.eq('category.slug', params.category)
    }
    
    if (params?.featured !== undefined) {
      query = query.eq('featured', params.featured)
    }
    
    if (params?.limit) {
      query = query.limit(params.limit)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching articles:', error)
    // Return fallback data
    return [
      {
        id: '1',
        title: 'Melhores Apps de Apostas 2025',
        slug: 'melhores-apps-apostas-2025',
        content: 'Análise completa dos melhores aplicativos...',
        excerpt: 'Descubra quais são os melhores apps de apostas disponíveis no Brasil.',
        featured: true,
        published_at: '2025-01-15T10:00:00Z',
        created_at: '',
        updated_at: '',
        category_id: '1',
        author_id: '1'
      }
    ]
  }
}

export const fetchArticleBySlug = async (slug: string): Promise<Article | null> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        category:categories(*),
        author:authors(*)
      `)
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching article by slug:', error)
    return null
  }
}

export const fetchApps = async (params?: {
  featured?: boolean
  limit?: number
}): Promise<App[]> => {
  try {
    let query = supabase
      .from('apps')
      .select('*')
      .order('rating', { ascending: false })
    
    if (params?.featured !== undefined) {
      query = query.eq('featured', params.featured)
    }
    
    if (params?.limit) {
      query = query.limit(params.limit)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching apps:', error)
    // Return fallback data
    return [
      {
        id: '1',
        name: 'Bet365',
        slug: 'bet365',
        description: 'Casa de apostas completa com streaming',
        rating: 4.6,
        featured: true,
        created_at: '',
        updated_at: ''
      }
    ]
  }
}

export const fetchAppBySlug = async (slug: string): Promise<App | null> => {
  try {
    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching app by slug:', error)
    return null
  }
}

export const fetchTeams = async (): Promise<Team[]> => {
  try {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching teams:', error)
    return []
  }
}

export const fetchAuthors = async (): Promise<Author[]> => {
  try {
    const { data, error } = await supabase
      .from('authors')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching authors:', error)
    return []
  }
}

// Admin functions for CMS functionality
export const createArticle = async (article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .insert([article])
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating article:', error)
    throw error
  }
}

export const updateArticle = async (id: string, updates: Partial<Article>) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating article:', error)
    throw error
  }
}

export const deleteArticle = async (id: string) => {
  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting article:', error)
    throw error
  }
}