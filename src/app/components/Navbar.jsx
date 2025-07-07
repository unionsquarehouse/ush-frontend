'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  const nav = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Listings', href: '/listings' },
    { name: 'Agents', href: '/agents' },
    { name: 'Contact', href: '/contact' },
  ];
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-earth-50 shadow' : 'bg-transparent'
    }`}>
      <div className="w-[90vw] md:w-[85vw] mx-auto flex justify-between items-center p-6">
        <Link href="/" className="flex items-center">
          <div className="h-10 w-auto relative">
            {scrolled ? (
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
        <nav className="space-x-6">
          {nav.map(n => {
            const isActive = pathname === n.href || 
                            (n.href !== '/' && pathname.startsWith(n.href));
            
            return (
              <Link 
                key={n.href} 
                href={n.href} 
                className={`transition-colors ${
                  scrolled
                    ? (isActive 
                        ? 'text-earth-800 font-medium' 
                        : 'text-earth-600 hover:text-earth-800')
                    : (isActive 
                        ? 'text-white font-medium' 
                        : 'text-gray-200 hover:text-white')
                }`}
              >
                {n.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
