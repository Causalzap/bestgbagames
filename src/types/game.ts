// src/types/game.ts

// 游戏发布信息
export interface GameRelease {
  year: number;
  region?: string; // 可选字段
  developers: string[];
}

// 游戏详情
export interface Game {
  rank: number;
  title: string;
  slug: string;
  coverAlt: string;
  release: GameRelease;
  genre: string[];
  coreHighlight: string;
  historicalSignificance: string;
  whyStillWorthPlaying: string;
  youtubeVideoId?: string; 
}

// 整个JSON文件结构
export interface BestGamesData {
  title: string;
  slug: string;
  intro: {
    description: string;
    purpose: string;
  };
  games: Game[];
  conclusion: {
    content: string;
  };
  seoKeywords: string[];
}
