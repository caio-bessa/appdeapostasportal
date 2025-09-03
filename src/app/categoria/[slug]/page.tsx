import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, User, Tag, TrendingUp, ArrowLeft } from 'lucide-react'
import { fetchCategories, fetchArticles } from '@/lib/supabase'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categories = await fetchCategories()
  const category = categories.find(cat => cat.slug === params.slug)
  
  if (!category) {
    notFound()
  }

  const articles = await fetchArticles({ category: params.slug })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">Início</Link>
          <span>/</span>
          <Link href="/noticias" className="hover:text-blue-600">Notícias</Link>
          <span>/</span>
          <span className="text-gray-800">{category.name}</span>
        </nav>

        {/* Back Button */}
        <Link 
          href="/noticias"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Notícias
        </Link>

        {/* Category Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
          <div className="mt-4">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {articles.length} artigos
            </span>
          </div>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {article.featured_image_url && (
                  <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    <img 
                      src={article.featured_image_url} 
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {article.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                          DESTAQUE
                        </span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-3 hover:text-blue-600 cursor-pointer line-clamp-2">
                    <Link href={`/noticias/${category.slug}/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  
                  {article.excerpt && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      {article.author && (
                        <>
                          <User className="w-4 h-4 mr-1" />
                          <span>{article.author.name}</span>
                          <span className="mx-2">•</span>
                        </>
                      )}
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(article.published_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <Link 
                      href={`/noticias/${category.slug}/${article.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Ler mais →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Nenhum artigo encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              Ainda não temos artigos nesta categoria. Volte em breve!
            </p>
            <Link 
              href="/noticias"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Ver Todas as Notícias
            </Link>
          </div>
        )}

        {/* Load More */}
        {articles.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Carregar Mais Artigos
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const categories = await fetchCategories()
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}