// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */

const fs = require('fs');
const path = require('path');

// 1. 读取基础游戏数据
function loadGameData() {
  try {
    // 👇 注意：确认文件名是 best-games.json 还是 rpg-top-games.json
    // 如果你改名了，这里也要改
    const p = path.join(__dirname, 'src', 'data', 'articles', 'best-games.json');
    if (!fs.existsSync(p)) return [];
    
    const raw = fs.readFileSync(p, 'utf-8');
    const data = JSON.parse(raw);

    const games = Array.isArray(data) ? data : Array.isArray(data.games) ? data.games : [];
    
    // 只提取合法的 slug
    return games
      .map(g => ({ slug: g.slug, lastUpdated: g.lastUpdated }))
      .filter(g => typeof g.slug === 'string' && g.slug.trim().length > 0);
  } catch (e) {
    console.warn('[sitemap] Failed to load game data:', e?.message);
    return [];
  }
}

module.exports = {
  siteUrl: 'https://www.bestgbagames.com',
  outDir: 'public',
  generateRobotsTxt: true,
  sitemapSize: 10000,
  trailingSlash: false,
  autoLastmod: true,

  exclude: ['/admin', '/dashboard'],

  // 2. 配置不同页面的权重 (Priority)
  transform: async (_config, url) => {
    let changefreq = 'weekly';
    let priority = 0.7;

    if (url === '/') { 
      changefreq = 'daily'; 
      priority = 0.9; 
    }
    // 游戏详情页
    if (url.startsWith('/best-games')) { 
      changefreq = 'weekly'; 
      priority = 0.8; 
    }
    // 👇 新增：Versus 对比页 (pSEO 页面)
    if (url.startsWith('/versus')) {
      changefreq = 'weekly';
      priority = 0.7; // 对比页权重略低于详情页，但高于普通页
    }
    // 目录索引页
    if (url === '/versus' || url === '/rpg-hub') {
      changefreq = 'daily';
      priority = 0.8;
    }
    
    if (url === '/privacy-policy' || url === '/terms-of-service') {
      changefreq = 'yearly'; 
      priority = 0.3;
    }

    return {
      loc: url,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },

  // 3. 显式注入所有动态路径 (详情页 + 对比页)
  additionalPaths: async () => {
    const games = loadGameData();
    const now = new Date().toISOString();
    const paths = [];

    // A. 注入 /best-games/[slug]
    games.forEach(({ slug, lastUpdated }) => {
      paths.push({
        loc: `/best-games/${slug}`,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: lastUpdated ? new Date(lastUpdated).toISOString() : now,
      });
    });

    // B. 👇 注入 /versus/[slug] (两两组合)
    // 逻辑要和 versus/page.tsx 里的 generateStaticParams 保持一致
    for (let i = 0; i < games.length; i++) {
      for (let j = i + 1; j < games.length; j++) {
        // 只生成 A-vs-B，不生成 B-vs-A (防止重复内容)
        const slug = `${games[i].slug}-vs-${games[j].slug}`;
        paths.push({
          loc: `/versus/${slug}`,
          changefreq: 'monthly',
          priority: 0.7,
          lastmod: now,
        });
      }
    }

    console.log(`[sitemap] Generated ${paths.length} total dynamic paths (Games + Versus)`);
    return paths;
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/cdn-cgi/', '/_next/'],
      },
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'Amazonbot', disallow: '/' },
      { userAgent: 'Applebot-Extended', disallow: '/' },
      { userAgent: 'Bytespider', disallow: '/' },
      { userAgent: 'ClaudeBot', disallow: '/' },
    ],
  },
};