import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts'
);

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'qrbackend.tr',
    //     pathname: '/api/planck/**',
    //   },
    // ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      {
        source: '/ürünler',
        destination: '/urunler',
        permanent: true,
      },
      {
        source: '/ürünler/:id',
        destination: '/urunler/:id',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);