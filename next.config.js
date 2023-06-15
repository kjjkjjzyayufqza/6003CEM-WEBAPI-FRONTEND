/** @type {import('next').NextConfig} */
const nextConfig = {
  generateEtags: false,
  experimental: {
    appDir: true,
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com", "vercel.com"],
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/steven-tey/precedent",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
