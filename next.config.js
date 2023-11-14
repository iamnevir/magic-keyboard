/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
    ],
  },
};

module.exports = nextConfig;
