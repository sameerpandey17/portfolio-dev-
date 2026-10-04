import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 390, 480, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
  },
  // Allow GSAP to be bundled correctly
  transpilePackages: ["gsap"],
};

export default nextConfig;
