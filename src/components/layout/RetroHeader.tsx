// src/components/layout/RetroHeader.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RetroHeader() {
  const pathname = usePathname();
  
  // 检测当前页面是否为隐私政策或服务条款
  const isActive = (path: string) => pathname === path;
  const isLegalPage = pathname.startsWith('/privacy-policy') || 
                      pathname.startsWith('/terms-of-service');
  
  return (
    <header className="bg-white py-4 border-b border-gray-200">
      {/* 仅有一个导航栏 */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mr-3">
              <span className="text-white text-xs font-bold">GBA</span>
            </div>
            <h3 className="font-bold text-xl">GAME BOY ADVANCE ARCHIVE</h3>
          </div>
          
          {/* 导航链接 */}
          <nav>
            <ul className="flex space-x-2">
              <li>
                <Link 
                  href="/" 
                  className={`px-3 py-2 rounded text-sm font-medium ${
                    isActive('/') 
                      ? 'bg-purple-600 text-white shadow' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/best-games" 
                  className={`px-3 py-2 rounded text-sm font-medium ${
                    isActive('/best-games') 
                      ? 'bg-purple-600 text-white shadow' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Best Games
                </Link>
              </li>
              <li>
                <Link 
                  href="/hidden-gems" 
                  className={`px-3 py-2 rounded text-sm font-medium ${
                    isActive('/hidden-gems') 
                      ? 'bg-purple-600 text-white shadow' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Hidden Gems
                </Link>
              </li>
              <li>
                <Link 
                  href="/online-play" 
                  className={`px-3 py-2 rounded text-sm font-medium ${
                    isActive('/online-play') 
                      ? 'bg-purple-600 text-white shadow' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Online Play
                </Link>
              </li>
              
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
