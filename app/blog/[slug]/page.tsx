import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { BiCalendar, BiArrowBack, BiShareAlt, BiTime, BiUser, BiBookmark } from "react-icons/bi"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp, FaQuoteLeft } from "react-icons/fa"
import { calculateReadingTime, formatDate, generateSlug } from "@/lib/utils"
import type { Post } from "@prisma/client"


// Helper functie om de ID uit de slug te halen
function getIdFromSlug(slug: string): number | null {
  const match = slug.match(/-(\d+)$/)
  if (!match) return null
  return Number.parseInt(match[1], 10)
}

// Metadata genereren voor SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const id = getIdFromSlug(slug)

  if (!id) {
    return {
      title: "Artikel niet gevonden - VerkoopUwHuis.nu",
      description: "Het gevraagde artikel bestaat niet.",
    }
  }

  const post = await prisma.post.findUnique({
    where: { id },
  })

  if (!post) {
    return {
      title: "Artikel niet gevonden - VerkoopUwHuis.nu",
      description: "Het gevraagde artikel bestaat niet.",
    }
  }

  return {
    title: post.metaTitle || `${post.title} | VerkoopUwHuis.nu`,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
    },
  }
}





// Functie om de eerste paragraaf te extraheren als intro
function extractIntro(content: string): string {
  const match = content.match(/<p>(.*?)<\/p>/)
  return match ? match[1] : ""
}

// Functie om headings te extraheren voor inhoudsopgave
function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h\1>/g
  const headings: { id: string; text: string; level: number }[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = Number.parseInt(match[1])
    const text = match[2].replace(/<[^>]*>/g, "") // Strip HTML tags
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")

    headings.push({ id, text, level })
  }

  return headings
}

// Functie om IDs toe te voegen aan headings voor inhoudsopgave
function addIdsToHeadings(content: string): string {
  return content.replace(/<h([2-3])>(.*?)<\/h\1>/g, (match, level, text) => {
    const id = text
      .toLowerCase()
      .replace(/<[^>]*>/g, "") // Strip HTML tags
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
    return `<h${level} id="${id}">${text}</h${level}>`
  })
}

// Functie om pull quotes toe te voegen aan de content
function enhanceContentWithPullQuotes(content: string): string {
  // Voeg een pull quote toe na de tweede paragraaf
  const paragraphs = content.split('</p>')
  if (paragraphs.length > 3) {
    // Extract a sentence from the first paragraph for the pull quote
    const firstPara = paragraphs[0].replace(/<p>/g, '').replace(/<[^>]*>/g, '')
    const sentences = firstPara.split('.')
    if (sentences.length > 0) {
      const pullQuote = `
        <div class="my-8 px-6 py-4 border-l-4 border-[#2baf57] bg-gray-50 rounded-r-lg">
          <div class="flex">
            <FaQuoteLeft class="text-[#2baf57] text-3xl mr-4 mt-1" />
            <p class="text-xl font-serif italic text-gray-700">${sentences[0]}.</p>
          </div>
          <p class="text-right text-sm text-gray-500 mt-2">— Redactie VerkoopUwHuis.nu</p>
        </div>
      `
      paragraphs.splice(3, 0, pullQuote)
    }
  }
  
  return paragraphs.join('</p>')
}

// Functie om belangrijke zinnen te highlighten
function highlightImportantSentences(content: string): string {
  // Zoek zinnen met belangrijke keywords en highlight ze
  const keywords = ['belangrijk', 'essentieel', 'cruciaal', 'let op', 'tip', 'advies']
  
  let enhancedContent = content
  keywords.forEach(keyword => {
    const regex = new RegExp(`([^.!?]*${keyword}[^.!?]*[.!?])`, 'gi')
    enhancedContent = enhancedContent.replace(regex, (match) => {
      return `<span class="bg-yellow-50 px-1 rounded">${match}</span>`
    })
  })
  
  return enhancedContent
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const id = getIdFromSlug(slug)

  if (!id) {
    notFound()
  }

  const post = await prisma.post.findUnique({
    where: { id },
  })

  if (!post) {
    notFound()
  }

  const correctSlug = generateSlug(post.title, post.id)
  if (slug !== correctSlug) {
    notFound()
  }


  // Bereken leestijd
  const readingTime = calculateReadingTime(post.content)


  // Extraheer intro en headings
  const intro = extractIntro(post.content)
  const headings = extractHeadings(post.content)

  // Verbeter content met pull quotes en highlights
  let enhancedContent = addIdsToHeadings(post.content)
  enhancedContent = enhanceContentWithPullQuotes(enhancedContent)
  enhancedContent = highlightImportantSentences(enhancedContent)

  // Haal gerelateerde posts op (nieuwste 4 posts, exclusief huidige)
  const relatedPosts = await prisma.post.findMany({
    where: {
      id: {
        not: post.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  })

  // Haal populaire posts op (voor sidebar)
  const popularPosts = await prisma.post.findMany({
    where: {
      id: {
        not: post.id,
      },
    },
    orderBy: {
      createdAt: "desc", // In een echte app zou je hier sorteren op views of een andere populariteitsmaat
    },
    take: 5,
  })

  // Publicatiedatum formatteren
  const formattedDate = formatDate(post.createdAt)
  const updateDate = formatDate(post.updatedAt)
  const isUpdated = post.updatedAt.getTime() > post.createdAt.getTime() + 86400000 // 1 dag verschil

  return (
    <main className="bg-gray-50 min-h-screen pt-24 pb-16">
      {/* Reading Progress Bar (fixed at top) */}
      <div className="fixed top-0 left-0 z-50 w-full h-1 bg-gray-200">
        <div className="h-full bg-[#2baf57] w-0 reading-progress-bar"></div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-[#2baf57]">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-[#2baf57]">
              Artikelen
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
          </div>
        </div>
      </div>

      {/* Header sectie */}
      <header className="bg-white border-b border-gray-200 py-8 mb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            {/* Categorie label */}
            <div className="mb-4">
              <span className="inline-block bg-[#2baf57]/10 text-[#2baf57] text-sm font-medium px-3 py-1 rounded-full">
                Huisverkoop
              </span>
            </div>

            {/* Titel */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {post.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-x-6 gap-y-2">
              <div className="flex items-center">
                <BiUser className="mr-1" />
                <span>
                  Door <span className="font-medium text-gray-700">Redactie</span>
                </span>
              </div>
              <div className="flex items-center">
                <BiCalendar className="mr-1" />
                <span>{formattedDate}</span>
                {isUpdated && (
                  <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                    Bijgewerkt op {updateDate}
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <BiTime className="mr-1" />
                <span>{readingTime} min leestijd</span>
              </div>
            </div>

            {/* Intro tekst */}
            <p className="text-xl text-gray-700 leading-relaxed border-l-4 border-[#2baf57] pl-4 italic">
              {intro || post.metaDescription}
            </p>
          </div>
        </div>
      </header>

      {/* Content sectie met sidebar */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Hoofdcontent */}
          <div className="lg:w-2/3">
            {/* Artikel content */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="p-6 md:p-10">
                {/* Inhoudsopgave (alleen tonen als er headings zijn) */}
                {headings.length > 0 && (
                  <div className="mb-8 bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 flex items-center mb-3">
                      <BiBookmark className="mr-2 text-[#2baf57]" />
                      Inhoudsopgave
                    </h3>
                    <nav>
                      <ul className="space-y-1 text-sm">
                        {headings.map((heading) => (
                          <li key={heading.id} className={`${heading.level === 3 ? "ml-4" : ""}`}>
                            <a
                              href={`#${heading.id}`}
                              className="block py-1 px-2 rounded hover:bg-gray-100 transition-colors text-gray-700"
                            >
                              {heading.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                )}

                {/* Artikel content */}
                <article
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:scroll-mt-24 prose-p:text-gray-700 prose-a:text-[#2baf57] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: enhancedContent }}
                />

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-700">Tags:</span>
                    <Link
                      href="/blog?tag=huisverkoop"
                      className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                    >
                      huisverkoop
                    </Link>
                    <Link
                      href="/blog?tag=tips"
                      className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                    >
                      tips
                    </Link>
                    <Link
                      href="/blog?tag=vastgoed"
                      className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                    >
                      vastgoed
                    </Link>
                  </div>
                </div>

                {/* Auteur info */}
                <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-[#2baf57] text-white rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                      <BiUser />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Redactie VerkoopUwHuis.nu</h3>
                      <p className="text-gray-600 mt-1">
                        Ons team van vastgoedexperts deelt dagelijks waardevolle inzichten en tips over het verkopen van
                        uw woning.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Deel knoppen */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <BiShareAlt className="mr-2" />
                      Deel dit artikel
                    </h3>
                    <div className="flex space-x-3">
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://verkoopuwhuis.nu/blog/${slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                        aria-label="Deel op Facebook"
                      >
                        <FaFacebookF />
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://verkoopuwhuis.nu/blog/${slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                        aria-label="Deel op Twitter"
                      >
                        <FaTwitter />
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://verkoopuwhuis.nu/blog/${slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                        aria-label="Deel op LinkedIn"
                      >
                        <FaLinkedinIn />
                      </a>
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - https://verkoopuwhuis.nu/blog/${slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                        aria-label="Deel via WhatsApp"
                      >
                        <FaWhatsapp />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

           
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            {/* Terug naar blog knop */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
              <Link
                href="/blog"
                className="inline-flex items-center text-[#2baf57] hover:text-green-700 transition-colors font-medium"
              >
                <BiArrowBack className="mr-2" />
                <span>Terug naar alle artikelen</span>
              </Link>
            </div>

            {/* Populaire artikelen */}
            

            {/* CTA Box */}
            <div className="bg-[#2baf57] rounded-xl shadow-sm overflow-hidden text-white">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Wilt u uw huis snel verkopen?</h3>
                <p className="mb-4">
                  Vraag vandaag nog een vrijblijvend bod aan en ontvang binnen 24 uur een marktconform aanbod.
                </p>
                <Link
                  href="/#bod-aanvragen"
                  className="inline-block w-full py-3 bg-white text-[#2baf57] font-medium rounded-md text-center hover:bg-gray-50 transition-colors"
                >
                  Gratis bod aanvragen
                </Link>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Trending onderwerpen</h3>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/blog?tag=huisverkopen"
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm transition-colors"
                  >
                    #huisverkopen
                  </Link>
                  <Link
                    href="/blog?tag=vastgoedmarkt"
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm transition-colors"
                  >
                    #vastgoedmarkt
                  </Link>
                  <Link
                    href="/blog?tag=woningwaarde"
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm transition-colors"
                  >
                    #woningwaarde
                  </Link>
                  <Link
                    href="/blog?tag=hypotheek"
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm transition-colors"
                  >
                    #hypotheek
                  </Link>
                  <Link
                    href="/blog?tag=makelaars"
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm transition-colors"
                  >
                    #makelaars
                  </Link>
                  <Link
                    href="/blog?tag=woningtips"
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm transition-colors"
                  >
                    #woningtips
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gerelateerde artikelen */}
      {relatedPosts.length > 0 && (
        <div className="container mx-auto  mt-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Gerelateerde artikelen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPosts.map((relatedPost: Post) => {
                const relatedSlug = generateSlug(relatedPost.title, relatedPost.id)
                const relatedReadingTime = calculateReadingTime(relatedPost.content)

                return (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedSlug}`}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group h-full flex flex-col"
                  >
                    <div className="h-3 bg-[#2baf57] w-full"></div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span className="bg-[#2baf57]/10 text-[#2baf57] px-2 py-0.5 rounded-full">Huisverkoop</span>
                        <div className="flex items-center">
                          <BiTime className="mr-1" />
                          <span>{relatedReadingTime} min</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-[#2baf57] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 flex-grow mb-3">{relatedPost.metaDescription}</p>
                      <div className="flex items-center justify-between text-sm mt-auto pt-2 border-t border-gray-100">
                        <div className="flex items-center text-gray-500">
                          <BiCalendar className="mr-1" />
                          <span>{formatDate(relatedPost.createdAt)}</span>
                        </div>
                        <div className="text-[#2baf57] font-medium flex items-center">
                          Lees meer
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Script voor reading progress bar */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const progressBar = document.querySelector('.reading-progress-bar');
              const article = document.querySelector('article');
              
              if (progressBar && article) {
                window.addEventListener('scroll', () => {
                  const articleHeight = article.offsetHeight;
                  const articleTop = article.getBoundingClientRect().top;
                  const windowHeight = window.innerHeight;
                  
                  // Calculate how much of the article has been read
                  const articleScrolled = articleTop < 0 ? Math.abs(articleTop) : 0;
                  const articleVisible = Math.min(windowHeight, articleHeight + articleTop) - Math.max(0, articleTop);
                  const progress = (articleScrolled + articleVisible) / articleHeight;
                  
                  // Update progress bar width
                  progressBar.style.width = Math.min(100, Math.max(0, progress * 100)) + '%';
                });
              }
            });
          `,
        }}
      />
    </main>
  )
}

export const revalidate = 60