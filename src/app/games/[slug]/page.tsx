"use client";

import { getGameBySlug } from '@/lib/gameData';
import Image from 'next/image';
import { useState } from 'react';
import { getEmbedUrl } from '@/lib/gameService';
import { useRouter } from 'next/navigation';

export default function GameDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const game = getGameBySlug(params.slug);
  const [showGameEmbed, setShowGameEmbed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // 处理游戏嵌入
  const handlePlayClick = () => {
    setShowGameEmbed(true);
    setIsLoading(true);
    
    // 模拟加载延迟
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Game Not Found</h1>
        <button 
          onClick={() => router.push('/')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-all"
        >
          Back to Home
        </button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 返回按钮 - 使用路由器返回 */}
        <div className="mb-6">
          <button 
            onClick={() => router.back()}
            className="text-purple-600 hover:text-purple-800 flex items-center text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Go Back
          </button>
        </div>
        
        {/* 游戏信息区域 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
          {/*  封面区域 */}
            <div className="md:w-1/3 p-4">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md">
                {game.slug ? (
                  <Image
                    src={`/images/covers/${game.slug}.jpg`}
                    alt={game.coverAlt ?? `${game.title} cover`}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <Image
                    src="/images/covers/placeholder.jpg"
                    alt={game.coverAlt ?? `${game.title} cover`}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
            </div>

            
            {/* 游戏详情 */}
            <div className="md:w-2/3 p-4 md:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <div className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full mr-3">
                      #{game.rank}
                    </div>
                    <span className="text-gray-500 text-sm">{game.year || 'Year unknown'}</span>
                  </div>
                  
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{game.title}</h1>
                  
                  <div className="mt-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {Array.isArray(game.genre) ? (
                      game.genre.map((g: string, idx: number) => (
                        <span 
                          key={idx} 
                          className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                        >
                          {g}
                        </span>
                      ))
                    ) : (
                      <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                        {game.genre}
                      </span>
                    )}
                  </div>

                    
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Developer:</span> {game.developer}
                    </p>
                  </div>
                </div>
                
                {/* 移动端立即玩按钮 */}
                <div className="md:hidden">
                  <button
                    onClick={handlePlayClick}
                    disabled={showGameEmbed}
                    className={`${
                      showGameEmbed 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-purple-600 hover:bg-purple-700'
                    } text-white text-xs font-medium py-2 px-4 rounded-lg`}
                  >
                    Play Now
                  </button>
                </div>
              </div>
              
              {/* 游戏介绍 */}
              <div className="mt-6 space-y-5">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Core Highlight</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{game.coreHighlight}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Historical Significance</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{game.historicalSignificance}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Why Still Worth Playing</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{game.whyStillWorthPlaying}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 游戏内嵌区域 */}
        {showGameEmbed && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-purple-600 mb-8">
            <div className="relative">
              {/* 顶部控制栏 */}
              <div className="bg-purple-700 p-3 flex justify-between items-center">
                <span className="text-white font-medium">
                  Playing {game.title}
                </span>
                <button
                  onClick={() => setShowGameEmbed(false)}
                  className="text-white hover:text-gray-200 text-sm"
                >
                  Close Game
                </button>
              </div>
              
              {/* 加载状态 */}
              {isLoading && (
                <div className="h-60 flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
                  <p className="mt-3 text-gray-700">Loading game, please wait...</p>
                </div>
              )}
              
              {/* 内嵌游戏 */}
              <div className={`${isLoading ? 'hidden' : 'block'}`}>
                <iframe
                  src={getEmbedUrl(game.slug)}
                  title={`Play ${game.title}`}
                  className="w-full h-[400px]"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  sandbox="allow-same-origin allow-scripts"
                ></iframe>
              </div>
              
              {/* 底部法律信息 */}
              <div className="bg-gray-100 p-3 text-center text-xs text-gray-600 border-t border-gray-200">
                <p>Game provided by our partner service. Controls may vary per device.</p>
              </div>
            </div>
          </div>
        )}
        
        {/* 桌面端立即玩按钮 */}
        <div className="hidden md:block text-center mt-8">
          <button
            onClick={handlePlayClick}
            disabled={showGameEmbed}
            className={`${
              showGameEmbed 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-purple-600 hover:bg-purple-700'
            } text-white font-medium py-3 px-8 rounded-lg shadow-lg transition-all`}
          >
            {showGameEmbed ? 'Game is Loading...' : 'Play Online Now'}
          </button>
          
          <p className="mt-2 text-gray-600 text-sm">
            Click &quot;Play Online Now&quot; to play directly in your browser
          </p>
        </div>
      </div>
    </div>
  );
}