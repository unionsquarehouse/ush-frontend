"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaChevronRight,
  FaRegCopyright,
  FaRegBuilding,
  FaRegHandshake,
  FaRegStar,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-earth-400 via-earth-600 to-earth-400"></div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-earth-800 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-earth-700/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-earth-700/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-earth-700/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative w-[90vw] md:w-[70vw] mx-auto py-16 md:py-20 text-white">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Logo and About - 4 columns */}
          <div className="md:col-span-4 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Image
                src="/assets/ush_logo.svg"
                alt="Union Square House"
                width={180}
                height={70}
                className="mb-4"
              />

              <p className="text-earth-300 leading-relaxed">
                Dubai's multi-award winning real estate agency, recognized for
                excellence in luxury property sales and leasing across the UAE's
                most prestigious communities.
              </p>

              {/* Awards badges */}
              <div className="flex flex-wrap gap-3 pt-2">
                {[1, 2, 3].map((badge) => (
                  <div
                    key={badge}
                    className="w-12 h-12 bg-earth-700/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-earth-600/50"
                  >
                    <FaRegStar className="text-earth-300" />
                  </div>
                ))}
                <div className="flex items-center text-earth-400 text-sm">
                  <span>+12 Awards</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-2">
                <h5 className="text-earth-200 text-sm font-medium mb-4">
                  Connect With Us
                </h5>
                <div className="flex space-x-3">
                  {[
                    { icon: FaFacebookF, href: "https://facebook.com" },
                    { icon: FaTwitter, href: "https://twitter.com" },
                    { icon: FaInstagram, href: "https://instagram.com" },
                    { icon: FaLinkedinIn, href: "https://linkedin.com" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-earth-700/70 backdrop-blur-sm flex items-center justify-center border border-earth-600/50 hover:bg-earth-600 transition-colors duration-300"
                      whileHover={{
                        y: -5,
                        transition: { type: "spring", stiffness: 300 },
                      }}
                    >
                      <social.icon className="text-earth-200" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links - 2 columns */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-medium mb-6 text-earth-100 flex items-center">
              <FaRegBuilding className="mr-2 text-earth-400" />
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Properties", href: "/listings" },
                { name: "Our Agents", href: "/agents" },
                { name: "Contact", href: "/contact" },
              ].map((link, index) => (
                <li key={index} className="group">
                  <Link
                    href={link.href}
                    className="text-earth-300 hover:text-earth-100 transition-colors duration-300 text-sm flex items-center"
                  >
                    <FaChevronRight className="mr-2 text-xs text-earth-500 group-hover:text-earth-300 transition-colors duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Property Types - 2 columns */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-medium mb-6 text-earth-100 flex items-center">
              <FaRegHandshake className="mr-2 text-earth-400" />
              Property Types
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Luxury Villas", href: "/listings?type=villas" },
                { name: "Apartments", href: "/listings?type=apartments" },
                { name: "Penthouses", href: "/listings?type=penthouses" },
                { name: "Off-Plan Projects", href: "/listings?type=off-plan" },
                { name: "Commercial", href: "/listings?type=commercial" },
              ].map((link, index) => (
                <li key={index} className="group">
                  <Link
                    href={link.href}
                    className="text-earth-300 hover:text-earth-100 transition-colors duration-300 text-sm flex items-center"
                  >
                    <FaChevronRight className="mr-2 text-xs text-earth-500 group-hover:text-earth-300 transition-colors duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info - 4 columns */}
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-medium mb-6 text-earth-100">
              Contact Us
            </h4>

            <div className="space-y-6">
              {/* Contact cards */}
              <div className="bg-earth-700/30 backdrop-blur-sm rounded-xl p-4 border border-earth-600/30 hover:bg-earth-700/50 transition-colors duration-300 group">
                <div className="flex">
                  <div className="w-12 h-12 rounded-lg bg-earth-600/50 flex items-center justify-center mr-4 group-hover:bg-earth-600 transition-colors duration-300">
                    <FaMapMarkerAlt className="text-earth-200" />
                  </div>
                  <div>
                    <h5 className="text-earth-100 font-medium mb-1">
                      Our Location
                    </h5>
                    <p className="text-earth-300 text-sm">
                      Business Bay, Dubai, United Arab Emirates
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-earth-700/30 backdrop-blur-sm rounded-xl p-4 border border-earth-600/30 hover:bg-earth-700/50 transition-colors duration-300 group">
                <div className="flex">
                  <div className="w-12 h-12 rounded-lg bg-earth-600/50 flex items-center justify-center mr-4 group-hover:bg-earth-600 transition-colors duration-300">
                    <FaPhone className="text-earth-200" />
                  </div>
                  <div>
                    <h5 className="text-earth-100 font-medium mb-1">Call Us</h5>
                    <a
                      href="tel:+97144589090"
                      className="text-earth-300 text-sm hover:text-earth-100 transition-colors duration-300"
                    >
                      +971 4 458 9090
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-earth-700/30 backdrop-blur-sm rounded-xl p-4 border border-earth-600/30 hover:bg-earth-700/50 transition-colors duration-300 group">
                <div className="flex">
                  <div className="w-12 h-12 rounded-lg bg-earth-600/50 flex items-center justify-center mr-4 group-hover:bg-earth-600 transition-colors duration-300">
                    <FaEnvelope className="text-earth-200" />
                  </div>
                  <div>
                    <h5 className="text-earth-100 font-medium mb-1">
                      Email Us
                    </h5>
                    <a
                      href="mailto:info@ushre.com"
                      className="text-earth-300 text-sm hover:text-earth-100 transition-colors duration-300"
                    >
                      info@ushre.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter subscription */}
        <motion.div
          className="mt-16 bg-earth-700/30 backdrop-blur-sm rounded-xl p-6 border border-earth-600/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-5 gap-6 items-center">
            <div className="md:col-span-2">
              <h4 className="text-lg font-medium text-earth-100 mb-2">
                Stay Updated
              </h4>
              <p className="text-earth-300 text-sm">
                Subscribe to our newsletter for exclusive property updates and
                market insights
              </p>
            </div>
            <div className="md:col-span-3">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-earth-800/70 border border-earth-600/50 rounded-lg px-4 py-3 text-earth-100 placeholder-earth-400 focus:outline-none focus:ring-2 focus:ring-earth-500"
                />
                <motion.button
                  type="submit"
                  className="bg-earth-600 hover:bg-earth-500 text-white rounded-lg px-6 py-3 font-medium transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-earth-700/70">
        <div className="w-[90vw] md:w-[70vw] mx-auto py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-earth-400 text-sm mb-4 md:mb-0 flex items-center">
            <FaRegCopyright className="mr-2" />
            {new Date().getFullYear()} Union Square House Real Estate —
            Regulated by RERA, Dubai
          </div>
          <div className="text-earth-400 text-sm flex space-x-6">
            <Link
              href="/privacy-policy"
              className="hover:text-earth-200 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-earth-200 transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-earth-200 transition-colors duration-300"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
