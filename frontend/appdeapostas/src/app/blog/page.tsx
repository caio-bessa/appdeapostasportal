import { Suspense } from 'react'
import Link from 'next/link'
import { Calendar, User, Tag, Clock, TrendingUp, MessageCircle, Eye } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: 'O Futuro das Apostas Esportivas no Brasil: Tendências para 2025',
    slug: 'futuro-apostas-esportivas-brasil-2025',
    excerpt: 'Análise das principais tendências que vão moldar o mercado de apostas esportivas brasileiro nos próximos anos.',
    content: 'O mercado de apostas esportivas no Brasil está em constante evolução...',
    category: { name: 'Mercado', slug: 'mercado' },
    author: { name: 'Ana Carolina Santos', slug: 'ana-carolina-santos' },
    publishedAt: '2025-01-15T10:00:00Z',
    readTime: 8,
    views: 2340,
    comments: 23,
    featured: true,
    imageUrl: 'https://images.pexels.com/photos/7594435/pexels-photo-7594435.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Tendências', 'Brasil', 'Mercado', '2025']
  },
  {
    id: 2,
    title: 'Inteligência Artificial nas Apostas: Como a IA está mudando o jogo',
    slug: 'inteligencia-artificial-apostas-mudando-jogo',
    excerpt: 'Explore como a inteligência artificial está revolucionando as estratégias de apostas e análise de dados esportivos.',
    content: 'A inteligência artificial tem transformado diversos setores...',
    category: { name: 'Tecnologia', slug: 'tecnologia' },
    author: { name: 'Ricardo Silva', slug: 'ricardo-silva' },
    publishedAt: '2025-01-14T14:30:00Z',
    readTime: 12,
    views: 1890,
    comments: 18,
    featured: true,
    imageUrl: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['IA', 'Tecnologia', 'Estratégias', 'Dados']
  },
  {
    id: 3,
    title: 'Apostas Responsáveis: Como Manter o Controle e se Divertir',
    slug: 'apostas-responsaveis-manter-controle',
    excerpt: 'Guia essencial sobre como apostar de forma responsável, estabelecer limites e reconhecer sinais de problema.',
    content: 'Apostar deve ser sempre uma forma de entretenimento...',
    category: { name: 'Educação', slug: 'educacao' },
    author: { name: 'Carlos Eduardo Mendes', slug: 'carlos-eduardo-mendes' },
    publishedAt: '2025-01-13T16:45:00Z',
    readTime: 10,
    views: 3210,
    comments: 45,
    featured: false,
    imageUrl: 'https://images.pexels.com/photos/6347707/pexels-photo-6347707.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Responsabilidade', 'Controle', 'Saúde Mental', 'Limites']
  },
  {
    id: 4,
    title: 'Criptomoedas em Apostas: Bitcoin e outras moedas digitais',
    slug: 'criptomoedas-apostas-bitcoin-moedas-digitais',
    excerpt: 'Como as criptomoedas estão sendo integradas às plataformas de apostas e suas vantagens.',
    content: 'As criptomoedas representam uma nova fronteira...',
    category: { name: 'Tecnologia', slug: 'tecnologia' },
    author: { name: 'Pedro Costa', slug: 'pedro-costa' },
    publishedAt: '2025-01-12T11:20:00Z',
    readTime: 7,
    views: 1560,
    comments: 12,
    featured: false,
    imageUrl: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Criptomoedas', 'Bitcoin', 'Pagamentos', 'Inovação']
  },
  {
    id: 5,
    title: 'E-sports: O Crescimento das Apostas em Jogos Eletrônicos',
    slug: 'e-sports-crescimento-apostas-jogos-eletronicos',
    excerpt: 'Análise do mercado de apostas em e-sports e como essa modalidade está ganhando espaço.',
    content: 'Os e-sports representam uma das modalidades que mais cresce...',
    category: { name: 'E-sports', slug: 'e-sports' },
    author: { name: 'João Silva', slug: 'joao-silva' },
    publishedAt: '2025-01-11T09:15:00Z',
    readTime: 9,
    views: 2100,
    comments: 31,
    featured: false,
    imageUrl: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['E-sports', 'Jogos', 'Crescimento', 'Juventude']
  },
  {
    id: 6,
    title: 'Regulamentação Global: Como outros países regulam as apostas',
    slug: 'regulamentacao-global-outros-paises-apostas',
    excerpt: 'Comparação entre diferentes modelos regulatórios de apostas esportivas ao redor do mundo.',
    content: 'Cada país adota uma abordagem diferente para regular...',
    category: { name: 'Regulamentação', slug: 'regulamentacao' },
    author: { name: 'Ana Carolina Santos', slug: 'ana-carolina-santos' },
    publishedAt: '2025-01-10T20:00:00Z',
    readTime: 11,
    views: 1780,
    comments: 19,
    featured: false,
    imageUrl: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Regulamentação', 'Global', 'Comparação', 'Legislação']
  }
]

const categories = [
  { name: 'Mercado', slug: 'mercado', count: 15, color: 'bg-blue-500' },
  { name: 'Tecnologia', slug: 'tecnologia', count: 12, color: 'bg-purple-500' },
  { name: 'Educação', slug: 'educacao', count: 18, color: 'bg-green-500' },
  { name: 'E-sports', slug: 'e-sports', count: 8, color: 'bg-red-500' },
  { name: 'Regulamentação', slug: 'regulamentacao', count: 6, color: 'bg-yellow-500' },
]

function BlogPostCard({ post }: { post: typeof blogPosts[0] }) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
            {post.category.name}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {post.readTime} min
          </div>
        </div>
        {post.featured && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
              DESTAQUE
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-lg mb-3 hover:text-blue-600 cursor-pointer line-clamp-2">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span>{post.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              <span>{post.comments}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <User className="w-4 h-4 mr-1" />
            <span>{post.author.name}</span>
            <span className="mx-2">•</span>
            <Calendar className="w-4 h-4 mr-1" />
            <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
          </div>
          <Link 
            href={`/blog/${post.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Ler post →
          </Link>
        </div>
      </div>
    </article>
  )
}

function CategoryCard({ category }: { category: typeof categories[0] }) {
  return (
    <Link 
      href={`/blog/categoria/${category.slug}`}
      className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center mb-3">
        <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mr-4`}>
          <Tag className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-800">{category.name}</h3>
          <p className="text-gray-500 text-sm">{category.count} posts</p>
        </div>
      </div>
      <p className="text-gray-600 text-sm">
        Explore conteúdo sobre {category.name.toLowerCase()}
      </p>
    </Link>
  )
}

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Blog AppdeApostas
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Insights, tendências e análises profundas sobre o mundo das apostas esportivas. 
          Conteúdo especializado para apostadores de todos os níveis.
        </p>
      </div>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Posts em Destaque</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Latest Posts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Últimos Posts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Não perca nenhum post!</h2>
        <p className="mb-6 opacity-90">
          Receba nossos melhores conteúdos diretamente no seu email. 
          Newsletter semanal com insights exclusivos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Seu melhor email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Inscrever-se
          </button>
        </div>
        <p className="text-xs opacity-75 mt-3">
          Sem spam. Cancele quando quiser.
        </p>
      </section>
    </div>
  )
}