// src/app/online-player/page.tsx (根据你的实际路由路径修改文件名)
import { Metadata } from 'next';
import OnlinePlayClient from '@/components/OnlinePlayClient'; // 引入上面的客户端组件

// 定义基础域名 (建议放到环境变量中，这里写死示例)
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bestgbagames.com';
const currentPath = '/online-play'; // 请修改为你这个页面实际的路由路径

export const metadata: Metadata = {
  title: 'GBA Online Emulator - Play Game Boy Advance Games on PC & Mobile',
  description: 'Play GBA games directly in your browser with our optimized online emulator. Supports both PC keyboard controls and mobile touch controls. No download required.',
  alternates: {
    // ✅ 核心修复：设置 Canonical URL
    canonical: `${baseUrl}${currentPath}`,
  },
  openGraph: {
    title: 'GBA Online Emulator',
    description: 'Play GBA games directly in your browser. PC & Mobile supported.',
    url: `${baseUrl}${currentPath}`,
  }
};

export default function OnlinePlayPage() {
  return <OnlinePlayClient />;
}