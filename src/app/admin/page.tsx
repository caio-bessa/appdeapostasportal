import { Suspense } from 'react'
import Link from 'next/link'
import { 
  FileText, 
  Users, 
  Tag, 
  Smartphone, 
  BarChart3, 
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'

// This would normally come from Supabase
const dashboardStats = {
  articles: 24,
  categories: 6,
  authors: 4,
  apps: 8,
  totalViews: 15420,
  monthlyGrowth: 23.5
}

const recentArticles = [
  {
    id: 1,
    title: 'Betano Super Odd Brasil Copa: Como Aproveitar as Melhores Cotações',
    status: 'published',
    views: 1240,
    publishedAt: '2025-01-15',
    category: 'Promoções'
  },
  {
    id: 2,
    title: 'Brasileirão 2025: Palmeiras e Flamengo lideram odds',
    status: 'published',
    views: 890,
    publishedAt: '2025-01-14',
    category: 'Futebol'
  },
  {
    id: 3,
    title: 'Review Completo: Bet365 é Confiável?',
    status: 'draft',
    views: 0,
    publishedAt: null,
    category: 'Reviews'
  }
]

function StatCard({ title, value, icon: Icon, change }: {
  title: string
  value: string | number
  icon: any
  change?: string
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          {change && (
            <p className="text-green-600 text-sm font-medium mt-1">
              +{change}% este mês
            </p>
          )}
        </div>
        <div className="bg-blue-100 p-3 rounded-full">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  )
}

function QuickActions() {
  const actions = [
    { name: 'Novo Artigo', href: '/admin/articles/new', icon: FileText, color: 'bg-blue-600' },
    { name: 'Gerenciar Apps', href: '/admin/apps', icon: Smartphone, color: 'bg-green-600' },
    { name: 'Categorias', href: '/admin/categories', icon: Tag, color: 'bg-purple-600' },
    { name: 'Autores', href: '/admin/authors', icon: Users, color: 'bg-yellow-600' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <Link
            key={action.name}
            href={action.href}
            className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity`}
          >
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{action.name}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

function RecentArticlesTable() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-gray-800">Artigos Recentes</h3>
          <Link 
            href="/admin/articles"
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Ver todos →
          </Link>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentArticles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 line-clamp-2">
                    {article.title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    article.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {article.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {article.category}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {article.views.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('pt-BR') : '-'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="font-bold text-xl text-gray-800">Admin</span>
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">AppdeApostas CMS</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="text-gray-600 hover:text-blue-600 font-medium text-sm"
              >
                Ver Site
              </Link>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                Perfil
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Dashboard Administrativo
          </h1>
          <p className="text-gray-600">
            Gerencie o conteúdo do portal AppdeApostas.com.br
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total de Artigos" 
            value={dashboardStats.articles} 
            icon={FileText}
            change="12.5"
          />
          <StatCard 
            title="Categorias" 
            value={dashboardStats.categories} 
            icon={Tag}
          />
          <StatCard 
            title="Apps Cadastrados" 
            value={dashboardStats.apps} 
            icon={Smartphone}
            change="8.3"
          />
          <StatCard 
            title="Views Totais" 
            value={dashboardStats.totalViews.toLocaleString()} 
            icon={BarChart3}
            change={dashboardStats.monthlyGrowth.toString()}
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Ações Rápidas</h2>
          <QuickActions />
        </div>

        {/* Recent Articles */}
        <div className="mb-8">
          <RecentArticlesTable />
        </div>

        {/* Management Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Content Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Gerenciamento de Conteúdo</h3>
            <div className="space-y-3">
              <Link 
                href="/admin/articles"
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="font-medium">Artigos</span>
                </div>
                <span className="text-gray-500 text-sm">{dashboardStats.articles} itens</span>
              </Link>
              
              <Link 
                href="/admin/categories"
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <Tag className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="font-medium">Categorias</span>
                </div>
                <span className="text-gray-500 text-sm">{dashboardStats.categories} itens</span>
              </Link>
              
              <Link 
                href="/admin/apps"
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <Smartphone className="w-5 h-5 text-green-600 mr-3" />
                  <span className="font-medium">Apps de Apostas</span>
                </div>
                <span className="text-gray-500 text-sm">{dashboardStats.apps} itens</span>
              </Link>
              
              <Link 
                href="/admin/authors"
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-yellow-600 mr-3" />
                  <span className="font-medium">Autores</span>
                </div>
                <span className="text-gray-500 text-sm">4 itens</span>
              </Link>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Status do Sistema</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Frontend</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Banco de Dados</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  Conectado
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">API</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  Funcionando
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">CDN</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  Ativo
                </span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Link 
                href="/admin/settings"
                className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <Settings className="w-4 h-4 mr-2" />
                Configurações do Sistema
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}