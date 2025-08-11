// src/app/best-games/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getAllGames, getGameCategories } from '@/lib/gameData';
import { Game } from '@/types/game';
import Link from 'next/link';
import Image from 'next/image';


export default function BestGamesPage() {
  const searchParams = useSearchParams();
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeGenre, setActiveGenre] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
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
    
    // 初始筛选
    applyFilters(allGames, genreParam, searchParam);
  }, [searchParams]);

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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* 头部介绍 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Best Game Boy Advance Games</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of the top GBA masterpieces
          </p>
        </div>
        
        {/* 筛选控制栏 */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800">Filter Games</h2>
            
            {(activeGenre || searchQuery) && (
              <button 
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-purple-700 flex items-center"
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
                placeholder="Search game titles, genres, descriptions..."
                className="w-full border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button 
                type="submit"
                className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-r-lg"
              >
                Search
              </button>
            </div>
          </form>
          
          {/* 分类筛选标签 */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-3">Browse by Genre</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-4 py-2 rounded-full text-sm font-medium ${!activeGenre ? 'bg-purple-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                onClick={() => handleGenreClick('')}
              >
                All Genres
              </button>
              
              {categories.map(category => (
                <button 
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${activeGenre === category.id ? 'bg-purple-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                  onClick={() => handleGenreClick(category.id)}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
          
          {/* 当前筛选状态显示 */}
          {(activeGenre || searchQuery) && (
            <div className="mt-4 text-sm">
              <span className="font-medium">Current filters:</span>
              {activeGenre && (
                <span className="ml-2 bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  Genre: {categories.find(c => c.id === activeGenre)?.title}
                </span>
              )}
              {searchQuery && (
                <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Search: &quot{searchQuery}&quot
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* 游戏列表 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGames.map(game => (
            <div key={game.slug} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
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
                  #{game.rank}
                </div>
              </div>
              
              <div className="p-4 flex-grow flex flex-col">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{game.title}</h3>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {game.genre.map((g, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        {g}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mb-3">
                    <span>{game.release.year}</span>
                    <span>{game.release.developers.join(', ')}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{game.coreHighlight}</p>
                </div>
                
                <div className="mt-auto flex justify-between">
                  <Link 
                    href={`/best-games/${game.slug}`} 
                    className="text-purple-700 font-medium text-sm hover:text-purple-900 transition-colors"
                  >
                    View Details
                  </Link>
                  <Link 
                    href={`/online-play?game=${game.slug}`}
                    className="text-green-700 font-medium text-sm hover:text-green-900 transition-colors"
                  >
                    Play Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No games found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
            <button 
              onClick={clearFilters}
              className="mt-4 bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg font-medium"
            >
              View All Games
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
