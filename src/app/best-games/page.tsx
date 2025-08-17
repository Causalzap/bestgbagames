// src/app/best-games/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllGames, getGameCategories } from '@/lib/gameData';
import { Game } from '@/types/game';
import Link from 'next/link';
import Image from 'next/image';
import { getEmbedUrl } from '@/lib/gameService';

// 游戏卡片组件 - 按照流程图区分按钮功能
function GameCard({ game, rank, onPlayNow }: { 
  game: Game; 
  rank: number;
  onPlayNow: (slug: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow h-full flex flex-col">
      <div className="aspect-[3/4] relative">
        <Image 
          src={`/images/covers/${game.slug}.jpg`}
          alt={game.coverAlt}
          fill
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = '/images/covers/default.png';
          }}
        />
        <div className="absolute top-3 right-3 bg-yellow-500 text-black font-bold text-sm px-2 py-1 rounded">
          #{rank}
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-1">{game.title}</h3>
          
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-500">{game.genre.join(' / ')}</span>
              <span className="text-sm text-gray-500">{game.release.year}</span>
            </div>
            <span className="text-sm text-gray-500 block">{game.release.developers.join(', ')}</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">{game.coreHighlight}</p>
        </div>
        
        <div className="mt-auto flex justify-between border-t border-gray-200 pt-3">
          {/* View Details 按钮 - 跳转到游戏详情页 */}
          <Link 
            href={`/best-games/${game.slug}`} 
            className="text-purple-700 font-medium text-sm hover:text-purple-900 transition-colors flex items-center"
          >
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          {/* Play Now 按钮 - 直接弹出游戏内嵌 */}
          <button
            onClick={() => onPlayNow(game.slug)}
            className="text-green-700 font-medium text-sm hover:text-green-900 transition-colors flex items-center"
          >
            Play Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// 游戏内嵌模态框组件 - 直接弹出游戏内嵌
function GameEmbedModal({ slug, onClose }: { 
  slug: string; 
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // 防止页面滚动
    document.body.style.overflow = 'hidden';
    
    // 加载动画时间
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => {
      document.body.style.overflow = 'auto';
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl">
        {/* 顶部标题栏 */}
        <div className="bg-purple-800 px-6 py-3 flex justify-between items-center">
          <h3 className="font-bold text-white">Playing Game</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* 游戏内容区域 */}
        <div className="relative aspect-video w-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-full bg-gray-900">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              <span className="ml-4 text-white">Loading game...</span>
            </div>
          ) : (
            <iframe
              src={getEmbedUrl(slug)}
              className="w-full h-full bg-black"
              sandbox="allow-same-origin allow-scripts"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
        
        {/* 控制说明 */}
        <div className="bg-gray-800 p-3 text-center text-sm text-gray-300">
          <p>Press <span className="font-mono bg-gray-700 px-2 py-1 rounded-md mx-1">SPACE</span> to play</p>
        </div>
      </div>
    </div>
  );
}

// 主内容组件 - 实现流程图逻辑
function BestGamesContent() {
  const searchParams = useSearchParams();
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeGenre, setActiveGenre] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  
  // 游戏内嵌模态框状态
  const [playingGame, setPlayingGame] = useState<string | null>(null);

  // 应用筛选逻辑
  const applyFilters = (gamesList: Game[], genre?: string | null, search?: string | null) => {
    let filtered = [...gamesList];
    
    // 应用类型筛选
    if (genre) {
      filtered = filtered.filter(game => 
        game.genre.some(g => 
          g.toLowerCase().replace(/\s+/g, '-') === genre
        )
      );
    }
    
    // 应用搜索筛选
    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(game => 
        game.title.toLowerCase().includes(query) ||
        game.genre.some(g => g.toLowerCase().includes(query)) ||
        game.coreHighlight.toLowerCase().includes(query) ||
        game.historicalSignificance.toLowerCase().includes(query)
      );
    }
    
    setFilteredGames(filtered);
  };

  // 处理类型点击
  const handleGenreClick = (genreId: string) => {
    setActiveGenre(prev => prev === genreId ? '' : genreId);
    applyFilters(games, genreId === activeGenre ? null : genreId, searchQuery);
  };

  // 处理搜索
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(games, activeGenre, searchQuery);
  };

  // 清除所有筛选
  const clearFilters = () => {
    setActiveGenre('');
    setSearchQuery('');
    applyFilters(games);
  };

  // 处理Play Now点击 - 直接弹出游戏内嵌
  const handlePlayNow = (slug: string) => {
    setPlayingGame(slug);
  };

  useEffect(() => {
    // 检查设备类型
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', checkIfMobile);
    checkIfMobile();
    
    const allGames = getAllGames();
    setGames(allGames);
    
    // 获取游戏分类
    const categories = getGameCategories();
    setCategories(categories);
    
    // 从URL获取筛选参数
    const genreParam = searchParams.get('genre');
    const searchParam = searchParams.get('search');
    
    // 设置初始状态
    if (genreParam) {
      setActiveGenre(genreParam);
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
    // 初始筛选 - 添加额外的slug验证
    const validGames = allGames.filter(game => !!game.slug);
    applyFilters(validGames, genreParam, searchParam);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* 游戏内嵌模态框 */}
      {playingGame && (
        <GameEmbedModal 
          slug={playingGame} 
          onClose={() => setPlayingGame(null)}
        />
      )}
      
      <div className="container mx-auto px-4">
        {/* 头部介绍 */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-indigo-700 rounded-full px-6 py-2 mb-4">
            <span className="text-white font-bold text-sm">BEST GBA COLLECTION</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Best Game Boy Advance Games</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of the top GBA masterpieces that defined a generation
          </p>
        </div>
        
        {/* 筛选控制栏 */}
        <div className="mb-10 bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800">Filter & Browse</h2>
            
            {(activeGenre || searchQuery) && (
              <button 
                onClick={clearFilters}
                className="text-sm text-purple-600 hover:text-purple-800 flex items-center font-medium"
              >
                Clear all filters
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          
          {/* 搜索框 */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search games by title, genre, or features..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button 
                type="submit"
                className="ml-3 bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg font-medium"
              >
                Search
              </button>
            </div>
          </form>
          
          {/* 分类筛选标签 */}
          <div className="mb-2">
            <h3 className="font-semibold text-gray-700 mb-3">Browse by Genre</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${!activeGenre ? 'bg-purple-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                onClick={() => handleGenreClick('')}
              >
                All Genres
              </button>
              
              {categories.slice(0, isMobile ? 4 : 10).map(category => (
                <button 
                  key={category.id}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                    activeGenre === category.id 
                      ? 'bg-purple-700 text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => handleGenreClick(category.id)}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
          
          {/* 当前筛选状态显示 */}
          {(activeGenre || searchQuery) && (
            <div className="mt-4 text-xs flex flex-wrap gap-2">
              {activeGenre && (
                <div className="flex items-center bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  <span>{categories.find(c => c.id === activeGenre)?.title}</span>
                  <button 
                    onClick={() => setActiveGenre('')} 
                    className="ml-1 text-purple-800 hover:text-purple-900"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
              {searchQuery && (
                <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  <span>{searchQuery}</span>
                  <button 
                    onClick={() => setSearchQuery('')} 
                    className="ml-1 text-blue-800 hover:text-blue-900"
                  >
                    <svg xmlns="http://www.w3.org/2000/s极vg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* 游戏列表 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredGames
            .filter(game => !!game.slug) // 过滤掉没有slug的游戏
            .map((game, index) => (
              <GameCard 
                key={game.slug} 
                game={game} 
                rank={index + 1}
                onPlayNow={handlePlayNow}
              />
            ))}
        </div>
        
        {filteredGames.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No games found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try adjusting your filters or using different search terms
            </p>
            <button 
              onClick={clearFilters}
              className="bg-purple-700 hover:bg-purple-800 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
        
        {filteredGames.length > 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center">
              <span className="mr-3 text-gray-600">Showing {filteredGames.length} of {games.length} games</span>
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BestGamesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading best GBA games...</p>
        </div>
      </div>
    }>
      <BestGamesContent />
    </Suspense>
  );
}
