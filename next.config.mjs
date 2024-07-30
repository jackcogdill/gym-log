/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      fallback: [
        {
          source : '/__/auth/:path*',
          destination : 'https://gymlog-e55f9.firebaseapp.com/__/auth/:path*',
        },
      ],
    }
  },
};

export default nextConfig;
