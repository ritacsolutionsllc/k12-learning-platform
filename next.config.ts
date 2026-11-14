import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
};

export default nextConfig;
