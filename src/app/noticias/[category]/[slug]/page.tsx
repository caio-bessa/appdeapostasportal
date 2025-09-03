import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, User, Tag, Clock, Share2, ArrowLeft } from 'lucide-react'
import { fetchArticleBySlug, fetchArticles } from '@/lib/supabase'

interface ArticlePageProps {
  params: {
    category: string
    slug: string
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await fetchArticleBySlug(params.slug)
  
  if (!article) {
    notFound()
  }

  // Get related articles
  const relatedArticles = await fetchArticles({ 
    category: params.category, 
    limit: 3 
  }).then(articles => articles.filter(a => a.id !== article.id))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">Início</Link>
          <span>/</span>
          <Link href="/noticias" className="hover:text-blue-600">Notícias</Link>
          <span>/</span>
          <Link href={`/categoria/${params.category}`} className="hover:text-blue-600">
            {article.category?.name}
          </Link>
          <span>/</span>
          <span className="text-gray-800">{article.title}</span>
        </nav>

        {/* Back Button */}
        <Link 
          href="/noticias"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Notícias
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Featured Image */}
              {article.featured_image_url && (
                <div className="aspect-video bg-gray-200">
                  <img 
                    src={article.featured_image_url} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-8">
                {/* Article Meta */}
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(article.published_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                  {article.author && (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>Por {article.author.name}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{Math.ceil(article.content.length / 1000)} min de leitura</span>
                  </div>
                </div>

                {/* Category Badge */}
                {article.category && (
                  <div className="mb-6">
                    <Link 
                      href={`/categoria/${article.category.slug}`}
                      className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      {article.category.name}
                    </Link>
                  </div>
                )}

                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
                  {article.title}
                </h1>

                {/* Excerpt */}
                {article.excerpt && (
                  <div className="text-xl text-gray-600 mb-8 leading-relaxed">
                    {article.excerpt}
                  </div>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  {article.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Share Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Compartilhar:</span>
                    <div className="flex items-center space-x-3">
                      <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Author Info */}
            {article.author && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-4">Sobre o Autor</h3>
                <div className="flex items-start space-x-4">
                  {article.author.avatar_url && (
                    <img 
                      src={article.author.avatar_url} 
                      alt={article.author.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h4 className="font-bold text-gray-800">{article.author.name}</h4>
                    {article.author.specialization && (
                      <p className="text-blue-600 text-sm font-medium mb-2">
                        {article.author.specialization}
                      </p>
                    )}
                    {article.author.bio && (
                      <p className="text-gray-600 text-sm">
                        {article.author.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-4">Artigos Relacionados</h3>
                <div className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      key={relatedArticle.id}
                      href={`/noticias/${relatedArticle.category?.slug}/${relatedArticle.slug}`}
                      className="block group"
                    >
                      <div className="flex space-x-3">
                        {relatedArticle.featured_image_url && (
                          <img 
                            src={relatedArticle.featured_image_url} 
                            alt={relatedArticle.title}
                            className="w-20 h-16 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm">
                            {relatedArticle.title}
                          </h4>
                          <p className="text-gray-500 text-xs mt-1">
                            {new Date(relatedArticle.published_at).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Não perca nenhuma notícia!</h3>
              <p className="text-sm opacity-90 mb-4">
                Receba as últimas notícias sobre apostas esportivas diretamente no seu email.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Seu melhor email"
                  className="w-full px-3 py-2 rounded text-gray-800 text-sm"
                />
                <button className="w-full bg-white text-blue-600 py-2 rounded font-medium text-sm hover:bg-gray-100 transition-colors">
                  Inscrever-se
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  // This would generate static paths for all articles
  // For now, we'll let Next.js handle this dynamically
  return []
}