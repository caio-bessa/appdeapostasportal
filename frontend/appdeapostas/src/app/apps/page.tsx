import { Suspense } from 'react'
import Link from 'next/link'
import { Star, Download, Shield, Zap, Award, Filter } from 'lucide-react'

const apps = [
  {
    id: 1,
    name: 'Bet365',
    slug: 'bet365',
    rating: 4.6,
    description: 'A casa de apostas mais completa do mundo com streaming ao vivo e cash out em tempo real.',
    longDescription: 'A Bet365 é reconhecida mundialmente como uma das melhores casas de apostas, oferecendo uma experiência completa para apostadores brasileiros.',
    bonus: 'Até R$ 200 em créditos de apostas',
    minDeposit: 30,
    features: ['Streaming ao vivo', 'Cash out', 'Apostas ao vivo', 'App nativo iOS/Android'],
    pros: ['Interface intuitiva', 'Odds competitivas', 'Streaming de qualidade', 'Suporte 24/7'],
    cons: ['Bônus não tão atrativo', 'Verificação pode ser demorada'],
    paymentMethods: ['PIX', 'Cartão de Crédito', 'Transferência Bancária', 'AstroPay'],
    license: 'Licenciada pela UK Gambling Commission',
    downloadUrl: 'https://mobile.bet365.com',
    logo: 'https://images.pexels.com/photos/7594435/pexels-photo-7594435.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    featured: true,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 2,
    name: 'Betano',
    slug: 'betano',
    rating: 4.5,
    description: 'Patrocinador oficial do Brasileirão com foco total no mercado brasileiro.',
    longDescription: 'A Betano se destaca no Brasil como patrocinadora oficial do Brasileirão, oferecendo odds especiais e promoções exclusivas.',
    bonus: 'Bônus de 100% até R$ 500',
    minDeposit: 20,
    features: ['Odds turbinadas', 'PIX instantâneo', 'Streaming gratuito', 'Suporte em português'],
    pros: ['Bônus atrativo', 'Foco no mercado brasileiro', 'PIX sem taxas', 'Odds competitivas'],
    cons: ['Menor variedade de esportes', 'Interface pode ser lenta'],
    paymentMethods: ['PIX', 'Cartão de Crédito', 'Pay4Fun', 'AstroPay'],
    license: 'Licenciada pela Malta Gaming Authority',
    downloadUrl: 'https://betano.com/br/app/',
    logo: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    featured: true,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 3,
    name: 'KTO',
    slug: 'kto',
    rating: 4.3,
    description: 'Interface moderna e gamificada com recursos únicos de criação de apostas.',
    longDescription: 'A KTO inova no mercado brasileiro com uma interface moderna e recursos únicos como o "Criar Aposta".',
    bonus: 'Aposta grátis de R$ 200',
    minDeposit: 20,
    features: ['Criar aposta', 'Cashback semanal', 'Interface gamificada', 'Odds turbinadas'],
    pros: ['Interface moderna', 'Recursos únicos', 'Cashback automático', 'Fácil de usar'],
    cons: ['Empresa relativamente nova', 'Cobertura limitada de esportes'],
    paymentMethods: ['PIX', 'Cartão de Crédito', 'AstroPay', 'Muchbetter'],
    license: 'Licenciada pela Antillephone N.V.',
    downloadUrl: 'https://kto.com/br/mobile/',
    logo: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    featured: true,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 4,
    name: 'Sportingbet',
    slug: 'sportingbet',
    rating: 4.2,
    description: 'Tradição em apostas esportivas com interface simples e confiável.',
    longDescription: 'A Sportingbet combina tradição e confiabilidade, sendo uma das casas mais respeitadas do mercado.',
    bonus: 'Bônus de boas-vindas até R$ 150',
    minDeposit: 25,
    features: ['Interface simples', 'Apostas rápidas', 'Promoções regulares', 'Suporte especializado'],
    pros: ['Fácil de usar', 'Empresa confiável', 'Saque rápido', 'Bom atendimento'],
    cons: ['Bônus menor', 'Menos opções de streaming'],
    paymentMethods: ['PIX', 'Cartão de Crédito', 'Transferência Bancária'],
    license: 'Licenciada em Gibraltar',
    downloadUrl: 'https://sportingbet.com/br/app',
    logo: 'https://images.pexels.com/photos/6347707/pexels-photo-6347707.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    featured: false,
    color: 'from-red-500 to-red-600'
  },
  {
    id: 5,
    name: 'Betfair',
    slug: 'betfair',
    rating: 4.4,
    description: 'Casa de apostas com exchange e mercados únicos no mundo.',
    longDescription: 'A Betfair revolucionou as apostas com seu sistema de exchange, permitindo apostar contra outros usuários.',
    bonus: 'Até R$ 300 em apostas grátis',
    minDeposit: 25,
    features: ['Exchange de apostas', 'Odds altas', 'Cash out', 'Mercados únicos'],
    pros: ['Exchange inovador', 'Odds competitivas', 'Muitas opções', 'Empresa sólida'],
    cons: ['Interface complexa', 'Curva de aprendizado'],
    paymentMethods: ['PIX', 'Cartão de Crédito', 'Neteller', 'Skrill'],
    license: 'Licenciada pela Malta Gaming Authority',
    downloadUrl: 'https://betfair.com/br/app',
    logo: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    featured: false,
    color: 'from-yellow-500 to-orange-500'
  }
]

function AppCard({ app }: { app: typeof apps[0] }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Header with gradient */}
      <div className={`h-32 bg-gradient-to-r ${app.color} p-6 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative z-10 flex items-center">
          <img src={app.logo} alt={app.name} className="w-16 h-16 rounded-xl mr-4 bg-white p-2" />
          <div>
            <h3 className="font-bold text-xl">{app.name}</h3>
            <div className="flex items-center mt-1">
              <Star className="w-4 h-4 fill-current text-yellow-300" />
              <span className="ml-1 text-sm font-medium">{app.rating}</span>
              {app.featured && (
                <span className="ml-2 bg-white bg-opacity-20 text-xs px-2 py-1 rounded">
                  DESTAQUE
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{app.description}</p>
        
        {/* Bonus Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <div className="flex items-center text-green-700">
            <Award className="w-4 h-4 mr-2" />
            <span className="font-medium text-sm">{app.bonus}</span>
          </div>
        </div>
        
        {/* Key Features */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 text-sm mb-2">Principais recursos:</h4>
          <div className="grid grid-cols-2 gap-1">
            {app.features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center text-gray-600 text-xs">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                {feature}
              </div>
            ))}
          </div>
        </div>
        
        {/* Deposit Info */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>Depósito mínimo:</span>
          <span className="font-medium">R$ {app.minDeposit}</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link 
            href={`/apps/${app.slug}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Ver Review
          </Link>
          <a
            href={app.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center"
          >
            <Download className="w-4 h-4 mr-1" />
            Baixar
          </a>
        </div>
      </div>
    </div>
  )
}

function FilterSection() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center mb-4">
        <Filter className="w-5 h-5 mr-2 text-gray-600" />
        <h3 className="font-bold text-lg">Filtros</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Avaliação</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option>Todas as avaliações</option>
            <option>4.5+ estrelas</option>
            <option>4.0+ estrelas</option>
            <option>3.5+ estrelas</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Depósito Mínimo</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option>Qualquer valor</option>
            <option>Até R$ 20</option>
            <option>Até R$ 50</option>
            <option>Até R$ 100</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recursos</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option>Todos os recursos</option>
            <option>Com streaming</option>
            <option>Com cash out</option>
            <option>PIX instantâneo</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Esporte</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option>Todos os esportes</option>
            <option>Futebol</option>
            <option>Basquete</option>
            <option>Tênis</option>
            <option>UFC/MMA</option>
          </select>
        </div>
      </div>
    </div>
  )
}

function ComparisonTable() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
      <div className="p-6 border-b border-gray-200">
        <h3 className="font-bold text-xl text-gray-800">Comparação Rápida</h3>
        <p className="text-gray-600 text-sm mt-1">Compare os principais recursos dos apps</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">App</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avaliação</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bônus</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dep. Mín.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Streaming</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cash Out</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {apps.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img src={app.logo} alt={app.name} className="w-10 h-10 rounded-lg mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{app.name}</div>
                      <div className="text-sm text-gray-500">Casa de apostas</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{app.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {app.bonus}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  R$ {app.minDeposit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    app.features.some(f => f.toLowerCase().includes('streaming')) 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {app.features.some(f => f.toLowerCase().includes('streaming')) ? 'Sim' : 'Não'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    app.features.some(f => f.toLowerCase().includes('cash')) 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {app.features.some(f => f.toLowerCase().includes('cash')) ? 'Sim' : 'Não'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function AppsPage() {
  const featuredApps = apps.filter(app => app.featured)
  const otherApps = apps.filter(app => !app.featured)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Melhores Apps de Apostas 2025
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Reviews completos e imparciais dos principais aplicativos de apostas esportivas 
          disponíveis no Brasil. Encontre o app perfeito para suas apostas.
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Shield className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">100% Seguros</h3>
          <p className="text-gray-600 text-sm">Todos os apps são licenciados e regulamentados</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Zap className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">Testados</h3>
          <p className="text-gray-600 text-sm">Cada app é testado pela nossa equipe especializada</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Award className="w-12 h-12 text-purple-600 mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">Atualizados</h3>
          <p className="text-gray-600 text-sm">Reviews atualizados mensalmente</p>
        </div>
      </div>

      {/* Filters */}
      <FilterSection />

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Featured Apps */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Apps em Destaque</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </section>

      {/* Other Apps */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Outros Apps Recomendados</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Não encontrou o que procurava?</h2>
        <p className="mb-6 opacity-90">
          Nossa equipe está sempre testando novos aplicativos. Entre em contato para sugestões!
        </p>
        <Link 
          href="/contato"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-block"
        >
          Fale Conosco
        </Link>
      </section>
    </div>
  )
}