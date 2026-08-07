import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rizz AI — #1 Free Dating AI, AI Wingman & AI Dating App",
    short_name: "Rizz AI",
    description:
      "Rizz AI is the #1 free AI dating app, dating AI wingman & rizz gpt chatbot. Generate smooth AI rizz lines, pickup lines, looksmaxing face rating and couple games.",
    start_url: "/",
    display: "standalone",
    background_color: "#BCCFFA",
    theme_color: "#F6766E",
    orientation: "portrait",
    categories: ["entertainment", "lifestyle", "social", "utilities"],
    icons: [
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "48x48 96x96 144x144 192x192 512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
