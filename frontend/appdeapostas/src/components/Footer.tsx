import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  apps: [
    { name: 'Bet365', href: '/apps/bet365' },
    { name: 'Betano', href: '/apps/betano' },
    { name: 'KTO', href: '/apps/kto' },
    { name: 'Sportingbet', href: '/apps/sportingbet' },
    { name: 'Todos os Apps', href: '/apps' },
  ],
  content: [
    { name: 'Notícias', href: '/noticias' },
    { name: 'Análises', href: '/analises' },
    { name: 'Tutoriais', href: '/tutoriais' },
    { name: 'Bônus', href: '/bonus' },
    { name: 'Blog', href: '/blog' },
  ],
  sports: [
    { name: 'Futebol', href: '/categoria/futebol' },
    { name: 'Basquete', href: '/categoria/basquete' },
    { name: 'Tênis', href: '/categoria/tenis' },
    { name: 'UFC/MMA', href: '/categoria/ufc' },
    { name: 'E-sports', href: '/categoria/e-sports' },
  ],
  legal: [
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Contato', href: '/contato' },
    { name: 'Termos de Uso', href: '/termos' },
    { name: 'Política de Privacidade', href: '/privacidade' },
    { name: 'Jogo Responsável', href: '/jogo-responsavel' },
  ],
}

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/appdeapostas', icon: Facebook },
  { name: 'Twitter', href: 'https://twitter.com/appdeapostas', icon: Twitter },
  { name: 'Instagram', href: 'https://instagram.com/appdeapostas', icon: Instagram },
  { name: 'YouTube', href: 'https://youtube.com/@appdeapostas', icon: Youtube },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-xl">AppdeApostas Brasil</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              O portal mais completo sobre aplicativos de apostas esportivas no Brasil. 
              Reviews imparciais, análises especializadas e as últimas notícias do setor.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>contato@appdeapostas.com.br</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+55 (11) 9999-9999</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </div>

          {/* Apps Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Apps de Apostas</h3>
            <ul className="space-y-2">
              {footerLinks.apps.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Content Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Conteúdo</h3>
            <ul className="space-y-2">
              {footerLinks.content.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sports Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Esportes</h3>
            <ul className="space-y-2">
              {footerLinks.sports.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex space-x-4 mb-4 md:mb-0">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
            
            {/* Newsletter Signup */}
            <div className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="Seu email para newsletter"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none text-sm"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Inscrever
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2025 AppdeApostas Brasil. Todos os direitos reservados.</p>
            </div>
            
            <div className="flex items-center space-x-6">
              {footerLinks.legal.slice(2).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Responsible Gaming Notice */}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-500 text-center">
              🔞 Apostas esportivas são para maiores de 18 anos. Jogue com responsabilidade. 
              Se você tem problemas com jogos, procure ajuda em{' '}
              <a href="https://www.jogadoresponsavel.com.br" className="text-blue-400 hover:text-blue-300">
                jogadoresponsavel.com.br
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}