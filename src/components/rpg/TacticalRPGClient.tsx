// src/components/rpg/TacticalRPGClient.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import topGames from '@/data/articles/rpg-top-games.json';
import { getEmbedUrl } from '@/lib/gameService';

// —— 1) 明确定义数据类型 ——
// 根据你的 JSON：release.developers 是 string[]
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

export default function TacticalRPGClient() {
  // 过滤出 Tactical RPG
  const tacticalRpgGames: Game[] = games.filter((game) => game.genre === 'Tactical RPG');

  // 排序状态
  const [sortBy, setSortBy] = useState<'rank' | 'title' | 'year' | 'metacritic'>('rank');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 排序函数（返回新数组）
  const sortedGames: Game[] = [...tacticalRpgGames].sort((a, b) => {
    if (sortBy === 'rank') return a.rank - b.rank;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'year') return b.year - a.year;
    if (sortBy === 'metacritic') return b.metacritic - a.metacritic;
    return 0;
  });

  // 打开游戏弹窗
  const openGameModal = (game: Game) => {
    setSelectedGame(game);
    setIsLoading(true);
  };

  // 关闭游戏弹窗
  const closeGameModal = () => setSelectedGame(null);

  // 处理 iframe 加载完成
  const handleIframeLoad = () => setIsLoading(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* 游戏弹窗 */}
      {selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-2xl overflow-hidden">
            <div className="bg-purple-700 text-white p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold">Playing {selectedGame.title}</h3>
              <button
                onClick={closeGameModal}
                className="text-white hover:text-gray-200 text-xl"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="p-6 text-center relative">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-gray-300">Loading game...</p>
                  </div>
                </div>
              )}

              <div className="aspect-video w-full bg-black">
                <iframe
                  src={getEmbedUrl(selectedGame.slug)}
                  className="w-full h-full"
                  sandbox="allow-same-origin allow-scripts"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={handleIframeLoad}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 页面内容 */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-12">
        {/* 面包屑导航 */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-purple-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/rpg-hub" className="hover:text-purple-600 transition-colors">
              RPG Hub
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Tactical RPGs</span>
          </nav>
        </div>

        {/* 页面标题和描述 */}
        <div className="bg-gradient-to-r from-blue-800 to-purple-800 rounded-xl p-8 mb-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tactical RPGs</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Master strategic grid-based combat and deep tactical gameplay in the best GBA strategy RPGs
          </p>
        </div>

        {/* 排序选项 */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center bg-white rounded-lg p-3 shadow-sm border border-gray-200">
            <span className="text-gray-600 mr-2 text-sm font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-white text-gray-800 border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="rank">Ranking</option>
              <option value="title">Title (A-Z)</option>
              <option value="year">Release Year</option>
              <option value="metacritic">Metacritic Score</option>
            </select>
          </div>
        </div>

        {/* 游戏列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {sortedGames.map((game) => (
            <GameCard key={game.id} game={game} onPlay={() => openGameModal(game)} />
          ))}
        </div>

        {/* 子类型导航 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Explore Other RPG Subgenres</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CategoryCard
              title="Turn-Based RPGs"
              description="Strategic JRPGs with deep combat systems and immersive stories"
              path="/rpg-hub/turn-based"
              games={['Golden Sun', 'Final Fantasy Tactics', 'Fire Emblem']}
            />
            <CategoryCard
              title="Action RPGs"
              description="Real-time combat RPGs with emphasis on action and reflexes"
              path="/rpg-hub/action"
              games={['Kingdom Hearts: Chain of Memories', 'Sword of Mana', 'Zelda: Minish Cap']}
            />
            <CategoryCard
              title="Adventure RPGs"
              description="Exploration-focused with light RPG elements and puzzle-solving"
              path="/rpg-hub/adventure"
              games={['Pokémon Mystery Dungeon', 'Boktai', 'Harvest Moon']}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// —— 2) 子组件强类型 ——
// 避免 typeof topGames[0] 造成 never 推断
function GameCard({ game, onPlay }: { game: Game; onPlay: () => void }) {
  const developer = game.release?.developers?.length
    ? game.release.developers.join(', ')
    : 'Unknown';

  const detailHref = game.gameDetailUrl ?? `/games/${game.slug}`;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-200">
      <div className="p-5 flex h-full">
        {/* 游戏封面 */}
        <div className="w-1/3 flex-shrink-0 mr-4 relative">
          <div className="absolute top-0 left-0 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-br z-10">
            #{game.rank}
          </div>
        <div className="bg-gray-100 rounded-lg overflow-hidden aspect-[3/4] border border-gray-200 h-full">
            <Image
              src={`/images/covers/${game.slug}.jpg`}
              alt={`${game.title} cover art`}
              width={300}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 游戏详情 */}
        <div className="flex-grow flex flex-col">
          <div className="mb-2">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{game.title}</h3>
            <div className="text-sm text-gray-600">
              {game.year} • {developer}
            </div>
          </div>

          <p className="text-gray-700 text-sm line-clamp-3 flex-grow mb-3">{game.description}</p>

          {/* 评分信息 */}
          <div className="flex items-center mb-3">
            <div className="flex items-center mr-4">
              <span className="text-yellow-400 mr-1 text-sm">★</span>
              <span className="text-gray-900 text-sm font-medium">{game.metacritic}</span>
              <span className="text-gray-500 text-xs ml-1">Metacritic</span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1 text-sm">★</span>
              <span className="text-gray-900 text-sm font-medium">{game.ign}</span>
              <span className="text-gray-500 text-xs ml-1">IGN</span>
            </div>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-1 mb-3">
            {game.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-auto">
            <Link href={detailHref} className="text-purple-600 hover:text-purple-800 font-medium text-sm">
              View Details
            </Link>

            <button
              onClick={onPlay}
              className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-sm font-medium text-white transition-colors"
            >
              Play Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({
  title,
  description,
  path,
  games,
}: {
  title: string;
  description: string;
  path: string;
  games: string[];
}) {
  return (
    <div className="bg-white rounded-xl p-5 hover:shadow-md transition-all border border-gray-200">
      <Link href={path} className="hover:no-underline">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>

        <p className="text-gray-600 text-sm mb-3">{description}</p>

        {games.length > 0 && (
          <div className="mt-2">
            <div className="text-gray-500 text-xs mb-1 font-medium">Popular Games:</div>
            <ul className="space-y-1 text-gray-700 text-sm">
              {games.slice(0, 3).map((game, idx) => (
                <li key={idx} className="flex items-center">
                  <div className="bg-purple-500 w-1.5 h-1.5 rounded-full mr-2"></div>
                  <span className="line-clamp-1">{game}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-3 flex items-center text-purple-600 text-sm font-medium hover:text-purple-800 transition-colors">
          <span>Explore</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </Link>
    </div>
  );
}