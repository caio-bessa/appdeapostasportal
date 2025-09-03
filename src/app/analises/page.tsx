import { Suspense } from 'react'
import Link from 'next/link'
import { Star, TrendingUp, BarChart3, Target, Clock, User } from 'lucide-react'

const analyses = [
  {
    id: 1,
    title: 'Análise Completa: Bet365 vs Betano - Qual é melhor para apostas em futebol?',
    slug: 'bet365-vs-betano-comparacao-futebol',
    excerpt: 'Comparação detalhada entre os dois gigantes das apostas esportivas, focando especificamente em mercados de futebol brasileiro.',
    category: 'Comparações',
    author: 'Ricardo Silva',
    publishedAt: '2025-01-15',
    readTime: 8,
    rating: 4.5,
    imageUrl: 'https://images.pexels.com/photos/7594435/pexels-photo-7594435.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'comparison',
    featured: true
  },
  {
    id: 2,
    title: 'Odds do Brasileirão 2025: Análise estatística dos favoritos ao título',
    slug: 'odds-brasileirao-2025-analise-estatistica',
    excerpt: 'Análise profunda das odds oferecidas pelas principais casas para o Campeonato Brasileiro, com base em dados históricos.',
    category: 'Futebol',
    author: 'João Silva',
    publishedAt: '2025-01-14',
    readTime: 6,
    rating: 4.3,
    imageUrl: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'statistical',
    featured: true
  },
  {
    id: 3,
    title: 'Segurança em Apps de Apostas: Checklist completo para apostadores',
    slug: 'seguranca-apps-apostas-checklist-completo',
    excerpt: 'Guia definitivo sobre como identificar aplicativos seguros, verificar licenças e proteger seus dados pessoais.',
    category: 'Segurança',
    author: 'Ana Carolina Santos',
    publishedAt: '2025-01-13',
    readTime: 10,
    rating: 4.7,
    imageUrl: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'guide',
    featured: false
  },
  {
    id: 4,
    title: 'ROI em Apostas Esportivas: Como calcular e maximizar seus lucros',
    slug: 'roi-apostas-esportivas-calcular-maximizar-lucros',
    excerpt: 'Análise técnica sobre como calcular o retorno sobre investimento em apostas e estratégias para otimização.',
    category: 'Estratégias',
    author: 'Carlos Eduardo',
    publishedAt: '2025-01-12',
    readTime: 12,
    rating: 4.4,
    imageUrl: 'https://images.pexels.com/photos/6347707/pexels-photo-6347707.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'technical',
    featured: false
  },
  {
    id: 5,
    title: 'Cash Out Inteligente: Quando usar e quando evitar essa ferramenta',
    slug: 'cash-out-inteligente-quando-usar-evitar',
    excerpt: 'Estratégias avançadas para usar o cash out de forma inteligente e maximizar seus ganhos em apostas esportivas.',
    category: 'Estratégias',
    author: 'Ricardo Silva',
    publishedAt: '2025-01-11',
    readTime: 7,
    rating: 4.2,
    imageUrl: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'strategy',
    featured: false
  },
  {
    id: 6,
    title: 'Análise de Mercado: Como as casas de apostas definem suas odds',
    slug: 'analise-mercado-casas-apostas-definem-odds',
    excerpt: 'Investigação profunda sobre os algoritmos e metodologias usadas pelas casas de apostas para definir cotações.',
    category: 'Mercado',
    author: 'Pedro Costa',
    publishedAt: '2025-01-10',
    readTime: 9,
    rating: 4.1,
    imageUrl: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'market',
    featured: false
  }
]

const analysisTypes = [
  { name: 'Todas', slug: 'todas', icon: BarChart3, color: 'bg-blue-500' },
  { name: 'Comparações', slug: 'comparacoes', icon: Target, color: 'bg-purple-500' },
  { name: 'Estatísticas', slug: 'estatisticas', icon: TrendingUp, color: 'bg-green-500' },
  { name: 'Estratégias', slug: 'estrategias', icon: Star, color: 'bg-yellow-500' },
]

function AnalysisCard({ analysis }: { analysis: typeof analyses[0] }) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'comparison': return Target
      case 'statistical': return BarChart3
      case 'guide': return Star
      case 'technical': return TrendingUp
      case 'strategy': return Target
      case 'market': return BarChart3
      default: return BarChart3
    }
  }

  const TypeIcon = getTypeIcon(analysis.type)

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        <img 
          src={analysis.imageUrl} 
          alt={analysis.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
            <TypeIcon className="w-3 h-3 mr-1" />
            ANÁLISE
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {analysis.readTime} min
          </div>
        </div>
        {analysis.featured && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
              DESTAQUE
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {analysis.category}
          </span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="ml-1 text-gray-600 text-sm font-medium">{analysis.rating}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg mb-3 hover:text-purple-600 cursor-pointer line-clamp-2">
          <Link href={`/analises/${analysis.slug}`}>
            {analysis.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {analysis.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <User className="w-4 h-4 mr-1" />
            <span>Por {analysis.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(analysis.publishedAt).toLocaleDateString('pt-BR')}</span>
          </div>
          <Link 
            href={`/analises/${analysis.slug}`}
            className="text-purple-600 hover:text-purple-800 font-medium text-sm"
          >
            Ler análise →
          </Link>
        </div>
      </div>
    </article>
  )
}

function FilterTabs() {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {analysisTypes.map((type) => {
        const Icon = type.icon
        return (
          <button
            key={type.slug}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              type.slug === 'todas' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {type.name}
          </button>
        )
      })}
    </div>
  )
}

export default function AnalisesPage() {
  const featuredAnalyses = analyses.filter(analysis => analysis.featured)
  const regularAnalyses = analyses.filter(analysis => !analysis.featured)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Análises Especializadas
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Análises técnicas profundas, comparações detalhadas e insights especializados 
          sobre o mundo das apostas esportivas.
        </p>
      </div>

      {/* Filter Categories */}
      <FilterTabs />

      {/* Featured Analyses */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <Star className="w-6 h-6 text-purple-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Análises em Destaque</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredAnalyses.map((analysis) => (
            <AnalysisCard key={analysis.id} analysis={analysis} />
          ))}
        </div>
      </section>

      {/* Regular Analyses */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Todas as Análises</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularAnalyses.map((analysis) => (
            <AnalysisCard key={analysis.id} analysis={analysis} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Quer análises personalizadas?</h2>
        <p className="mb-6 opacity-90">
          Nossa equipe de especialistas pode criar análises customizadas para suas necessidades específicas.
        </p>
        <Link 
          href="/contato"
          className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-block"
        >
          Solicitar Análise
        </Link>
      </section>
    </div>
  )
}