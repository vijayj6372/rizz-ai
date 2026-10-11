import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/favicon.ico",
          "/favicon.png",
          "/*.ico$",
          "/pickup-line?q=",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/favicon.ico",
          "/favicon.png",
          "/*.ico$",
          "/pickup-line?q=",
        ],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/images/", "/icon.png", "/apple-touch-icon.png"],
        disallow: ["/favicon.ico"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/favicon.ico"],
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/api/", "/favicon.ico"],
      },
    ],
    sitemap: "https://www.rizzai.space/sitemap.xml",
    host: "https://www.rizzai.space",
  };
}
