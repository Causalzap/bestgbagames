// 修改根布局文件 - 统一设置顶部空间
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import RetroHeader from '@/components/layout/RetroHeader';
import Footer from '@/components/layout/Footer';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BestGbaGames.com | Ultimate Game Boy Advance Archive',
  description: 'BestGbaGames.com offers the top GBA games, hidden gems, and online play guides – your #1 retro gaming destination.',
  metadataBase: new URL("https://www.bestgbagames.com"),
  alternates: {
    canonical: "https://www.bestgbagames.com/"
  },
  keywords: ['best GBA games', 'Game Boy Advance archive', 'GBA online play', 'retro gaming'],
  openGraph: {
    title: 'BestGbaGames.com | Ultimate Game Boy Advance Archive',
    description: 'Discover the best GBA classics, hidden gems, and online play tips at BestGbaGames.com.',
    url: 'https://www.bestgbagames.com',
    siteName: 'BestGbaGames.com',
    images: [{
      url: 'https://www.bestgbagames.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Best GBA Games',
    }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BestGbaGames.com',
    description: 'Explore GBA classics and hidden treasures at BestGbaGames.com.',
    images: ['https://www.bestgbagames.com/og-image.jpg'],
  }
};


// src/app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col bg-white`}>
        {/* 单次调用导航栏组件 */}
        <RetroHeader />
        
        {/* 主内容区域 */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* 页脚 */}
        <Footer />
      </body>
    </html>
  );
}
