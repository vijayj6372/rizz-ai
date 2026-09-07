import type { Metadata } from "next";

const baseUrl = "https://www.rizzai.space";
const knownSlugs = new Set([
  "ice-breaker-questions-for-couples",
  "would-you-rather-for-couples",
]);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const isKnownSlug = knownSlugs.has(slug);
  const canonical = `${baseUrl}/games/${slug}`;

  return {
    alternates: { canonical },
    ...(isKnownSlug
      ? {}
      : {
          robots: {
            index: false,
            follow: false,
          },
        }),
  };
}

export default function GameSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
