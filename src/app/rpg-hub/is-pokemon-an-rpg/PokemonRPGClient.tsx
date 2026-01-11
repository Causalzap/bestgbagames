// src/app/rpg-hub/is-pokemon-an-rpg/PokemonRPGClient.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { useMemo, useState } from 'react';
import topGames from '@/data/articles/rpg-top-games.json';

// —— 补充强类型 —— //
type Game = {
    id: number;
    rank: number;
    title: string;
    year: number;
    description: string;
    slug: string;
    metacritic: number;
    ign: number;
    genre: string;
    tags: string[];
    platforms?: string[];
    release: { developers: string[] };
    gameDetailUrl?: string;
    whyStillWorthPlaying?: string;
    series?: string; // 用于筛选“Pokémon”
  };

  const games = topGames as Game[];


export default function PokemonRPGClient() {
  // 过滤出宝可梦系列游戏（防御性兜底）
  const pokemonGames = useMemo(
    () =>
      Array.isArray(topGames)
        ? topGames.filter((game: any) => game?.series === 'Pokémon')
        : [],
    []
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nextImage = () => {
    if (!pokemonGames.length) return;
    setCurrentImageIndex((i) => (i + 1) % pokemonGames.length);
  };
  const prevImage = () => {
    if (!pokemonGames.length) return;
    setCurrentImageIndex((i) => (i - 1 + pokemonGames.length) % pokemonGames.length);
  };

  const currentGame = pokemonGames[currentImageIndex];

  // JSON-LD（Article + FAQ + Breadcrumb）
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Is Pokémon an RPG?',
    alternativeHeadline: 'Is Pokémon an RPG? Pokémon JRPG Mechanics & RPG Analysis',
    description:
      'Explains why Pokémon is classified as a JRPG, highlighting combat, progression, evolution, team-building, and monster-collecting.',
    inLanguage: 'en',
    mainEntityOfPage:
      process.env.NEXT_PUBLIC_SITE_URL
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/rpg-hub/is-pokemon-an-rpg`
        : undefined,
    articleSection: ['JRPG', 'RPG analysis', 'Monster-collecting'],
    author: { '@type': 'Organization', name: 'Game Boy Advance Archive' },
    publisher: { '@type': 'Organization', name: 'Game Boy Advance Archive' }
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is Pokémon an RPG?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes. Pokémon is widely classified as a JRPG. It features turn-based combat, character progression, exploration, story-driven quests, and unique monster-collecting systems.'
        }
      },
      {
        '@type': 'Question',
        name: 'What makes Pokémon different from other RPGs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Pokémon emphasizes catching, training, and team-building with type advantages, plus evolution and trading/battling with other players.'
        }
      }
    ]
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
      { '@type': 'ListItem', position: 2, name: 'RPG Hub', item: '/rpg-hub' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Is Pokémon an RPG?',
        item: '/rpg-hub/is-pokemon-an-rpg'
      }
    ]
  };

  // —— 渲染 —— //
  const developer =
    currentGame?.release?.developers?.length
      ? currentGame.release.developers.join(', ')
      : 'Unknown';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* JSON-LD */}
      <Script
        id="jsonld-article"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <Script
        id="jsonld-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <div className="max-w-7xl mx-auto px-4 pt-28 pb-12">
        {/* 面包屑导航 */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/rpg-hub" className="text-purple-400 hover:text-purple-300 transition-colors">RPG Hub</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-gray-300">Is Pokémon an RPG?</li>
          </ol>
        </nav>

        {/* 页面标题 */}
        <header className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
            Is Pokémon an RPG? | Pokémon JRPG Mechanics &amp; RPG Analysis
          </h1>
          <p className="text-gray-300 text-lg">
            Exploring one of the most debated questions among retro gaming fans
          </p>
        </header>

        {/* 内容卡片 */}
        <section className="bg-gray-800 rounded-xl p-8 mb-16 border-2 border-yellow-600/30" aria-labelledby="rpg-definition">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左侧内容 */}
            <div>
              <div className="mb-8">
                <h2 id="rpg-definition" className="text-2xl font-bold text-yellow-400 mb-4">
                  The RPG Definition: What Makes an RPG?
                </h2>
                <p className="text-gray-300 mb-4">
                  Role-playing games (RPGs) are characterized by players controlling characters in a fictional setting, engaging in combat, exploration, and narrative-driven gameplay. Key elements include:
                </p>
                <ul className="list-disc pl-6 text-gray-300 space-y-2">
                  <li>Character progression and leveling systems</li>
                  <li>Turn-based or strategic combat</li>
                  <li>Exploration of game worlds</li>
                  <li>Story-driven narratives</li>
                  <li>Inventory and equipment management</li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  Why Pokémon Fits as a JRPG (Japanese RPG)
                </h2>
                <p className="text-gray-300 mb-4">
                  Pokémon games contain all the core elements of Japanese Role-Playing Games (JRPGs):
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-bold text-yellow-300 mb-2">Turn-Based Combat</h3>
                    <p className="text-gray-300 text-sm">
                      Strategic battles where players select moves in turn-based sequences.
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-bold text-yellow-300 mb-2">Character Progression</h3>
                    <p className="text-gray-300 text-sm">
                      Pokémon gain experience, level up, and evolve into stronger forms.
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-bold text-yellow-300 mb-2">Exploration</h3>
                    <p className="text-gray-300 text-sm">
                      Players explore diverse regions, discover hidden areas, and solve puzzles.
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-bold text-yellow-300 mb-2">Story-Driven</h3>
                    <p className="text-gray-300 text-sm">
                      Narrative arcs involving gym battles, rivalries, and thwarting villainous teams.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧内容 */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  Unique Pokémon Mechanics
                </h2>
                <p className="text-gray-300 mb-4">
                  While Pokémon fits squarely within the JRPG genre, it introduces unique mechanics that set it apart:
                </p>
                <div className="space-y-4">
                  {[ 
                    { n: 1, title: 'Catching Mechanics', text: 'The core gameplay loop revolves around capturing wild Pokémon, adding collection elements.' },
                    { n: 2, title: 'Team Building', text: 'Players assemble teams with type advantages and synergistic movesets.' },
                    { n: 3, title: 'Evolution System', text: 'Pokémon evolve into more powerful forms, adding progression depth.' },
                    { n: 4, title: 'Multiplayer Elements', text: 'Trading and battling with other players adds social dimensions.' }
                  ].map((item) => (
                    <div className="flex items-start" key={item.n}>
                      <div className="bg-yellow-500 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                        {item.n}
                      </div>
                      <div>
                        <h3 className="font-bold text-yellow-300">{item.title}</h3>
                        <p className="text-gray-300 text-sm">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="bg-gray-900/50 rounded-xl p-6 border border-yellow-600/30" aria-labelledby="community-consensus">
                <h3 id="community-consensus" className="text-xl font-bold text-yellow-400 mb-3">Community Consensus</h3>
                <p className="text-gray-300 mb-4">
                  Both players and game scholars widely recognize Pokémon as a JRPG, though one that emphasizes collection and team-building more than traditional story-driven RPGs.
                </p>
                <div className="flex items-center text-gray-300 text-sm" aria-label="Classification">
                  <div className="bg-gray-700 rounded-full p-2 mr-3" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Officially classified as RPG by Nintendo and game retailers</span>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ================================================================================== */}
{/* 👇👇👇 新增：SEO 深度内容注入 (Comparison + GBA History + FAQ) 👇👇👇 */}
{/* ================================================================================== */}

<div className="max-w-4xl mx-auto my-20 space-y-16">
  
  {/* SECTION 1: Pokémon vs Traditional JRPGs */}
  <section className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
    <h2 className="text-3xl font-bold text-yellow-400 mb-6">
      Pokémon vs. Traditional GBA RPGs: The Difference
    </h2>
    <div className="prose prose-invert max-w-none">
      <p className="text-gray-300 text-lg mb-6">
        When placing <em>Pokémon Ruby/Sapphire</em> side-by-side with GBA titans like <em>Final Fantasy VI Advance</em> or <em>Golden Sun</em>, the definition of &quot;RPG&quot; gets interesting. While they share the same DNA, Pokémon evolved in a completely different direction.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 not-prose">
        <div className="bg-gray-900/80 p-6 rounded-xl border-l-4 border-blue-500">
          <h3 className="text-xl font-bold text-white mb-3">🗡️ Traditional JRPGs</h3>
          <p className="text-sm text-gray-400 mb-2 font-bold uppercase tracking-wider">Examples: Final Fantasy, Golden Sun</p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start"><span className="mr-2">🔹</span> <strong>Fixed Party:</strong> Story dictates who joins your team (e.g., Terra, Locke).</li>
            <li className="flex items-start"><span className="mr-2">🔹</span> <strong>Combat:</strong> Often uses ATB (Active Time Battle) or MP-based magic systems.</li>
            <li className="flex items-start"><span className="mr-2">🔹</span> <strong>Progression:</strong> Linear storytelling (&quot;Save the world&quot;).</li>
          </ul>
        </div>

        <div className="bg-gray-900/80 p-6 rounded-xl border-l-4 border-yellow-500">
          <h3 className="text-xl font-bold text-white mb-3">🔴 Pokémon (GBA Era)</h3>
          <p className="text-sm text-gray-400 mb-2 font-bold uppercase tracking-wider">Examples: Emerald, FireRed</p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start"><span className="mr-2">🔸</span> <strong>Team Building:</strong> You choose 6 members from 386 possibilities.</li>
            <li className="flex items-start"><span className="mr-2">🔸</span> <strong>Combat:</strong> Rock-Paper-Scissors complexity (Type Matchups) + STAB mechanics.</li>
            <li className="flex items-start"><span className="mr-2">🔸</span> <strong>Progression:</strong> &quot;Champion Journey&quot; loop with collection elements.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  {/* SECTION 2: How GBA Revolutionized the Mechanics */}
  <section className="prose prose-invert max-w-none">
    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
      How GBA Revolutionized the Pokémon RPG Formula
    </h2>
    <p className="text-xl text-gray-300 leading-relaxed">
      If you think Pokémon is &quot;simple,&quot; you likely missed the mathematical revolution that happened on the Game Boy Advance. The transition from Game Boy Color (Gen 2) to GBA (Gen 3) was the single biggest mechanical leap in franchise history.
    </p>
    
    <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h4 className="font-bold text-green-400 text-lg mb-2">1. Abilities & Natures</h4>
        <p className="text-sm text-gray-400">
          GBA introduced <strong>Abilities</strong> (passive skills like <em>Intimidate</em>) and <strong>Natures</strong> (+10% / -10% stat modifiers). This added a layer of RPG min-maxing depth that rivals <em>Dungeons & Dragons</em>.
        </p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h4 className="font-bold text-blue-400 text-lg mb-2">2. Double Battles</h4>
        <p className="text-sm text-gray-400">
          <em>Ruby & Sapphire</em> introduced 2v2 combat, forcing players to think about synergy and area-of-effect moves, shifting the meta from &quot;fastest hitter wins&quot; to tactical setups.
        </p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h4 className="font-bold text-purple-400 text-lg mb-2">3. The Wireless Era</h4>
        <p className="text-sm text-gray-400">
          <em>FireRed & LeafGreen</em> bundled the GBA Wireless Adapter, transforming RPGs from a solitary experience into a truly social ecosystem for trading and battling.
        </p>
      </div>
    </div>
  </section>

  {/* SECTION 3: FAQ (Schema Friendly) */}
  <section className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
    <h2 className="text-2xl font-bold text-white mb-8 text-center">
      Common Questions: Pokémon as an RPG
    </h2>
    <div className="space-y-6">
      <div className="border-b border-gray-800 pb-6">
        <h3 className="font-bold text-lg text-yellow-300 mb-2">Is Pokémon considered a JRPG or a Western RPG?</h3>
        <p className="text-gray-400">
          Pokémon is definitively a <strong>JRPG (Japanese Role-Playing Game)</strong>. It was created in Japan by Game Freak and features core JRPG staples: turn-based menu combat, random encounters, linear storytelling, and anime-styled aesthetics.
        </p>
      </div>
      
      <div className="border-b border-gray-800 pb-6">
        <h3 className="font-bold text-lg text-yellow-300 mb-2">Does Pokémon have a deep story like Final Fantasy?</h3>
        <p className="text-gray-400">
          While traditional RPGs focus on &quot;saving the world&quot; with complex political dramas, Pokémon focuses on <strong>personal growth</strong>. The story is the journey of you, the player, growing from a novice to a Champion. However, GBA titles like <em>Pokémon Mystery Dungeon</em> do offer heavy, emotional narratives.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-lg text-yellow-300 mb-2">What is the best Pokémon RPG on GBA for beginners?</h3>
        <p className="text-gray-400">
          <strong>Pokémon FireRed and LeafGreen</strong> are the best entry points. As remakes of the original games, they include a &quot;Teachy TV&quot; feature and help menus specifically designed to teach RPG mechanics to new players.
        </p>
      </div>
    </div>
  </section>

</div>

{/* ================================================================================== */}
{/* 👆👆👆 深度内容注入结束 👆👆👆 */}

        {/* 结论部分 */}
        <section className="bg-gradient-to-r from-yellow-600/20 to-yellow-800/30 rounded-xl p-8 mb-16 border-2 border-yellow-600/30" aria-labelledby="verdict">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="verdict" className="text-3xl font-bold text-yellow-300 mb-6">The Verdict</h2>
            <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
              <p className="text-2xl text-yellow-200 font-bold italic">
              &quot;Pokémon is unequivocally a JRPG, specifically a monster-collecting RPG that has defined its own subgenre.&quot;
              </p>
            </div>
            <p className="text-gray-300">
              While Pokémon introduces unique mechanics like creature collection and evolution, it retains all the core elements of Japanese Role-Playing Games: turn-based combat, character progression, exploration, and narrative-driven gameplay. Its success has inspired countless &quot;monster-taming&quot; RPGs, cementing its legacy as one of the most influential JRPG series of all time.
            </p>
          </div>
        </section>

        {/* GBA宝可梦游戏展示 */}
        <section className="mb-16" aria-labelledby="gba-pokemon">
          <h2 id="gba-pokemon" className="text-2xl font-bold text-center mb-8 text-yellow-300">
            Pokémon RPGs on Game Boy Advance
          </h2>

          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center">
              {/* 游戏封面轮播 */}
              <div className="w-full md:w-1/3 mb-6 md:mb-0 md:mr-8 relative">
                <div className="bg-gray-900 rounded-lg overflow-hidden aspect-[3/4]">
                  {pokemonGames.length > 0 && currentGame ? (
                    <Image
                      src={`/images/covers/${currentGame.slug}.jpg`}
                      alt={`${currentGame.title} cover art on Game Boy Advance`}
                      width={300}
                      height={400}
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center" aria-label="No cover available">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </div>

                {pokemonGames.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between px-2">
                    <button
                      onClick={prevImage}
                      aria-label="Previous game"
                      className="bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      aria-label="Next game"
                      className="bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* 游戏详情 */}
              <div className="w-full md:w-2/3">
                {pokemonGames.length > 0 && currentGame ? (
                  <>
                    <h3 className="text-2xl font-bold text-yellow-300 mb-2">
                      {currentGame.title}
                    </h3>
                    <div className="text-gray-400 mb-4">
                      {currentGame.year} • {developer}
                    </div>

                    <p className="text-gray-300 mb-6">
                      {currentGame.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/games/${currentGame.slug}`}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                        aria-label={`View ${currentGame.title} details`}
                      >
                        Game Details
                      </Link>
                      <Link
                        href={`/play/${currentGame.slug}`}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                        aria-label={`Play ${currentGame.title} online`}
                      >
                        Play Online
                      </Link>
                    </div>
                  </>
                ) : (
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-300 mb-2">No Pokémon Games Available</h3>
                    <p className="text-gray-300">
                      There are currently no Pokémon games in the database. Explore our{' '}
                      <Link href="/rpg-hub" className="underline text-yellow-300 hover:text-yellow-200">
                        JRPG hub
                      </Link>{' '}
                      for more turn-based classics.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 探索其他内容 */}
        <section className="text-center" aria-labelledby="more-topics">
          <h2 id="more-topics" className="text-2xl font-bold mb-6 text-yellow-300">
            Explore More RPG Topics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/rpg-hub/turn-based"
              className="bg-gray-800 hover:bg-gray-700 p-6 rounded-xl border border-yellow-600/30 transition-colors"
            >
              <h3 className="text-lg font-bold text-yellow-300 mb-2">Turn-Based RPGs</h3>
              <p className="text-gray-400 text-sm">Strategic JRPGs with deep combat systems</p>
            </Link>

            <Link
              href="/rpg-hub/action"
              className="bg-gray-800 hover:bg-gray-700 p-6 rounded-xl border border-yellow-600/30 transition-colors"
            >
              <h3 className="text-lg font-bold text-yellow-300 mb-2">Action RPGs</h3>
              <p className="text-gray-400 text-sm">Real-time combat with emphasis on reflexes</p>
            </Link>

            <Link
              href="/rpg-hub"
              className="bg-gray-800 hover:bg-gray-700 p-6 rounded-xl border border-yellow-600/30 transition-colors"
            >
              <h3 className="text-lg font-bold text-yellow-300 mb-2">All RPG Subgenres</h3>
              <p className="text-gray-400 text-sm">Explore all role-playing game categories</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
