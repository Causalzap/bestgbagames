// src/lib/gameData.ts
import bestGamesData from '@/data/articles/best-games.json';
import hiddenGemsData from '@/data/articles/hidden-gems.json';
import { Game, BestGamesData } from '@/types/game';

// 直接访问JSON中的games数组
const rawGames = bestGamesData.games;

// 安全类型转换函数
const normalizeGenre = (genre: any): string[] => {
  if (Array.isArray(genre)) {
    return genre.filter(g => typeof g === 'string');
  }
  
  if (typeof genre === 'string') {
    return [genre];
  }
  
  return ['Unknown']; // 默认值
};

// 处理所有游戏数据中的类型
const normalizedGames = rawGames.map(game => ({
  ...game,
  // 确保genre字段存在且是数组
  genre: game.genre ? normalizeGenre(game.genre) : ['Unknown']
}));


// 获取所有游戏（使用处理后的数据）
export function getAllGames(): Game[] {
  return normalizedGames;
}

// 按slug获取单个游戏
export function getGameBySlug(slug: string): Game | undefined {
  return normalizedGames.find(game => game.slug === slug);
}

// 获取精选游戏（前N个）
export function getFeaturedGames(count: number = 3): Game[] {
  return normalizedGames.slice(0, count);
}

// 获取游戏分类（从genre字段生成）
export function getGameCategories() {
  // 收集所有可能的游戏类型（去重）
  const allGenres = new Set<string>();
  
  normalizedGames.forEach(game => {
    game.genre.forEach(g => allGenres.add(g));
  });
  
  return Array.from(allGenres).map(genre => {
    const normalizedGenre = genre.toLowerCase().replace(/\s+/g, '-');
    
    return {
      id: normalizedGenre,
      title: genre,
      games: normalizedGames
        .filter(game => game.genre.includes(genre))
        .map(game => game.slug)
    };
  });
}

// 获取整个文档数据
export function getBestGamesData(): BestGamesData {
  return {
    ...bestGamesData,
    games: normalizedGames
  };
}

// 获取Hidden Gems数据
export function getHiddenGemsData() {
  return hiddenGemsData;
}
