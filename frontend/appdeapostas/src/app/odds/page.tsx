import { Suspense } from 'react'
import { TrendingUp, Clock, RefreshCw, BarChart3, Target, Zap } from 'lucide-react'

const liveMatches = [
  {
    id: 1,
    homeTeam: 'Flamengo',
    awayTeam: 'Palmeiras',
    league: 'Brasileirão Série A',
    time: '78\'',
    score: '2-1',
    status: 'live',
    odds: {
      home: 1.85,
      draw: 3.40,
      away: 4.20
    },
    nextGoal: {
      home: 2.10,
      away: 2.80,
      noGoal: 1.95
    }
  },
  {
    id: 2,
    homeTeam: 'Corinthians',
    awayTeam: 'São Paulo',
    league: 'Brasileirão Série A',
    time: '45\'',
    score: '0-0',
    status: 'halftime',
    odds: {
      home: 2.20,
      draw: 3.10,
      away: 3.50
    },
    nextGoal: {
      home: 2.40,
      away: 2.60,
      noGoal: 2.10
    }
  },
  {
    id: 3,
    homeTeam: 'Lakers',
    awayTeam: 'Warriors',
    league: 'NBA',
    time: 'Q3 8:45',
    score: '89-92',
    status: 'live',
    odds: {
      home: 1.95,
      away: 1.90
    },
    totalPoints: {
      over: 1.85,
      under: 1.95,
      line: 215.5
    }
  }
]

const upcomingMatches = [
  {
    id: 4,
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    league: 'La Liga',
    date: '2025-01-20',
    time: '17:00',
    odds: {
      home: 2.10,
      draw: 3.20,
      away: 3.40
    },
    featured: true
  },
  {
    id: 5,
    homeTeam: 'Manchester City',
    awayTeam: 'Liverpool',
    league: 'Premier League',
    date: '2025-01-21',
    time: '14:30',
    odds: {
      home: 1.75,
      draw: 3.80,
      away: 4.50
    },
    featured: true
  },
  {
    id: 6,
    homeTeam: 'Celtics',
    awayTeam: 'Heat',
    league: 'NBA',
    date: '2025-01-20',
    time: '22:00',
    odds: {
      home: 1.65,
      away: 2.25
    },
    featured: false
  }
]

function LiveMatchCard({ match }: { match: typeof liveMatches[0] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500 animate-pulse'
      case 'halftime': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(match.status)}`}></div>
          <span className="text-sm font-medium text-gray-600">{match.league}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          {match.time}
        </div>
      </div>
      
      <div className="text-center mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-lg">{match.homeTeam}</span>
          <span className="text-2xl font-bold text-blue-600">{match.score}</span>
          <span className="font-bold text-lg">{match.awayTeam}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button className="bg-gray-50 hover:bg-blue-50 p-3 rounded text-center transition-colors">
          <div className="text-xs text-gray-500 mb-1">Casa</div>
          <div className="font-bold text-blue-600">{match.odds.home}</div>
        </button>
        {match.odds.draw && (
          <button className="bg-gray-50 hover:bg-blue-50 p-3 rounded text-center transition-colors">
            <div className="text-xs text-gray-500 mb-1">Empate</div>
            <div className="font-bold text-blue-600">{match.odds.draw}</div>
          </button>
        )}
        <button className="bg-gray-50 hover:bg-blue-50 p-3 rounded text-center transition-colors">
          <div className="text-xs text-gray-500 mb-1">Fora</div>
          <div className="font-bold text-blue-600">{match.odds.away}</div>
        </button>
      </div>
      
      {match.nextGoal && (
        <div className="border-t pt-3">
          <div className="text-xs text-gray-500 mb-2">Próximo Gol:</div>
          <div className="grid grid-cols-3 gap-2">
            <button className="bg-green-50 p-2 rounded text-center text-xs">
              <div className="text-gray-500">Casa</div>
              <div className="font-bold text-green-600">{match.nextGoal.home}</div>
            </button>
            <button className="bg-green-50 p-2 rounded text-center text-xs">
              <div className="text-gray-500">Fora</div>
              <div className="font-bold text-green-600">{match.nextGoal.away}</div>
            </button>
            <button className="bg-green-50 p-2 rounded text-center text-xs">
              <div className="text-gray-500">Sem gol</div>
              <div className="font-bold text-green-600">{match.nextGoal.noGoal}</div>
            </button>
          </div>
        </div>
      )}
      
      {match.totalPoints && (
        <div className="border-t pt-3">
          <div className="text-xs text-gray-500 mb-2">Total de Pontos ({match.totalPoints.line}):</div>
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-purple-50 p-2 rounded text-center text-xs">
              <div className="text-gray-500">Mais</div>
              <div className="font-bold text-purple-600">{match.totalPoints.over}</div>
            </button>
            <button className="bg-purple-50 p-2 rounded text-center text-xs">
              <div className="text-gray-500">Menos</div>
              <div className="font-bold text-purple-600">{match.totalPoints.under}</div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function UpcomingMatchCard({ match }: { match: typeof upcomingMatches[0] }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-600">{match.league}</span>
        {match.featured && (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">
            DESTAQUE
          </span>
        )}
      </div>
      
      <div className="text-center mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-lg">{match.homeTeam}</span>
          <span className="text-sm text-gray-500">vs</span>
          <span className="font-bold text-lg">{match.awayTeam}</span>
        </div>
        <div className="text-sm text-gray-500">
          {new Date(match.date).toLocaleDateString('pt-BR')} às {match.time}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <button className="bg-gray-50 hover:bg-blue-50 p-3 rounded text-center transition-colors">
          <div className="text-xs text-gray-500 mb-1">Casa</div>
          <div className="font-bold text-blue-600">{match.odds.home}</div>
        </button>
        {match.odds.draw && (
          <button className="bg-gray-50 hover:bg-blue-50 p-3 rounded text-center transition-colors">
            <div className="text-xs text-gray-500 mb-1">Empate</div>
            <div className="font-bold text-blue-600">{match.odds.draw}</div>
          </button>
        )}
        <button className="bg-gray-50 hover:bg-blue-50 p-3 rounded text-center transition-colors">
          <div className="text-xs text-gray-500 mb-1">Fora</div>
          <div className="font-bold text-blue-600">{match.odds.away}</div>
        </button>
      </div>
    </div>
  )
}

export default function OddsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Odds ao Vivo
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Acompanhe as odds em tempo real dos principais jogos e competições. 
          Encontre as melhores cotações para suas apostas.
        </p>
      </div>

      {/* Live Update Notice */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-center">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
        <div className="flex-1">
          <div className="flex items-center">
            <RefreshCw className="w-4 h-4 text-red-600 mr-2" />
            <span className="font-medium text-red-800">Odds atualizadas em tempo real</span>
          </div>
          <p className="text-red-600 text-sm mt-1">
            As cotações são atualizadas automaticamente a cada 30 segundos
          </p>
        </div>
      </div>

      {/* Live Matches */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
            <h2 className="text-2xl font-bold text-gray-800">Jogos ao Vivo</h2>
          </div>
          <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
            <RefreshCw className="w-4 h-4 mr-1" />
            Atualizar
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveMatches.map((match) => (
            <LiveMatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Próximos Jogos</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingMatches.map((match) => (
            <UpcomingMatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* Odds Comparison */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Comparação de Odds</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-bold text-lg">Real Madrid vs Barcelona</h3>
            <p className="text-gray-600 text-sm">La Liga - Domingo, 20/01 às 17:00</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Casa</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Real Madrid</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Empate</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Barcelona</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">Bet365</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-bold">2.10</span>
                  </td>
                  <td className="px-6 py-4 text-center">3.20</td>
                  <td className="px-6 py-4 text-center">3.40</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">Betano</td>
                  <td className="px-6 py-4 text-center">2.05</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-bold">3.25</span>
                  </td>
                  <td className="px-6 py-4 text-center">3.45</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">KTO</td>
                  <td className="px-6 py-4 text-center">2.08</td>
                  <td className="px-6 py-4 text-center">3.15</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-bold">3.50</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Odds Tips */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Dicas para Usar as Odds
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold mb-2">Compare Sempre</h3>
            <p className="text-gray-600 text-sm">Diferentes casas oferecem odds diferentes</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold mb-2">Value Betting</h3>
            <p className="text-gray-600 text-sm">Procure odds com valor acima da probabilidade real</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold mb-2">Timing</h3>
            <p className="text-gray-600 text-sm">Odds mudam constantemente, aproveite o momento</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-bold mb-2">Ação Rápida</h3>
            <p className="text-gray-600 text-sm">Melhores odds desaparecem rapidamente</p>
          </div>
        </div>
      </section>
    </div>
  )
}