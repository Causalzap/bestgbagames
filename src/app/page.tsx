'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedGames, getGameCategories, getBestGamesData, getAllGames } from '@/lib/gameData';
import { Game } from '@/types/game';
import FAQSection from '@/components/FAQSection';
import { gameFaqs } from '@/data/gameFaqs';
import { getEmbedUrl } from '@/lib/gameService';

export default function HomePage() {
  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [bestGamesData, setBestGamesData] = useState<any>(null);
  const [playingGame, setPlayingGame] = useState<{slug: string; title: string} | null>(null);
  const [gameLoading, setGameLoading] = useState(false);

  useEffect(() => {
    setFeaturedGames(getFeaturedGames(3));
    setCategories(getGameCategories());
    setBestGamesData(getBestGamesData());
  }, []);

  // 处理Play Now点击 - 直接弹出游戏内嵌
  const handlePlayNow = (slug: string, title: string) => {
    setGameLoading(true);
    setPlayingGame({slug, title});
    setTimeout(() => setGameLoading(false), 800);
  };

  // 关闭游戏内嵌
  const closeGameModal = () => {
    setPlayingGame(null);
  };

  if (!bestGamesData) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      {/* 游戏内嵌模态框 */}
      {playingGame && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center bg-purple-800 px-6 py-3">
              <h3 className="font-bold text-white text-lg">
                Playing {playingGame.title}
              </h3>
              <button
                onClick={closeGameModal}
                className="text-white hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="relative aspect-video w-full bg-black">
              {gameLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                  <span className="ml-4 text-white">Loading game...</span>
                </div>
              ) : (
                <iframe
                  src={getEmbedUrl(playingGame.slug)}
                  className="w-full h-full"
                  sandbox="allow-same-origin allow-scripts"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 英雄区域 */}
      <div className="bg-gradient-to-b from-purple-900 to-indigo-800 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {bestGamesData.title}
            </h1>
            <p className="text-xl mb-8">
              {bestGamesData.intro.description}
            </p>
            <Link 
              href="/best-games"
              className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-all shadow-md"
            >
              Explore All Games
            </Link>
          </div>
        </div>
      </div>

      {/* 精选游戏展示区域 - 与截图布局完全一致 */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Top Rated Masterpieces
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These critically acclaimed titles represent the pinnacle of the Game Boy Advance library.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredGames.map(game => {
              const coverPath = `/images/covers/${game.slug}.jpg`;
              return (
                <div key={game.slug} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-[3/4] relative">
                    <Image 
                      src={`/images/covers/${(game.slug ?? 'placeholder')}.jpg`}   // slug 兜底
                      alt={game.coverAlt ?? `${game.title} cover`}                  // alt 兜底
                      fill
                      className="object-cover rounded-t-xl"
                      onError={(e) => {
                        e.currentTarget.src = '/images/covers/default.png';
                      }}
                    />
                    {/* 排名徽章 */}
                    <div className="absolute top-3 right-3 bg-yellow-500 text-black font-bold text-lg w-10 h-10 flex items-center justify-center rounded-full">
                      #{game.rank}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{game.title}</h3>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mb-3">
                      <span>{game.year || 'Year unknown'}</span>
                      <span className="max-w-[60%] text-right">
                      {game.developer}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">{game.coreHighlight}</p>
                    <div className="flex space-x-4 border-t border-gray-100 pt-4">
                      <Link 
                        href={`/best-games/${game.slug}`} 
                        className="text-purple-700 font-medium hover:text-purple-900 transition-colors flex items-center"
                      >
                        View Details
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      <button 
                        onClick={() => handlePlayNow(game.slug, game.title)}
                        className="text-green-600 font-medium hover:text-green-800 transition-colors flex items-center"
                      >
                        Play Now
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/best-games" 
              className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-all shadow-md"
            >
              See All {bestGamesData.games.length} Best Games
            </Link>
          </div>
        </div>
      </div>

      {/* 游戏分类展示 */}
      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Top Game Genres
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover games in the most popular categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.slice(0, 2).map(category => (
              <div key={category.id} className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-purple-800 mb-4">{category.title}</h3>
                <div className="space-y-4">
                  {category.games.slice(0, 3).map((gameSlug: string) => {
                    const game = featuredGames.find(g => g.slug === gameSlug) || 
                                getAllGames().find(g => g.slug === gameSlug);
                    if (!game) return null;
                    
                    return (
                      <div key={game.slug} className="flex items-center bg-white p-4 rounded-lg">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image 
                            src={`/images/covers/${(game.slug ?? 'placeholder')}.jpg`}   // slug 兜底
                            alt={game.coverAlt ?? `${game.title} cover`}                  // alt 兜底
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-bold text-gray-900">{game.title}</h4>
                          <p className="text-sm text-gray-600">{game.year || 'Year unknown'}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6">
                  <Link 
                    href={`/best-games?genre=${category.id}`}
                    className="text-purple-700 font-medium hover:text-purple-900 transition-colors"
                  >
                    View all {category.title} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link 
              href="/best-games"
              className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-all shadow-md"
            >
              See All Game Genres
            </Link>
          </div>
        </div>
      </div>

      {/* 网站特色功能展示 */}
      <div className="py-16 px-4 bg-gradient-to-tr from-gray-900 to-purple-900 text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Experience GBA Classics Online
          </h2>
          
          <div className="max-w-4xl mx-auto bg-black/30 p-6 rounded-xl border-2 border-yellow-500">
            <div className="aspect-video bg-gray-900 rounded-lg flex flex-col items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="text-5xl mb-4">🕹️</div>
                <p className="text-2xl font-bold mb-2">Ready to Play?</p>
                <p className="text-gray-400">Enjoy classic GBA games directly in your browser</p>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                href="/online-play?device=pc" 
                className="bg-blue-600 hover:bg-blue-700 p-6 rounded-lg flex flex-col items-center text-center transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-4">💻</div>
                <h3 className="font-bold text-lg mb-2">PC Experience</h3>
                <p className="text-sm">Play with keyboard controls</p>
              </Link>
              
              <Link 
                href="/online-play?device=mobile" 
                className="bg-green-600 hover:bg-green-700 p-6 rounded-lg flex flex-col items-center text-center transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-4">📱</div>
                <h3 className="font-bold text-lg mb-2">Mobile Experience</h3>
                <p className="text-sm">Touch-optimized controls</p>
              </Link>
              
              <Link 
                href="/hidden-gems" 
                className="bg-yellow-600 hover:bg-yellow-700 p-6 rounded-lg flex flex-col items-center text-center transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-4">💎</div>
                <h3 className="font-bold text-lg mb-2">Hidden Gems</h3>
                <p className="text-sm">Discover underrated classics</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <FAQSection 
        faqs={gameFaqs}
        title="GBA Game FAQs"
        description="Get answers to popular questions about the best Game Boy Advance games"
        ctaText="Explore All Games"
        ctaLink="/best-games"
      />
    </div>
  );
}
