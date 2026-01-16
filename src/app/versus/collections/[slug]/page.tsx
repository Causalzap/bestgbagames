// src/app/versus/collections/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import gamesDatabase from "@/data/articles/games_database.json";
import { type GameData, type Pair } from "../../versus-index-client";

// 你需要把 buildCuratedPairs / buildClusters 抽到共享文件会更优雅。
// 但为了让你“马上能上线”，这里直接从 /versus/page.tsx 复制必要逻辑的最小版本。
export async function generateStaticParams() {
    return [
      { slug: "rpg-strategy-titans" },
      { slug: "action-platforming" },
      { slug: "budget-gems-under-50" },
    ];
  }

  
function getScore(g: GameData): number {
  return g.scores.user || (g.scores.metacritic ? g.scores.metacritic / 10 : 0);
}

function getSeriesName(g: GameData): string {
  const title = g.title.toLowerCase();
  if (title.includes("pokémon") || title.includes("pokemon")) return "Pokémon";
  if (title.includes("mario") && !title.includes("wario")) return "Mario";
  if (title.includes("zelda")) return "Zelda";
  if (title.includes("final fantasy")) return "Final Fantasy";
  if (title.includes("metroid")) return "Metroid";
  if (title.includes("castlevania")) return "Castlevania";
  if (title.includes("mega man")) return "Mega Man";
  if (title.includes("fire emblem")) return "Fire Emblem";
  if (title.includes("sonic")) return "Sonic";
  if (title.includes("golden sun")) return "Golden Sun";
  if (title.includes("advance wars")) return "Advance Wars";
  if (title.includes("donkey kong")) return "Donkey Kong";
  if (title.includes("kirby")) return "Kirby";
  return g.title.split(" ")[0] || "Misc";
}

function pairKey(left: GameData, right: GameData) {
  const [a, b] = [left.id, right.id].sort();
  return `${a}-vs-${b}`;
}

function buildCuratedPairs(allGames: GameData[]) {
  const pairMap = new Map<string, Pair>();
  const sortedGames = [...allGames].sort((a, b) => getScore(b) - getScore(a));

  const buckets = {
    genre: {} as Record<string, GameData[]>,
    series: {} as Record<string, GameData[]>,
  };

  for (const g of sortedGames) {
    const genre = g.basic_info.genre;
    if (genre) {
      buckets.genre[genre] ??= [];
      buckets.genre[genre].push(g);
    }
    const series = getSeriesName(g);
    if (series !== "Misc") {
      buckets.series[series] ??= [];
      buckets.series[series].push(g);
    }
  }

  const processBucket = (list: GameData[], boostWeight: number) => {
    const target = list.slice(0, 20);
    for (let i = 0; i < target.length; i++) {
      for (let j = i + 1; j < target.length; j++) {
        const left = target[i];
        const right = target[j];
        if (left.id === right.id) continue;

        const key = pairKey(left, right);
        if (pairMap.has(key)) continue;

        let weight = boostWeight;

        if (left.basic_info.genre === right.basic_info.genre) weight += 50;

        const s1 = getScore(left);
        const s2 = getScore(right);
        if (s1 >= 8.5 && s2 >= 8.5) weight += 40;

        if (left.tech_specs.save_type && right.tech_specs.save_type) weight += 20;

        const p1 = left.market.price_loose;
        const p2 = right.market.price_loose;
        if (Math.abs(p1 - p2) < 20) weight += 10;

        if (weight > 50) {
          pairMap.set(key, { slug: key, g1: left, g2: right, weight });
        }
      }
    }
  };

  Object.values(buckets.series).forEach((list) => processBucket(list, 100));
  Object.values(buckets.genre).forEach((list) => processBucket(list, 10));

  return Array.from(pairMap.values())
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 600);
}

function buildClusters(comparisons: Pair[]) {
  const usedSlugs = new Set<string>();
  const getUnique = (list: Pair[], count: number) => {
    const result: Pair[] = [];
    for (const item of list) {
      if (result.length >= count) break;
      if (!usedSlugs.has(item.slug)) {
        usedSlugs.add(item.slug);
        result.push(item);
      }
    }
    return result;
  };

  const rpgGods = comparisons.filter(
    (c) =>
      (c.g1.basic_info.genre === "RPG" || c.g1.basic_info.genre === "Strategy") &&
      getScore(c.g1) >= 9.0 &&
      getScore(c.g2) >= 9.0
  );

  const platformers = comparisons.filter(
    (c) => c.g1.basic_info.genre === "Platformer" || c.g1.basic_info.genre === "Action"
  );

  const budgetGems = comparisons.filter(
    (c) =>
      c.g1.market.price_loose < 50 &&
      c.g2.market.price_loose < 50 &&
      getScore(c.g1) > 8.0
  );

  return [
    {
      title: "RPG & Strategy Titans",
      slug: "rpg-strategy-titans",
      color: "purple" as const,
      description:
        "The most respected GBA RPG and strategy matchups — curated for depth, replay value, and collector-safe ownership decisions.",
      insights: [
        "Long games amplify save reliability: battery-backed saves matter more when you’re 40+ hours in.",
        "When hardware risk is similar, playtime commitment and price usually decide the winner."
      ],
      list: getUnique(rpgGods, 6),
    },
    {
      title: "Action & Platforming",
      slug: "action-platforming",
      color: "red" as const,
      description:
        "Fast, replayable matchups focused on gameplay feel and ‘which one should I play first’ decisions — not just raw specs.",
      insights: [
        "For short runs, save tech matters less — unless you care about 100% completion saves.",
        "If quality is close, market price becomes the cleanest tiebreaker."
      ],
      list: getUnique(platformers, 6),
    },
    {
      title: "Budget Gems (< $50)",
      slug: "budget-gems-under-50",
      color: "blue" as const,
      description:
        "High-quality matchups where both games stay under $50 loose — designed for smarter buys without collector premium.",
      insights: [
        "Budget doesn’t always mean low risk: some cheaper titles still rely on battery-backed saves.",
        "Value verdicts change with the market — this collection is meant to be revisited."
      ],
      list: getUnique(budgetGems, 6),
    },
  ];
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const games = gamesDatabase as unknown as GameData[];
  const comparisons = buildCuratedPairs(games);
  const clusters = buildClusters(comparisons);
  const cluster = clusters.find((c) => c.slug === params.slug);

  if (!cluster) return {};

  return {
    title: `${cluster.title} — Curated GBA Matchups (Save Risk, Price, Playtime)`,
    description: cluster.description,
    alternates: {
      canonical: `https://www.bestgbagames.com/versus/collections/${cluster.slug}`,
    },
  };
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const games = gamesDatabase as unknown as GameData[];
  const comparisons = buildCuratedPairs(games);
  const clusters = buildClusters(comparisons);
  const cluster = clusters.find((c) => c.slug === params.slug);

  if (!cluster) return notFound();

  // 让集合页只展示该集合的对比
  const totalSizeMbit = games.reduce((acc, g) => acc + (g.tech_specs.cart_size || 0), 0);
  const avgRomMB = (totalSizeMbit / 8 / (games.length || 1)).toFixed(1);

  const siteUrl = "https://www.bestgbagames.com";

  const collectionListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${cluster.title} — Curated GBA Matchups`,
    "description": cluster.description,
    "numberOfItems": cluster.list.length,
    "itemListElement": cluster.list.map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": `${p.g1.title} vs ${p.g2.title}`,
      "url": `${siteUrl}/versus/${p.slug}`
    }))
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-slate-100">
      <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionListJsonLd) }}
      />

      <nav className="p-4 border-b border-slate-900 text-sm text-slate-500">
        <Link href="/versus" className="hover:text-purple-400">
          ← Back to Arena
        </Link>
      </nav>

      <main className="max-w-5xl mx-auto px-4 pt-10 pb-16">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
          {cluster.title}
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          {cluster.description}
        </p>

        {/* Who this collection is for */}
        <div className="mt-6 max-w-2xl bg-slate-900/30 border border-slate-800 rounded-xl p-5 text-sm text-slate-400">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">
            Who this collection is for
          </div>
          <p className="leading-relaxed">
            If you want a quick shortlist without reading specs tables, this collection is curated for you.
            Use it to pick your next game to buy or play — with save reliability and market pricing baked into the recommendations.
          </p>
        </div>
        
        {/* Mini FAQ */}
        <div className="mt-6 max-w-2xl">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">
            Quick FAQ
          </div>
        
          <div className="space-y-3">
            <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-4">
              <div className="text-slate-200 font-semibold text-sm">
                Why are these matchups grouped together?
              </div>
              <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                They share similar audience intent (collector safety, play priority, or value) and are strong candidates for direct comparison.
              </p>
            </div>
        
            <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-4">
              <div className="text-slate-200 font-semibold text-sm">
                How often do prices or “best value” change?
              </div>
              <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                Market prices can shift. If two games are close in quality, the cheaper option may become the smarter buy over time — so revisit this page occasionally.
              </p>
            </div>
          </div>
        </div>

        {/* How it works (10 seconds) */}
        <div className="mt-6 max-w-2xl text-sm text-slate-500 leading-relaxed border-t border-slate-900 pt-4">
          <strong className="text-slate-300">How this collection works (10 seconds):</strong>
          <p className="mt-2">
            Each matchup is evaluated across three independent perspectives —
            <span className="text-slate-300 font-semibold"> collectors</span>,
            <span className="text-slate-300 font-semibold"> players</span>, and
            <span className="text-slate-300 font-semibold"> value seekers</span>.
            We weigh save hardware reliability, time commitment, and current market pricing to decide whether one game is clearly safer to own, better to play, or if no clear winner exists.
          </p>
        </div>

        {/* Mini insights */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {cluster.insights.map((t, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 text-sm text-slate-400">
              <span className="text-slate-300 font-semibold">Insight:</span> {t}
            </div>
          ))}
        </div>

        {/* Battles */}
        <div className="mt-10">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              Curated Battles
            </h2>
            <div className="h-[1px] flex-1 bg-slate-900" />
          </div>

          {/* 复用你的 VersusIndexClient 的 BattleCard 样式最省事：
              但 VersusIndexClient 会带 Hero/Clusters。
              所以这里建议你把 BattleCard 抽成独立组件。
              为了让你马上上线，我们先在此页面自己做个简单网格跳转。 */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {cluster.list.map((pair) => (
              <Link
                key={pair.slug}
                href={`/versus/${pair.slug}`}
                className="group bg-[#0e1117] border border-slate-800/60 rounded-xl p-5 hover:border-slate-500 transition"
              >
                <div className="text-white font-bold">
                  {pair.g1.title} <span className="text-slate-600">vs</span> {pair.g2.title}
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  Save: {pair.g1.tech_specs.save_type} vs {pair.g2.tech_specs.save_type} ·
                  Price: ${pair.g1.market.price_loose} vs ${pair.g2.market.price_loose}
                </div>
                <div className="mt-3 text-xs text-slate-600 group-hover:text-slate-400">
                  Open comparison →
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Back to all */}
        <div className="mt-12">
          <Link href="/versus" className="text-sm text-slate-500 hover:text-slate-300">
            Browse all matchups →
          </Link>
        </div>
      </main>
    </div>
  );
}
