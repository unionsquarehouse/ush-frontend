
"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BsArrowLeft, BsArrowRight, BsBuilding, BsPlus } from 'react-icons/bs';
import { FaStar, FaAward, FaCalendarAlt, FaChartLine } from 'react-icons/fa';

const developers = [
  {
    id: 1,
    name: "Emaar Properties",
    logo: "/assets/emaar_logo.png",
    description: "Dubai's premier developer known for iconic projects like Burj Khalifa and Dubai Mall, setting new standards in luxury real estate development across the region.",
    established: 1997,
    projects: 42,
    rating: 4.8,
    featured: ["Burj Khalifa", "Dubai Mall", "Downtown Dubai"],
    color: "#7d7460" // earth-600
  },
  {
    id: 2,
    name: "DAMAC Properties",
    logo: "/assets/damac_logo.png",
    description: "Luxury developer with prestigious residential and commercial projects, known for partnerships with global brands like Versace, Fendi, and Trump Organization.",
    established: 2002,
    projects: 35,
    rating: 4.6,
    featured: ["DAMAC Hills", "AYKON City", "DAMAC Towers"],
    color: "#645c4c" // earth-700
  },
  {
    id: 3,
    name: "Nakheel",
    logo: "/assets/nakheel_logo.png",
    description: "Creator of Palm Jumeirah and other iconic waterfront developments, transforming Dubai's coastline with innovative and ambitious engineering projects.",
    established: 2000,
    projects: 28,
    rating: 4.7,
    featured: ["Palm Jumeirah", "Deira Islands", "The World Islands"],
    color: "#968b74" // earth-500
  },
  // {
  //   id: 4,
  //   name: "Meraas",
  //   logo: "/assets/meraas_logo.png",
  //   description: "Developer focused on creating unique lifestyle destinations and experiences",
  //   established: 2007,
  //   projects: 22,
  //   rating: 4.9,
  //   featured: ["Bluewaters Island", "City Walk", "La Mer"],
  //   color: "#aca189" // earth-400
  // },
  // {
  //   id: 5,
  //   name: "Dubai Properties",
  //   logo: "/assets/dubai_properties_logo.png",
  //   description: "Developer of mixed-use destinations and waterfront communities",
  //   established: 2004,
  //   projects: 30,
  //   rating: 4.5,
  //   featured: ["Jumeirah Beach Residence", "Business Bay", "Culture Village"],
  //   color: "#4d473b" // earth-800
  // }
];

export default function DevelopersSection() {
  const [activeDeveloper, setActiveDeveloper] = useState(0);
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const nextDeveloper = () => {
    setActiveDeveloper((prev) => (prev + 1) % developers.length);
  };
  
  const prevDeveloper = () => {
    setActiveDeveloper((prev) => (prev - 1 + developers.length) % developers.length);
  };
  
  // Auto-rotate carousel unless hovering
  useEffect(() => {
    if (isHovering) return;
    
    const timer = setTimeout(() => {
      nextDeveloper();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [activeDeveloper, isHovering]);

  return (
    <section 
      className="relative py-32 bg-earth-900 text-white" 
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Accent color circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-earth-600/20 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-earth-500/20 blur-3xl"></div>
      
      <motion.div 
        style={{ opacity }}
        className="w-[90vw] md:w-[85vw] mx-auto  relative z-10"
      >
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-semibold mb-4">
            <span className="text-earth-400">Visionary</span> Developers
          </h2>
          <div className="h-0.5 w-24 bg-earth-500 mx-auto mb-6"></div>
          <p className="text-xl text-earth-200 max-w-2xl mx-auto">
            The masterminds behind Dubai's architectural marvels
          </p>
        </motion.div>
        
        {/* Developer showcase with fixed container */}
        <div className="relative pb-24">
          {/* Current developer display */}
          <div className="overflow-hidden">
            <div 
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeDeveloper * 100}%)` }}
            >
              <div className="flex">
                {developers.map((developer, index) => (
                  <div key={developer.id} className="w-full flex-shrink-0 ">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Left column - Logo and stats */}
                      <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-6">
                        {/* Logo container */}
                        <div className="relative w-40 h-40 mb-2 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 shadow-xl">
                          <Image 
                            src={developer.logo}
                            alt={`${developer.name} logo`}
                            fill
                            className="object-contain p-3 invert brightness-0 filter"
                          />
                          <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-earth-500/10"></div>
                        </div>
                        
                        {/* Stats */}
                        <div className="w-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 shadow-xl">
                          <h3 className="text-xl font-medium mb-5 flex items-center">
                            <span className="w-4 h-0.5 bg-earth-500 mr-2"></span>
                            Key Metrics
                          </h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-earth-800 flex items-center justify-center mr-3">
                                <FaCalendarAlt className="text-earth-400" />
                              </div>
                              <div>
                                <span className="text-earth-300 text-sm">Established</span>
                                <p className="text-xl font-medium">{developer.established}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-earth-800 flex items-center justify-center mr-3">
                                <BsBuilding className="text-earth-400" />
                              </div>
                              <div>
                                <span className="text-earth-300 text-sm">Projects</span>
                                <p className="text-xl font-medium">{developer.projects}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-earth-800 flex items-center justify-center mr-3">
                                <FaStar className="text-earth-400" />
                              </div>
                              <div>
                                <span className="text-earth-300 text-sm">Rating</span>
                                <div className="flex items-center">
                                  <span className="text-xl font-medium mr-2">{developer.rating}</span>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <FaStar 
                                        key={i} 
                                        className={i < Math.floor(developer.rating) ? "text-earth-400" : "text-earth-800"} 
                                        size={14} 
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right column - Content */}
                      <div className="lg:col-span-8">
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl h-full">
                          <h3 className="text-3xl font-semibold mb-2">{developer.name}</h3>
                          <div className="flex items-center mb-4">
                            <div className="h-0.5 w-8 bg-earth-500 mr-2"></div>
                            <span className="text-earth-300 text-sm">Premium Developer</span>
                          </div>
                          
                          <p className="text-earth-200 mb-6 text-base leading-relaxed">
                            {developer.description}
                          </p>
                          
                          <div className="mb-6">
                            <h4 className="text-lg font-medium mb-4 flex items-center">
                              <FaAward className="text-earth-400 mr-2" />
                              <span>Signature Projects</span>
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {developer.featured.map((project, idx) => (
                                <div 
                                  key={idx}
                                  className="group relative overflow-hidden rounded-lg aspect-video bg-earth-800/40 border border-white/10"
                                >
                                  {/* Project background image */}
                                  <Image
                                    src={`/assets/${project.toLowerCase().replace(/\s+/g, '_')}.jpg`}
                                    alt={project}
                                    fill
                                    className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-earth-900/40 to-transparent"></div>
                                  <div className="absolute inset-0 bg-earth-600/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
                                  <div className="absolute bottom-0 left-0 p-3 w-full">
                                    <h5 className="text-white text-sm font-medium group-hover:text-white relative z-10">{project}</h5>
                                  </div>
                                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <BsArrowRight className="text-white" size={20} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-3">
                            <Link 
                              href={`/developers/${developer.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="px-4 py-2 rounded-lg text-sm font-medium bg-earth-600 text-white hover:bg-earth-500 transition-colors flex items-center gap-1"
                            >
                              View Portfolio
                              <BsArrowRight size={14} />
                            </Link>
                            
                            <Link 
                              href={`/developers/${developer.name.toLowerCase().replace(/\s+/g, '-')}/projects`}
                              className="px-4 py-2 rounded-lg text-sm font-medium border border-white/20 text-white hover:bg-white/10 transition-colors flex items-center gap-1"
                            >
                              All Projects
                              <BsPlus size={16} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Navigation controls */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center mt-12 gap-6">
            <button 
              onClick={prevDeveloper}
              className="w-12 h-12 rounded-full flex items-center justify-center border border-white/20 text-white hover:bg-earth-700 transition-colors"
              aria-label="Previous developer"
            >
              <BsArrowLeft size={20} />
            </button>
            
            <div className="flex gap-3">
              {developers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDeveloper(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeDeveloper 
                      ? 'bg-earth-500' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to developer ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextDeveloper}
              className="w-12 h-12 rounded-full flex items-center justify-center border border-white/20 text-white hover:bg-earth-700 transition-colors"
              aria-label="Next developer"
            >
              <BsArrowRight size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}






