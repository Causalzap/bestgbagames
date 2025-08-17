import { getAllGames } from './gameData';

type GamePlatform = 'desktop' | 'mobile' | 'tablet';

export interface GameEmbedConfig {
  url: string;
  supportedPlatforms: GamePlatform[];
  aspectRatio: string;
  iframe?: string;  // 可选的 iframe 字段，用来存储嵌入的 iframe 标签
}

const EMBED_BASE_URL = 'https://classicjoy.games/embed?slug=';

// 使用游戏slug作为映射键
const EMBED_MAP: Record<string, GameEmbedConfig> = {
  // 匹配slug 'the-legend-of-zelda'
  'zelda-link-to-the-past-four-swords': {
    url: `${EMBED_BASE_URL}the-legend-of-zelda-a-link-to-the-past-four-swords`,
    supportedPlatforms: ['desktop', 'tablet'],
    aspectRatio: '4/3',
    iframe: `<iframe src="${EMBED_BASE_URL}the-legend-of-zelda-a-link-to-the-past-four-swords" 
        width="100%" height="80vh" frameborder="0" allowfullscreen></iframe>`
  },
  // 匹配slug 'metroid-fusion'
  'metroid-fusion': {
    url: `${EMBED_BASE_URL}metroid-fusion`,  // 修改为正确的slug
    supportedPlatforms: ['desktop', 'mobile', 'tablet'],
    aspectRatio: '3/2',
    iframe: `<iframe src="${EMBED_BASE_URL}metroid-fusion" 
        width="100%" height="80vh" frameborder="0" allowfullscreen></iframe>`
  },
  // 匹配slug 'pokemon-ruby-sapphire-emerald'
  'pokemon-ruby-sapphire-emerald': {
    url: `${EMBED_BASE_URL}pokemon-ruby`,  // 修改为正确的slug
    supportedPlatforms: ['desktop', 'mobile', 'tablet'],
    aspectRatio: '3/2',
    iframe: `<iframe src="${EMBED_BASE_URL}pokemon-ruby" 
        width="100%" height="80vh" frameborder="0" allowfullscreen></iframe>`
  },
  // 匹配slug 'golden-sun'
  'golden-sun': {
    url: `${EMBED_BASE_URL}golden-sun`,  // 修改为正确的slug
    supportedPlatforms: ['desktop', 'mobile', 'tablet'],
    aspectRatio: '3/2',
    iframe: `<iframe src="${EMBED_BASE_URL}golden-sun" 
        width="100%" height="80vh" frameborder="0" allowfullscreen></iframe>`
  },
  // 匹配slug 'the-legend-of-zelda-the-minish-cap'
  'the-minish-cap': {
    url: `${EMBED_BASE_URL}the-legend-of-zelda-the-minish-cap`,  // 修改为正确的slug
    supportedPlatforms: ['desktop', 'mobile', 'tablet'],
    aspectRatio: '3/2',
    iframe: `<iframe src="${EMBED_BASE_URL}the-legend-of-zelda-the-minish-cap" 
        width="100%" height="80vh" frameborder="0" allowfullscreen></iframe>`
  },
  // 匹配slug 'fire-emblem'
  'fire-emblem': {
    url: `${EMBED_BASE_URL}fire-emblem`,  // 修改为正确的slug
    supportedPlatforms: ['desktop', 'mobile', 'tablet'],
    aspectRatio: '3/2',
    iframe: `<iframe src="${EMBED_BASE_URL}fire-emblem" 
        width="100%" height="80vh" frameborder="0" allowfullscreen></iframe>`
  },
  // 匹配slug 'metroid-zero-mission'
  'metroid-zero-mission': {
    url: `${EMBED_BASE_URL}metroid-zero-mission`,  // 修改为正确的slug
    supportedPlatforms: ['desktop', 'mobile', 'tablet'],
    aspectRatio: '3/2',
    iframe: `<iframe src="${EMBED_BASE_URL}metroid-zero-mission" 
        width="100%" height="80vh" frameborder="0" allowfullscreen></iframe>`
  },
  // 匹配slug 'super-mario-advance-4'
  'super-mario-advance-4': {
    url: `${EMBED_BASE_URL}super-mario-advance-4-super-mario-bros-3`,  // 修改为正确的slug
    supportedPlatforms: ['desktop', 'mobile', 'tablet'],
    aspectRatio: '3/2',
    iframe: `<iframe src="${EMBED_BASE_URL}super-mario-advance-4-super-mario-bros-3" 
        width="100%" height="80vh" frameborder="0" allowfullscreen></iframe>`
  },
  // 匹配slug 'mario-kart-super-circuit'
  'mario-kart-super-circuit': {
    url: `${EMBED_BASE_URL}mario-kart-super-circuit`,  // 修改为正确的slug
    supportedPlatforms: ['desktop', 'mobile', 'tablet'],
    aspectRatio: '3/2',
    iframe: `<iframe src="${EMBED_BASE_URL}mario-kart-super-circuit" 
        width="100%" height="80vh" frameborder="0" allowfullscreen></iframe>`
  },
  // 匹配slug 'mother-3'
  'mother-3': {
    url: `${EMBED_BASE_URL}mother-3`,  // 修改为正确的slug
    supportedPlatforms: ['desktop', 'mobile', 'tablet'],
    aspectRatio: '3/2',
    iframe: `<iframe src="${EMBED_BASE_URL}mother-3" 
        width="100%" height="80vh" frameborder="0" allowfullscreen></iframe>`
  },
  // 匹配slug 'fire-emblem-sacred-stones'
  'fire-emblem-sacred-stones': {
    url: `${EMBED_BASE_URL}fire-emblem-sacred-stones`,  // 修改为正确的slug
    supportedPlatforms: ['desktop', 'mobile', 'tablet'],
    aspectRatio: '3/2',
    iframe: `<iframe src="${EMBED_BASE_URL}fire-emblem-sacred-stones" 
        width="100%" height="80vh" frameborder="0" allowfullscreen></iframe>`
  },
  // 匹配slug 'sonic-advance'
  'sonic-advance': {
    url: `${EMBED_BASE_URL}sonic-advance`,  // 修改为正确的slug
    supportedPlatforms: ['desktop', 'mobile', 'tablet'],
    aspectRatio: '3/2',
    iframe: `<iframe src="${EMBED_BASE_URL}sonic-advance" 
        width="100%" height="80vh" frameborder="0" allowfullscreen></iframe>`
  },
  // 匹配slug 'fire-emblem-gaiden'
  'fire-emblem-gaiden': {
    url: `${EMBED_BASE_URL}fire-emblem-gaiden`,  // 修改为正确的slug
    supportedPlatforms: ['desktop', 'mobile', 'tablet'],
    aspectRatio: '3/2',
    iframe: `<iframe src="${EMBED_BASE_URL}fire-emblem-gaiden" 
        width="100%" height="80vh" frameborder="0" allowfullscreen></iframe>`
  }
};

export function getGameEmbedConfig(slug: string): GameEmbedConfig | null {
  // 首先尝试从预定义的映射中获取配置
  if (EMBED_MAP[slug]) {
    return EMBED_MAP[slug];
  }
  
  // 如果映射中没有，尝试从gameData中查找游戏
  const games = getAllGames(); // 调用函数获取游戏数据
  const game = games.find(g => g.slug === slug);
  
  if (!game) return null;
  
  // 返回默认配置（您可以根据需要定制）
  return {
    url: `${EMBED_BASE_URL}${slug}`,  // 这里改为动态拼接slug
    supportedPlatforms: ['desktop'],
    aspectRatio: '16/9'
  };
}

export function getEmbedUrl(slug: string): string {
  const config = getGameEmbedConfig(slug);
  return config?.url || `${EMBED_BASE_URL}default`; // 添加默认值的处理
}

export function getIframe(slug: string): string | null {
  const config = getGameEmbedConfig(slug);
  return config?.iframe || null;
}
