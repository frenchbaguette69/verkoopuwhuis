import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.post.create({
    data: {
      title: "Test blog voor VerkoopUwHuis.nu",
      content: "<p>Welkom bij onze eerste testblog!</p><h2>Wat kun je verwachten?</h2><p>Heel veel waardevolle content.</p>",
      metaTitle: "Test blog",
      metaDescription: "Een korte introductie voor SEO-doeleinden.",
    }
  })
}

main().catch(e => {
  console.error(e)
  process.exit(1)
}).finally(() => prisma.$disconnect())
