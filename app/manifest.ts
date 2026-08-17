import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RIZZ AI - Free AI Dating Assistant & Pickup Lines",
    short_name: "Rizz AI",
    description:
      "Generate the best pickup lines with Rizz AI — your free AI-powered flirting tool for Tinder, Bumble, and more. Rizz AI delivers smooth, flirty lines that work!💕",
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
