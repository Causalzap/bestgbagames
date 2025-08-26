'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import topGames from '@/data/articles/rpg-top-games.json';
import categories from '@/data/articles/rpg-categories.json';
import { getEmbedUrl } from '@/lib/gameService'; // 确保有这个函数

// —— 新增：强类型 —— //
type Game = {
  id: number;
  rank: number;
  title: string;
  year: number;
  description: string;
  slug: string;
  metacritic: number;
  ign: number;
  genre: string;
  tags: string[];
  platforms?: string[];
  release: { developers: string[] };
  gameDetailUrl?: string;
  whyStillWorthPlaying?: string;
};

// 将 JSON 明确断言为 Game[]
const games: Game[] = topGames as Game[];

export default function BestGBARpgs() {
  const [playingGame, setPlayingGame] = useState<string | null>(null);
  
  if (!Array.isArray(categories)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="max-w-md p-8 bg-red-900/50 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Data Loading Error</h2>
          <p className="mb-6">
            Failed to load categories data. Please check the JSON format.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // 打开游戏弹窗
  const openGameModal = (slug: string) => {
    setPlayingGame(slug);
  };

  // 关闭游戏弹窗
  const closeGameModal = () => {
    setPlayingGame(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* 游戏弹窗 */}
      {playingGame && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-2xl overflow-hidden">
            <div className="bg-purple-700 text-white p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold">Playing Game</h3>
              <button
                onClick={closeGameModal}
                className="text-white hover:text-gray-200 text-xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 text-center">
              
              <div className="aspect-video w-full bg-black flex items-center justify-center">
                <iframe
                  src={getEmbedUrl(playingGame)}
                  className="w-full h-full"
                  sandbox="allow-same-origin allow-scripts"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-12">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Best GBA RPG Games
          </h1>
          <p className="text-gray-300 text-lg">
            The definitive ranking of the top role-playing games for the Game Boy Advance
          </p>
        </div>
        
        {/* 修改：用 games，并在 map 中标注 (game: Game) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {games.map((game: Game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onPlay={() => openGameModal(game.slug)}
            />
          ))}
        </div>
    
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Explore RPG Subgenres
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category: any, index: number) => (
              <SafeCategoryCard key={index} category={category} />
            ))}
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 mb-12 border border-gray-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Is Pokémon an RPG?
            </h2>
            <p className="text-gray-300 mb-6">
              Explore one of the most debated questions among retro gaming fans
            </p>
            
            <Link 
              href="/rpg-hub/is-pokemon-an-rpg"
              className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Read Analysis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// 修改：GameCard 的 game 使用强类型 Game
function GameCard({ game, onPlay }: { 
  game: Game;
  onPlay: () => void;
}) {

  const developers = game.release?.developers?.length
    ? game.release.developers.join(', ')
    : 'Unknown';

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-700 min-h-[280px]">
      <div className="p-4 flex h-full">
        {/* 游戏封面 */}
        <div className="w-1/3 flex-shrink-0 mr-4">
          <div className="bg-gray-700 rounded-lg overflow-hidden aspect-[3/4] border border-gray-600 h-full">
            <Image 
              src={`/images/covers/${game.slug}.jpg`}
              alt={`${game.title} cover art`}
              width={300}
              height={400}
              className="w-full h-full object-cover"
              // Next/Image 的 onError 类型不直接暴露 <img>，这里保持原写法即可
              onError={(e) => {
                (e.currentTarget as unknown as HTMLImageElement).src = '/images/covers/default.jpg';
              }}
            />
          </div>
        </div>
        
        {/* 游戏详情 */}
        <div className="flex-grow flex flex-col">
          <div className="mb-2">
            <h3 className="text-xl font-bold text白 line-clamp-1">
              {game.title}
            </h3>
            <div className="text-sm text-gray-400">
              {game.year} • {developers}
            </div>
          </div>
          
          <p className="text-gray-300 text-sm line-clamp-3 flex-grow mb-2">
            {game.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            <Link 
              href={`/games/${game.slug}`}
              className="text-purple-400 hover:text-purple-300 font-medium text-sm"
            >
              View Details
            </Link>
            
            <button
              onClick={onPlay}
              className="bg-purple-700 hover:bg-purple-800 px-3 py-1 rounded text-sm font-medium text-white transition-colors"
            >
              Play Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SafeCategoryCard({ category }: { category: any }) {
  const categoryPathMap: Record<string, string> = {
    'Turn-Based RPGs': '/rpg-hub/turn-based',
    'Action RPGs': '/rpg-hub/action',
    'Tactical RPGs': '/rpg-hub/tactical',
    'Adventure RPGs': '/rpg-hub/adventure',
  };

  const safeCategory = {
    title: category?.title || 'Unknown Category',
    icon: category?.icon || '🎮',
    path: categoryPathMap[category?.title as string] || '#',
    description: category?.description || 'Description not available',
    games: Array.isArray(category?.games) ? (category.games as string[]) : [],
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors border-2 border-gray-600 shadow-md">
      {/* 只保留这一层 Link */}
      <Link href={safeCategory.path} className="hover:no-underline block">
        <div className="flex items-center mb-3">
          <span className="text-2xl mr-2">{safeCategory.icon}</span>
          <h3 className="text-lg font-bold text-white line-clamp-1">
            {safeCategory.title}
          </h3>
        </div>

        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {safeCategory.description}
        </p>

        {safeCategory.games.length > 0 && (
          <div className="mt-2">
            <div className="text-gray-400 text-xs mb-1 font-medium">Popular Games:</div>
            <ul className="space-y-1 text-gray-200 text-sm">
              {safeCategory.games.slice(0, 3).map((game: string, idx: number) => (
                <li key={idx} className="flex items-center">
                  <div className="bg-purple-500 w-1.5 h-1.5 rounded-full mr-2" />
                  <span className="line-clamp-1">{game}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 这里不要再用 <Link>，用 div/span 就行 */}
        <div className="mt-3 flex items-center text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors cursor-pointer">
          <span>Explore</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </Link>
    </div>
  );
}
