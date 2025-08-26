// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */

const fs = require('fs');
const path = require('path');

function loadGameSlugs() {
  try {
    const p = path.join(__dirname, 'src', 'data', 'articles', 'best-games.json');
    const raw = fs.readFileSync(p, 'utf-8');
    const data = JSON.parse(raw);

    // 兼容两种结构： { games: [...] } 或直接是数组
    const games = Array.isArray(data) ? data : Array.isArray(data.games) ? data.games : [];
    const seen = new Set();

    // 提取 slug（以及可选 lastUpdated）
    const items = games
      .map(g => ({ slug: g.slug, lastUpdated: g.lastUpdated }))
      .filter(g => typeof g.slug === 'string' && g.slug.trim().length > 0)
      .filter(g => (seen.has(g.slug) ? false : (seen.add(g.slug), true)));

    //console.log(`[sitemap] loaded ${items.length} slugs from best-games.json`);
    return items;
  } catch (e) {
    console.warn('[sitemap] Failed to parse best-games.json:', e?.message);
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

  // 给自动发现的静态路由设默认属性
  transform: async (_config, url) => {
    let changefreq = 'weekly';
    let priority = 0.7;

    if (url === '/') { changefreq = 'daily'; priority = 0.9; }
    if (url.startsWith('/best-games')) { changefreq = 'weekly'; priority = 0.8; }
    if (url === '/privacy-policy' || url === '/terms-of-service') {
      changefreq = 'yearly'; priority = 0.3;
    }

    return {
      loc: url,
      changefreq,
      priority,
      lastmod: new Date().toISOString(), // 想用文件 mtime 就删掉这一行，让 autoLastmod 生效
    };
  },

  // 注入 /best-games/[slug] 详情页
  additionalPaths: async () => {
    const slugs = loadGameSlugs();
    const now = new Date().toISOString();
    return slugs.map(({ slug, lastUpdated }) => ({
      loc: `/best-games/${slug}`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: lastUpdated ? new Date(lastUpdated).toISOString() : now,
    }));
  },

  // robots.txt 精简：默认放行 +（可选）屏蔽训练爬虫
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/cdn-cgi/', '/_next/'], // 这里可以是数组
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
