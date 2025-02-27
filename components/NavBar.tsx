"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center transition-all duration-300 z-50 ${
        scrolled
          ? "bg-white text-black shadow-md"
          : "bg-transparent text-white"
      }`}
    >
      <div className="flex items-center space-x-6">
        <Link href="/">
          <span className="font-semibold text-lg">Home</span>
        </Link>
        <Link href="/properties">
          <span className="hover:text-gray-300">Properties</span>
        </Link>
        <Link href="/projects">
          <span className="hover:text-gray-300">Our Projects</span>
        </Link>
        <Link href="/faqs">
          <span className="hover:text-gray-300">FAQs</span>
        </Link>
        <Link href="/about">
          <span className="hover:text-gray-300">About Us</span>
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        <Link href="/contact">
          <span className="hover:text-gray-300">Contact Us</span>
        </Link>
        <Link href="/book-call">
          <span className="hover:text-gray-300">Book a Call</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
