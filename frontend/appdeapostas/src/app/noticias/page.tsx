import { Suspense } from 'react'
import Link from 'next/link'
import { Calendar, User, Tag, TrendingUp, Clock } from 'lucide-react'

const categories = [
  { name: 'Futebol', slug: 'futebol', count: 45, color: 'bg-green-500' },
  { name: 'Basquete', slug: 'basquete', count: 23, color: 'bg-orange-500' },
  { name: 'Tênis', slug: 'tenis', count: 18, color: 'bg-yellow-500' },
  { name: 'UFC/MMA', slug: 'ufc', count: 15, color: 'bg-red-500' },
  { name: 'E-sports', slug: 'e-sports', count: 12, color: 'bg-purple-500' },
  { name: 'Regulamentação', slug: 'regulamentacao', count: 8, color: 'bg-blue-500' },
]

const articles = [
  {
    id: 1,
    title: 'Brasileirão 2025: Palmeiras e Flamengo lideram odds para o título',
    slug: 'brasileirao-2025-palmeiras-flamengo-odds-titulo',
    excerpt: 'Análise completa das cotações para o Campeonato Brasileiro 2025, com Palmeiras como favorito seguido de perto pelo Flamengo.',
    content: 'O Campeonato Brasileiro 2025 promete ser um dos mais disputados dos últimos anos...',
    category: { name: 'Futebol', slug: 'futebol' },
    author: { name: 'João Silva', slug: 'joao-silva' },
    publishedAt: '2025-01-15T10:00:00Z',
    readTime: 5,
    featured: true,
    imageUrl: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Brasileirão', 'Palmeiras', 'Flamengo', 'Odds']
  },
  {
    id: 2,
    title: 'Nova regulamentação de apostas online entra em vigor no Brasil',
    slug: 'nova-regulamentacao-apostas-online-brasil-2025',
    excerpt: 'Entenda as principais mudanças na legislação brasileira sobre apostas esportivas e como isso afeta os apostadores.',
    content: 'A nova regulamentação das apostas esportivas no Brasil traz importantes mudanças...',
    category: { name: 'Regulamentação', slug: 'regulamentacao' },
    author: { name: 'Ana Carolina Santos', slug: 'ana-carolina-santos' },
    publishedAt: '2025-01-14T14:30:00Z',
    readTime: 8,
    featured: true,
    imageUrl: 'https://images.pexels.com/photos/6347707/pexels-photo-6347707.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Regulamentação', 'Lei', 'Brasil', 'Apostas Online']
  },
  {
    id: 3,
    title: 'NBA All-Star 2025: Melhores mercados para apostar no evento',
    slug: 'nba-all-star-2025-melhores-mercados-apostas',
    excerpt: 'Guia completo dos mercados mais lucrativos para apostar no NBA All-Star Game 2025.',
    content: 'O NBA All-Star Game 2025 oferece diversas oportunidades de apostas...',
    category: { name: 'Basquete', slug: 'basquete' },
    author: { name: 'Pedro Costa', slug: 'pedro-costa' },
    publishedAt: '2025-01-13T16:45:00Z',
    readTime: 6,
    featured: false,
    imageUrl: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['NBA', 'All-Star', 'Basquete', 'Mercados']
  },
  {
    id: 4,
    title: 'PIX nas apostas: Como o pagamento instantâneo mudou o jogo',
    slug: 'pix-apostas-pagamento-instantaneo-mudou-jogo',
    excerpt: 'Análise do impacto do PIX no mercado de apostas esportivas brasileiro e suas vantagens.',
    content: 'O PIX revolucionou a forma como os brasileiros fazem depósitos e saques...',
    category: { name: 'Tecnologia', slug: 'tecnologia' },
    author: { name: 'Carlos Eduardo Mendes', slug: 'carlos-eduardo-mendes' },
    publishedAt: '2025-01-12T11:20:00Z',
    readTime: 4,
    featured: false,
    imageUrl: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['PIX', 'Pagamentos', 'Tecnologia', 'Brasil']
  },
  {
    id: 5,
    title: 'Segurança em apps de apostas: O que verificar antes de baixar',
    slug: 'seguranca-apps-apostas-verificar-antes-baixar',
    excerpt: 'Guia essencial sobre como identificar aplicativos seguros e evitar golpes no mundo das apostas online.',
    content: 'A segurança deve ser a prioridade número um ao escolher um app de apostas...',
    category: { name: 'Segurança', slug: 'seguranca' },
    author: { name: 'Ana Carolina Santos', slug: 'ana-carolina-santos' },
    publishedAt: '2025-01-11T09:15:00Z',
    readTime: 7,
    featured: false,
    imageUrl: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Segurança', 'Licenças', 'Golpes', 'Proteção']
  },
  {
    id: 6,
    title: 'Champions League 2025: Odds e favoritos para as oitavas de final',
    slug: 'champions-league-2025-odds-favoritos-oitavas',
    excerpt: 'Análise das cotações para as oitavas de final da Champions League com os principais favoritos.',
    content: 'As oitavas de final da Champions League 2025 prometem grandes emoções...',
    category: { name: 'Futebol', slug: 'futebol' },
    author: { name: 'João Silva', slug: 'joao-silva' },
    publishedAt: '2025-01-10T20:00:00Z',
    readTime: 6,
    featured: false,
    imageUrl: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Champions League', 'Futebol', 'Europa', 'Odds']
  }
]

function ArticleCard({ article }: { article: typeof articles[0] }) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
            {article.category.name}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {article.readTime} min
          </div>
        </div>
        {article.featured && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
              DESTAQUE
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-lg mb-3 hover:text-blue-600 cursor-pointer line-clamp-2">
          <Link href={`/noticias/${article.category.slug}/${article.slug}`}>
            {article.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <User className="w-4 h-4 mr-1" />
            <span>{article.author.name}</span>
            <span className="mx-2">•</span>
            <Calendar className="w-4 h-4 mr-1" />
            <span>{new Date(article.publishedAt).toLocaleDateString('pt-BR')}</span>
          </div>
          <Link 
            href={`/noticias/${article.category.slug}/${article.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Ler mais →
          </Link>
        </div>
      </div>
    </article>
  )
}

function CategoryCard({ category }: { category: typeof categories[0] }) {
  return (
    <Link 
      href={`/categoria/${category.slug}`}
      className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center mb-3">
        <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mr-4`}>
          <Tag className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-800">{category.name}</h3>
          <p className="text-gray-500 text-sm">{category.count} artigos</p>
        </div>
      </div>
      <p className="text-gray-600 text-sm">
        Últimas notícias e análises sobre {category.name.toLowerCase()}
      </p>
    </Link>
  )
}

export default function NoticiasPage() {
  const featuredArticles = articles.filter(article => article.featured)
  const regularArticles = articles.filter(article => !article.featured)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Notícias e Análises
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Fique por dentro das últimas novidades do mundo das apostas esportivas, 
          regulamentações e análises especializadas.
        </p>
      </div>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Articles */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Artigos em Destaque</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Últimas Notícias</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Carregar Mais Notícias
        </button>
      </div>
    </div>
  )
}