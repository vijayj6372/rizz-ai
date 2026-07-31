import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: "https://rizz-ai.space/sitemap.xml",
    host: "https://rizz-ai.space",
  };
}
