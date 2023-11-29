/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  experimental: {
    nextScriptWorkers: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "files.edgestore.dev",
      },
      {
        hostname: "robust-gull-20.convex.cloud",
      },
      {
        hostname: "epomaker.com",
      },
    ],
  },
};

module.exports = nextConfig;
