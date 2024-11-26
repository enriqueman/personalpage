/** @type {import('next').NextConfig} */
const nextConfig = {output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
    experimental: {
     appDir: true,
   },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://falconcloud.co/site_srv10_ph/site/api/:path*',
        },
      ]
    },
    reactStrictMode: true,
    swcMinify: true,
};

export default nextConfig;
