// src/app/rpg-hub/adventure/page.tsx
import type { Metadata } from 'next';
import AdventureRPGClient from '@/components/rpg/AdventureRPGClient'; // 确保路径正确指向刚才创建的文件

// 定义基础域名
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bestgbagames.com';
const currentPath = '/rpg-hub/adventure';

export const metadata: Metadata = {
  title: 'Best Adventure RPGs on GBA - Top Rated Story-Driven Games',
  description: 'Discover the best Adventure RPGs for Game Boy Advance. Featuring immersive storytelling, puzzle-solving, and exploration in classic titles like Golden Sun and Mario & Luigi.',
  alternates: {
    // ✅ 核心修复：添加 Canonical URL
    canonical: `${baseUrl}${currentPath}`,
  },
  openGraph: {
    title: 'Best Adventure RPGs on GBA',
    description: 'Discover the best Adventure RPGs for Game Boy Advance.',
    url: `${baseUrl}${currentPath}`,
  }
};

export default function AdventureRPGPage() {
  return <AdventureRPGClient />;
}