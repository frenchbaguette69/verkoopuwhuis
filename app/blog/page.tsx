import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { BiCalendar, BiTime } from "react-icons/bi"
import { calculateReadingTime, formatDate, generateSlug } from "@/lib/utils"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | VerkoopUwHuis.nu",
  description: "Ontdek de laatste inzichten, tips en adviezen over het snel verkopen van uw woning zonder zorgen.",
}

export const dynamic = "force-dynamic"

export default async function BlogsPage() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <main className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Onze Blog</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Ontdek de laatste inzichten, tips en adviezen over het snel verkopen van uw woning zonder zorgen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const slug = generateSlug(post.title, post.id)
            const readingTime = calculateReadingTime(post.content)

            return (
              <Link
                key={post.id}
                href={`/blog/${slug}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] flex flex-col h-full"
              >
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <BiCalendar className="mr-1" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <BiTime className="mr-1" />
                      <span>{readingTime} min</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-gray-900 hover:text-[#2baf57] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 flex-grow">
                    {post.metaDescription.length > 120
                      ? post.metaDescription.slice(0, 120) + "..."
                      : post.metaDescription}
                  </p>
                  <div className="text-[#2baf57] font-medium flex items-center">
                    Lees verder
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Nog geen blogartikelen</h2>
            <p className="text-gray-500">
              Er zijn nog geen blogartikelen gepubliceerd. Kom binnenkort terug voor nieuwe content.
            </p>
          </div>
        )}

        {/* CTA Sectie */}
        <div className="mt-16">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#2baf57] to-green-600 rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Wilt u uw huis snel verkopen?</h2>
              <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                Vraag vandaag nog een vrijblijvend bod aan en ontvang binnen 24 uur een marktconform aanbod voor uw
                woning.
              </p>
              <Link
                href="/#bod-aanvragen"
                className="inline-block px-8 py-4 bg-white text-[#2baf57] font-bold rounded-full shadow-md hover:shadow-lg transition-shadow text-lg"
              >
                Gratis bod aanvragen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
