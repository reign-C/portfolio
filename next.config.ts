import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  allowedDevOrigins: ["**.run.app", "**.aistudio.google.com", "**.googleusercontent.com"],
  cacheComponents: true,
  partialPrefetching: true,
  // Cap at the widest source (1600 px) so the optimizer never upscales a plate.
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1600],
    qualities: [75, 90],
  },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
