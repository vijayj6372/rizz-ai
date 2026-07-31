import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rizz AI — AI Wingman, Pickup Lines & Looksmaxing Rating",
    short_name: "Rizz AI",
    description:
      "Free AI Wingman app, Pickup Line Generator, Looksmaxing AI Face Rating, and Couple Games for Tinder, Hinge & Bumble.",
    start_url: "/",
    display: "standalone",
    background_color: "#12091c",
    theme_color: "#F6766E",
    orientation: "portrait",
    categories: ["entertainment", "lifestyle", "social"],
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
