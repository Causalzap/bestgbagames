import topGames from '@/data/articles/rpg-top-games.json';
import dbGames from '@/data/articles/rpg-games-db.json';

export type FullGame = typeof topGames[0] & typeof dbGames[0];

let mergedCache: FullGame[] | null = null;

export function getMergedGames(): FullGame[] {
  if (mergedCache) return mergedCache;

  const merged = topGames.reduce((acc, game) => {
    const techSpecs = dbGames.find((db) => db.slug === game.slug);
    
    // 只有当两个库都有该 slug，且关键字段 (gameplay, specs) 存在时才允许生成页面
    if (techSpecs && techSpecs.gameplay && techSpecs.specs) {
      acc.push({
        ...game,
        ...techSpecs,
      } as FullGame);
    } else {
      // 这里的 Warn 会告诉你到底哪个 slug 没对上
      console.warn(`[Build Warning] skipping Versus for: "${game.slug}" (Reason: Missing in dbGames or incomplete)`);
    }
    return acc;
  }, [] as FullGame[]);

  mergedCache = merged;
  return merged;
}

export function getGameBySlug(slug: string): FullGame | undefined {
  const games = getMergedGames();
  return games.find((g) => g.slug.toLowerCase() === slug.toLowerCase());
}