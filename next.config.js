/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    '10.10.51.19:3000',
    '10.10.51.19',
    '172.16.46.49:3000',
    '172.16.46.49',
    'localhost:3000',
    'localhost'
  ],
  async rewrites() {
    return [
      {
        source: '/backend-api/:path*',
        destination: 'http://127.0.0.1:5001/api/:path*'
      }
    ]
  }
};

module.exports = nextConfig;