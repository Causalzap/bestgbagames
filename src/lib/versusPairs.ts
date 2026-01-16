// src/lib/versusPairs.ts
import gamesDatabase from "@/data/articles/games_database.json";
import type { GameData, Pair } from "@/app/versus/versus-index-client";

function getScore(g: GameData): number {
  return g.scores.user || (g.scores.metacritic ? g.scores.metacritic / 10 : 0);
}

function pairKey(left: GameData, right: GameData) {
  const [a, b] = [left.id, right.id].sort();
  return `${a}-vs-${b}`;
}

// 复制你现有 buildCuratedPairs（或简化版），确保 slug 用 id
export function buildCuratedPairs(allGames: GameData[], limit = 600): Pair[] {
  const pairMap = new Map<string, Pair>();
  const sorted = [...allGames].sort((a, b) => getScore(b) - getScore(a));

  // 这里按你原逻辑分桶也行；为了示例简化：直接前 N 做配对（你可继续用桶版本）
  const target = sorted.slice(0, 60); // 控制组合规模：60 => 1770 对
  for (let i = 0; i < target.length; i++) {
    for (let j = i + 1; j < target.length; j++) {
      const left = target[i];
      const right = target[j];
      const slug = pairKey(left, right);
      if (!pairMap.has(slug)) {
        pairMap.set(slug, { slug, g1: left, g2: right, weight: 1 });
      }
    }
  }

  return Array.from(pairMap.values()).slice(0, limit);
}

export function getAllVersusSlugs(limit = 600): string[] {
  const games = gamesDatabase as unknown as GameData[];
  const pairs = buildCuratedPairs(games, limit);
  return pairs.map((p) => p.slug);
}
