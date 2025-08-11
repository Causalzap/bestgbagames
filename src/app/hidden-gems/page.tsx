import { getHiddenGemsData } from '@/lib/gameData';
import Link from 'next/link';
import Image from 'next/image';

// 创建Hidden Gem标准卡片组件
const HiddenGemCriterionCard = ({ icon, title, description }: { icon: string, title: string, description: string }) => (
  <div className="bg-gray-800 rounded-lg p-5 border border-purple-600/20 hover:border-purple-500 transition-all flex flex-col">
    <div className="mb-4">
      <div className="bg-purple-900 w-14 h-14 rounded-full flex items-center justify-center">
        {icon === 'visibility' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        ) : icon === 'critical' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        )}
      </div>
    </div>
    <h3 className="text-xl font-bold text-purple-300 mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default async function HiddenGemsPage() {
  const hiddenGemsData = getHiddenGemsData();
  
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      
      {/* 主内容区 */}
      <div className="container mx-auto px-4 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            TOP 10 GBA HIDDEN GEMS
          </h1>
          <p className="text-lg text-purple-300 max-w-2xl mx-auto">
            Forgotten treasures from the handheld gaming golden age
          </p>
        </div>
        
        {/* 隐藏宝石标准部分 */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">
              What Makes a &quot;Hidden Gem&quot;?
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              {hiddenGemsData.intro.definition.explanation}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HiddenGemCriterionCard 
              icon="visibility"
              title="Low Visibility"
              description="Global sales under 100,000 units (VGChartz)"
            />
            <HiddenGemCriterionCard 
              icon="critical"
              title="Critical Love"
              description="Metacritic 80+ yet little mainstream buzz"
            />
            <HiddenGemCriterionCard 
              icon="innovation"
              title="Unique Innovation"
              description="Gameplay mechanics ahead of their time"
            />
          </div>
        </div>
        
        {/* 游戏列表 */}
        <div className="space-y-16">
          {hiddenGemsData.games.map((game) => (
            <div key={game.rank} className="bg-gray-800 rounded-xl overflow-hidden shadow-xl">
              {/* 游戏排名横幅 */}
              <div className="bg-gradient-to-r from-purple-900 to-indigo-900 py-4 px-6 flex items-center">
                <div className="bg-yellow-500 text-black font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center">
                  {game.rank}
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold">{game.title}</h3>
                  <div className="text-sm text-gray-300">
                    {game.release.year} &bull; {game.release.developers.join(", ")}
                  </div>
                </div>
              </div>
              
              {/* 游戏内容 */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="bg-gray-700 rounded-lg aspect-[3/4] flex items-center justify-center overflow-hidden">
                    <div className="relative w-full h-full">
                      <Image 
                        src={`/images/covers/${game.slug}.jpg`}                        
                        alt={`${game.title} cover art`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="space-y-4">
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-purple-300 mb-2">Gameplay &amp; Innovation</h4>
                      <p className="mb-3">{game.uniqueMechanic}</p>
                      <p><strong>Genre:</strong> {game.genre}</p>
                    </div>
                    
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-purple-300 mb-2">Why It Was Overlooked</h4>
                      <p>{game.whyOverlooked}</p>
                    </div>
                    
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-purple-300 mb-2">Modern Value</h4>
                      <p>{game.modernValue}</p>
                    </div>
                    
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-purple-300 mb-2">Collecting Information</h4>
                      <p><strong>Price Range (2025):</strong> {game.collecting.priceRange}</p>
                      {game.collecting.alternative && (
                        <p><strong>Alternative:</strong> {game.collecting.alternative}</p>
                      )}
                    </div>
                    
                    <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-800">
                      <p className="italic text-purple-200">"{game.quote}"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 结论部分 */}
        <div className="mt-20 bg-gray-800 rounded-xl p-8 border border-purple-700/30">
          <h2 className="text-3xl font-bold text-center mb-10">
            {hiddenGemsData.conclusion.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {hiddenGemsData.conclusion.benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-700/40 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-purple-300 mb-3">{benefit.name}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg mb-8">
            <h3 className="text-2xl font-bold mb-4">Collecting & Preservation Tips</h3>
            <ul className="space-y-3">
              {hiddenGemsData.conclusion.tips.items.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">✓</div>
                  <p className="text-gray-300">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="text-center bg-gradient-to-r from-purple-900/40 to-purple-600/30 py-8 px-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Share Your Picks</h3>
            <p className="max-w-2xl mx-auto mb-6 text-gray-300">
              Which hidden gem GBA games did we miss? Drop your own underrated games in the comments so we can keep these cult classics alive!
            </p>
            <button className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Join the Discussion
            </button>
          </div>
        </div>
      </div>
    
    </div>
  );
}
