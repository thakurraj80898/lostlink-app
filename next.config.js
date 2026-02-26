/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['via.placeholder.com', 'lostlink-images.s3.amazonaws.com'],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig
