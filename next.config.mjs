/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  exportPathMap: async function (defaultPathMap) {
    return {
      ...defaultPathMap,
      '/experience/': { page: '/experience' },
      '/education/': { page: '/education' },
      '/skills/': { page: '/skills' },
      '/projects/': { page: '/projects' },
      '/contact/': { page: '/contact' },
    }
  },
};

export default nextConfig;
