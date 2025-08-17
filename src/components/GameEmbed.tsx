import { useEffect, useState } from 'react';
import { getGameEmbedConfig } from '@/lib/gameService';

interface GameEmbedProps {
  slug: string;
}

export default function GameEmbed({ slug }: GameEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [embedConfig, setEmbedConfig] = useState<ReturnType<typeof getGameEmbedConfig> | null>(null);
  
  useEffect(() => {
    // 获取游戏配置
    const config = getGameEmbedConfig(slug);
    setEmbedConfig(config);
    
    // 模拟加载延迟
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [slug]);

  if (!embedConfig) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center my-6">
        <h3 className="text-xl font-bold text-red-700 mb-2">Game Not Available</h3>
        <p className="text-red-600">This game is not available for online play.</p>
        <p className="text-gray-500 mt-2">Please try another game.</p>
      </div>
    );
  }

  const aspectRatio = embedConfig.aspectRatio.split('/');
  const ratioPercent = (Number(aspectRatio[1]) / Number(aspectRatio[0])) * 100;
  
  return (
    <div className="my-8">
      <div 
        className="relative w-full bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-800"
        style={{ paddingBottom: `${ratioPercent}%` }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            <span className="text-gray-300">Loading game...</span>
          </div>
        )}
        
        <iframe
          src={embedConfig.url}
          title={`Play ${slug} online`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={`absolute top-0 left-0 w-full h-full ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
          sandbox="allow-same-origin allow-scripts"
          onLoad={() => setIsLoading(false)}
        />
      </div>
      
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex flex-wrap gap-2 mb-3">
          {embedConfig.supportedPlatforms.map(platform => (
            <span 
              key={platform} 
              className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded"
            >
              {platform === 'desktop' ? 'Desktop' : 
               platform === 'mobile' ? 'Mobile' : 
               'Tablet'} Ready
            </span>
          ))}
        </div>
        
        <p className="text-sm text-gray-600">
          Game provided by third-party service · <a href="/terms-of-service" className="text-purple-600 hover:underline">Terms of Service</a>
        </p>
      </div>
    </div>
  );
}