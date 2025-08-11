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
      { userAgent: '*', allow: '/' }
    ]
  }
}
