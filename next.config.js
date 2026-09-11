/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    '10.10.51.19:3000',
    '10.10.51.19',
    '172.16.46.53:3000',
    '172.16.46.53',
    'localhost:3000',
    'localhost'
  ]
};

module.exports = nextConfig;