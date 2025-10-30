/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/api/curl',
        has: [
          {
            type: 'header',
            key: 'user-agent',
            value: '.*(curl|wget|httpie).*',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

