import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Enable image optimization
    formats: ["image/webp", "image/avif"],

    // Allow external domains for images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "safe-ai-4u.eu",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],

    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Enable placeholder blur
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["@radix-ui/react-icons"],
  },
};

export default nextConfig;
