import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ─── Image optimization ─── */
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400, // 24 h
    deviceSizes: [375, 414, 480, 768, 1080],
    imageSizes: [64, 128, 256],
  },

  /* ─── Performance headers ─── */
  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        source: "/audio/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },

  /* ─── Bundle optimizations ─── */
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
