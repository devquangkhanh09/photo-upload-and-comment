/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/photos/*',
      },
      {
        protocol: 'http',
        hostname: 'ec2-13-211-134-40.ap-southeast-2.compute.amazonaws.com',
        port: '8000',
        pathname: '/photos/*',
      },
    ],
  },
};

export default nextConfig;
