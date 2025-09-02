import { Suspense } from 'react'
import Link from 'next/link'
import { Gift, Star, Clock, Shield, Zap, TrendingUp } from 'lucide-react'

const bonusOffers = [
  {
    id: 1,
    appName: 'Bet365',
    appSlug: 'bet365',
    title: 'Créditos de Apostas até R$ 200',
    description: 'Ganhe até R$ 200 em créditos de apostas para usar em qualquer esporte',
    bonusType: 'Bônus de Boas-vindas',
    value: 'R$ 200',
    minDeposit: 30,
    rollover: '1x',
    validFor: '30 dias',
    terms: 'Aplicam-se termos e condições. Apenas para novos clientes.',
    rating: 4.6,
    featured: true,
    color: 'from-green-500 to-green-600',
    logo: 'https://images.pexels.com/photos/7594435/pexels-photo-7594435.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    pros: ['Sem rollover complexo', 'Válido para todos os esportes', 'Créditos liberados rapidamente'],
    cons: ['Valor não tão alto', 'Apenas para novos usuários'],
    howToGet: [
      'Cadastre-se na Bet365',
      'Faça seu primeiro depósito de pelo menos R$ 30',
      'Os créditos serão creditados automaticamente',
      'Use os créditos em apostas qualificadas'
    ]
  },
  {
    id: 2,
    appName: 'Betano',
    appSlug: 'betano',
    title: 'Bônus de 100% até R$ 500',
    description: 'Dobre seu primeiro depósito com o bônus de boas-vindas da Betano',
    bonusType: 'Bônus de Depósito',
    value: 'R$ 500',
    minDeposit: 20,
    rollover: '5x',
    validFor: '30 dias',
    terms: 'Rollover de 5x em odds mínimas de 1.65. Válido por 30 dias.',
    rating: 4.5,
    featured: true,
    color: 'from-blue-500 to-blue-600',
    logo: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    pros: ['Valor alto do bônus', 'Depósito mínimo baixo', 'Rollover justo'],
    cons: ['Rollover obrigatório', 'Odds mínimas para liberação'],
    howToGet: [
      'Crie sua conta na Betano',
      'Faça um depósito de R$ 20 a R$ 500',
      'O bônus será creditado automaticamente',
      'Cumpra o rollover de 5x para sacar'
    ]
  },
  {
    id: 3,
    appName: 'KTO',
    appSlug: 'kto',
    title: 'Aposta Grátis de R$ 200',
    description: 'Receba uma aposta grátis sem rollover para testar a plataforma',
    bonusType: 'Aposta Grátis',
    value: 'R$ 200',
    minDeposit: 20,
    rollover: 'Sem rollover',
    validFor: '7 dias',
    terms: 'Aposta grátis em odds mínimas de 1.50. Ganhos podem ser sacados.',
    rating: 4.3,
    featured: true,
    color: 'from-purple-500 to-purple-600',
    logo: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    pros: ['Sem rollover', 'Ganhos podem ser sacados', 'Fácil de usar'],
    cons: ['Valor único', 'Prazo curto para usar'],
    howToGet: [
      'Registre-se na KTO',
      'Faça seu primeiro depósito',
      'A aposta grátis será creditada',
      'Use em odds mínimas de 1.50'
    ]
  },
  {
    id: 4,
    appName: 'Sportingbet',
    appSlug: 'sportingbet',
    title: 'Bônus de Boas-vindas R$ 150',
    description: 'Bônus tradicional para começar suas apostas com segurança',
    bonusType: 'Bônus de Boas-vindas',
    value: 'R$ 150',
    minDeposit: 25,
    rollover: '3x',
    validFor: '30 dias',
    terms: 'Rollover de 3x em apostas simples ou múltiplas com odds mínimas de 1.40.',
    rating: 4.2,
    featured: false,
    color: 'from-red-500 to-red-600',
    logo: 'https://images.pexels.com/photos/6347707/pexels-photo-6347707.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    pros: ['Rollover baixo', 'Empresa confiável', 'Fácil liberação'],
    cons: ['Valor menor', 'Odds mínimas obrigatórias'],
    howToGet: [
      'Abra sua conta na Sportingbet',
      'Deposite pelo menos R$ 25',
      'Receba o bônus automaticamente',
      'Aposte 3x o valor para liberar'
    ]
  },
  {
    id: 5,
    appName: 'Betfair',
    appSlug: 'betfair',
    title: 'Até R$ 300 em Apostas Grátis',
    description: 'Múltiplas apostas grátis para explorar o exchange da Betfair',
    bonusType: 'Apostas Grátis',
    value: 'R$ 300',
    minDeposit: 25,
    rollover: 'Sem rollover',
    validFor: '30 dias',
    terms: 'Apostas grátis distribuídas em 5 dias. Válidas no exchange e sportsbook.',
    rating: 4.4,
    featured: false,
    color: 'from-yellow-500 to-orange-500',
    logo: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    pros: ['Sem rollover', 'Válido no exchange', 'Valor distribuído'],
    cons: ['Liberação gradual', 'Interface complexa'],
    howToGet: [
      'Cadastre-se na Betfair',
      'Faça depósito mínimo de R$ 25',
      'Receba apostas grátis por 5 dias',
      'Use no exchange ou sportsbook'
    ]
  }
]

function BonusCard({ bonus }: { bonus: typeof bonusOffers[0] }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Header */}
      <div className={`h-32 bg-gradient-to-r ${bonus.color} p-6 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center">
            <img src={bonus.logo} alt={bonus.appName} className="w-12 h-12 rounded-lg mr-3 bg-white p-1" />
            <div>
              <h3 className="font-bold text-lg">{bonus.appName}</h3>
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-current text-yellow-300" />
                <span className="ml-1 text-sm">{bonus.rating}</span>
              </div>
            </div>
          </div>
          {bonus.featured && (
            <span className="bg-white bg-opacity-20 text-xs font-bold px-2 py-1 rounded">
              DESTAQUE
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6">
        {/* Bonus Title */}
        <h4 className="font-bold text-xl text-gray-800 mb-2">{bonus.title}</h4>
        <p className="text-gray-600 text-sm mb-4">{bonus.description}</p>
        
        {/* Bonus Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Tipo:</span>
              <div className="font-medium">{bonus.bonusType}</div>
            </div>
            <div>
              <span className="text-gray-500">Valor:</span>
              <div className="font-medium text-green-600">{bonus.value}</div>
            </div>
            <div>
              <span className="text-gray-500">Dep. Mínimo:</span>
              <div className="font-medium">R$ {bonus.minDeposit}</div>
            </div>
            <div>
              <span className="text-gray-500">Rollover:</span>
              <div className="font-medium">{bonus.rollover}</div>
            </div>
          </div>
        </div>
        
        {/* Pros and Cons */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h5 className="font-medium text-green-700 text-sm mb-2">Vantagens:</h5>
            <ul className="space-y-1">
              {bonus.pros.slice(0, 2).map((pro, index) => (
                <li key={index} className="text-xs text-gray-600 flex items-start">
                  <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-red-700 text-sm mb-2">Desvantagens:</h5>
            <ul className="space-y-1">
              {bonus.cons.slice(0, 2).map((con, index) => (
                <li key={index} className="text-xs text-gray-600 flex items-start">
                  <div className="w-1 h-1 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link 
            href={`/apps/${bonus.appSlug}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Ver Review
          </Link>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
            Pegar Bônus
          </button>
        </div>
        
        {/* Terms */}
        <p className="text-xs text-gray-500 mt-3 text-center">{bonus.terms}</p>
      </div>
    </div>
  )
}

function BonusComparison() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
      <div className="p-6 border-b border-gray-200">
        <h3 className="font-bold text-xl text-gray-800">Comparação de Bônus</h3>
        <p className="text-gray-600 text-sm mt-1">Compare os melhores bônus disponíveis</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">App</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bônus</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dep. Mín.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rollover</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prazo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ação</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bonusOffers.map((bonus) => (
              <tr key={bonus.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img src={bonus.logo} alt={bonus.appName} className="w-10 h-10 rounded-lg mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{bonus.appName}</div>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="ml-1 text-xs text-gray-500">{bonus.rating}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{bonus.value}</div>
                  <div className="text-xs text-gray-500">{bonus.bonusType}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  R$ {bonus.minDeposit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    bonus.rollover === 'Sem rollover' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {bonus.rollover}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {bonus.validFor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/apps/${bonus.appSlug}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                  >
                    Ver Detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function BonusPage() {
  const featuredBonuses = bonusOffers.filter(bonus => bonus.featured)
  const regularBonuses = bonusOffers.filter(bonus => !bonus.featured)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Melhores Bônus de Apostas 2025
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Encontre os melhores bônus e promoções dos aplicativos de apostas esportivas. 
          Comparamos ofertas, analisamos termos e ajudamos você a escolher o melhor.
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Shield className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">Termos Analisados</h3>
          <p className="text-gray-600 text-sm">Lemos todos os termos e condições para você</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Zap className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">Atualizados</h3>
          <p className="text-gray-600 text-sm">Ofertas verificadas e atualizadas diariamente</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">Melhores Ofertas</h3>
          <p className="text-gray-600 text-sm">Selecionamos apenas os bônus mais vantajosos</p>
        </div>
      </div>

      {/* Comparison Table */}
      <BonusComparison />

      {/* Featured Bonuses */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <Gift className="w-6 h-6 text-purple-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Bônus em Destaque</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBonuses.map((bonus) => (
            <BonusCard key={bonus.id} bonus={bonus} />
          ))}
        </div>
      </section>

      {/* Other Bonuses */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Outras Ofertas</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularBonuses.map((bonus) => (
            <BonusCard key={bonus.id} bonus={bonus} />
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <section className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Dicas para Aproveitar Bônus
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold mb-2">Leia os Termos</h3>
            <p className="text-gray-600 text-sm">Sempre leia os termos e condições antes de aceitar</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold mb-2">Cumpra Prazos</h3>
            <p className="text-gray-600 text-sm">Fique atento aos prazos para usar o bônus</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold mb-2">Gerencie Banca</h3>
            <p className="text-gray-600 text-sm">Use o bônus como parte da sua estratégia</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-bold mb-2">Aposte Responsável</h3>
            <p className="text-gray-600 text-sm">Bônus são extras, não garantia de lucro</p>
          </div>
        </div>
      </section>
    </div>
  )
}