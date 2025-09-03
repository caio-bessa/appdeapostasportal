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

// API functions
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
    return []
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
    return []
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
    return []
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