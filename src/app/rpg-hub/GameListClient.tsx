'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getEmbedUrl } from '@/lib/gameService';

// 定义类型
type Game = {
  id: number;
  slug: string;
  title: string;
  year: number;
  description: string;
  release: { developers: string[] };
};

export default function GameListClient({ games }: { games: Game[] }) {
  const [playingGame, setPlayingGame] = useState<string | null>(null);

  return (
    <>
      {/* 弹窗逻辑 */}
      {playingGame && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-2xl overflow-hidden">
            <div className="bg-purple-700 text-white p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold">Playing {playingGame}</h3>
              <button onClick={() => setPlayingGame(null)} className="text-white text-xl">×</button>
            </div>
            <div className="aspect-video w-full bg-black">
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
      )}

      {/* 游戏列表 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {games.map((game) => (
          <div key={game.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-700 flex h-[280px]">
            {/* 左侧封面 */}
            <div className="w-1/3 p-4 pr-0">
               <div className="relative h-full w-full rounded-lg overflow-hidden border border-gray-600">
                  <Image 
                    src={`/images/covers/${game.slug}.jpg`}
                    alt={game.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 150px"
                  />
               </div>
            </div>
            
            {/* 右侧内容 */}
            <div className="w-2/3 p-4 flex flex-col">
              <h3 className="text-xl font-bold text-white line-clamp-1">{game.title}</h3>
              <div className="text-sm text-gray-400 mb-2">
                {game.year} • {game.release?.developers?.join(', ') || 'Unknown'}
              </div>
              <p className="text-gray-300 text-sm line-clamp-3 mb-4 flex-grow">{game.description}</p>
              
              <div className="flex gap-2 mt-auto">
                <Link href={`/best-games/${game.slug}`} className="text-purple-400 text-sm font-medium hover:text-purple-300 self-center">
                  View Details
                </Link>
                <button 
                  onClick={() => setPlayingGame(game.slug)}
                  className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-1.5 rounded text-sm transition-colors ml-auto"
                >
                  Play Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}