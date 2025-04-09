"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white text-black shadow-md px-4 sm:px-6 py-4 transition-all duration-300">

      <div className="container mx-auto px-4 sm:px-6  flex items-center justify-between">
        {/* Logo/Home link */}
        <div className="text-lg font-semibold">
          <Link href="/">
          <Image src="/logo.png" alt="Logo verkoopuwhuis.nu" width={250} height={100} />
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6 text-xl font-medium items-center">
          <Link href="/huis-verkopen" className="hover:text-gray-400">Uw huis snel verkopen</Link>
          <Link href="/contact" className="hover:text-gray-400">Contact</Link>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden items-center flex">
          <button onClick={toggleMenu}>
            {menuOpen ? <HiX className="text-3xl" /> : <HiMenu className="text-3xl" />}
          </button>
        </div>
      </div>

      {/* Mobile menu items */}
      {menuOpen && (
        <div className="md:hidden bg-white text-black py-4 shadow-md">
          <div className="container mx-auto flex flex-col items-center space-y-4">
            <Link href="/huis-verkopen" onClick={() => setMenuOpen(false)}>
              Uw huis snel verkopen
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
