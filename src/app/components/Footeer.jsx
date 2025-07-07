'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-earth-800 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and About */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <Image 
                src="/assets/ush_logo.svg" 
                alt="Union Square House" 
                width={150} 
                height={60}
                className="mb-4"
              />
              <p className="text-earth-200 text-sm leading-relaxed">
                Dubai's multi-award winning real estate agency, recognized for excellence in luxury property sales and leasing.
              </p>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              {[
                { icon: FaFacebookF, href: "https://facebook.com" },
                { icon: FaTwitter, href: "https://twitter.com" },
                { icon: FaInstagram, href: "https://instagram.com" },
                { icon: FaLinkedinIn, href: "https://linkedin.com" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-earth-700 flex items-center justify-center hover:bg-earth-600 transition-colors duration-300"
                >
                  <social.icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4 text-earth-100">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Properties", href: "/listings" },
                { name: "Our Agents", href: "/agents" },
                { name: "Contact", href: "/contact" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-earth-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Property Types */}
          <div>
            <h4 className="text-lg font-medium mb-4 text-earth-100">Property Types</h4>
            <ul className="space-y-2">
              {[
                { name: "Luxury Villas", href: "/listings?type=villas" },
                { name: "Apartments", href: "/listings?type=apartments" },
                { name: "Penthouses", href: "/listings?type=penthouses" },
                { name: "Off-Plan Projects", href: "/listings?type=off-plan" },
                { name: "Commercial", href: "/listings?type=commercial" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-earth-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-4 text-earth-100">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-earth-400 mt-1 mr-3" />
                <span className="text-earth-300 text-sm">Business Bay, Dubai, United Arab Emirates</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-earth-400 mr-3" />
                <a href="tel:+97144589090" className="text-earth-300 hover:text-white transition-colors duration-300 text-sm">
                  +971 4 458 9090
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-earth-400 mr-3" />
                <a href="mailto:info@ushre.com" className="text-earth-300 hover:text-white transition-colors duration-300 text-sm">
                  info@ushre.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-earth-700 py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-earth-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Union Square House Real Estate — Regulated by RERA, Dubai
          </div>
          <div className="text-earth-400 text-sm">
            <Link href="/privacy-policy" className="hover:text-white transition-colors duration-300 mr-4">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
