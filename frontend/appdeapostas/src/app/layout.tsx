import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AppdeApostas Brasil - Portal de Apostas Esportivas',
  description: 'O melhor portal de notícias, análises e reviews de aplicativos de apostas esportivas do Brasil. Encontre os melhores apps, bônus e dicas para apostar com segurança.',
  keywords: 'apostas esportivas, apps de apostas, bet365, betano, futebol, basquete, análises',
  authors: [{ name: 'AppdeApostas Brasil' }],
  openGraph: {
    title: 'AppdeApostas Brasil - Portal de Apostas Esportivas',
    description: 'Portal completo sobre apostas esportivas no Brasil',
    url: 'https://appdeapostas.com.br',
    siteName: 'AppdeApostas Brasil',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AppdeApostas Brasil',
    description: 'Portal de apostas esportivas do Brasil',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-50`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}