/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    STATIC_URL: isProd ? process.env.STATIC_URL : '',
  },
  assetPrefix: isProd ? process.env.STATIC_URL : '',
}

export default nextConfig
