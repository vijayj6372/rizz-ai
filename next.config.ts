import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  /* ─── Image optimization ─── */
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [375, 414, 480, 768, 1080],
    imageSizes: [64, 128, 256],
  },

  /* ─── Performance & Security Headers ─── */
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
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/audio/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
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

  /* ─── SEO Redirects for removed or aliased routes ─── */
  async redirects() {
    return [
      /* ── Canonical domain: always https://www ── */
      {
        source: "/(.*)",
        has: [{ type: "host", value: "rizzai.space" }],
        destination: "https://www.rizzai.space/$1",
        permanent: true,
      },
      /* ── Removed / aliased routes ── */
      {
        source: "/couple-games",
        destination: "/",
        permanent: true,
      },
      {
        source: "/couple-games/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/games",
        destination: "/",
        permanent: true,
      },
      {
        source: "/games/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/funfire",
        destination: "/firefun",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
