// src/app/sitemap.ts
import { getAllGames } from '@/lib/gameData';

export default async function sitemap() {
  const baseUrl = 'https://www.bestgbagames.com';
  const games = await getAllGames();
  
  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    // 新增：Hidden Gems页面（根据图片添加）
    {
      url: `${baseUrl}/hidden-gems`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    
    // 新增：Online Play页面（根据图片添加）
    {
      url: `${baseUrl}/online-play`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/best-games`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...games.map(game => ({
      url: `${baseUrl}/best-games/${game.slug}`,
      // 使用游戏数据中的最后更新时间（如果存在），否则使用当前时间
      lastModified: game.lastUpdated ? new Date(game.lastUpdated) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  ];
}
