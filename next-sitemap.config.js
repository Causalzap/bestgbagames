// 根目录/next-sitemap.config.js
module.exports = {
  siteUrl: 'https://www.bestgbagames.com',
  generateRobotsTxt: true,
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
