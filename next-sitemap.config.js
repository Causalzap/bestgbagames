// 根目录/next-sitemap.config.js
module.exports = {
  siteUrl: 'https://www.bestgbagames.com',
  generateRobotsTxt: true,
  changefreq: 'daily',  
  priority: 0.7, 
  sitemapSize: 5000 , 
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
    ]
  }
};
