import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AppdeApostas Brasil - Portal de Apostas Esportivas',
  description: 'O melhor portal de notícias, análises e reviews de aplicativos de apostas esportivas do Brasil.',
  keywords: 'apostas esportivas, apps de apostas, bet365, betano, futebol, basquete',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-50`}>
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <span className="font-bold text-xl text-gray-800">AppdeApostas</span>
                </a>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <a href="/" className="text-gray-600 hover:text-blue-600 font-medium">Início</a>
                <a href="/apps" className="text-gray-600 hover:text-blue-600 font-medium">Apps</a>
                <a href="/analises" className="text-gray-600 hover:text-blue-600 font-medium">Análises</a>
                <a href="/noticias" className="text-gray-600 hover:text-blue-600 font-medium">Notícias</a>
                <a href="/bonus" className="text-gray-600 hover:text-blue-600 font-medium">Bônus</a>
                <a href="/tutoriais" className="text-gray-600 hover:text-blue-600 font-medium">Tutoriais</a>
              </nav>
              <div className="hidden md:flex items-center space-x-4">
                <a href="/apps" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Comparar Apps
                </a>
              </div>
            </div>
          </div>
        </header>
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <footer className="bg-gray-900 text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <span className="font-bold text-xl">AppdeApostas Brasil</span>
                </div>
                <p className="text-gray-400 text-sm">
                  O portal mais completo sobre aplicativos de apostas esportivas no Brasil.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Apps</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/apps/bet365" className="hover:text-white">Bet365</a></li>
                  <li><a href="/apps/betano" className="hover:text-white">Betano</a></li>
                  <li><a href="/apps/kto" className="hover:text-white">KTO</a></li>
                  <li><a href="/apps" className="hover:text-white">Todos os Apps</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Conteúdo</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/noticias" className="hover:text-white">Notícias</a></li>
                  <li><a href="/analises" className="hover:text-white">Análises</a></li>
                  <li><a href="/tutoriais" className="hover:text-white">Tutoriais</a></li>
                  <li><a href="/bonus" className="hover:text-white">Bônus</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Legal</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/sobre" className="hover:text-white">Sobre</a></li>
                  <li><a href="/contato" className="hover:text-white">Contato</a></li>
                  <li><a href="/termos" className="hover:text-white">Termos</a></li>
                  <li><a href="/privacidade" className="hover:text-white">Privacidade</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 mt-8 text-center">
              <p className="text-gray-400 text-sm">
                &copy; 2025 AppdeApostas Brasil. Todos os direitos reservados.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                🔞 Apostas esportivas são para maiores de 18 anos. Jogue com responsabilidade.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}