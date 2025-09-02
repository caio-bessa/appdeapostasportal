/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://appdeapostas.com.br',
    NEXT_PUBLIC_STRAPI_URL: 'https://appdeapostas.com.br/api',
  }
}

module.exports = nextConfig