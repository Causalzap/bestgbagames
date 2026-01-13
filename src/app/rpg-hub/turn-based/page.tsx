// src/app/rpg-hub/turn-based/page.tsx
import type { Metadata } from 'next';
import TurnBasedRPGClient from '@/components/rpg/TurnBasedRPGClient'; // 确保路径对应你刚才创建文件的位置

// 定义基础域名
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bestgbagames.com';
const currentPath = '/rpg-hub/turn-based';

export const metadata: Metadata = {
  title: 'Best Turn-Based RPGs on GBA - Top Strategic JRPGs',
  description: 'Discover the best Turn-Based RPGs for Game Boy Advance. Experience deep combat, epic stories, and strategic battles in titles like Golden Sun and Final Fantasy.',
  alternates: {
    // ✅ 核心修复：添加 Canonical URL
    canonical: `${baseUrl}${currentPath}`,
  },
  openGraph: {
    title: 'Best Turn-Based RPGs on GBA',
    description: 'Discover the best Turn-Based RPGs for Game Boy Advance.',
    url: `${baseUrl}${currentPath}`,
  }
};

export default function TurnBasedRPGPage() {
  return <TurnBasedRPGClient />;
}