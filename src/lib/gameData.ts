// src/lib/gameData.ts
import bestGamesData from '@/data/articles/best-games.json';
import hiddenGemsData from '@/data/articles/hidden-gems.json';
import rpgTopGames from '@/data/articles/rpg-top-games.json';
import { Game, BestGamesData } from '@/types/game';

/* -------------------------
 * 辅助函数
 * ------------------------- */

// genre 统一为 string[]
const normalizeGenre = (genre: unknown): string[] => {
  if (Array.isArray(genre)) {
    return (genre as unknown[]).filter((g): g is string => typeof g === 'string');
  }
  if (typeof genre === 'string') return [genre];
  return ['Unknown'];
};

// 合并各种来源得到单个 developer 字符串
const pickDeveloper = (game: any): string => {
  if (game?.release?.developers && Array.isArray(game.release.developers)) {
    const s = game.release.developers.join(', ').trim();
    if (s) return s;
  }
  if (Array.isArray(game?.developers)) {
    const s = game.developers.join(', ').trim();
    if (s) return s;
  }
  if (typeof game?.developers === 'string' && game.developers.trim()) {
    return game.developers.trim();
  }
  if (typeof game?.developer === 'string' && game.developer.trim()) {
    return game.developer.trim();
  }
  return 'Unknown Developer';
};

// 年份：优先 release.year，其次顶层 year
const pickYear = (game: any): number => {
  const y1 = game?.release?.year;
  const y2 = game?.year;
  if (typeof y1 === 'number' && y1 > 0) return y1;
  if (typeof y2 === 'number' && y2 > 0) return y2;
  return 0;
};

/* -------------------------
 * best-games 标准化
 * ------------------------- */

const rawGames: any[] = (bestGamesData as any)?.games ?? [];

const normalizedGames: Game[] = rawGames.map((g): Game => ({
  id: g.id ?? undefined,
  slug: g.slug ?? '',
  title: g.title ?? 'Unknown Title',
  rank: typeof g.rank === 'number' ? g.rank : 0,
  description: g.description ?? '',
  year: pickYear(g),
  // 你在 Game 类型里既有可选 release，也有可选 developer（单数），两者都给更稳妥
  release: {
    developers:
      Array.isArray(g?.release?.developers) ? g.release.developers : (Array.isArray(g?.developers) ? g.developers : []),
  },
  developer: pickDeveloper(g),
  genre: normalizeGenre(g.genre), // 规范为 string[]
  coreHighlight: g.coreHighlight ?? '',
  historicalSignificance: g.historicalSignificance ?? '',
  whyStillWorthPlaying: g.whyStillWorthPlaying ?? '',
  coverAlt: g.coverAlt ?? `${g.title ?? 'Unknown'} cover art`,
  metacritic: g.metacritic,
  ign: g.ign,
  tags: Array.isArray(g.tags) ? g.tags : [],
  platforms: Array.isArray(g.platforms) ? g.platforms : [],
  gameDetailUrl: g.gameDetailUrl,
}));

/* -------------------------
 * 导出方法
 * ------------------------- */

export function getAllGames(): Game[] {
  return normalizedGames;
}

/**
 * 详情兜底：
 *  1) 先在 best-games（标准化后的 normalizedGames）查；
 *  2) 没找到，再到 rpg-top-games.json 里查并转换为 Game 结构返回。
 */
export function getGameBySlug(slug: string): Game | undefined {
  const hit = normalizedGames.find((x) => x.slug === slug);
  if (hit) return hit;

  const topList: any[] = Array.isArray(rpgTopGames) ? (rpgTopGames as any[]) : [];
  const t = topList.find((x) => x?.slug === slug);
  if (!t) return undefined;

  // 将 rpg-top-games 的条目转换成 Game 结构（用默认值补齐必填）
  const fallback: Game = {
    id: t.id ?? undefined,
    slug: t.slug ?? '',
    title: t.title ?? 'Unknown Title',
    rank: typeof t.rank === 'number' ? t.rank : 9999,
    description: t.description ?? '',
    year: pickYear(t) || null, // 你的类型中 year?: number | null
    release: { developers: Array.isArray(t?.release?.developers) ? t.release.developers : [] },
    developer: pickDeveloper(t),
    genre: normalizeGenre(t.genre),
    coreHighlight: t.coreHighlight ?? '',
    historicalSignificance: t.historicalSignificance ?? '',
    whyStillWorthPlaying: t.whyStillWorthPlaying ?? '',
    coverAlt: t.coverAlt ?? `${t.title ?? 'Unknown'} cover art`,
    metacritic: t.metacritic,
    ign: t.ign,
    tags: Array.isArray(t.tags) ? t.tags : [],
    platforms: Array.isArray(t.platforms) ? t.platforms : [],
    gameDetailUrl: t.gameDetailUrl,
  };

  return fallback;
}

export function getFeaturedGames(count: number = 3): Game[] {
  return normalizedGames.slice(0, count);
}

/**
 * Genre 列表（兼容 string | string[]）
 * 修复：不要直接对 string 调用 forEach。
 */
export function getGameCategories() {
  const allGenres = new Set<string>();

  normalizedGames.forEach((game) => {
    if (Array.isArray(game.genre)) {
      game.genre.forEach((g) => allGenres.add(g));
    } else if (typeof game.genre === 'string') {
      allGenres.add(game.genre);
    }
  });

  return Array.from(allGenres).map((genre) => {
    const normalizedGenre = genre.toLowerCase().replace(/\s+/g, '-');
    return {
      id: normalizedGenre,
      title: genre,
      games: normalizedGames
        .filter((game) =>
          Array.isArray(game.genre) ? game.genre.includes(genre) : game.genre === genre
        )
        .map((game) => game.slug),
    };
  });
}

/**
 * Best Games（补齐 BestGamesData 必填字段）
 * 注意：你在 types 里定义了
 *  conclusion: { content: string }
 */
export function getBestGamesData(): BestGamesData {
  const fallbackIntro = {
    description: 'Discover the best Game Boy Advance games',
    purpose: 'Curated highlights and analysis of top GBA titles',
  };

  const fallbackConclusion = { content: 'Thanks for reading our curated list of the best GBA games.' };

  return {
    title: (bestGamesData as any)?.title || 'Best GBA Games',
    slug: (bestGamesData as any)?.slug || 'best-gba-games',
    intro: (bestGamesData as any)?.intro ?? fallbackIntro,
    games: normalizedGames,
    conclusion: (bestGamesData as any)?.conclusion ?? fallbackConclusion,
    seoKeywords:
      (bestGamesData as any)?.seoKeywords ??
      ['GBA', 'best GBA games', 'Game Boy Advance', 'retro RPG'],
  };
}

/**
 * Hidden Gems：字段对齐到 Game（developer 单数、genre 标准化、year 统一）
 */
export function getHiddenGemsData() {
  const src: any[] = (hiddenGemsData as any)?.games ?? [];
  return {
    ...(hiddenGemsData as any),
    games: src.map((g) => ({
      ...g,
      genre: normalizeGenre(g.genre),
      developer: pickDeveloper(g),
      year: pickYear(g),
    })),
  };
}

/* -------------------------
 * 调试
 * ------------------------- */

export function debugGame(slug: string) {
  // 只在开发阶段使用，避免生产环境噪音
  if (process.env.NODE_ENV === 'production') return;

  // eslint-disable-next-line no-console
  console.log(`=== Debugging game: ${slug} ===`);
  const game = normalizedGames.find((x) => x.slug === slug);
  if (!game) {
    // eslint-disable-next-line no-console
    console.log('Game not found in best-games data');
    return;
  }
  // eslint-disable-next-line no-console
  console.log('Normalized:', {
    title: game.title,
    developer: game.developer,
    year: game.year,
    rank: game.rank,
  });

  const raw = rawGames.find((x) => x.slug === slug);
  if (raw) {
    // eslint-disable-next-line no-console
    console.log('Raw:', {
      title: raw.title,
      release: raw.release,
      developers: raw.developers,
      developer: raw.developer,
      year: raw.year,
    });
  }
}
