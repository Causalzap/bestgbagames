// src/types/game.ts

// 游戏发布信息
export interface GameRelease {
  year?: number;
  region?: string; // 可选字段
  developers: string[];
}

// 游戏详情
export interface Game {
  id?: number; // 兼容 rpg-top-games.json 里的 id
  rank: number;
  title: string;
  slug: string;
  coverAlt?: string; // 兼容 best-games.json
  release?: GameRelease; // 可选，兼容部分数据只给 year
  genre: string[] | string; // 兼容数组和字符串
  coreHighlight: string;
  historicalSignificance: string;
  whyStillWorthPlaying: string;
  youtubeVideoId?: string; 
  lastUpdated?: Date; 

  // ===== 新增（用于宝可梦筛选） =====
  series?: string;        // e.g. "Pokémon"

  // 新字段
  description?: string; // 改成可选，兼容 best-games.json 没有的情况
  metacritic?: number;
  ign?: number;
  tags?: string[];
  platforms?: string[];
  hasMultiplayer?: boolean;
  storyLength?: number;
  pros?: string[];
  cons?: string[];
  gameDetailUrl?: string;
  developer?: string; 
  year?: number | null; // 兼容顶层 year
  releaseDate?: string; // 兼容 rpg-top-games.json
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

// ========== Hidden Gems 专用类型 ==========
export interface HiddenGemCollectingInfo {
  priceRange?: string;
  alternative?: string;
}

// 在通用 Game 基础上扩展本页需要的字段
export interface HiddenGemGame extends Game {
  uniqueMechanic?: string;
  whyOverlooked?: string;
  modernValue?: string;
  quote?: string;
  collecting?: HiddenGemCollectingInfo;
}

// Hidden Gems 页面所需的数据结构
export interface HiddenGemsData {
  title: string;
  intro: { definition: { explanation: string } };
  games: HiddenGemGame[];
  conclusion: {
    title: string;
    benefits: { name: string; description: string }[];
    tips: { items: string[] };
  };
}
