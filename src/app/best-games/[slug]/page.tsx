// src/app/games/[slug]/page.tsx
import { getGameBySlug } from '@/lib/gameData';
import Image from 'next/image';
import Link from 'next/link';
import YouTubeEmbed from '@/components/YouTubeEmbed';

// 定义元数据（包含Canonical URL）
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // 根据环境设置基础URL
  const baseUrl = 'https://www.bestgbagames.com';
  
  // 获取游戏信息
  const game = getGameBySlug(params.slug);
  
  return {
    title: game ? `${game.title} | Best GBA Games` : 'Game Not Found',
    description: game?.coreHighlight || 'Discover the best Game Boy Advance games',
    alternates: {
      canonical: `${baseUrl}/best-games/${params.slug}`, // Canonical URL设置
    }
  };
}

export default function GameDetailPage({ params }: { params: { slug: string } }) {
  const game = getGameBySlug(params.slug);
  
  if (!game) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Game Not Found</h1>
        <Link 
          href="/best-games" 
          className="bg-purple-600 text-white px-6 py-3 rounded-lg"
        >
          Back to Best Games
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link 
            href="/best-games" 
            className="text-purple-600 hover:text-purple-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Best Games
          </Link>
        </div>
        
        {/* 游戏详情内容 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <div className="relative aspect-[3/4]">
                <Image 
                  src={`/images/covers/${game.slug}.jpg`}
                  alt={game.coverAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{game.title}</h1>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full mr-4">
                  <span>#{game.rank}</span>
                </div>
                <span className="text-gray-500">{game.release.year}</span>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Core Highlight</h2>
                <p className="text-gray-600">{game.coreHighlight}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Historical Significance</h2>
                <p className="text-gray-600">{game.historicalSignificance}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Why Still Worth Playing</h2>
                <p className="text-gray-600">{game.whyStillWorthPlaying}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Developer</h3>
                  <p>{game.release.developers.join(', ')}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Genre</h3>
                  <p>{game.genre}</p>
                </div>
              </div>
              
              <Link
  href={{
    pathname: "/online-play",
    query: { game: game.slug }
  }}
  className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-center"
>
  Play Online Now
</Link>
            </div>
          </div>
        </div>

    {/* 添加YouTube视频部分 */}
{game.youtubeVideoId && (
  <YouTubeEmbed
    videoId={game.youtubeVideoId}
    title={`${game.title} Gameplay`}
  />
)}


      </div>
    </div>
   
   
    
  );
}   
