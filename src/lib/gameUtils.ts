import topGames from '@/data/articles/rpg-top-games.json';
import dbGames from '@/data/articles/rpg-games-db.json';

// 定义合并后的超级游戏类型
export type FullGame = typeof topGames[0] & typeof dbGames[0];

// 核心函数：合并两个数据库
export function getMergedGames(): FullGame[] {
  return topGames.map((game) => {
    // 在新数据库里找到对应的游戏
    const techSpecs = dbGames.find((db) => db.slug === game.slug);
    
    // 如果找不到对应的新数据，就只返回老数据（防止报错）
    if (!techSpecs) {
      console.warn(`Missing tech specs for ${game.slug}`);
      return game as unknown as FullGame;
    }

    // 合并！
    return {
      ...game,
      ...techSpecs, // 覆盖或添加新字段
    };
  });
}

// 辅助函数：根据 slug 获取单个游戏
export function getGameBySlug(slug: string): FullGame | undefined {
  const games = getMergedGames();
  return games.find((g) => g.slug === slug);
}