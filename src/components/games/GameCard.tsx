// components/games/GameCard.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

interface GameCardProps {
  rank: number;
  title: string;
  cover: string;
  year: number;
  genre: string;
  rating: number;
  description: string;
}

export default function GameCard({
  rank,
  title,
  cover,
  year,
  genre,
  rating,
  description
}: GameCardProps) {
  const [imgSrc, setImgSrc] = useState(cover);
  
  const handleImageError = () => {
    // 关键修复：使用默认PNG图片
    setImgSrc('/images/covers/default.png');
  };

  return (
    <div className="bg-gray-800/80 border-2 border-yellow-500 rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-glow">
      <div className="relative">
        {/* 关键修复：添加onError处理 */}
        <Image
          src={imgSrc}
          alt={`${title} cover`}
          width={300}
          height={400}
          className="w-full h-64 object-cover"
          onError={handleImageError}
        />
        <div className="absolute top-2 left-2 bg-red-600 text-yellow-400 font-pixel px-3 py-1 rounded-full text-sm">
          #{rank}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-xl text-yellow-400 mb-1">{title}</h3>
        <div className="flex justify-between text-gray-400 text-sm mb-2">
          <span>{year}</span>
          <span>{genre}</span>
          <span className="text-yellow-500">★ {rating}</span>
        </div>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );
}
