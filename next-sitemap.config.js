// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://www.bestgbagames.com',
  generateRobotsTxt: true,
  sitemapSize: 10000, // 确保生成单个文件

  // 添加实际需要的路径排除
  exclude: [
    '/admin',
    '/dashboard'
  ],

  // 简化 robots.txt 配置
  robotsTxtOptions: {
    policies: [
      // 允许所有爬虫抓取所有内容
      { userAgent: '*', allow: '/' },

      // 确保所有 AI 爬虫可以抓取
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'Baiduspider', allow: '/' },
      { userAgent: 'YandexBot', allow: '/' },
      { userAgent: 'Slurp', allow: '/' },
      { userAgent: 'DuckDuckBot', allow: '/' },

      // 禁止不需要的爬虫（可选，具体看需求）
      { userAgent: 'Amazonbot', disallow: '/' },
      { userAgent: 'Applebot-Extended', disallow: '/' },
      { userAgent: 'Bytespider', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'ClaudeBot', disallow: '/' },
    ]
  }
}
