// src/app/rpg-hub/action/page.tsx
import type { Metadata } from 'next';
import ActionRPGClient from '@/components/rpg/ActionRPGClient'; // 确保路径对应你刚才创建文件的位置

// 定义基础域名
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bestgbagames.com';
const currentPath = '/rpg-hub/action';

export const metadata: Metadata = {
  title: 'Best Action RPGs on GBA - Top Rated Real-Time Combat Games',
  description: 'Explore the best Action RPGs for Game Boy Advance. Featuring real-time combat, dungeon crawling, and classic adventures like Zelda and Castlevania.',
  alternates: {
    // ✅ 核心修复：添加 Canonical URL
    canonical: `${baseUrl}${currentPath}`,
  },
  openGraph: {
    title: 'Best Action RPGs on GBA',
    description: 'Explore the best Action RPGs for Game Boy Advance.',
    url: `${baseUrl}${currentPath}`,
  }
};

export default function ActionRPGPage() {
  return <ActionRPGClient />;
}