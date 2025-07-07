"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

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

  const nav = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Listings", href: "/listings" },
    { name: "Agents", href: "/agents" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen ? "bg-earth-50 shadow" : "bg-transparent"
      }`}
    >
      <div className="w-[90vw] md:w-[70vw] mx-auto flex justify-between items-center p-6">
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

        {/* Desktop Navigation */}
        <nav className="hidden md:block space-x-6">
          {nav.map((n) => {
            const isActive =
              pathname === n.href ||
              (n.href !== "/" && pathname.startsWith(n.href));

            return (
              <Link
                key={n.href}
                href={n.href}
                className={`transition-colors ${
                  scrolled
                    ? isActive
                      ? "text-earth-800 font-medium"
                      : "text-earth-600 hover:text-earth-800"
                    : isActive
                    ? "text-white font-medium"
                    : "text-gray-200 hover:text-white"
                }`}
              >
                {n.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <FaTimes className="text-earth-800" />
          ) : (
            <FaBars className={scrolled ? "text-earth-800" : "text-white"} />
          )}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 top-0 right-0 w-full h-screen bg-earth-50 z-40 flex flex-col pt-24 px-8"
            >
              <nav className="flex flex-col space-y-6">
                {nav.map((n) => {
                  const isActive =
                    pathname === n.href ||
                    (n.href !== "/" && pathname.startsWith(n.href));

                  return (
                    <Link
                      key={n.href}
                      href={n.href}
                      className={`text-xl transition-colors ${
                        isActive
                          ? "text-earth-800 font-medium"
                          : "text-earth-600 hover:text-earth-800"
                      }`}
                    >
                      {n.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Contact Button */}
              <div className="mt-12">
                <Link
                  href="/contact"
                  className="inline-block bg-earth-700 hover:bg-earth-600 text-white px-6 py-3 rounded-lg transition-colors duration-300 text-center font-medium"
                >
                  Contact Us
                </Link>
              </div>

              {/* Mobile Social Links */}
              <div className="mt-auto mb-12">
                <p className="text-earth-600 mb-4 font-medium">Follow Us</p>
                <div className="flex space-x-4">
                  {[
                    { name: "Facebook", href: "#" },
                    { name: "Instagram", href: "#" },
                    { name: "LinkedIn", href: "#" },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 rounded-full bg-earth-200 flex items-center justify-center text-earth-700 hover:bg-earth-300 transition-colors duration-300"
                    >
                      {social.name[0]}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
