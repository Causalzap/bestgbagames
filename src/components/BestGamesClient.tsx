// src/components/BestGamesClient.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllGames, getGameCategories } from '@/lib/gameData';
import { Game } from '@/types/game';
import Link from 'next/link';
import Image from 'next/image';
import { getEmbedUrl } from '@/lib/gameService';

// --- 这里保留原来的 GameCard 组件 ---
function GameCard({ game, rank, onPlayNow }: { 
  game: Game; 
  rank: number;
  onPlayNow: (slug: string) => void;
}) {
  // ... (保留原有的 GameCard 代码) ...
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow h-full flex flex-col">
      {/* ... GameCard 的 JSX 内容 ... */}
      <div className="aspect-[3/4] relative">
        <Image 
          src={`/images/covers/${game.slug}.jpg`}
          alt={game.coverAlt || 'Game cover'}
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
              <span className="text-sm text-gray-500">{Array.isArray(game.genre) ? game.genre.join(' / ') : game.genre}</span>
              <span className="text-sm text-gray-500">{game.year ? game.year : 'Year unknown'}</span>
            </div>
            <span className="text-sm text-gray-500 block">{game.developer}</span>
          </div> 
          <p className="text-gray-600 text-sm mb-4">{game.coreHighlight}</p>
        </div>
        
        <div className="mt-auto flex justify-between border-t border-gray-200 pt-3">
          <Link 
            href={`/best-games/${game.slug}`} 
            className="text-purple-700 font-medium text-sm hover:text-purple-900 transition-colors flex items-center"
          >
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
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

// --- 这里保留原来的 GameEmbedModal 组件 ---
function GameEmbedModal({ slug, onClose }: { 
  slug: string; 
  onClose: () => void;
}) {
  // ... (保留原有的 GameEmbedModal 代码) ...
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
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
        <div className="bg-purple-800 px-6 py-3 flex justify-between items-center">
          <h3 className="font-bold text-white">Playing Game</h3>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
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
        <div className="bg-gray-800 p-3 text-center text-sm text-gray-300">
          <p>Press <span className="font-mono bg-gray-700 px-2 py-1 rounded-md mx-1">SPACE</span> to play</p>
        </div>
      </div>
    </div>
  );
}

// --- 这里保留原来的 BestGamesContent 组件 (主要逻辑) ---
function BestGamesContent() {
  // ... (这里完全保留你原来的 BestGamesContent 内部所有逻辑: useState, useEffect, handleFilter 等等) ...
  // 为了节省篇幅，这里假设所有的逻辑代码都在，不做任何删减
  const searchParams = useSearchParams();
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeGenre, setActiveGenre] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [playingGame, setPlayingGame] = useState<string | null>(null);

  // ... (applyFilters, handleGenreClick, handleSearch, clearFilters, handlePlayNow, useEffect 等逻辑) ...
  const applyFilters = (gamesList: Game[], genre?: string | null, search?: string | null) => {
      // ... 逻辑代码 ...
      let filtered = [...gamesList];
      if (genre) {
        const toSlug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");
        filtered = filtered.filter((game) => {
          if (Array.isArray(game.genre)) {
            return game.genre.some((g) => toSlug(g) === genre);
          }
          return toSlug(game.genre) === genre;
        });
      }
      if (search) {
        const query = search.toLowerCase();
        filtered = filtered.filter((game) => {
          const genres = Array.isArray(game.genre) ? game.genre : [game.genre];
          return (
            game.title.toLowerCase().includes(query) ||
            genres.some((g) => g.toLowerCase().includes(query)) ||
            game.coreHighlight.toLowerCase().includes(query) ||
            game.historicalSignificance.toLowerCase().includes(query)
          );
        });
      }
      setFilteredGames(filtered);
  };

  const handleGenreClick = (genreId: string) => {
    setActiveGenre(prev => prev === genreId ? '' : genreId);
    applyFilters(games, genreId === activeGenre ? null : genreId, searchQuery);
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(games, activeGenre, searchQuery);
  };
  const clearFilters = () => {
    setActiveGenre('');
    setSearchQuery('');
    applyFilters(games);
  };
  const handlePlayNow = (slug: string) => {
    setPlayingGame(slug);
  };

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkIfMobile);
    checkIfMobile();
    const allGames = getAllGames();
    setGames(allGames);
    setCategories(getGameCategories());
    const genreParam = searchParams.get('genre');
    const searchParam = searchParams.get('search');
    if (genreParam) setActiveGenre(genreParam);
    if (searchParam) setSearchQuery(searchParam);
    const validGames = allGames.filter(game => !!game.slug);
    applyFilters(validGames, genreParam, searchParam);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {playingGame && <GameEmbedModal slug={playingGame} onClose={() => setPlayingGame(null)} />}
      <div className="container mx-auto px-4">
        {/* ... (原本的 JSX 结构) ... */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-indigo-700 rounded-full px-6 py-2 mb-4">
            <span className="text-white font-bold text-sm">BEST GBA COLLECTION</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Best Game Boy Advance Games</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover our curated collection...</p>
        </div>

        {/* Filter Section */}
        <div className="mb-10 bg-white p-6 rounded-xl shadow-md border border-gray-200">
           {/* ... Filter JSX ... */}
           <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800">Filter & Browse</h2>
            {(activeGenre || searchQuery) && (
              <button onClick={clearFilters} className="text-sm text-purple-600 hover:text-purple-800 flex items-center font-medium">
                Clear all filters
              </button>
            )}
          </div>
          <form onSubmit={handleSearch} className="mb-6">
             <div className="flex">
               <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search games..." className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500" />
               <button type="submit" className="ml-3 bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg font-medium">Search</button>
             </div>
          </form>
          <div className="mb-2">
            <h3 className="font-semibold text-gray-700 mb-3">Browse by Genre</h3>
            <div className="flex flex-wrap gap-2">
               <button className={`px-3 py-1.5 rounded-full text-xs font-medium ${!activeGenre ? 'bg-purple-700 text-white' : 'bg-gray-100 text-gray-800'}`} onClick={() => handleGenreClick('')}>All Genres</button>
               {categories.slice(0, isMobile ? 4 : 10).map(category => (
                 <button key={category.id} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${activeGenre === category.id ? 'bg-purple-700 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`} onClick={() => handleGenreClick(category.id)}>{category.title}</button>
               ))}
            </div>
          </div>
        </div>

        {/* Game List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredGames.filter(game => !!game.slug).map((game, index) => (
            <GameCard key={game.slug} game={game} rank={index + 1} onPlayNow={handlePlayNow} />
          ))}
        </div>
        {filteredGames.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No games found</h3>
            <button onClick={clearFilters} className="bg-purple-700 hover:bg-purple-800 text-white font-medium px-6 py-3 rounded-lg transition-colors">Reset Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}

// 导出客户端组件，包含 Suspense
export default function BestGamesClient() {
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