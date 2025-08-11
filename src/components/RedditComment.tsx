// src/components/content/RedditComment.tsx
import React from 'react';

interface RedditCommentProps {
  user: string;
  game: string;
  comment: string;
}

export default function RedditComment({ user, game, comment }: RedditCommentProps) {
  return (
    <div className="bg-gray-800 p-3 rounded border-l-4 border-yellow-500 mt-3">
      <div className="flex items-center mb-2">
        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded mr-2">
          u/{user}
        </span>
        <span className="text-yellow-400 text-sm">{game}</span>
      </div>
      <p className="text-gray-300 italic">&quot;{comment}&quot;</p>
    </div>
  );
}

// 在页面中使用
<RedditComment 
  user="RetroGamer92" 
  game="Golden Sun" 
  comment="The puzzle design in Golden Sun is still unmatched today..."
/>
