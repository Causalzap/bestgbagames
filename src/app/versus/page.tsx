import VersusIndexClient, { type Pair, type GameData } from "./versus-index-client";
import gamesDatabase from "@/data/articles/games_database.json"; 

// ==========================================
// 1. 元数据
// ==========================================
export const metadata = {
  title: "GBA Versus Arena | Specs & Price Comparison",
  description:
    "Compare GBA games by Save Type (Flash vs Battery), Current Market Price, and Playtime. Find the best value for your collection.",
  alternates: { canonical: "https://www.bestgbagames.com/versus" },
};

// ==========================================
// 2. 工具函数 (适配 GameData 结构)
// ==========================================

function getScore(g: GameData): number {
  // 优先使用 User Score，若无则用 Metacritic / 10
  return g.scores.user || (g.scores.metacritic ? g.scores.metacritic / 10 : 0);
}

// 简单的系列推断逻辑 (因为 JSON 里没有直接的 series 字段)
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
  
  // 默认：取第一个词作为弱匹配
  return g.title.split(" ")[0] || "Misc";
}

function pairKey(left: GameData, right: GameData) {
  const [a, b] = [left.id, right.id].sort(); 
  return `${a}-vs-${b}`;
}

// ==========================================
// 3. 核心逻辑：生成高质量对比
// ==========================================
function buildCuratedPairs(allGames: GameData[]) {
  const pairMap = new Map<string, Pair>();

  // 按照分数质量预排序
  const sortedGames = [...allGames].sort((a, b) => getScore(b) - getScore(a));

  // 1. 构建桶 (Buckets)
  const buckets = {
    genre: {} as Record<string, GameData[]>,
    series: {} as Record<string, GameData[]>,
  };

  for (const g of sortedGames) {
    // Genre Bucket (注意路径是 g.basic_info.genre)
    const genre = g.basic_info.genre;
    if (genre) {
      buckets.genre[genre] ??= [];
      buckets.genre[genre].push(g);
    }

    // Series Bucket
    const series = getSeriesName(g);
    if (series !== "Misc") {
      buckets.series[series] ??= [];
      buckets.series[series].push(g);
    }
  }

  // 2. 生成配对的处理函数
  const processBucket = (list: GameData[], boostWeight: number) => {
    // 限制每个桶内部生成的对比数量
    const target = list.slice(0, 20); 

    for (let i = 0; i < target.length; i++) {
      for (let j = i + 1; j < target.length; j++) {
        const left = target[i];
        const right = target[j];

        if (left.id === right.id) continue;

        const key = pairKey(left, right);
        if (pairMap.has(key)) continue;

        // 计算权重
        let weight = boostWeight;

        // A. 类型匹配奖励
        if (left.basic_info.genre === right.basic_info.genre) weight += 50;
        
        // B. 热门度奖励
        const s1 = getScore(left);
        const s2 = getScore(right);
        if (s1 >= 8.5 && s2 >= 8.5) weight += 40; 
        
        // C. 数据完整度奖励 (Technical Specs)
        if (left.tech_specs.save_type && right.tech_specs.save_type) weight += 20;

        // D. 价格区间相似度
        const p1 = left.market.price_loose;
        const p2 = right.market.price_loose;
        if (Math.abs(p1 - p2) < 20) weight += 10;

        // 最终过滤
        if (weight > 50) {
            pairMap.set(key, { slug: key, g1: left, g2: right, weight });
        }
      }
    }
  };

  // 3. 执行生成
  Object.values(buckets.series).forEach((list) => processBucket(list, 100)); // 系列内战权重最高
  Object.values(buckets.genre).forEach((list) => processBucket(list, 10));

  // 4. 排序并截取
  return Array.from(pairMap.values())
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 600); 
}

// ==========================================
// 4. 分簇逻辑 (Clusters)
// ==========================================
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

  // Cluster 1: RPG Titans
  const rpgGods = comparisons.filter(
    c => (c.g1.basic_info.genre === "RPG" || c.g1.basic_info.genre === "Strategy") &&
         getScore(c.g1) >= 9.0 && getScore(c.g2) >= 9.0
  );

  // Cluster 2: Action & Platforming
  const platformers = comparisons.filter(
    c => c.g1.basic_info.genre === "Platformer" || c.g1.basic_info.genre === "Action"
  );

  // Cluster 3: Budget Gems (<$50)
  const budgetGems = comparisons.filter(
    c => c.g1.market.price_loose < 50 && c.g2.market.price_loose < 50 &&
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

// ==========================================
// 5. 页面入口
// ==========================================
export default function VersusIndexPage() {
  // 关键修正：强制将 JSON 数据断言为 GameData[] 类型
  // 这样 TS 就会认为它拥有 basic_info, scores 等所有新字段
  const games = gamesDatabase as unknown as GameData[];
  
  const comparisons = buildCuratedPairs(games);
  const clusters = buildClusters(comparisons);

  const totalSizeMbit = games.reduce((acc, g) => acc + (g.tech_specs.cart_size || 0), 0);
  const avgRomMB = (totalSizeMbit / 8 / (games.length || 1)).toFixed(1);

  // --- 新增：JSON-LD 结构化数据 ---
  const siteUrl = "https://www.bestgbagames.com";
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "GBA Versus Arena Matchups",
    "itemListOrder": "https://schema.org/ItemListOrderDescending",
    "numberOfItems": Math.min(comparisons.length, 60),
    "itemListElement": comparisons.slice(0, 60).map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": `${p.g1.title} vs ${p.g2.title}`,
      "url": `${siteUrl}/versus/${p.slug}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <VersusIndexClient
        allGamesCount={games.length}
        avgRom={avgRomMB}
        comparisons={comparisons}
        clusters={clusters}
      />
    </>
  );
}