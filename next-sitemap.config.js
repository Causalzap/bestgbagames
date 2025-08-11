// 根目录/next-sitemap.config.js
module.exports = {
  siteUrl: 'https://www.bestgbagames.com',
  generateRobotsTxt: true,
  outDir: 'public',  // 可选，指定输出目录
  exclude: ['/secret', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/tmp', '/private']
      },
      {
        userAgent: 'Googlebot-Image',
        disallow: ['/images']
      }
    ],
    additionalSitemaps: [
      'https://www.bestgbagames.com/sitemap.xml',
      'https://www.bestgbagames.com/server-sitemap.xml'
    ]
  }
};
