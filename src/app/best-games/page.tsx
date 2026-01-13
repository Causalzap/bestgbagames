// src/app/best-games/page.tsx
import type { Metadata } from 'next';
import BestGamesClient from '@/components/BestGamesClient'; // 引入刚才创建的组件

// 定义基础域名
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bestgbagames.com';
const currentPath = '/best-games'; // 这个页面的路径

export const metadata: Metadata = {
  title: 'Best GBA Games Collection - Top Game Boy Advance ROMs',
  description: 'Explore the definitive collection of the best GBA games of all time. Filter by genre, search your favorites, and play online directly in your browser.',
  alternates: {
    // ✅ 核心修复：添加 Canonical URL
    canonical: `${baseUrl}${currentPath}`,
  },
  openGraph: {
    title: 'Best GBA Games Collection',
    description: 'Explore the definitive collection of the best GBA games of all time.',
    url: `${baseUrl}${currentPath}`,
  }
};

export default function BestGamesPage() {
  return <BestGamesClient />;
}