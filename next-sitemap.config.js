const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://verkoopuwhuis.nu',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/admin/*'],
  changefreq: 'daily',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },

  // ✅ Dynamische blogposts toevoegen aan sitemap
  additionalPaths: async (config) => {
    const posts = await prisma.post.findMany()
    return posts.map((post) => {
      const slug = `${post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}-${post.id}`
      return {
        loc: `/blog/${slug}`,
        lastmod: post.updatedAt.toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      }
    })
  },
}
