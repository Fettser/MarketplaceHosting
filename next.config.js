/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: '**.userapi.com',
        // pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        // pathname: '/api/**',
      },
    ],
  },
}

module.exports = nextConfig
