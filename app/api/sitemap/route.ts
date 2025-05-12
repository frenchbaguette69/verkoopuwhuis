import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const baseUrl = "https://verkoopuwhuis.nu"

async function generateSitemapXml() {
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
  </url>`
    )
    .join("")

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`
}

export async function GET() {
  const xml = await generateSitemapXml()

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}

export async function POST() {
  try {
    const xml = await generateSitemapXml()

    const filePath = path.join(process.cwd(), "public", "sitemap.xml")
    fs.writeFileSync(filePath, xml, "utf8")

    return new NextResponse("Sitemap opgeslagen", { status: 200 })
  } catch (err) {
    console.error("Sitemap genereren mislukt:", err)
    return new NextResponse("Fout bij genereren sitemap", { status: 500 })
  }
}
