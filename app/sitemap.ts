import type { MetadataRoute } from "next";
import { catalogSlugs } from "@/data/coupleGamesData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.rizzai.space";

  const routes = [
    "",
    "/pickup-line",
    "/looksmaxing",
    "/looksmaxing/tips",
    "/couple-games",
    "/games",
    "/games/ice-breaker-questions-for-couples",
    "/games/would-you-rather-for-couples",
    "/hot-or-not",
    "/roast-my-selfie",
    "/rate-my-crush",
    "/lovetest",
    "/lovelife",
    "/upload-screenshot",
    "/funfire",
    "/firefun",
    "/fun-features",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    ...catalogSlugs.map((slug) => `/couple-games/${slug}`),
  ];

  return routes.map((route) => {
    let priority = 0.8;
    let changeFreq: "daily" | "weekly" | "monthly" = "weekly";

    if (route === "") {
      priority = 1.0;
      changeFreq = "daily";
    } else if (
      route === "/pickup-line" ||
      route === "/looksmaxing" ||
      route === "/couple-games" ||
      route === "/hot-or-not" ||
      route === "/lovetest" ||
      route === "/rate-my-crush" ||
      route === "/upload-screenshot"
    ) {
      priority = 0.95;
      changeFreq = "daily";
    }

    return {
      url: `${baseUrl}${route}`,
      changeFrequency: changeFreq,
      priority,
    };
  });
}
