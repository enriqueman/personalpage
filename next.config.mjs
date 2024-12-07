/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: '/not-found',
        permanent: false,
        missing: true,
      },
    ];
  },
  
};

export default nextConfig;
