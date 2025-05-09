/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://verkoopuwhuis.nu',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/admin/*'],
  changefreq: 'hourly', // sitemap entries worden gemarkeerd als dagelijks veranderend
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
