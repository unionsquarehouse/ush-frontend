"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  FaAward,
  FaGem,
  FaKey,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden ">
      
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 bg-black overflow-hidden">
        {/* Luxury floating orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px]  rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-earth-800/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-earth-800/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Luxury grid pattern with golden accent */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#F5F5DC" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#gold)" opacity="0.05" />
          </svg>
        </div>
      </div>

      {/* Main Footer Content with luxury spacing */}
      <div className="w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[75vw] mx-auto relative z-10  py-20 md:py-24 text-white">
        {/* Luxury decorative element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-earth-400/70 to-transparent"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Logo and About - 4 columns with luxury styling */}
          <div className="md:col-span-4 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Logo with luxury glow effect */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-earth-400/0 via-earth-400/30 to-earth-400/0 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-1000"></div>
                <Image
                  src="/assets/ush_logo.svg"
                  alt="Union Square House"
                  width={200}
                  height={80}
                  className="relative"
                />
              </div>

              {/* Description with luxury typography */}
              <p className="text-white leading-relaxed text-sm">
                Dubai's multi-award winning real estate agency, recognized for
                excellence in luxury property sales and leasing across the UAE's
                most prestigious communities. We pride ourselves on exceptional service
                and unparalleled market expertise.
              </p>

              {/* Awards badges with luxury styling */}
              <div className="pt-2">
                <h5 className="text-white text-sm font-medium mb-4 flex items-center">
                  <FaAward className="mr-2 text-[#9F3349]" />
                  Award-Winning Excellence
                </h5>
                <div className="flex flex-wrap gap-4">
                  {/* Award 1 */}
                  <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/30 to-yellow-600/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative w-14 h-14 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-[#9F3349] group-hover:border-[#9F3349]/70 transition-colors duration-300">
                      <FaGem className="text-[#9F3349] group-hover:text-[#9F3349]/70 transition-colors duration-300" />
                    </div>
                  </div>
                  
                  {/* Award 2 */}
                  <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/30 to-yellow-600/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative w-14 h-14 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-[#9F3349] group-hover:border-[#9F3349]/70 transition-colors duration-300">
                      <FaRegStar className="text-[#9F3349] group-hover:text-[#9F3349]/70 transition-colors duration-300" />
                    </div>
                  </div>
                  
                  {/* Award 3 */}
                  <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/30 to-yellow-600/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative w-14 h-14 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-[#9F3349] group-hover:border-[#9F3349]/70 transition-colors duration-300">
                      <FaKey className="text-[#9F3349] group-hover:text-[#9F3349]/70 transition-colors duration-300" />
                    </div>
                  </div>
                  
                  {/* Award count */}
                  <div className="flex items-center text-white text-sm">
                    <span className="px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg border-2 border-[#9F3349]">+12 Awards</span>
                  </div>
                </div>
              </div>

              {/* Social Media with luxury hover effects */}
              <div className="pt-4">
                <h5 className="text-white text-sm font-medium mb-4 flex items-center">
                  <FaEnvelope className="mr-2 text-[#9F3349]" />
                  Connect With Us
                </h5>
                <div className="flex space-x-4">
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
                      className="group relative"
                      whileHover={{
                        y: -5,
                        transition: { type: "spring", stiffness: 300 },
                      }}
                    >
                      {/* Luxury glow effect on hover */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/30 to-yellow-600/30 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative w-11 h-11 rounded-lg bg-black/70 backdrop-blur-sm flex items-center justify-center border-2 border-[#9F3349] group-hover:border-[#9F3349]/70 transition-colors duration-300">
                        <social.icon className="text-[#9F3349] group-hover:text-[#9F3349]/70 transition-colors duration-300" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links - 2 columns with luxury styling */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-medium mb-8 text-white flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#9F3349] flex items-center justify-center mr-3">
                <FaRegBuilding className="text-white text-base" />
              </div>
              Quick Links
            </h4>
            <ul className="space-y-5">
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
                    className="text-white hover:text-white text-sm flex items-center group-hover:translate-x-1 transform transition-transform duration-300"
                  >
                    <div className="w-0 h-px bg-earth-400 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Property Types - 2 columns with luxury styling */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-medium mb-8 text-white flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#9F3349] flex items-center justify-center mr-3">
                <FaRegHandshake className="text-white text-base" />
              </div>
              Property Types
            </h4>
            <ul className="space-y-5">
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
                    className="text-white hover:text-white transition-colors duration-300 text-sm flex items-center group-hover:translate-x-1 transform transition-transform duration-300"
                  >
                    <div className="w-0 h-px bg-earth-400 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info - 4 columns with luxury styling */}
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-medium mb-8 text-white flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#9F3349] flex items-center justify-center mr-3">
                <FaPhone className="text-white text-base" />
              </div>
              Contact Us
            </h4>

            <div className="space-y-6">
              {/* Luxury contact cards */}
              <div className="group relative">
                {/* Luxury glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-earth-400/20 to-earth-600/20  blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative  backdrop-blur-sm rounded-tl-[2rem] rounded-br-[2rem] p-5 border-2 border-[#9F3349] transition-colors duration-300">
                  <div className="flex">
                    <div className="w-12 h-12 rounded-full bg-[#9F3349] flex items-center justify-center mr-4 transition-colors duration-300">
                      <FaMapMarkerAlt className="text-white group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-1 text-lg">
                        Our Location
                      </h5>
                      <p className="text-white text-xs">
                        Business Bay, Dubai, United Arab Emirates
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative">
                {/* Luxury glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-earth-400/20 to-earth-600/20  blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative  backdrop-blur-sm rounded-tl-[2rem] rounded-br-[2rem] p-5 border-2 border-[#9F3349] transition-colors duration-300">
                  <div className="flex">
                    <div className="w-12 h-12 rounded-lg bg-[#9F3349] flex items-center justify-center mr-4 transition-colors duration-300">
                      <FaPhone className="text-white group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-1 text-lg">Call Us</h5>
                      <a
                        href="tel:+97144589090"
                        className="text-white text-xs hover:text-white group-hover:translate-x-1 transform transition-transform duration-300 flex items-center"
                      >
                        <div className="w-0 h-px bg-[#9F3349] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></div>
                        +971 4 458 9090
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative">
                {/* Luxury glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-earth-400/20 to-earth-600/20  blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative backdrop-blur-sm rounded-tl-[2rem] rounded-br-[2rem] p-5 border-2 border-[#9F3349] transition-colors duration-300">
                  <div className="flex">
                    <div className="w-12 h-12 rounded-lg bg-[#9F3349] flex items-center justify-center mr-4 transition-colors duration-300">
                      <FaEnvelope className="text-white group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h5 className="text-white font-medium mb-1 text-lg">
                        Email Us
                      </h5>
                      <a
                        href="mailto:info@ushre.com"
                        className="text-white text-xs hover:text-white group-hover:translate-x-1 transform transition-transform duration-300 flex items-center"
                      >
                        <div className="w-0 h-px bg-[#9F3349] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></div>
                        info@ushre.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter subscription with luxury styling */}
        <motion.div
          className="mt-20 relative group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Luxury glow effect on hover */}
          <div className="absolute -inset-1 bg-gradient-to-r from-earth-400/20 to-earth-600/20  blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative bg-black/40 backdrop-blur-sm rounded-tl-[2rem] rounded-br-[2rem] p-8 border-2 border-[#9F3349]  transition-colors duration-300">
            <div className="grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-2">
                <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#9F3349] flex items-center justify-center mr-3 ">
                    <FaEnvelope className="text-white text-sm" />
                  </div>
                  Stay Updated
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Subscribe to our newsletter for exclusive property updates, market insights, and luxury lifestyle content.
                </p>
              </div>
              <div className="md:col-span-3">
                <form className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full bg-black border-2 border-[#9F3349] rounded-lg px-4 py-3 text-white placeholder-white   focus:outline-none focus:ring-2 focus:ring-earth-500 focus:border-transparent transition-all duration-300"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <div className="w-0 border-b border-earth-500 group-focus-within:w-3 transition-all duration-300"></div>
                    </div>
                  </div>
                  <motion.button
                    type="submit"
                    className="relative overflow-hidden group/btn bg-[#9F3349] hover:bg-[#9F3349]/80 text-white rounded-lg px-6 py-3 font-medium transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Button background layers */}
                    
                    {/* Button text */}
                    <span className="relative flex items-center">
                      Subscribe
                      <svg className="ml-2 h-5 w-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Luxury decorative element */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-earth-400/70 to-transparent"></div>
      </div>

      {/* Bottom Bar with luxury styling */}
      <div className="relative border-t border-earth-800/70">
        <div className="w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[75vw] mx-auto relative z-10 py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white text-sm mb-6 md:mb-0 flex items-center">
            <FaRegCopyright className="mr-2" />
            <span>{new Date().getFullYear()} Union Square House Real Estate —</span>
            <span className="ml-1 px-2 py-0.5 bg-[#9F3349] rounded-md text-xs border border-earth-700/50">
              Regulated by RERA, Dubai
            </span>
          </div>
          <div className="text-white text-sm flex space-x-8">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors duration-300 relative group flex items-center"
            >
              <div className="w-0 h-px bg-[#9F3349] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></div>
              <span>Privacy Policy</span>
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-white transition-colors duration-300 relative group flex items-center"
            >
              <div className="w-0 h-px bg-[#9F3349] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></div>
              <span>Terms of Service</span>
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-white transition-colors duration-300 relative group flex items-center"
            >
              <div className="w-0 h-px bg-[#9F3349] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></div>
              <span>Sitemap</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
