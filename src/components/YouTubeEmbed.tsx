// src/components/YouTubeEmbed.tsx
"use client"; // 添加这一行 
import React, { useState } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, title }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // 设计精确尺寸
  const videoContainerStyle = {
    position: 'relative',
    width: '100%',
    paddingBottom: '57%', // 16:9的现代比例 ≈ 1.75:1
  } as React.CSSProperties;
  
  const videoStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  } as React.CSSProperties;

  return (
    <div className="mt-8 mb-6">
      {title && <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>}
      
      <div style={videoContainerStyle} className="rounded-lg overflow-hidden bg-gray-900">
        {!isLoaded ? (
          <div 
            className="flex items-center justify-center w-full h-full cursor-pointer"
            style={videoStyle}
            onClick={() => setIsLoaded(true)}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto">
                <svg 
                  className="w-10 h-10 text-white ml-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
              </div>
              <p className="mt-3 text-gray-300">点击加载游戏视频</p>
            </div>
          </div>
        ) : (
          <iframe
            style={videoStyle}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title || "Gameplay video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};

export default YouTubeEmbed;
