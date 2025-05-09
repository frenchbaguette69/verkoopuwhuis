import Link from "next/link"

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Artikel niet gevonden</h1>
        <p className="text-gray-600 mb-8">
          Het artikel dat u zoekt bestaat niet of is verwijderd. Bekijk onze andere artikelen voor meer informatie over
          het verkopen van uw woning.
        </p>
        <Link
          href="/blog"
          className="inline-block px-6 py-3 bg-[#2baf57] text-white font-medium rounded-md hover:bg-green-700 transition-colors"
        >
          Terug naar blog
        </Link>
      </div>
    </div>
  )
}