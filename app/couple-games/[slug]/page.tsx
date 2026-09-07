import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CoupleGamePlayer from "./CoupleGamePlayer";
import { catalogSlugs, coupleGames, gameBySlug, gameCategoryLabels } from "@/data/coupleGamesData";

export function generateStaticParams() {
  return Array.from(new Set([...coupleGames.map((game) => game.slug), ...catalogSlugs])).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = gameBySlug(slug);
  if (!game) return {};

  return {
    title: `${game.title} for Couples - Free Online Game | Rizz AI`,
    description: `${game.description} Play this free ${game.title.toLowerCase()} game online with ${game.questionCount} couple prompts.`,
    alternates: { canonical: `https://www.rizzai.space/couple-games/${game.slug}` },
    openGraph: {
      title: `${game.title} for Couples | Rizz AI`,
      description: game.description,
      url: `https://www.rizzai.space/couple-games/${game.slug}`,
      type: "website",
    },
  };
}

export default async function CoupleGamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = gameBySlug(slug);
  if (!game) notFound();

  const related = coupleGames.filter((item) => item.category === game.category && item.slug !== game.slug).slice(0, 3);

  return (
    <>
      <CoupleGamePlayer game={game} />
      <section className="game-seo-footer">
        <div className="game-seo-inner">
          <p className="seo-kicker">{game.emoji} {gameCategoryLabels[game.category]}</p>
          <h1>{game.title} for couples</h1>
          <p>{game.description} This free, no-sign-up game is made for {game.bestFor.toLowerCase()} and takes about {game.estimatedTime.toLowerCase()}.</p>
          <div className="seo-facts"><span>{game.questionCount} questions</span><span>{game.estimatedTime}</span><span>Free to play</span></div>
          <nav className="related-games" aria-label="Related couple games"><strong>Keep playing</strong>{related.map((item) => <Link key={item.slug} href={`/couple-games/${item.slug}`}>{item.emoji} {item.title}</Link>)}</nav>
        </div>
      </section>
    </>
  );
}
