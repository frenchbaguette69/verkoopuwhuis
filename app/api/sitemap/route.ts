import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const baseUrl = "https://verkoopuwhuis.nu"

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  })

  const routes = [
    "", // homepage
    "huis-verkopen",
    "contact",
    "privacybeleid",
    ...posts.map((post) => {
      const slug = `${post.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")}-${post.id}`
      return `blog/${slug}`
    }),
  ]

  const urls = routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}/${route}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
`
    )
    .join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
