import { Suspense } from 'react'
import Link from 'next/link'
import { Star, TrendingUp, Shield, Zap, Users, Award } from 'lucide-react'

const featuredApps = [
  {
    id: 1,
    name: 'Bet365',
    slug: 'bet365',
    rating: 4.6,
    description: 'A casa de apostas mais completa do mundo com streaming ao vivo',
    bonus: 'Até R$ 200 em créditos',
    features: ['Streaming ao vivo', 'Cash out', 'Apostas ao vivo'],
    logo: 'https://images.pexels.com/photos/7594435/pexels-photo-7594435.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 2,
    name: 'Betano',
    slug: 'betano',
    rating: 4.5,
    description: 'Patrocinador oficial do Brasileirão com odds competitivas',
    bonus: 'Bônus de 100% até R$ 500',
    features: ['Odds turbinadas', 'PIX instantâneo', 'Suporte 24/7'],
    logo: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 3,
    name: 'KTO',
    slug: 'kto',
    rating: 4.3,
    description: 'Interface moderna com recursos únicos de criação de apostas',
    bonus: 'Aposta grátis de R$ 200',
    features: ['Criar aposta', 'Cashback semanal', 'App gamificado'],
    logo: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    color: 'from-purple-500 to-purple-600'
  }
]

const latestNews = [
  {
    id: 1,
    title: 'Regulamentação das apostas esportivas no Brasil: O que mudou em 2025',
    slug: 'regulamentacao-apostas-brasil-2025',
    category: 'Regulamentação',
    excerpt: 'Análise completa das novas regras para casas de apostas no país.',
    publishedAt: '2025-01-15',
    imageUrl: 'https://images.pexels.com/photos/6347707/pexels-photo-6347707.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    title: 'Brasileirão 2025: Odds e favoritos para o título',
    slug: 'brasileirao-2025-odds-favoritos',
    category: 'Futebol',
    excerpt: 'Palmeiras e Flamengo lideram as cotações para o campeonato.',
    publishedAt: '2025-01-14',
    imageUrl: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    title: 'PIX revoluciona depósitos em casas de apostas',
    slug: 'pix-revoluciona-depositos-apostas',
    category: 'Tecnologia',
    excerpt: 'Como o pagamento instantâneo mudou o mercado de apostas online.',
    publishedAt: '2025-01-13',
    imageUrl: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
]

function AppCard({ app }: { app: typeof featuredApps[0] }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className={`h-32 bg-gradient-to-r ${app.color} p-6 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-2">
            <img src={app.logo} alt={app.name} className="w-12 h-12 rounded-lg mr-3 bg-white p-1" />
            <div>
              <h3 className="font-bold text-lg">{app.name}</h3>
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-current text-yellow-300" />
                <span className="ml-1 text-sm">{app.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4">{app.description}</p>
        
        <div className="mb-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
            <div className="flex items-center text-green-700">
              <Award className="w-4 h-4 mr-2" />
              <span className="font-medium text-sm">{app.bonus}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            {app.features.map((feature, index) => (
              <div key={index} className="flex items-center text-gray-600 text-sm">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                {feature}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Link 
            href={`/apps/${app.slug}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Ver Review
          </Link>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
            Comparar
          </button>
        </div>
      </div>
    </div>
  )
}

function NewsCard({ article }: { article: typeof latestNews[0] }) {
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
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-lg mb-3 hover:text-blue-600 cursor-pointer line-clamp-2">
          <Link href={`/noticias/${article.slug}`}>
            {article.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">
            {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
          </span>
          <Link 
            href={`/noticias/${article.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Ler mais →
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Os Melhores Apps de Apostas do Brasil
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Reviews completos, análises especializadas e as últimas notícias sobre 
            aplicativos de apostas esportivas. Encontre o app perfeito para você.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/apps"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Ver Todos os Apps
            </Link>
            <Link 
              href="/analises"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Ler Análises
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Apps */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Apps Recomendados
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nossa seleção dos melhores aplicativos de apostas esportivas, 
              testados e avaliados pela nossa equipe especializada.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/apps"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Ver Todos os Apps
              <TrendingUp className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Por que confiar em nós?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Somos especialistas em apostas esportivas com anos de experiência 
              analisando e testando os melhores aplicativos do mercado.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Segurança</h3>
              <p className="text-gray-600 text-sm">
                Analisamos licenças e certificações de segurança
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Performance</h3>
              <p className="text-gray-600 text-sm">
                Testamos velocidade e estabilidade dos apps
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Experiência</h3>
              <p className="text-gray-600 text-sm">
                Avaliamos interface e facilidade de uso
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Bônus</h3>
              <p className="text-gray-600 text-sm">
                Comparamos ofertas e promoções exclusivas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Últimas Notícias
              </h2>
              <p className="text-gray-600">
                Fique por dentro das novidades do mundo das apostas esportivas
              </p>
            </div>
            <Link 
              href="/noticias"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Ver todas →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para começar a apostar?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Escolha um dos nossos apps recomendados e comece com segurança
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/apps"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Comparar Apps
            </Link>
            <Link 
              href="/tutoriais"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Aprender a Apostar
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}