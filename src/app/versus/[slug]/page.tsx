import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getMergedGames, type FullGame } from '@/lib/gameUtils';

// ==========================================
// 1. 核心逻辑与数据获取
// ==========================================

export async function generateStaticParams() {
  const games = getMergedGames();
  const params = [];
  for (let i = 0; i < games.length; i++) {
    for (let j = i + 1; j < games.length; j++) {
      params.push({
        slug: `${games[i].slug}-vs-${games[j].slug}`,
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { game1, game2 } = parseSlug(params.slug);
  if (!game1 || !game2) return {};

  return {
    title: `${game1.title} vs ${game2.title}: Which Should You Play First?`,
    description: `Compare ${game1.title} and ${game2.title} side by side. Difficulty, story length, ROM size, best for beginners or veterans, and which GBA RPG is right for you.`,
    alternates: {
      canonical: `https://www.bestgbagames.com/versus/${params.slug}`,
    },
  };
}

function parseSlug(slug: string) {
  const games = getMergedGames();
  for (const g1 of games) {
    if (slug.startsWith(g1.slug + '-vs-')) {
      const remaining = slug.replace(g1.slug + '-vs-', '');
      const g2 = games.find(g => g.slug === remaining);
      if (g2) return { game1: g1, game2: g2 };
    }
  }
  return { game1: null, game2: null };
}

function generateSchema(
    game1: FullGame,
    game2: FullGame,
    faqItems: { q: string; a: string }[]
  ) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "VideoGame",
          "@id": `https://www.bestgbagames.com/game/${game1.slug}`,
          "name": game1.title,
          "gamePlatform": "Game Boy Advance",
          "datePublished": game1.year,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": game1.metacritic,
            "ratingCount": 100,
            // 👇👇👇 新增这一行：告诉 Google 满分是 100
            "bestRating": "100",
            "worstRating": "0"
          }
        },
        {
          "@type": "VideoGame",
          "@id": `https://www.bestgbagames.com/game/${game2.slug}`,
          "name": game2.title,
          "gamePlatform": "Game Boy Advance",
          "datePublished": game2.year,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": game2.metacritic,
            "ratingCount": 100,
            // 👇👇👇 新增这一行：告诉 Google 满分是 100
            "bestRating": "100",
            "worstRating": "0"
          }
        },
        {
          "@type": "Article",
          "headline": `${game1.title} vs ${game2.title}: Comparison Guide`,
          "description": `A detailed comparison between ${game1.title} and ${game2.title} for Game Boy Advance.`,
          "author": {
            "@type": "Organization",
            "name": "GBA Archive"
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.a.replace(/\*\*/g, '')
            }
          }))
        }
      ]
    };
  }
  

// ==========================================
// 2. 页面主组件 (VersusPage)
// ==========================================

export default function VersusPage({ params }: { params: { slug: string } }) {
  const { game1, game2 } = parseSlug(params.slug);
  if (!game1 || !game2) return notFound();

  // 逻辑推导
  const winner = game1.metacritic > game2.metacritic ? game1 : game2;
  const isG1Hard = game1.gameplay?.difficulty?.toLowerCase().includes('hard');
  const isG2Hard = game2.gameplay?.difficulty?.toLowerCase().includes('hard');
  const olderGame = game1.year < game2.year ? game1 : game2;
  const newerGame = game1.year < game2.year ? game2 : game1;

  // FAQ 数据
  const faqList = [
    {
      q: `Which game is better: ${game1.title} or ${game2.title}?`,
      a: `Critics generally rate **${winner.title}** higher with a Metascore of **${winner.metacritic}**, compared to ${game1 === winner ? game2.metacritic : game1.metacritic} for ${game1 === winner ? game2.title : game1.title}.`
    },
    {
      q: `Which game should I play first?`,
      a: `**${olderGame.title}** was released in ${olderGame.year}, earlier than ${newerGame.title} (${newerGame.year}). It is generally recommended to play **${olderGame.title}** first to appreciate the graphical and mechanical evolution in the genre.`
    },
    {
        q: `Is ${game1.title} or ${game2.title} better for beginners?`,
        a: `${isG1Hard ? game2.title : game1.title} is generally more beginner-friendly due to its ${isG1Hard ? game2.gameplay?.difficulty : game1.gameplay?.difficulty} difficulty and smoother learning curve.`
    },
    {
      q: `Which game is harder?`,
      a: `${isG1Hard ? `**${game1.title}**` : (isG2Hard ? `**${game2.title}**` : "Both games have balanced difficulty")}, making it better suited for veteran players.`
    }
  ];

  // 相关推荐数据
  const games = getMergedGames();
  const relatedComparisons = games
    .filter(g => g.id !== game1.id && g.id !== game2.id)
    .slice(0, 6)
    .map(g => ({
      title: `${game1.title} vs ${g.title}`,
      slug: `${game1.slug}-vs-${g.slug}`
    }));

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema(game1, game2, faqList)) }}
      />

      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-purple-400">Home</Link> <span className="mx-2">/</span>
          <Link href="/versus" className="hover:text-purple-400">Versus Arena</Link> <span className="mx-2">/</span>
          <span className="text-white">{game1.title} vs {game2.title}</span>
        </nav>

        {/* H1 Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold mt-2 text-white">
            <span className="text-blue-400">{game1.title}</span> 
            <span className="text-gray-600 mx-3 text-2xl">vs</span> 
            <span className="text-red-400">{game2.title}</span>
          </h1>
        </div>

        {/* ✅ 1. Verdict Box (一句话结论) */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-yellow-600/50 rounded-xl p-6 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-yellow-600 text-xs font-bold px-3 py-1 text-black uppercase">The Verdict</div>
          <h2 className="text-xl font-bold text-white mb-4 mt-2">⚡ Quick Verdict: Which one to choose?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <span className="text-2xl mr-3">👈</span>
              <div>
                <strong className="text-blue-300 block mb-1">Choose {game1.title} if...</strong>
                <p className="text-sm text-gray-300">
                  <RichText text={`You prefer a **${game1.gameplay?.difficulty}** challenge and enjoy **${game1.tags[0]}** mechanics. Ideal for ${isG1Hard ? '**veterans**' : '**newcomers**'}.`} />
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">👉</span>
              <div>
                <strong className="text-red-300 block mb-1">Choose {game2.title} if...</strong>
                <p className="text-sm text-gray-300">
                  <RichText text={`You want a **${game2.gameplay?.difficulty}** experience focusing on **${game2.tags[0]}** mechanics. Best for ${isG2Hard ? '**tactical experts**' : '**casual players**'}.`} />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Covers */}
        <div className="grid grid-cols-2 gap-4 md:gap-12 mb-12 items-end">
             <div className="flex flex-col items-center">
                <div className="w-32 md:w-48 aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg border-2 border-blue-500/30">
                  <Image src={`/images/covers/${game1.slug}.jpg`} alt={game1.title} fill className="object-cover" />
                </div>
                <h3 className="font-bold text-center mt-3 text-blue-300">{game1.title}</h3>
             </div>
             <div className="flex flex-col items-center">
                <div className="w-32 md:w-48 aspect-[3/4] relative rounded-lg overflow-hidden shadow-lg border-2 border-red-500/30">
                  <Image src={`/images/covers/${game2.slug}.jpg`} alt={game2.title} fill className="object-cover" />
                </div>
                <h3 className="font-bold text-center mt-3 text-red-300">{game2.title}</h3>
             </div>
        </div>

        {/* ✅ 2. Technical Comparison Table */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-purple-500 pl-4">Technical Specs Showdown</h2>
          <div className="overflow-x-auto bg-gray-800 rounded-xl border border-gray-700">
            <table className="w-full text-left text-sm md:text-base">
              <thead className="bg-gray-900/50 text-gray-400 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Feature</th>
                  <th className="px-6 py-4 text-blue-300">{game1.title}</th>
                  <th className="px-6 py-4 text-red-300">{game2.title}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <CompareRow label="Release Year" val1={game1.year} val2={game2.year} />
                <CompareRow label="Metascore" val1={game1.metacritic} val2={game2.metacritic} highlight />
                <CompareRow label="Main Story" val1={`${game1.gameplay?.timeToBeat?.main}h`} val2={`${game2.gameplay?.timeToBeat?.main}h`} />
                <CompareRow label="Completionist" val1={`${game1.gameplay?.timeToBeat?.completionist}h`} val2={`${game2.gameplay?.timeToBeat?.completionist}h`} />
                <CompareRow label="Difficulty" val1={game1.gameplay?.difficulty} val2={game2.gameplay?.difficulty} />
                <CompareRow label="ROM Size" val1={game1.specs?.romSize} val2={game2.specs?.romSize} isMono />
                <tr className="bg-gray-700/30">
                  <td className="px-6 py-4 font-medium text-yellow-400">Best For</td>
                  <td className="px-6 py-4">{isG1Hard ? 'Veterans' : 'Newcomers'}</td>
                  <td className="px-6 py-4">{isG2Hard ? 'Veterans' : 'Newcomers'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ✅ 3. 人群推荐 (Recommendation Cards) */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <RecommendationCard game={game1} isHard={isG1Hard} opponentTitle={game2.title} color="blue" />
          <RecommendationCard game={game2} isHard={isG2Hard} opponentTitle={game1.title} color="red" />
        </div>

        {/* ✅ 3.5 Who Should Skip This Game */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-red-500 pl-4">
            Who Should Skip These Games?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="font-bold text-blue-300 mb-2">
                Skip {game1.title} if you…
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                {isG1Hard && <li>Dislike challenging or complex RPG systems</li>}
                <li>Prefer fast-paced action over turn-based gameplay</li>
                <li>Are mainly looking for a short, casual experience</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="font-bold text-red-300 mb-2">
                Skip {game2.title} if you…
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                {isG2Hard && <li>Are completely new to RPG mechanics</li>}
                <li>Don’t enjoy longer story-driven games</li>
                <li>Prefer simpler progression systems</li>
              </ul>
            </div>
          </div>
        </div>


        {/* ✅ 4. 智能攻略 (Strategy Tips) */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">🛡️ Quick Strategy Tips</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <StrategyTip game={game1} />
            <StrategyTip game={game2} />
          </div>
        </div>

        {/* ✅ 5. 模拟器配置 (Emulator Guide) */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-gray-400 mb-4 text-center uppercase tracking-widest">Emulator Setup Guide</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <EmulatorCard game={game1} color="blue" />
            <EmulatorCard game={game2} color="red" />
          </div>
        </div>

        {/* ✅ 6. FAQ */}
        <div className="mb-16 border-t border-gray-800 pt-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
             {faqList.map((faq, idx) => (
               <FAQItem key={idx} q={faq.q} a={faq.a} />
             ))}
          </div>
        </div>

        {/* More Comparisons */}
        <div className="mt-16 bg-gray-900 border border-gray-800 rounded-xl p-8">
          <h3 className="text-xl font-bold mb-6 text-gray-300">More Matchups Featuring {game1.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedComparisons.map((comp, idx) => (
              <Link 
                key={idx} 
                href={`/versus/${comp.slug}`} 
                className="text-sm text-blue-400 hover:text-white hover:underline block truncate"
              >
                vs {comp.title.split(' vs ')[1]}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 3. 抽象组件库 (不会再漏了!)
// ==========================================

// 🔥 核心修复：解析 **text** 为 <strong>text</strong>
function RichText({ text }: { text: string }) {
  // 简单的正则分割：将 **包裹的内容** 分离出来
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
        }
        return part;
      })}
    </span>
  );
}

function CompareRow({ label, val1, val2, highlight, isMono }: any) {
  // 简单的比较逻辑，高的绿色
  let c1 = "text-gray-300";
  let c2 = "text-gray-300";
  
  if (highlight) {
    const n1 = parseFloat(String(val1));
    const n2 = parseFloat(String(val2));
    if (!isNaN(n1) && !isNaN(n2)) {
      if (n1 > n2) c1 = "text-green-400 font-bold";
      if (n2 > n1) c2 = "text-green-400 font-bold";
    }
  }

  const fontClass = isMono ? "font-mono text-gray-400" : "";

  return (
    <tr>
      <td className="px-6 py-4 font-medium text-gray-400">{label}</td>
      <td className={`px-6 py-4 ${c1} ${fontClass}`}>{val1}</td>
      <td className={`px-6 py-4 ${c2} ${fontClass}`}>{val2}</td>
    </tr>
  );
}

function RecommendationCard({ game, isHard, opponentTitle, color }: any) {
  const borderColor = color === 'blue' ? 'border-blue-500' : 'border-red-500';
  const titleColor = color === 'blue' ? 'text-blue-300' : 'text-red-300';

  const text = isHard 
    ? `Choose this if you are a **veteran player** looking for a challenge. Its "**${game.gameplay?.difficulty}**" difficulty rating implies complex mechanics that will test your strategy skills more than ${opponentTitle}.`
    : `Perfect for **newcomers** or those who want to enjoy the story without hitting a wall. With a "**${game.gameplay?.difficulty}**" rating, it offers a smoother curve than ${opponentTitle}.`;

  return (
    <div className={`bg-gray-800 p-6 rounded-xl border-l-4 ${borderColor}`}>
      <h3 className={`text-xl font-bold ${titleColor} mb-2`}>Why Play {game.title}?</h3>
      <p className="text-gray-300 text-sm leading-relaxed mb-4">
        <RichText text={text} />
      </p>
      <div className="flex gap-2 mt-auto">
        {game.tags.slice(0, 3).map((tag: string) => (
           <span key={tag} className="text-xs bg-gray-900 px-2 py-1 rounded text-gray-400 capitalize">{tag.replace('-', ' ')}</span>
        ))}
      </div>
    </div>
  );
}

function StrategyTip({ game }: { game: FullGame }) {
  let tip = "Save often and talk to every NPC.";
  const genre = game.genre.toLowerCase();
  
  if (genre.includes('tactical') || genre.includes('strategy')) {
    tip = "Focus on **Unit Positioning**. High ground and flanking usually deal bonus damage. Don't rush your leader unit alone.";
  } else if (genre.includes('turn-based')) {
    tip = "Master **Elemental Weaknesses**. Check the enemy's type before attacking. Buffs and debuffs are more effective here.";
  } else if (genre.includes('action')) {
    tip = "Learn enemy **Attack Patterns**. Since this is an Action RPG, dodging is just as important as your gear stats.";
  }

  return (
    <div className="flex gap-4">
      <div className="min-w-[50px] h-[50px] bg-gray-700 rounded-full flex items-center justify-center text-2xl">💡</div>
      <div>
        <h4 className="font-bold text-white mb-1">Tips for {game.title}</h4>
        <p className="text-sm text-gray-400"><RichText text={tip} /></p>
      </div>
    </div>
  );
}

function EmulatorCard({ game, color }: { game: FullGame, color: 'blue' | 'red' }) {
  const borderColor = color === 'blue' ? 'border-blue-500' : 'border-red-500';
  const textColor = color === 'blue' ? 'text-blue-300' : 'text-red-300';
  return (
    <div className={`bg-gray-800 p-4 rounded-lg border-t-2 ${borderColor}`}>
      <h3 className={`font-bold text-sm mb-2 ${textColor}`}>{game.title} Config</h3>
      <ul className="space-y-1 text-xs text-gray-400">
        <li className="flex justify-between"><span>Feature:</span> <span className="text-white">{game.meta?.bestEmulatorFeature?.slice(0, 25)}...</span></li>
        <li className="flex justify-between"><span>Save:</span> <span className="text-white font-mono">{game.specs?.saveType}</span></li>
        <li className="flex justify-between"><span>ROM:</span> <span className="text-white font-mono">{game.specs?.romSize}</span></li>
      </ul>
    </div>
  );
}

function FAQItem({ q, a }: { q: string, a: string }) {
  return (
    <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
      <h3 className="font-bold text-yellow-500 mb-1">{q}</h3>
      <div className="text-gray-400 text-sm">
        <RichText text={a} />
      </div>
    </div>
  );
}