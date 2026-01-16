"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
// 关键修复：导入决策引擎 (请确保 src/lib/verdictEngine.ts 文件已创建)
import { generateVerdict } from "@/lib/verdictEngine";

// ==========================================
// 1. 类型定义
// ==========================================
export type GameData = {
  id: string;
  title: string;
  image_url: string;
  basic_info: {
    year: number;
    developer: string;
    publisher?: string;
    genre: string;
    sub_genre?: string;
    perspective?: string;
  };
  scores: {
    metacritic: number | null;
    user: number | null;
  };
  playtime: {
    main: number;
    main_extra: number;
    completionist: number;
    speedrun: string;
  };
  tech_specs: {
    save_type: string;
    save_note?: string;
    cart_size: number;
    multiplayer?: string;
    rumble?: boolean;
    solar?: boolean;
    visuals?: string;
  };
  market: {
    price_loose: number;
    price_cib: number;
    rarity: number;
    bootleg_risk: string;
  };
};

export type Pair = {
  slug: string;
  g1: GameData;
  g2: GameData;
  weight: number;
};

export type VersusIndexClientProps = {
  allGamesCount: number;
  avgRom: string;
  comparisons: Pair[];
  clusters: {
    title: string;
    slug: string;
    description: string;
    color: "blue" | "red" | "purple";
    list: Pair[];
  }[];
};

// ==========================================
// 2. UI 组件：数据可视化条 (StatBar)
// ==========================================
function StatBar({ 
  label, 
  v1, 
  v2, 
  max, 
  unit = "", 
  highlightWinner = false 
}: { 
  label: string, 
  v1: number, 
  v2: number, 
  max: number, 
  unit?: string, 
  highlightWinner?: boolean 
}) {
  const p1 = Math.min((v1 / max) * 100, 100);
  const p2 = Math.min((v2 / max) * 100, 100);
  const win1 = v1 > v2;
  const win2 = v2 > v1;

  return (
    <div className="mb-3">
      <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-2 h-2">
        {/* Left Bar (Game 1) */}
        <div className="flex-1 flex justify-end bg-slate-800/50 rounded-l-sm overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${win1 && highlightWinner ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]' : 'bg-slate-600'}`} 
            style={{ width: `${p1}%` }}
          />
        </div>
        
        <div className="w-[1px] h-4 bg-slate-700"></div>

        {/* Right Bar (Game 2) */}
        <div className="flex-1 flex justify-start bg-slate-800/50 rounded-r-sm overflow-hidden">
          <div 
             className={`h-full transition-all duration-500 ${win2 && highlightWinner ? 'bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.4)]' : 'bg-slate-600'}`} 
             style={{ width: `${p2}%` }}
          />
        </div>
      </div>
      
      <div className="flex justify-between text-[10px] font-mono mt-1 text-slate-400">
        <span className={win1 && highlightWinner ? "text-cyan-300 font-bold" : ""}>{v1 > 0 ? v1 + unit : 'N/A'}</span>
        <span className={win2 && highlightWinner ? "text-pink-400 font-bold" : ""}>{v2 > 0 ? v2 + unit : 'N/A'}</span>
      </div>
    </div>
  );
}

// ==========================================
// 3. UI 组件：技术规格徽章 (SaveTechBadge)
// ==========================================
function SaveTechBadge({ type }: { type: string }) {
  const isFlash = type === "Flash";
  const isSRAM = type === "SRAM";
  
  return (
    <div className={`
      flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold border uppercase tracking-tighter
      ${isFlash ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : ''}
      ${isSRAM ? 'bg-red-500/10 border-red-500/30 text-red-400' : ''}
      ${!isFlash && !isSRAM ? 'bg-slate-800 border-slate-700 text-slate-500' : ''}
    `}>
      <span>{isFlash ? '⚡' : isSRAM ? '🔋' : '💾'}</span>
      {type || "Unknown"}
    </div>
  );
}

// ==========================================
// 4. 核心组件：Battle Card (集成 Verdict Engine)
// ==========================================
function BattleCard({ pair }: { pair: Pair }) {
  const { g1, g2 } = pair;
  
  // 核心改动：使用决策引擎生成结论
  const verdict = generateVerdict(g1, g2);
  const displayBadges = verdict.badges.slice(0, 2); // 只显示前两个标签

  return (
    <Link 
      href={`/versus/${pair.slug}`}
      className="group relative flex flex-col bg-[#0e1117] border border-slate-800/60 rounded-xl overflow-hidden hover:border-slate-500 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-300 hover:-translate-y-1"
    >
      {/* 顶部：Header */}
      <div className="p-4 pb-3 border-b border-slate-800/60 bg-gradient-to-b from-slate-800/30 to-transparent flex justify-between items-start">
        {/* G1 Header */}
        <div className="w-[45%] overflow-hidden">
          <h3 className="text-xs font-bold text-slate-200 leading-tight group-hover:text-cyan-400 transition-colors truncate">
            {g1.title}
          </h3>
          <div className="mt-1.5 flex flex-wrap gap-1">
             <SaveTechBadge type={g1.tech_specs.save_type} />
          </div>
        </div>
        
        {/* VS Divider */}
        <div className="w-[10%] flex justify-center pt-1">
          <span className="text-[10px] font-black text-slate-700 italic">VS</span>
        </div>

        {/* G2 Header */}
        <div className="w-[45%] text-right overflow-hidden flex flex-col items-end">
          <h3 className="text-xs font-bold text-slate-200 leading-tight group-hover:text-pink-400 transition-colors truncate w-full">
            {g2.title}
          </h3>
          <div className="mt-1.5 flex flex-wrap gap-1 justify-end">
             <SaveTechBadge type={g2.tech_specs.save_type} />
          </div>
        </div>
      </div>

      {/* 中部：数据可视化 (Stat Bars) */}
      <div className="p-4 space-y-3 bg-[#0B0F19]">
        <StatBar 
          label="User Rating" 
          v1={g1.scores.user || 0} 
          v2={g2.scores.user || 0} 
          max={10} 
          highlightWinner={true}
        />
        
        <StatBar 
          label="Main Story" 
          v1={g1.playtime.main || 0} 
          v2={g2.playtime.main || 0} 
          max={50} 
          unit="h" 
        />

        {/* 价格对比区 */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-800/50">
           <div className="text-left">
             <div className="text-[9px] text-slate-600 uppercase font-bold">Price (Loose)</div>
             <div className="text-xs font-mono text-emerald-500/90">${g1.market.price_loose}</div>
           </div>
           <div className="text-right">
             <div className="text-[9px] text-slate-600 uppercase font-bold">Price (Loose)</div>
             <div className="text-xs font-mono text-emerald-500/90">${g2.market.price_loose}</div>
           </div>
        </div>
      </div>

      {/* 底部：动态生成的独特标签 (Unique Selling Points) */}
      <div className="bg-slate-900/50 px-3 py-2 border-t border-slate-800 min-h-[36px] flex items-center">
        {displayBadges.length > 0 ? (
           <div className="flex gap-2 overflow-x-auto no-scrollbar">
             {displayBadges.map((b, i) => (
               <span key={i} className={`text-[9px] px-2 py-0.5 rounded border whitespace-nowrap font-bold flex items-center gap-1 ${b.color}`}>
                 <span>{b.icon}</span> {b.text}
               </span>
             ))}
           </div>
        ) : (
           <div className="text-[10px] text-slate-500 italic truncate w-full text-center">
             {verdict.shortSummary}
           </div>
        )}
      </div>
    </Link>
  );
}

// ==========================================
// 5. 主页面组件
// ==========================================
export default function VersusIndexClient({
  allGamesCount,
  comparisons,
  clusters,
}: VersusIndexClientProps) {
  
  const [searchTerm, setSearchTerm] = useState("");

  const displayedComparisons = useMemo(() => {
    if (!searchTerm) {
      return comparisons.slice(0, 24); 
    }
    const q = searchTerm.toLowerCase();
    return comparisons.filter(c => 
      c.g1.title.toLowerCase().includes(q) || 
      c.g2.title.toLowerCase().includes(q)
    ).slice(0, 32);
  }, [searchTerm, comparisons]);

  return (
    <div className="min-h-screen bg-[#05070A] text-slate-100 font-sans selection:bg-cyan-500/30">
      
      {/* Hero Section */}
      <div className="relative bg-[#05070A] pt-32 pb-16 px-4 border-b border-slate-900">
         <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
         <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Database: {allGamesCount} Titles
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight">
              GBA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">DATA ARENA</span>
            </h1>
            
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Compare cartridge specs, save battery risks, and market value. 
              <span className="block mt-2 text-slate-500 text-sm">Stop guessing. Start analyzing.</span>
            </p>

            {/* New user explanation layer */}
            <div className="mt-2 text-sm text-slate-500 max-w-xl mx-auto mb-10 text-left md:text-center">
              <div>• Built for collectors: save battery risks &amp; long-term ownership</div>
              <div>• Built for players: quick “which one should I play first” verdicts</div>
              <div>• Built for value: price differences &amp; smarter buys</div>
            </div>

            {/* Search Input */}
            <div className="relative max-w-lg mx-auto group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <input 
                type="text" 
                placeholder="Search matchups (e.g. Mario vs Sonic)..."
                className="relative w-full p-4 bg-[#0e1117] border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute right-4 top-4 text-slate-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Editor's Clusters (Quick Filters) */}
        {!searchTerm && (
           <div className="mb-16">
             <div className="flex items-center gap-4 mb-6">
                <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Featured Collections</h2>
                <div className="h-[1px] flex-1 bg-slate-900"></div>
             </div>
             
             <div className="grid md:grid-cols-3 gap-4">
              {clusters.map((c, i) => (
                <Link
                  key={i}
                  href={`/versus/collections/${c.slug}`}
                  className="group text-left p-5 bg-[#0e1117] border border-slate-800 hover:border-slate-600 transition rounded-xl relative overflow-hidden"
                >
                  <div
                    className={`absolute top-0 left-0 w-1 h-full ${
                      c.color === "purple"
                        ? "bg-purple-500"
                        : c.color === "red"
                        ? "bg-pink-500"
                        : "bg-cyan-500"
                    } opacity-50`}
                  />
                  <h3 className="font-bold text-slate-200 group-hover:text-white transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{c.list.length} Curated Battles</p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">{c.description}</p>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">
                    →
                  </div>
                </Link>
              ))}
            </div>

           </div>
        )}

        {/* THE GRID */}
        <div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            {searchTerm ? `Results for "${searchTerm}"` : "🔥 Trending Analysis"}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-6">
            {displayedComparisons.map((pair) => (
              <BattleCard key={pair.slug} pair={pair} />
            ))}
          </div>
          
          {displayedComparisons.length === 0 && (
            <div className="text-center py-20 border border-dashed border-slate-900 rounded-xl">
              <p className="text-slate-500">No matchups found.</p>
            </div>
          )}
        </div>

        {/* How it works */}
        <div className="mt-6 max-w-xl mx-auto text-sm text-slate-500 leading-relaxed border-t border-slate-800 pt-4">
          <strong className="text-slate-300">How this comparison works (10 seconds):</strong>
          <p className="mt-2">
            Each matchup is evaluated across three independent perspectives — 
            <span className="text-slate-300 font-semibold">collectors</span>, 
            <span className="text-slate-300 font-semibold">players</span>, and 
            <span className="text-slate-300 font-semibold">value seekers</span>.
            We weigh save hardware reliability, gameplay commitment, and current market pricing 
            to determine whether one game is clearly safer to own, better to play, or if no clear winner exists.
          </p>
        </div>

      </div>
    </div>
  );
}