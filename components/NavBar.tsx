"use client"

import { useState } from "react"
import Link from "next/link"
import { HiMenu, HiX } from "react-icons/hi"
import { FaHome, FaPhoneAlt } from "react-icons/fa"
import { BiChevronDown } from "react-icons/bi"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoverItem, setHoverItem] = useState<string | null>(null)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const navItems = [
    {
      name: "Uw huis snel verkopen",
      href: "/huis-verkopen",
      icon: <FaHome className="mr-2" />,
      submenu: [
        { name: "Direct bod aanvragen", href: "/huis-verkopen/direct-bod" },
        { name: "Hoe werkt het?", href: "/huis-verkopen/proces" },
        { name: "Voordelen", href: "/huis-verkopen/voordelen" },
      ],
    },
    {
      name: "Contact",
      href: "/contact",
      icon: <FaPhoneAlt className="mr-2" />,
    },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white text-[#0a1128] py-4 shadow">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo/Home link */}
          <div className="relative z-10">
            <Link href="/" className="block">
              <div className="relative h-14 w-48 md:w-64">
                <Image
                  src="/logo.png"
                  alt="Logo verkoopuwhuis.nu"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setHoverItem(item.name)}
                onMouseLeave={() => setHoverItem(null)}
              >
                <Link
                  href={item.href}
                  className="px-4 py-2 rounded-md text-lg font-medium flex items-center group relative overflow-hidden hover:text-[#2baf57]"
                >
                  <span className="flex items-center">
                    {item.icon}
                    {item.name}
                    {item.submenu && (
                      <BiChevronDown
                        className={`ml-1 transition-transform duration-300 ${
                          hoverItem === item.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 origin-left scale-x-0 transition-transform duration-300 bg-[#2baf57] group-hover:scale-x-100"></span>
                </Link>

                {/* Submenu */}
                {item.submenu && (
                  <AnimatePresence>
                    {hoverItem === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-1 w-64 bg-white rounded-md shadow-xl overflow-hidden z-20"
                      >
                        <div className="py-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-3 text-[#0a1128] hover:bg-gray-50 hover:text-[#2baf57] transition-colors duration-200"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            <Link
              href="#bod-aanvragen"
              className="ml-4 px-6 py-2.5 rounded-full font-bold text-white bg-[#2baf57] hover:bg-[#229548] shadow-md hover:shadow-lg transition-all duration-300"
            >
              Gratis bod aanvragen
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-[#0a1128] hover:bg-gray-100 transition-colors duration-200"
              aria-label="Menu"
            >
              {menuOpen ? <HiX className="text-3xl" /> : <HiMenu className="text-3xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 divide-y divide-gray-100">
              {navItems.map((item) => (
                <div key={item.name} className="py-3">
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center py-2 text-[#0a1128] font-medium"
                  >
                    {item.icon}
                    {item.name}
                  </Link>

                  {item.submenu && (
                    <div className="ml-6 mt-2 space-y-2 border-l-2 border-gray-100 pl-4">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setMenuOpen(false)}
                          className="block py-2 text-gray-600 hover:text-[#2baf57]"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="py-4">
                <Link
                  href="#bod-aanvragen"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full py-3 px-4 bg-[#2baf57] text-white text-center font-bold rounded-md shadow-md"
                >
                  Gratis bod aanvragen
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
