'use client';

import { useState, useEffect } from 'react';

export default function OnlinePlayPage() {
  const [selectedDevice, setSelectedDevice] = useState<'pc' | 'mobile'>('pc');
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  
  // 检测用户设备
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobileDevice(isMobile);
    setSelectedDevice(isMobile ? 'mobile' : 'pc');
  }, []);

  // 打开模拟器窗口
  const openEmulator = (device: 'pc' | 'mobile') => {
    const url = device === 'pc' 
      ? "https://missbluee.xinmafm.com/pc.html" 
      : "https://missbluee.xinmafm.com/mobile.html";
    
    const width = device === 'pc' ? 800 : 375;
    const height = device === 'pc' ? 600 : 667;
    
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    
    const features = `width=${width},height=${height},left=${left},top=${top},toolbar=no,location=no,status=no`;
    
    window.open(url, '_blank', features);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-yellow-300 tracking-wider">
          GAME BOY ADVANCE ONLINE PLAYER
        </h1>
        
        {/* 设备预览区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* PC版预览 */}
          <div className={`bg-black/30 p-6 rounded-xl border-2 ${
            selectedDevice === 'pc' ? 'border-blue-500 scale-105 z-10' : 'border-gray-700'
          } transition-all duration-300`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-blue-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                PC Emulator
              </h2>
              <span className="bg-blue-600 text-xs px-2 py-1 rounded">Recommended for desktop</span>
            </div>
            
            {/* PC模拟器预览 */}
            <div className="bg-black p-4 rounded-lg mb-6">
              <div className="relative aspect-[4/3] bg-gray-900 rounded-lg">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-full h-4/5 bg-gray-800 rounded flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <div className="text-xl mb-2">0 frames per second</div>
                      <div className="text-sm">GBA Emulator</div>
                    </div>
                  </div>
                </div>
                
                {/* 按键预览 */}
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="grid grid-cols-6 gap-1">
                    {['↑', '←', '→', '↓', 'Start', 'Select'].map((key, idx) => (
                      <div key={idx} className="bg-gray-800 text-white text-xs text-center p-1 rounded">
                        {key}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 按键说明 */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[
                  { key: 'Z', action: 'A Button' },
                  { key: 'X', action: 'B Button' },
                  { key: 'A', action: 'L Trigger' },
                  { key: 'S', action: 'R Trigger' },
                  { key: 'Enter', action: 'Start' },
                  { key: '\\', action: 'Select' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-800/70 p-2 rounded text-center">
                    <div className="font-bold text-yellow-300">{item.key}</div>
                    <div className="text-xs text-gray-300">{item.action}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => openEmulator('pc')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-bold transition-colors flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Open PC Emulator
            </button>
          </div>
          
          {/* 手机版预览 */}
          <div className={`bg-black/30 p-6 rounded-xl border-2 ${
            selectedDevice === 'mobile' ? 'border-green-500 scale-105 z-10' : 'border-gray-700'
          } transition-all duration-300`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-green-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Mobile Emulator
              </h2>
              <span className="bg-green-600 text-xs px-2 py-1 rounded">For phones and tablets</span>
            </div>
            
            {/* 移动模拟器预览 */}
            <div className="bg-black p-4 rounded-lg mb-6">
              <div className="relative aspect-[9/16] mx-auto max-w-[280px]">
                <div className="absolute inset-0 bg-gray-900 rounded-3xl overflow-hidden border-8 border-black">
                  <div className="h-full flex flex-col">
                    <div className="h-3/5 bg-gray-800 flex items-center justify-center">
                      <div className="text-gray-400 text-center px-4">
                        <div className="text-sm">0 frames per second</div>
                        <div className="text-xs mt-1">Touch to start</div>
                      </div>
                    </div>
                    <div className="h-2/5 bg-gray-700 p-4">
                      <div className="flex justify-between">
                        <div className="bg-gray-600 w-16 h-16 rounded-full"></div>
                        <div className="bg-gray-600 w-16 h-16 rounded-full"></div>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-xs">
                          Select Game
                        </button>
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-xs">
                          Upload Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 按键说明 */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {[
                  { action: 'Direction Pad', description: 'Swipe in lower left area' },
                  { action: 'A/B Buttons', description: 'Press circles in lower right' },
                  { action: 'Game Select', description: 'Tap "Select Game" button' },
                  { action: 'Save/Load', description: 'Use "Upload Save" feature' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-800/70 p-2 rounded">
                    <div className="font-bold text-yellow-300 text-sm">{item.action}</div>
                    <div className="text-xs text-gray-300">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => openEmulator('mobile')}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-bold transition-colors flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Open Mobile Emulator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
