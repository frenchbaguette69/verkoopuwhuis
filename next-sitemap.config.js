/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://verkoopuwhuis.nu',
    generateRobotsTxt: true,
    sitemapSize: 5000,
    exclude: ['/admin/*'],
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    },
  };
  