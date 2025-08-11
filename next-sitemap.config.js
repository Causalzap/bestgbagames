// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://www.bestgbagames.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.8,
  sitemapSize: 10000, // 确保生成单个文件
  exclude: [
    '/admin',
    '/private' // 只需排除真实存在的敏感路径
  ],
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : 'monthly',
      priority: path === '/' ? 1.0 : 0.7,
      lastmod: new Date().toISOString()
    }
  }
}
