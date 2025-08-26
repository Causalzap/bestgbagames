'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  getFeaturedGames, 
  getGameCategories,
  getBestGamesData,
  getAllGames
} from '@/lib/gameData';
import { Game } from '@/types/game';
import FAQSection from '@/components/FAQSection';
import { gameFaqs } from '@/data/gameFaqs';

export default function HomePage() {
  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [bestGamesData, setBestGamesData] = useState<any>(null);
  
  useEffect(() => {
    setFeaturedGames(getFeaturedGames(3));
    setCategories(getGameCategories());
    setBestGamesData(getBestGamesData());
  }, []);

  if (!bestGamesData) return <div>Loading...</div>;

  return (
    <div className="bg-white min-h-screen">
      {/* 英雄区域 - 更新按钮链接和样式 */}
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
              href="/best-games" // 指向精选游戏列表页
              className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-all shadow-md"
            >
              Explore All Games
            </Link>
          </div>
        </div>
      </div>

      {/* 精选游戏展示区域 */}
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
                      src={coverPath}
                      alt={game.coverAlt ?? `${game.title} cover`}
                      fill
                      className="object-cover rounded-t-xl"
                      onError={(e) => {
                        e.currentTarget.src = '/images/covers/default.png';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{game.title}</h3>
                      <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                        <span>#{game.rank}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mb-3">
                      <span>{game.release?.year ?? 'Year unknown'}</span>
                      <span>{game.release?.developers?.join(', ') ?? 'Unknown Developer'}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{game.coreHighlight}</p>
                    <div className="flex space-x-4">
                      <Link 
                        href={`/games/${game.slug}`} 
                        className="text-purple-700 font-medium hover:text-purple-900 transition-colors"
                      >
                        View Details
                      </Link>
                      <Link 
                        href="/online-play" 
                        className="text-purple-700 font-medium hover:text-purple-900 transition-colors"
                      >
                        Play Now
                      </Link>
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
                            src={`/images/covers/${game.slug}.jpg`}
                            alt={game.coverAlt ?? `${game.title} cover`}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-bold text-gray-900">{game.title}</h4>
                          <p className="text-sm text-gray-600">{game.release?.year ?? 'Year unknown'}</p>
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
          
          {/* 更新按钮样式 - 应用渐变底纹 */}
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
                className="bg-blue-600 hover:bg-blue-700 p-6 rounded-lg flex flex-col items-center text-center"
              >
                <div className="text-3xl mb-4">💻</div>
                <h3 className="font-bold text-lg mb-2">PC Experience</h3>
                <p className="text-sm">Play with keyboard controls</p>
              </Link>
              
              <Link 
                href="/online-play?device=mobile" 
                className="bg-green-600 hover:bg-green-700 p-6 rounded-lg flex flex-col items-center text-center"
              >
                <div className="text-3xl mb-4">📱</div>
                <h3 className="font-bold text-lg mb-2">Mobile Experience</h3>
                <p className="text-sm">Touch-optimized controls</p>
              </Link>
              
              <Link 
                href="/hidden-gems" 
                className="bg-yellow-600 hover:bg-yellow-700 p-6 rounded-lg flex flex-col items-center text-center"
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
