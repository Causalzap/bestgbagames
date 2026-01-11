// src/components/layout/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t-4 border-yellow-500">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 网站基本信息 */}
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xs">GBA</span>
              </div>
              <div>
                <h3 className="font-bold text-xl">GAME BOY ADVANCE ARCHIVE</h3>
                <p className="text-gray-400 text-sm">
                  The ultimate resource for Game Boy Advance enthusiasts
                </p>
              </div>
            </div>
            
            {/* 联系信息整合到法律区域 */}
            <div className="mt-6">
              <h4 className="text-gray-300 font-semibold mb-2">Contact & Support</h4>
              <a 
                href="mailto:contact@gbarchive.com" 
                className="text-yellow-400 hover:text-yellow-300 text-sm"
              >
                support@causalzap.com
              </a>
            </div>
          </div>
          
          {/* 精简法律声明 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-4 text-yellow-400 border-b border-yellow-500 pb-2">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-gray-400 hover:text-yellow-400 transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-gray-400 hover:text-yellow-400 transition">
                    Terms of Service
                  </Link>
                </li>
                
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-yellow-400 border-b border-yellow-500 pb-2">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/best-games" className="text-gray-400 hover:text-yellow-400 transition">
                    Best GBA Games
                  </Link>
                </li>
                {/* 👇👇👇 新增：蹭热度的链接 👇👇👇 */}
                <li>
                  <Link href="/articles/is-pokepath-gba" className="text-yellow-300 font-bold hover:text-white transition flex items-center">
                    <span className="mr-1">🔥</span> Pokepath GBA Guide
                  </Link>
                </li>
                {/* 👆👆👆 新增结束 👆👆👆 */}
                <li>
                  <Link href="/hidden-gems" className="text-gray-400 hover:text-yellow-400 transition">
                    Hidden Gems
                  </Link>
                </li>
                <li>
                  <Link href="/online-play" className="text-gray-400 hover:text-yellow-400 transition">
                    Online Play
                  </Link>
                </li>
              </ul>
            </div>

            <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-400 border-b border-yellow-500 pb-2">
                About
              </h3>
                <p className="text-gray-400 text-sm">
                    Our mission is to preserve and celebrate the best Game Boy Advance games. 
                    We provide game information for educational purposes only.
                </p>
            </div>

          </div>
        </div>
        
        {/* 版权信息 */}
        <div className="border-t border-gray-800 mt-8 pt-6 pb-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Game Boy Advance Archive. All rights reserved.<br />
            Game Boy Advance is a trademark of Nintendo. This site is not affiliated with Nintendo.
          </p>
        </div>
      </div>
    </footer>
  );
}
