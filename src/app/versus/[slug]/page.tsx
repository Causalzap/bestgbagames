// src/app/versus/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import gamesDatabase from "@/data/articles/games_database.json";
import { generateVerdict } from "@/lib/verdictEngine";
import { GameData } from "../versus-index-client";
import { getAllVersusSlugs } from "@/lib/versusPairs";


// 强制静态生成 (Static Site Generation) - 对 SEO 最友好
export async function generateStaticParams() {
  return getAllVersusSlugs(600).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const games = gamesDatabase as unknown as GameData[];
  const [id1, id2] = params.slug.split("-vs-");
  const g1 = games.find(g => g.id === id1);
  const g2 = games.find(g => g.id === id2);
  if (!g1 || !g2) return {};

  const v = generateVerdict(g1, g2);
  const save1 = g1.tech_specs.save_type || "Unknown";
  const save2 = g2.tech_specs.save_type || "Unknown";

  return {
    title: `${g1.title} vs ${g2.title} — Save Risk, Price & Playtime Verdict`,
    description: `Compare ${g1.title} and ${g2.title}: save type (${save1} vs ${save2}), market price, and playtime. Collector, Player, and Value verdicts included.`,
    alternates: { canonical: `https://www.bestgbagames.com/versus/${params.slug}` }
  };
}

export default function ComparisonDetail({ params }: { params: { slug: string } }) {
  const games = gamesDatabase as unknown as GameData[];
  
  // 1. 解析 Slug 获取两个游戏
  // 假设 slug 是 "pokemon-ruby-vs-pokemon-sapphire"
  const [id1, id2] = params.slug.split("-vs-");
  const g1 = games.find(g => g.id === id1);
  const g2 = games.find(g => g.id === id2);

  if (!g1 || !g2) return notFound();

  // 2. 调用决策引擎生成结论
  const verdict = generateVerdict(g1, g2);
  const winner = verdict.winnerId === g1.id ? g1 : (verdict.winnerId === g2.id ? g2 : null);

  const siteUrl = "https://www.bestgbagames.com";
  const pageUrl = `${siteUrl}/versus/${params.slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Versus", "item": `${siteUrl}/versus` },
      { "@type": "ListItem", "position": 2, "name": `${g1.title} vs ${g2.title}`, "item": pageUrl }
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Which one is safer to own long-term: ${g1.title} or ${g2.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": verdict.verdicts?.collector?.shortSummary || verdict.shortSummary
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to replace a battery to keep saves?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            (g1.tech_specs.save_type === "SRAM" || g2.tech_specs.save_type === "SRAM")
              ? "At least one of these games uses battery-backed SRAM. Over time the battery may die and saves can be lost unless replaced."
              : "Both games use non-volatile save memory (Flash), so you generally don’t need battery replacement to keep saves."
        }
      },
      {
        "@type": "Question",
        "name": `Which one is the better value right now?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": verdict.verdicts?.value?.shortSummary || verdict.marketAdvice
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-slate-200 font-sans pb-20">
      <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      {/* 顶部导航 */}
      <nav className="p-4 border-b border-slate-800 text-sm text-slate-500">
        <Link href="/versus" className="hover:text-purple-400">← Back to Arena</Link>
      </nav>

      <main className="max-w-4xl mx-auto px-4 pt-10">
        
        {/* H1: 针对 "Decision Intent" 优化 */}
        <h1 className="text-3xl md:text-5xl font-black text-center mb-4 text-white">
          {g1.title} vs {g2.title}
        </h1>
        {/* TL;DR Answer Box (AEO/GEO) */}
        <div className="mt-4 max-w-3xl mx-auto bg-slate-900/40 border border-slate-800 rounded-xl p-4 text-sm text-slate-300">
          <strong>TL;DR:</strong>{" "}
          {verdict.verdicts?.collector?.winnerId !== "tie"
            ? `For collectors, ${verdict.verdicts.collector.winnerId === g1.id ? g1.title : g2.title} is safer to own long-term. `
            : "For collectors, it’s a tie. "}
          {verdict.verdicts?.player?.winnerId !== "tie"
            ? `For players, start with ${verdict.verdicts.player.winnerId === g1.id ? g1.title : g2.title}. `
            : "For players, there’s no clear winner. "}
          {verdict.verdicts?.value?.winnerId !== "tie"
            ? `For value, ${verdict.verdicts.value.winnerId === g1.id ? g1.title : g2.title} is the smarter buy right now.`
            : "For value, prices are too close to call."}
        </div>

        <p className="text-center text-slate-400 mb-12 text-lg">
          Comparison guide: Specs, Save Battery Risk, and Market Value.
        </p>

        {/* --- 核心模块 1: The Verdict (决策结论) --- */}
        {/* 这是用来抢 Featured Snippet 的位置 */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 mb-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500"></div>
          
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">
                Our Verdict
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                {verdict.title}: {winner ? winner.title : "It's a Tie"}
              </h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                {verdict.shortSummary}
              </p>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {verdict.badges.map((b, i) => (
                  <span key={i} className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-1 ${b.color}`}>
                    {b.icon} {b.text}
                  </span>
                ))}
              </div>

              {/* --- Multi-Intent Verdicts (Collector / Player / Value) --- */}
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                {(["collector", "player", "value"] as const).map((k) => {
                  const v = verdict.verdicts?.[k];
                  if (!v) return null;
                
                  const label =
                    k === "collector" ? "Collector Verdict" :
                    k === "player" ? "Player Verdict" :
                    "Value Verdict";
                
                  return (
                    <div
                      key={k}
                      className="bg-slate-950/40 border border-slate-800 rounded-xl p-4"
                    >
                      <div className="text-xs uppercase text-slate-500 font-bold mb-2">
                        {label}
                      </div>
                      <div className="text-white font-bold">
                        {v.title}

                        {v.winnerId !== "tie" ? (
                          <span className="text-slate-400 font-normal"> — {v.winnerId === g1.id ? g1.title : g2.title}</span>
                        ) : (
                          <span className="text-slate-400 font-normal"> — Both are viable</span>
                        )}


                      </div>
                      <p className="text-slate-400 text-sm mt-2">
                        {v.shortSummary}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
            
            {/* Winner Image or Action */}
            {winner && (
              <div className="shrink-0">
                <div className="w-32 h-32 bg-slate-950 rounded-lg flex items-center justify-center border border-slate-700">
                   {/* 这里放 Winner 的图片 */}
                   <span className="text-xs text-slate-600">Winner Cover</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- 核心模块 2: Risk Assessment (风险提示 - 你的护城河) --- */}
        {verdict.riskAlert && (
          <div className="bg-red-900/10 border border-red-900/30 rounded-xl p-6 mb-10 flex items-start gap-4">
            <div className="text-2xl">⚠️</div>
            <div>
              <h3 className="text-lg font-bold text-red-400 mb-1">Collector Risk Warning</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {verdict.riskAlert.message}
                <br/>
                <span className="opacity-70 mt-2 block">
                  Buying a game with SRAM means you will eventually need to solder a new battery to keep your save files. Flash memory lasts almost indefinitely.
                </span>
              </p>

              <p className="text-sm text-slate-500 mb-4">
                These two games are often compared due to similar popularity and price,
                but differences in save hardware significantly affect long-term ownership.
              </p>
            </div>
          </div>
        )}

        {/* --- 核心模块 3: Market Insight (投资建议) --- */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
             <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Market Value Analysis</h3>
             <p className="text-slate-300 text-sm mb-4 min-h-[40px]">
               {verdict.marketAdvice}
             </p>
             <div className="flex items-end justify-between border-t border-slate-800 pt-4">
               <div>
                 <div className="text-xs text-slate-500">{g1.title}</div>
                 <div className="text-xl font-mono text-emerald-400">${g1.market.price_loose}</div>
               </div>
               <div className="text-right">
                 <div className="text-xs text-slate-500">{g2.title}</div>
                 <div className="text-xl font-mono text-emerald-400">${g2.market.price_loose}</div>
               </div>
             </div>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
             <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Playtime Commitment</h3>
             <div className="space-y-4">
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span>{g1.title}</span>
                      <span className="text-slate-400">{g1.playtime.main} Hours</span>
                   </div>
                   <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500" style={{width: `${Math.min(g1.playtime.main, 100)}%`}}></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span>{g2.title}</span>
                      <span className="text-slate-400">{g2.playtime.main} Hours</span>
                   </div>
                   <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-500" style={{width: `${Math.min(g2.playtime.main, 100)}%`}}></div>
                   </div>
                </div>
             </div>
             <p className="text-xs text-slate-500 mt-4 italic">
               *Based on main story completion. Completionist runs may take 2-3x longer.
             </p>
          </div>
        </div>

        {/* --- 核心模块 4: The Data Specs (SEO 词汇池) --- */}
        <div className="border-t border-slate-800 pt-10">
          <h3 className="text-2xl font-bold text-white mb-6">Technical Specifications</h3>
          <div className="overflow-hidden rounded-lg border border-slate-800">
            <table className="w-full text-sm text-left text-slate-400">
              <thead className="text-xs uppercase bg-slate-900 text-slate-500">
                <tr>
                  <th className="px-6 py-3">Feature</th>
                  <th className="px-6 py-3 text-cyan-400">{g1.title}</th>
                  <th className="px-6 py-3 text-pink-400">{g2.title}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/30">
                <tr>
                  <td className="px-6 py-4 font-bold">Save Type</td>
                  <td className="px-6 py-4">
                     <span className={g1.tech_specs.save_type === "Flash" ? "text-emerald-400 font-bold" : "text-red-400"}>
                       {g1.tech_specs.save_type}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className={g2.tech_specs.save_type === "Flash" ? "text-emerald-400 font-bold" : "text-red-400"}>
                       {g2.tech_specs.save_type}
                     </span>
                  </td>
                </tr>
                <tr>
                   <td className="px-6 py-4 font-bold">Cartridge Size</td>
                   <td className="px-6 py-4">{g1.tech_specs.cart_size} Mbit</td>
                   <td className="px-6 py-4">{g2.tech_specs.cart_size} Mbit</td>
                </tr>
                <tr>
                   <td className="px-6 py-4 font-bold">Developer</td>
                   <td className="px-6 py-4">{g1.basic_info.developer}</td>
                   <td className="px-6 py-4">{g2.basic_info.developer}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick FAQ (AEO/GEO) */}
          <div className="mt-12 border-t border-slate-800 pt-10">
            <h2 className="text-2xl font-bold text-white mb-6">Quick FAQ</h2>

            <div className="space-y-4">
              <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5">
                <h3 className="text-slate-200 font-semibold">
                  Which one is safer to own long-term?
                </h3>
                <p className="text-slate-400 mt-2">
                  {verdict.verdicts?.collector?.shortSummary || verdict.shortSummary}
                </p>
              </div>

              <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5">
                <h3 className="text-slate-200 font-semibold">
                  Do I need to replace a battery to keep saves?
                </h3>
                <p className="text-slate-400 mt-2">
                  {g1.tech_specs.save_type === "SRAM" || g2.tech_specs.save_type === "SRAM"
                    ? "At least one of these games uses battery-backed SRAM. Over time the battery may die and saves can be lost unless replaced."
                    : "Both games use non-volatile save memory (Flash), so you generally don’t need battery replacement to keep saves."}
                </p>
              </div>
                  
              <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5">
                <h3 className="text-slate-200 font-semibold">
                  Which one is the better value right now?
                </h3>
                <p className="text-slate-400 mt-2">
                  {verdict.verdicts?.value?.shortSummary || verdict.marketAdvice}
                </p>
              </div>
            </div>
          </div>


      </main>
    </div>
  );
}