// src/app/rpg-hub/tactical/page.tsx
import type { Metadata } from 'next';
import TacticalRPGClient from '@/components/rpg/TacticalRPGClient'; // 确保路径对应你刚才创建文件的位置

// 定义基础域名
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bestgbagames.com';
const currentPath = '/rpg-hub/tactical';

export const metadata: Metadata = {
  title: 'Best Tactical RPGs on GBA - Top Strategy Games',
  description: 'Master the battlefield with the best Tactical RPGs for Game Boy Advance. Featuring deep strategy, grid-based combat, and class systems in classics like Fire Emblem and Advance Wars.',
  alternates: {
    // ✅ 核心修复：添加 Canonical URL
    canonical: `${baseUrl}${currentPath}`,
  },
  openGraph: {
    title: 'Best Tactical RPGs on GBA',
    description: 'Master the battlefield with the best Tactical RPGs for Game Boy Advance.',
    url: `${baseUrl}${currentPath}`,
  }
};

export default function TacticalRPGPage() {
  return <TacticalRPGClient />;
}