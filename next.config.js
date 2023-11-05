/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "@/styles/helpers/_variables.scss";
    @import "@/styles/helpers/_button.scss";
    `,
  },
  images: {
    domains: ['i.ibb.co'],
    unoptimized: true
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/login'
      }
    ]
  }
}

module.exports = nextConfig
