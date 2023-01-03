/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['assets.coingecko.com/coins/images', 'assets.coingecko.com'],
  },
};

module.exports = nextConfig;
