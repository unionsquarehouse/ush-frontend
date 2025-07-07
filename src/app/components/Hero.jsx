'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const backgroundImages = [
  '/assets/hero-bg2.jpg',
];

export default function Hero() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="h-screen bg-cover bg-center relative overflow-hidden"
      style={{ 
        backgroundImage: `url('${backgroundImages[currentBgIndex]}')`,
        transition: 'background-image 1s ease-in-out'
      }}
    >
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="w-[90vw] md:w-[85vw] mx-auto text-center text-white">
          <motion.span 
            className="inline-block px-4 py-1 mb-6 border border-earth-300 text-earth-100 text-sm uppercase tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Dubai's Premier Real Estate Agency
          </motion.span>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-light mb-6 leading-tight max-w-4xl mx-auto">
              Exceptional Properties for <span className="text-earth-200">Exceptional</span> People
            </h1>
          </motion.div>
          
          <motion.p 
            className="mb-10 text-earth-100 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Multi-award winning agency representing the finest properties across Dubai, 
            from luxury villas to premium apartments and exclusive off-plan developments.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href="#contact"
              className="bg-earth-700 hover:bg-earth-800 text-white px-8 py-3 rounded-lg transition-all hover:scale-105 font-medium"
            >
              Speak to an Agent
            </a>
            <a
              href="#projects"
              className="border border-earth-300 hover:bg-earth-800/20 text-white px-8 py-3 rounded-lg transition-all hover:scale-105"
            >
              Explore Properties
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Improved scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <a 
            href="#about" 
            className="group flex flex-col items-center"
            aria-label="Scroll to explore"
          >
            <span className="text-white/80 text-sm uppercase tracking-widest mb-2 group-hover:text-white transition-colors">
              Discover
            </span>
            <motion.div
              className="w-8 h-8 border-2 border-white/60 rounded-full flex items-center justify-center group-hover:border-white transition-colors"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <motion.div 
                className="w-1 h-1 bg-white/60 rounded-full group-hover:bg-white transition-colors"
                animate={{ 
                  opacity: [1, 0, 1],
                  scale: [1, 0.8, 1]
                }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
