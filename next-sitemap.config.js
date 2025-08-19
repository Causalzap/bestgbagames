// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */

const fs = require('fs')
const path = require('path')

// 读取 JSON（若不存在则返回空数组）
function loadGames() {
  try {
    const p = path.join(__dirname, 'src', 'data', 'games.json')
    if (!fs.existsSync(p)) return []
    const raw = fs.readFileSync(p, 'utf-8')
    return JSON.parse(raw)
  } catch (e) {
    console.warn('[sitemap] Failed to load games.json:', e?.message)
    return []
  }
}

module.exports = {
  siteUrl: 'https://www.bestgbagames.com',
  outDir: 'public',
  generateRobotsTxt: true,
  sitemapSize: 10000,      // 单文件足够；超过才会切分
  trailingSlash: false,
  autoLastmod: true,

  exclude: ['/admin', '/dashboard'],

  // 为自动发现到的静态路由设置默认属性
  transform: async (config, url) => {
    let changefreq = 'weekly'
    let priority = 0.7

    if (url === '/') { changefreq = 'daily'; priority = 0.9 }
    if (url.startsWith('/best-games')) { changefreq = 'weekly'; priority = 0.8 }
    if (url === '/privacy-policy' || url === '/terms-of-service') {
      changefreq = 'yearly'; priority = 0.3
    }

    return {
      loc: url,
      changefreq,
      priority,
      lastmod: new Date().toISOString(), // 想用文件 mtime 就删除这一行，交给 autoLastmod
    }
  },

  // 注入 /best-games/[slug]
  additionalPaths: async (config) => {
    const games = loadGames()
    return games.map(g => ({
      loc: `/best-games/${g.slug}`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: g.lastUpdated ? new Date(g.lastUpdated).toISOString() : new Date().toISOString(),
    }))
  },

  // robots.txt 更简洁：默认放行 + 可选屏蔽训练爬虫
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },

      // 可选：按需屏蔽
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },          // CommonCrawl
      { userAgent: 'Amazonbot', disallow: '/' },
      { userAgent: 'Applebot-Extended', disallow: '/' },
      { userAgent: 'Bytespider', disallow: '/' },
      { userAgent: 'ClaudeBot', disallow: '/' },
    ],
    // next-sitemap 会自动在 robots.txt 顶部写入：
    // Sitemap: https://www.bestgbagames.com/sitemap.xml
  },
}
