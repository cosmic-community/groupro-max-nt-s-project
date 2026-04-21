/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'imgix.cosmicjs.com' },
      { protocol: 'https', hostname: 'cdn.cosmicjs.com' },
    ],
  },
}

module.exports = nextConfig