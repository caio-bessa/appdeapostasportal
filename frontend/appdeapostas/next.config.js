/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  srcDir: 'src',
  experimental: {
    appDir: true
  },
  
  images: {
    domains: ['images.pexels.com', 'via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'appdeapostas.com.br',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://appdeapostas.com.br',
    NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL || 'https://appdeapostas.com.br/api',
    STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
  }
}

module.exports = nextConfig