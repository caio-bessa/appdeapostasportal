import { Suspense } from 'react'
import Link from 'next/link'
import { BookOpen, Play, Clock, User, Star, Target, Lightbulb, TrendingUp } from 'lucide-react'

const tutorials = [
  {
    id: 1,
    title: 'Como Começar a Apostar: Guia Completo para Iniciantes',
    slug: 'como-comecar-apostar-guia-iniciantes',
    excerpt: 'Tudo que você precisa saber para dar seus primeiros passos no mundo das apostas esportivas com segurança.',
    category: 'Iniciantes',
    author: 'Carlos Eduardo',
    publishedAt: '2025-01-15',
    readTime: '12 min',
    difficulty: 'Iniciante',
    views: 15420,
    rating: 4.8,
    imageUrl: 'https://images.pexels.com/photos/7594435/pexels-photo-7594435.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    steps: 8,
    topics: ['Cadastro', 'Primeiro depósito', 'Tipos de apostas', 'Gestão de banca']
  },
  {
    id: 2,
    title: 'Gestão de Banca: Como Não Perder Dinheiro em Apostas',
    slug: 'gestao-banca-nao-perder-dinheiro',
    excerpt: 'Estratégias fundamentais para gerenciar seu dinheiro e apostar de forma responsável e lucrativa.',
    category: 'Estratégias',
    author: 'Ricardo Silva',
    publishedAt: '2025-01-14',
    readTime: '15 min',
    difficulty: 'Intermediário',
    views: 12350,
    rating: 4.9,
    imageUrl: 'https://images.pexels.com/photos/6347707/pexels-photo-6347707.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    steps: 6,
    topics: ['Bankroll', 'Unidades', 'Kelly Criterion', 'Stop Loss']
  },
  {
    id: 3,
    title: 'Como Ler Odds: Entenda as Cotações de Apostas',
    slug: 'como-ler-odds-cotacoes-apostas',
    excerpt: 'Aprenda a interpretar odds decimais, fracionárias e americanas para fazer apostas mais inteligentes.',
    category: 'Fundamentos',
    author: 'João Silva',
    publishedAt: '2025-01-13',
    readTime: '8 min',
    difficulty: 'Iniciante',
    views: 9870,
    rating: 4.6,
    imageUrl: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    steps: 5,
    topics: ['Odds decimais', 'Probabilidades', 'Value betting', 'Cálculos']
  },
  {
    id: 4,
    title: 'Apostas Múltiplas: Como Aumentar Seus Ganhos',
    slug: 'apostas-multiplas-aumentar-ganhos',
    excerpt: 'Estratégias para criar apostas múltiplas lucrativas e gerenciar os riscos envolvidos.',
    category: 'Estratégias',
    author: 'Pedro Costa',
    publishedAt: '2025-01-12',
    readTime: '10 min',
    difficulty: 'Intermediário',
    views: 8540,
    rating: 4.4,
    imageUrl: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    steps: 7,
    topics: ['Seleções', 'Correlação', 'Risco vs Retorno', 'Sistemas']
  },
  {
    id: 5,
    title: 'Live Betting: Como Apostar Durante o Jogo',
    slug: 'live-betting-apostar-durante-jogo',
    excerpt: 'Técnicas avançadas para apostas ao vivo e como aproveitar as mudanças de momentum.',
    category: 'Avançado',
    author: 'Ana Carolina',
    publishedAt: '2025-01-11',
    readTime: '11 min',
    difficulty: 'Avançado',
    views: 7230,
    rating: 4.5,
    imageUrl: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    steps: 9,
    topics: ['Momentum', 'Timing', 'Odds flutuantes', 'Análise rápida']
  },
  {
    id: 6,
    title: 'Análise de Estatísticas: Como Usar Dados para Apostar Melhor',
    slug: 'analise-estatisticas-dados-apostas',
    excerpt: 'Aprenda a analisar estatísticas esportivas e usar dados para tomar decisões mais assertivas.',
    category: 'Análise',
    author: 'Ricardo Silva',
    publishedAt: '2025-01-10',
    readTime: '13 min',
    difficulty: 'Intermediário',
    views: 6890,
    rating: 4.3,
    imageUrl: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    steps: 10,
    topics: ['xG', 'Posse de bola', 'Histórico H2H', 'Tendências']
  }
]

const categories = [
  { name: 'Iniciantes', slug: 'iniciantes', count: 12, color: 'bg-green-500', icon: BookOpen },
  { name: 'Estratégias', slug: 'estrategias', count: 18, color: 'bg-blue-500', icon: Target },
  { name: 'Fundamentos', slug: 'fundamentos', count: 15, color: 'bg-purple-500', icon: Lightbulb },
  { name: 'Avançado', slug: 'avancado', count: 8, color: 'bg-red-500', icon: TrendingUp },
]

function TutorialCard({ tutorial }: { tutorial: typeof tutorials[0] }) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-green-100 text-green-800'
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800'
      case 'Avançado': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        <img 
          src={tutorial.imageUrl} 
          alt={tutorial.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
            <BookOpen className="w-3 h-3 mr-1" />
            TUTORIAL
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {tutorial.readTime}
          </div>
        </div>
        {tutorial.featured && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
              DESTAQUE
            </span>
          </div>
        )}
        <div className="absolute bottom-4 right-4">
          <div className="bg-white bg-opacity-90 text-gray-800 text-xs px-2 py-1 rounded flex items-center">
            <Play className="w-3 h-3 mr-1" />
            {tutorial.steps} passos
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getDifficultyColor(tutorial.difficulty)}`}>
            {tutorial.difficulty}
          </span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="ml-1 text-gray-600 text-sm font-medium">{tutorial.rating}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg mb-3 hover:text-blue-600 cursor-pointer line-clamp-2">
          <Link href={`/tutoriais/${tutorial.slug}`}>
            {tutorial.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {tutorial.excerpt}
        </p>
        
        {/* Topics */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tutorial.topics.slice(0, 3).map((topic, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
            >
              {topic}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <User className="w-4 h-4 mr-1" />
            <span>Por {tutorial.author}</span>
            <span className="mx-2">•</span>
            <span>{tutorial.views.toLocaleString()} views</span>
          </div>
          <Link 
            href={`/tutoriais/${tutorial.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Começar →
          </Link>
        </div>
      </div>
    </article>
  )
}

function CategoryCard({ category }: { category: typeof categories[0] }) {
  const Icon = category.icon
  
  return (
    <Link 
      href={`/tutoriais/categoria/${category.slug}`}
      className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center mb-3">
        <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mr-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-800">{category.name}</h3>
          <p className="text-gray-500 text-sm">{category.count} tutoriais</p>
        </div>
      </div>
      <p className="text-gray-600 text-sm">
        Aprenda sobre {category.name.toLowerCase()} em apostas esportivas
      </p>
    </Link>
  )
}

export default function TutoriaisPage() {
  const featuredTutorials = tutorials.filter(tutorial => tutorial.featured)
  const regularTutorials = tutorials.filter(tutorial => !tutorial.featured)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Tutoriais de Apostas Esportivas
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Aprenda a apostar com segurança através dos nossos tutoriais passo a passo. 
          Do básico ao avançado, tudo que você precisa saber sobre apostas esportivas.
        </p>
      </div>

      {/* Learning Path */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Trilha de Aprendizado</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Tutorials */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <Star className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Tutoriais em Destaque</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredTutorials.map((tutorial) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))}
        </div>
      </section>

      {/* All Tutorials */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Todos os Tutoriais</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularTutorials.map((tutorial) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))}
        </div>
      </section>

      {/* Learning Tips */}
      <section className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Dicas para Aprender Melhor
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold mb-2">Comece do Básico</h3>
            <p className="text-gray-600 text-sm">Siga a ordem dos tutoriais para melhor aprendizado</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold mb-2">Pratique</h3>
            <p className="text-gray-600 text-sm">Aplique o conhecimento com apostas pequenas</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lightbulb className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold mb-2">Anote Dúvidas</h3>
            <p className="text-gray-600 text-sm">Mantenha um caderno de aprendizado</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-bold mb-2">Evolua Gradual</h3>
            <p className="text-gray-600 text-sm">Aumente complexidade conforme aprende</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Quer um tutorial personalizado?</h2>
        <p className="mb-6 opacity-90">
          Nossa equipe pode criar tutoriais específicos para suas dúvidas sobre apostas esportivas.
        </p>
        <Link 
          href="/contato"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-block"
        >
          Solicitar Tutorial
        </Link>
      </section>
    </div>
  )
}