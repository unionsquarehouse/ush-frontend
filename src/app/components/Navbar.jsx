"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaArrowRight } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Listings", href: "/listings" },
    { label: "Agents", href: "/agents" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileMenuOpen 
          ? "bg-earth-50/80 backdrop-blur-md shadow-md " 
          : "bg-transparent"
      }`}
    >
      <div className="w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[75vw] mx-auto flex justify-between items-center py-6">
        <Link href="/" className="flex items-center">
          <div className="h-10 w-auto relative">
            {scrolled || mobileMenuOpen ? (
              <Image
                src="/assets/ush_logo_dark.svg"
                alt="USHRE"
                width={120}
                height={40}
                className="transition-opacity duration-300"
                priority
              />
            ) : (
              <Image
                src="/assets/ush_logo.svg"
                alt="USHRE"
                width={120}
                height={40}
                className="transition-opacity duration-300"
                priority
              />
            )}
          </div>
        </Link>

        {/* Desktop Navigation with glass morphism */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg transition-all duration-300 bg-transparent ${
                scrolled
                  ? "text-earth-800 "
                  : "text-white  "
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {/* CTA Button with glass morphism */}
          <Link
            href="/contact"
            className={`ml-2 px-6 py-3 rounded-tl-[2rem] rounded-br-[2rem] transition-all duration-300 ${
              scrolled
                ? "btn-glass-earth"
                : "btn-glass text-white"
            }`}
          >
            <span className="relative z-10 flex items-center">
              Contact Us
              <FaArrowRight className="ml-2 text-sm" />
            </span>
            <span className="absolute inset-0 w-full h-full">
              <span className="absolute top-0 left-0 w-1/3 h-full bg-white/20 transform -skew-x-20 translate-x-[-150%] group-hover:translate-x-[300%] transition-transform duration-1000"></span>
            </span>
          </Link>
        </nav>

        {/* Mobile menu button with glass effect when scrolled */}
        <button
          className={`md:hidden text-2xl focus:outline-none z-50 ${
            mobileMenuOpen 
              ? "p-2 rounded-full bg-earth-200/30 backdrop-blur-sm" 
              : scrolled ? "p-2 rounded-full hover:bg-earth-200/30" : ""
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <FaTimes className="text-earth-800" />
          ) : (
            <FaBars className={scrolled ? "text-earth-800" : "text-white"} />
          )}
        </button>
      </div>
      
      {/* Mobile Menu with glass morphism */}
      <motion.div
        className={`md:hidden fixed inset-0 z-40 ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        initial={false}
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1 },
          closed: { opacity: 0 },
        }}
      >
        <div className="absolute inset-0 bg-earth-900/60 backdrop-blur-lg" onClick={() => setMobileMenuOpen(false)} />
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm bg-earth-50/90 backdrop-blur-md shadow-xl border-l border-earth-200/30 p-6 pt-24"
          variants={{
            open: { x: 0 },
            closed: { x: "100%" },
          }}
          transition={{ type: "spring", damping: 20 }}
        >
          {/* Mobile menu content */}
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 rounded-lg text-earth-800 hover:bg-earth-200/50 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 px-5 py-3 rounded-lg btn-glass-earth flex items-center justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
              <FaArrowRight className="ml-2 text-sm" />
            </Link>
          </nav>
        </motion.div>
      </motion.div>
    </header>
  );
}
