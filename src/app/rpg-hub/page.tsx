import type { Metadata } from 'next';
import Link from 'next/link';
import GameListClient from './GameListClient'; // 引入上面的 Client 组件
import topGames from '@/data/articles/rpg-top-games.json';
import categories from '@/data/articles/rpg-categories.json';

// 定义类型
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

  // 👇 新增这些字段，解决红线报错
  coreHighlight?: string;
  historicalSignificance?: string;
  pros?: string[];
  cons?: string[];
};

const games = topGames as Game[];

// ✅ 1. 添加 Metadata (SEO 关键)
export const metadata: Metadata = {
  title: 'Best GBA RPG Games of All Time (Ranked List)',
  description: 'Discover the top rated GBA RPGs including Golden Sun, Fire Emblem, and Pokémon. Play them online or read our in-depth reviews.',
  alternates: {
    canonical: 'https://www.bestgbagames.com/rpg-hub'
  }
};

export default function RpgHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-12">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Best GBA RPG Games
          </h1>
          <p className="text-gray-300 text-lg">
            The definitive ranking of the top role-playing games for the Game Boy Advance, curated by data and nostalgia.
          </p>
        </div>
        
        {/* ✅ 2. 插入 Client Component (处理列表和弹窗) */}
        <GameListClient games={games} />

        <div className="mt-24 border-t border-gray-700 pt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-yellow-400">
            Detailed Review: Top {games.length} GBA RPGs Ranked
          </h2>
          
          <div className="space-y-16 max-w-4xl mx-auto">
            {games.map((game) => (
              <article key={game.id} id={`review-${game.slug}`} className="bg-gray-800/50 rounded-2xl p-6 md:p-8 border border-gray-700">
                {/* 标题栏 */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b border-gray-700 pb-4">
                  <div>
                    <span className="text-purple-400 font-bold tracking-wider text-sm uppercase">
                      #{game.rank} • {game.year} • {game.release?.developers?.join(', ')}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mt-1">
                      {game.title}
                    </h3>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center space-x-4">
                    {/* Metacritic 分数展示 */}
                    <div className="flex flex-col items-center bg-gray-900 rounded-lg px-4 py-2 border border-gray-600">
                      <span className="text-2xl font-bold text-green-400">{game.metacritic || 'N/A'}</span>
                      <span className="text-[10px] text-gray-400 uppercase">Metascore</span>
                    </div>
                  </div>
                </div>

                {/* 内容区域 */}
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    {game.description}
                  </p>

                  <div className="bg-gray-900/50 rounded-xl p-6 border-l-4 border-purple-500 mb-6">
                    <h4 className="text-lg font-bold text-white mb-2">💡 Core Highlight</h4>
                    <p className="text-gray-300 italic">
                      &ldquo;{game.coreHighlight || 'A classic GBA experience.'}&rdquo;
                    </p>
                  </div>
                  
                  {/* 历史意义 & 推荐理由 (从 JSON 读取) */}
                  <div className="grid md:grid-cols-2 gap-8 mt-6">
                    <div>
                      <h4 className="font-bold text-yellow-200 mb-2">🏆 Historical Impact</h4>
                      <p className="text-sm text-gray-400">
                        {game.historicalSignificance || 'One of the defining titles of the Game Boy Advance era.'}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-green-200 mb-2">🎮 Why Play Today?</h4>
                      <p className="text-sm text-gray-400">
                        {game.whyStillWorthPlaying || 'Still holds up remarkably well due to its timeless mechanics.'}
                      </p>
                    </div>
                  </div>

                  {/* 优缺点 (如果有数据的话) */}
                  {(game.pros || game.cons) && (
                    <div className="grid md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-700">
                       {game.pros && (
                         <div>
                           <h5 className="font-bold text-green-400 mb-2">✅ The Good</h5>
                           <ul className="space-y-1">
                             {game.pros.map((pro, i) => (
                               <li key={i} className="text-sm text-gray-300 flex items-start">
                                 <span className="mr-2">•</span>{pro}
                               </li>
                             ))}
                           </ul>
                         </div>
                       )}
                       {game.cons && (
                         <div>
                           <h5 className="font-bold text-red-400 mb-2">❌ The Bad</h5>
                           <ul className="space-y-1">
                             {game.cons.map((con, i) => (
                               <li key={i} className="text-sm text-gray-300 flex items-start">
                                 <span className="mr-2">•</span>{con}
                               </li>
                             ))}
                           </ul>
                         </div>
                       )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 👇👇👇 新增：热门对比 (Popular Comparisons) 👇👇👇 */}
        <div className="mt-20 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Popular Comparisons</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/versus/golden-sun-vs-fire-emblem" className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-full text-sm hover:border-purple-500 transition hover:bg-gray-700 text-gray-300 hover:text-white">
              Golden Sun vs Fire Emblem
            </Link>
            <Link href="/versus/pokemon-ruby-sapphire-emerald-vs-pokemon-firered-leafgreen" className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-full text-sm hover:border-purple-500 transition hover:bg-gray-700 text-gray-300 hover:text-white">
              Emerald vs FireRed
            </Link>
            <Link href="/versus/final-fantasy-tactics-advance-vs-tactics-ogre-the-knight-of-lodis" className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-full text-sm hover:border-purple-500 transition hover:bg-gray-700 text-gray-300 hover:text-white">
              FFTA vs Tactics Ogre
            </Link>
            <Link href="/versus/advance-wars-2-vs-fire-emblem" className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-full text-sm hover:border-purple-500 transition hover:bg-gray-700 text-gray-300 hover:text-white">
              Advance Wars 2 vs Fire Emblem
            </Link>
          </div>
        </div>
        {/* 👆👆👆 新增结束 👆👆👆 */}
    
        {/* Subgenres Categories */}
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

        {/* 👇👇👇 新增：FAQ (常见问题) 👇👇👇 */}
        <div className="mb-16 border-t border-gray-700 pt-16">
          <h2 className="text-2xl font-bold text-center mb-12">
            Common Questions About GBA RPGs
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="font-bold text-lg text-yellow-400 mb-2">What is the best selling GBA RPG?</h3>
              <p className="text-gray-300 text-sm">
                <em>Pokémon Ruby and Sapphire</em> are the best-selling RPGs on the platform, selling over 16 million copies worldwide. However, regarding critical acclaim among hardcore fans, titles like <em>Golden Sun</em> and <em>Fire Emblem</em> are often considered the peak of pixel art RPGs.
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="font-bold text-lg text-yellow-400 mb-2">Can I play these games on my phone?</h3>
              <p className="text-gray-300 text-sm">
                Yes, GBA emulation is very mature. Modern emulators like <strong>Pizza Boy GBA</strong> (Android) or <strong>Delta</strong> (iOS) run these games perfectly. However, many purists prefer the tactile feel of original hardware or a dedicated handheld device like the Analogue Pocket.
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="font-bold text-lg text-yellow-400 mb-2">Which GBA RPG is best for beginners?</h3>
              <p className="text-gray-300 text-sm">
                <em>Mario & Luigi: Superstar Saga</em> is fantastic for beginners due to its humor and action-command battle system. <em>Pokémon FireRed</em> is also designed specifically as an entry point into the RPG genre, featuring a &quot;Teachy TV&quot; item to explain mechanics.
              </p>
            </div>
          </div>
        </div>
        {/* 👆👆👆 新增结束 👆👆👆 */}
        
        {/* Internal Link to Pokemon Article */}
        <div className="bg-gray-800 rounded-xl p-8 mb-12 border border-purple-900/50 shadow-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Is Pokémon an RPG?
            </h2>
            <p className="text-gray-300 mb-6">
              It&apos;s the most famous GBA game series, but does it count as a &quot;real&quot; RPG? We dive deep into the mechanics.
            </p>
            <Link 
              href="/rpg-hub/is-pokemon-an-rpg"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105"
            >
              Read the Analysis
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

// 辅助函数：把 "golden-sun" 变成 "Golden Sun"
const formatSlug = (slug: string) => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

function SafeCategoryCard({ category }: { category: any }) {
  const categoryPathMap: Record<string, string> = {
    'Turn-Based RPGs': '/rpg-hub/turn-based',
    'Action RPGs': '/rpg-hub/action',
    'Tactical RPGs': '/rpg-hub/tactical',
    'Adventure RPGs': '/rpg-hub/adventure',
  };

  const path = categoryPathMap[category?.title] || '#';

  return (
    <div className="bg-gray-800 rounded-lg p-6 h-full border border-gray-700 hover:border-purple-500 transition-all flex flex-col">
      <Link href={path} className="block group mb-4">
         <div className="flex items-center mb-3">
            <span className="text-3xl mr-3">{category?.icon || '🎮'}</span>
            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
              {category?.title}
            </h3>
         </div>
         <p className="text-gray-400 text-sm line-clamp-2">{category?.description}</p>
      </Link>

      {/* 👇 修复这里：把 Popular Games 变成可点击的链接 */}
      {category?.games && category.games.length > 0 && (
        <div className="mt-auto pt-4 border-t border-gray-700">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
            Popular Titles
          </span>
          <ul className="space-y-1">
            {category.games.slice(0, 3).map((gameSlug: string, idx: number) => (
              <li key={idx} className="flex items-center text-sm">
                <span className="text-purple-500 mr-2">•</span>
                <Link 
                  href={`/best-games/${gameSlug}`} // 链接指向详情页
                  className="text-purple-300 hover:text-white transition-colors hover:underline decoration-purple-500/50"
                >
                  {formatSlug(gameSlug)} {/* 格式化显示名字 */}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <Link href={path} className="mt-4 text-sm font-bold text-purple-400 hover:text-purple-300 flex items-center">
        Explore Category <span className="ml-1">→</span>
      </Link>
    </div>
  );
}