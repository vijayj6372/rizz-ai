import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/images/", "/icon.png", "/favicon.ico", "/apple-touch-icon.png"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      {
        userAgent: "Applebot",
        allow: "/",
      },
    ],
    sitemap: "https://www.rizzai.space/sitemap.xml",
    host: "https://www.rizzai.space",
  };
}
