import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0a1128] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Bovenste rij */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/10 pb-10">
          {/* Logo & beschrijving */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
              <span className="text-xl font-bold text-white">verkoopuwhuis.nu</span>
            </Link>
            <p className="text-sm text-gray-300">
              Verkoop uw woning snel, veilig en zonder gedoe. Binnen 24 uur een bod — zonder makelaar of financieringsvoorbehoud.
            </p>
          </div>

          {/* Navigatie */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Navigatie</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/over-ons" className="hover:text-white">Over ons</Link></li>
              <li><Link href="/huis-verkopen" className="hover:text-white">Uw huis verkopen</Link></li>
              <li><Link href="/contact" className="hover:text-white">Bod aanvragen</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Juridisch */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Informatie</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/privacybeleid" className="hover:text-white">Privacybeleid</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <p className="text-sm text-gray-300 mb-2">info@verkoopuwhuis.nu</p>
            <p className="text-sm text-gray-300">Ma - Vr: 09:00 - 18:00</p>
          </div>
        </div>

        {/* Onderaan */}
        <div className="mt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} verkoopuwhuis.nu – Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  );
}
