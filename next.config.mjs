/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/photos/*',
      },
      {
        protocol: 'https',
        hostname: 'qode-assignment-api.dev-quangkhanh.xyz',
        pathname: '/photos/*',
      },
    ],
  },
};

export default nextConfig;
