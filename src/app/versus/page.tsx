import Link from 'next/link';
import { getMergedGames } from '@/lib/gameUtils';

export const metadata = {
  title: 'GBA RPG Comparisons - The Ultimate Versus Index',
  description: 'Compare every top GBA RPG against each other. Find out which game has better graphics, longer story, and higher ratings.',
  alternates: {
    canonical: `https://www.bestgbagames.com/versus`,
  },
};

export default function VersusIndexPage() {
  const games = getMergedGames();
  const comparisons = [];

  for (let i = 0; i < games.length; i++) {
    for (let j = i + 1; j < games.length; j++) {
      comparisons.push({
        slug: `${games[i].slug}-vs-${games[j].slug}`,
        title: `${games[i].title} vs ${games[j].title}`,
        g1: games[i].title,
        g2: games[j].title
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* H1: 页面主标题 */}
        <div className="text-center mb-16">
           <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-600 mb-4">
             GBA RPG Versus Arena
           </h1>
           <p className="text-gray-400 max-w-2xl mx-auto">
             Welcome to the ultimate battleground. We have analyzed {games.length} legendary games across {comparisons.length} unique matchups to help you decide your next adventure.
           </p>
        </div>

        {/* H2: 列表部分的标题 (告诉爬虫这里是列表) */}
        <div className="mb-8 flex items-center gap-4">
          <h2 className="text-2xl font-bold text-white border-l-4 border-yellow-500 pl-4">
            All Head-to-Head Comparisons
          </h2>
          <span className="text-gray-500 text-sm">({comparisons.length} battles)</span>
        </div>

        {/* 列表区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {comparisons.map((comp) => (
            <Link 
              key={comp.slug} 
              href={`/versus/${comp.slug}`}
              className="block bg-gray-800 hover:bg-gray-700 border border-gray-700 p-4 rounded-lg transition group relative overflow-hidden"
            >
              <div className="flex justify-between items-center text-sm relative z-10">
                <span className="text-blue-300 font-bold truncate w-[45%] text-right">{comp.g1}</span>
                <span className="text-gray-500 px-2 font-mono text-xs">VS</span>
                <span className="text-red-300 font-bold truncate w-[45%]">{comp.g2}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* H2 & H3: 底部 SEO 文本块 (增加关键词覆盖和层级结构) */}
        <div className="bg-gray-800/30 p-8 rounded-2xl border border-gray-800">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            How We Compare GBA Classics
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">Graphics & Art Style</h3>
              <p className="text-gray-400 text-sm">
                We analyze the visual fidelity, from the isometric pixels of <em>Final Fantasy Tactics</em> to the vibrant world of <em>Golden Sun</em>.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-2">Gameplay Difficulty</h3>
              <p className="text-gray-400 text-sm">
                Looking for a casual story or a punishing challenge? We categorize games based on their difficulty curve for beginners vs veterans.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-2">Story Depth</h3>
              <p className="text-gray-400 text-sm">
                Comparison of narrative length and complexity. Find out which RPG offers the longest hours of gameplay for your investment.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}