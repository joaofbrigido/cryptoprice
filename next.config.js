/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'coin-images.coingecko.com/coins/images',
      'coin-images.coingecko.com',
    ],
  },
};

module.exports = withPWA(nextConfig);
