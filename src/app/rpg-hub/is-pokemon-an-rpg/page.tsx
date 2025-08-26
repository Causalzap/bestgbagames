// src/app/rpg-hub/is-pokemon-an-rpg/page.tsx
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// 动态导入，防止因为大小写/缓存导致变量未定义
const PokemonRPGClient = dynamic(
  () => import('./PokemonRPGClient'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'Is Pokémon an RPG? | Pokémon JRPG Mechanics & RPG Analysis',
  description:
    'Is Pokémon an RPG? A deep-dive into Pokémon as a JRPG: turn-based combat, character progression, evolution, team-building, and monster-collecting mechanics. Includes GBA Pokémon RPG highlights.',
  keywords: [
    'Is Pokemon an RPG',
    'Pokemon JRPG',
    'Pokemon role-playing game',
    'monster collecting RPG',
    'Game Boy Advance Pokemon RPG',
    'turn-based RPG'
  ],
  robots: { index: true, follow: true,
    // 将 max snippet 放在 googleBot，并使用连字符键名
    googleBot: {
      'max-snippet': 180
    } 
    },
  alternates: {
    canonical:
      process.env.NEXT_PUBLIC_SITE_URL
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/rpg-hub/is-pokemon-an-rpg`
        : '/rpg-hub/is-pokemon-an-rpg'
  },
  openGraph: {
    type: 'article',
    title: 'Is Pokémon an RPG? | Pokémon JRPG Mechanics & RPG Analysis',
    description:
      'A clear explanation of why Pokémon is considered a JRPG, its unique mechanics, and how it shaped the monster-collecting subgenre.',
    url:
      process.env.NEXT_PUBLIC_SITE_URL
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/rpg-hub/is-pokemon-an-rpg`
        : undefined,
    images: [
      {
        url:
          process.env.NEXT_PUBLIC_SITE_URL
            ? `${process.env.NEXT_PUBLIC_SITE_URL}/og/is-pokemon-an-rpg.jpg`
            : '/og/is-pokemon-an-rpg.jpg',
        width: 1200,
        height: 630,
        alt: 'Is Pokémon an RPG? JRPG Mechanics & Analysis'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Pokémon an RPG? | Pokémon JRPG Mechanics & RPG Analysis',
    description:
      'Why Pokémon is a JRPG: combat, progression, evolution, team-building, and monster-collecting.',
    images:
      process.env.NEXT_PUBLIC_SITE_URL
        ? [`${process.env.NEXT_PUBLIC_SITE_URL}/og/is-pokemon-an-rpg.jpg`]
        : ['/og/is-pokemon-an-rpg.jpg']
  }
};

export default function Page() {
  // 仅渲染 Client 组件（交互、JSON-LD 都在里面）
  return <PokemonRPGClient />;
}
