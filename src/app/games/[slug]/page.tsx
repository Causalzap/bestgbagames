// src/app/game/[slug]/page.tsx (这是服务端组件)
import { getGameBySlug } from '@/lib/gameData';
import { Metadata } from 'next';
import GameDetailClient from '@/components/games/GameDetailClient'; // 引入刚才创建的客户端组件
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

// 1. 生成 Metadata (SEO & Canonical)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = getGameBySlug(params.slug);

  if (!game) {
    return {
      title: 'Game Not Found',
    };
  }

  // 定义基础域名 (建议放到环境变量中)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bestgbagames.com';

  return {
    title: `${game.title} - Play Online`,
    description: `Play ${game.title} online. ${game.coreHighlight}`,
    alternates: {
      // 🌟 这里设置 canonical URL
      canonical: `${baseUrl}/games/${params.slug}`,
    },
    // 可选：OpenGraph 设置
    openGraph: {
      title: game.title,
      description: game.coreHighlight,
      images: [`/images/covers/${game.slug}.jpg`],
      url: `${baseUrl}/game/${params.slug}`,
    }
  };
}

// 2. 页面主入口 (Server Component)
export default function GameDetailPage({ params }: Props) {
  // 在服务端获取数据
  const game = getGameBySlug(params.slug);

  if (!game) {
    // 如果没有找到游戏，可以直接渲染客户端组件处理，或者使用 Next.js 的 notFound()
    // 这里我们传 null 给客户端组件，让它保持你原来的 "Game Not Found" 样式
    return <GameDetailClient game={null} />;
  }

  // 将数据传递给客户端组件进行渲染
  return <GameDetailClient game={game} />;
}