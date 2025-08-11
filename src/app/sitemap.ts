// src/app/sitemap.ts
import { getAllGames } from '@/lib/gameData';

export default async function sitemap() {
  const baseUrl = 'https://www.bestgbagames.com';
  const games = await getAllGames();
  
  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/best-games`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...games.map(game => ({
      url: `${baseUrl}/best-games/${game.slug}`,
      lastModified: new Date(game.lastUpdated || Date.now()),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  ];
}
