// src/app/best-games/[slug]/metadata.ts
import { Metadata } from 'next';
import { getGameBySlug } from '@/lib/gameData';

export async function generateMetadata({ params }: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const game = getGameBySlug(params.slug);
  
  return {
    title: game ? `${game.title} | Best GBA Games` : 'Game Not Found',
    description: game?.coreHighlight || 'Discover the best Game Boy Advance games',
    alternates: {
      canonical: `https://www.bestgbagames.com/best-games/${params.slug}`
    }
  };
}