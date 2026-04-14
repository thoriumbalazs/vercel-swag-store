import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    root: '../../',
  },
  cacheComponents: true,
  cacheLife: {
    products: {
      stale: 300,
      revalidate: 900,
      expire: 3600,
    },
    promotions: {
      stale: 60,
      revalidate: 300,
      expire: 600,
    },
    storeConfig: {
      stale: 3600,
      revalidate: 86_400,
      expire: 604_800,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com',
      },
    ],
  },
}

export default nextConfig
