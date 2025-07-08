import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['cheerio'],
  images: {
    domains: [
      'm.media-amazon.com',
      'rukminim2.flixcart.com',
      'i.ebayimg.com',
      'images-na.ssl-images-amazon.com',
      'www.bestbuy.com',
      'www.walmart.com',
      'www.newegg.com',
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
