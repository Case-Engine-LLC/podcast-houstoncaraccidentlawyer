import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/v1', destination: '/', permanent: true },
      { source: '/v2', destination: '/', permanent: true },
      { source: '/v3', destination: '/', permanent: true },
      { source: '/v1/:path*', destination: '/:path*', permanent: true },
      { source: '/v2/:path*', destination: '/:path*', permanent: true },
      { source: '/v3/:path*', destination: '/:path*', permanent: true },
    ]
  },
}

export default nextConfig
