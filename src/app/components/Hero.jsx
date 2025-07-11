"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaSearch, FaChevronDown, FaArrowRight } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const backgroundImages = [
  "/assets/hero-bg2.jpg",
];

const propertyTypes = [
  "Apartments",
  "Villas",
  "Penthouses",
  "Off-Plan",
];

const locations = [
  "Palm Jumeirah",
  "Downtown Dubai",
  "Dubai Marina",
  "Emirates Hills",
  "Jumeirah Beach Residence",
];

export default function Hero() {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const heroRef = useRef(null);
  
  // Typewriter effect
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const words = ["Discover Luxury", "Discover Exclusive", "Discover Premium"];
  const period = 2000;
  
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];
      
      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );
      
      setTypingSpeed(isDeleting ? 100 : 150);
      
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), period);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };
    
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);
  
  // Search form state
  const [searchForm, setSearchForm] = useState({
    listingType: "sale",
    propertyType: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    keyword: ""
  });
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Build query parameters
    const params = new URLSearchParams();
    
    Object.entries(searchForm).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    // Simulate search delay for UX
    setTimeout(() => {
      router.push(`/listings?${params.toString()}`);
      setIsSearching(false);
    }, 800);
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="h-screen relative overflow-hidden "
    >
      {/* Background with parallax effect */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('${backgroundImages[0]}')`,
          scale: useTransform(scrollYProgress, [0, 1], [1.1, 1]),
        }}
      >
        {/* Simple dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-earth-900/60 to-earth-900/70"></div>
      </motion.div>

      {/* Main content container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div 
          className="container mx-auto px-6 max-w-6xl"
          style={{ opacity }}
        >
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 mr-2 font-ivy">
              
              <span className="text-yellow-800 inline-block min-h-[1.2em] min-w-[7ch]">
                {text}
                <span className="animate-pulse">|</span>
              </span> <br/>
              Dubai Properties
            </h1>
            <p className="text-xl text-earth-100/80 max-w-2xl mx-auto">
              Curated collection of the most prestigious properties in Dubai's most coveted locations.
            </p>
          </motion.div>
          
          {/* Minimalist search form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="backdrop-blur-md bg-earth-800/30 border border-earth-700/50 rounded-lg overflow-hidden">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row">
                {/* Main search input */}
                <div className="flex-1 relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-earth-400">
                    <FaSearch />
                  </div>
                  <input 
                    type="text" 
                    name="keyword"
                    placeholder="Search properties..." 
                    className="w-full bg-transparent border-0 h-14 pl-12 pr-4 text-white placeholder-earth-400 focus:outline-none"
                    value={searchForm.keyword}
                    onChange={handleInputChange}
                  />
                </div>
                
                {/* Location dropdown */}
                <div className="md:w-48 relative border-t md:border-t-0 md:border-l border-earth-700/50">
                  <select
                    name="location"
                    value={searchForm.location}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-0 h-14 pl-4 pr-8 text-white appearance-none focus:outline-none"
                  >
                    <option value="" className="bg-earth-800">Location</option>
                    {locations.map(location => (
                      <option key={location} value={location} className="bg-earth-800">{location}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-earth-400 pointer-events-none">
                    <FaChevronDown size={12} />
                  </div>
                </div>
                
                {/* Search button */}
                <button
                  type="submit"
                  disabled={isSearching}
                  className="h-14 px-8 bg-earth-600 text-white font-medium transition-colors hover:bg-earth-500 flex items-center justify-center"
                >
                  {isSearching ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching
                    </span>
                  ) : (
                    <span>Search</span>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
          
          {/* Property types */}
          <motion.div
            className="flex justify-center mt-8 space-x-6 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {propertyTypes.map((type) => (
              <Link
                key={type}
                href={`/listings?type=${type.toLowerCase()}`}
                className="px-4 py-2 text-earth-200 hover:text-white transition-colors"
              >
                {type}
              </Link>
            ))}
            <Link
              href="/listings"
              className="px-4 py-2 text-earth-400 hover:text-white transition-colors flex items-center"
            >
              View All <FaArrowRight className="ml-2 text-xs" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Minimal scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <a
          href="#about"
          className="flex flex-col items-center"
          aria-label="Scroll to explore"
        >
          <motion.div
            className="w-8 h-12 border border-earth-500/40 rounded-full flex items-center justify-center"
            animate={{ y: [0, 5, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-earth-400 rounded-full"
              animate={{
                y: [0, 4, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
