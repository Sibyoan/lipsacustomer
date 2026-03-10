/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin']
  },
  images: {
    domains: ['res.cloudinary.com', 'firebasestorage.googleapis.com']
  }
}

module.exports = nextConfig