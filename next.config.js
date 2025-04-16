/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'dmcicorporation.com',
      },
      {
        protocol: 'https',
        hostname: 'abic-agent-bakit.s3.ap-southeast-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'dmci-agent-bakit.s3.amazonaws.com',
      },
    ],
  },

};

module.exports = nextConfig;
