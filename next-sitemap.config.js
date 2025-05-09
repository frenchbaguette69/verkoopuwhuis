/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://verkoopuwhuis.nu',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/admin/*'],
  changefreq: 'hourly',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://verkoopuwhuis.nu/api/sitemap', // <-- jouw dynamische blogs-sitemap
    ],
  },
}
