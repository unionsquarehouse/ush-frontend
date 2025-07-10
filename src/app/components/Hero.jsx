"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  FaSearch,
  FaBuilding,
  FaHome,
  FaMapMarkerAlt,
  FaChevronDown,
  FaPlay,
  FaSpinner,
} from "react-icons/fa";
import { useRouter } from 'next/navigation';

const backgroundImages = [
  "/assets/hero-bg2.jpg",
  // '/assets/hero-bg1.jpg',
  // '/assets/hero-bg3.jpg',
];

const propertyTypes = [
  { name: "Apartments", icon: FaBuilding, count: 245 },
  { name: "Villas", icon: FaHome, count: 128 },
  { name: "Penthouses", icon: FaHome, count: 56 },
  { name: "Off-Plan", icon: FaBuilding, count: 89 },
];

const locations = [
  "Palm Jumeirah",
  "Downtown Dubai",
  "Dubai Marina",
  "Emirates Hills",
  "Jumeirah Beach Residence",
];

const priceRanges = [
  { min: 500000, max: 1000000, label: "500K - 1M" },
  { min: 1000000, max: 3000000, label: "1M - 3M" },
  { min: 3000000, max: 5000000, label: "3M - 5M" },
  { min: 5000000, max: 10000000, label: "5M - 10M" },
  { min: 10000000, max: null, label: "10M+" },
];

// Property listing types
const listingTypes = [
  { name: "For Sale", value: "sale" },
  { name: "For Rent", value: "rent" },
  { name: "Off-Plan", value: "off-plan" },
];

export default function Hero() {
  const router = useRouter();
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [searchActive, setSearchActive] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const heroRef = useRef(null);
  
  // Search form state
  const [searchForm, setSearchForm] = useState({
    listingType: "sale", // Default to "For Sale"
    propertyType: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    keyword: "" // Add keyword field
  });
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Background image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Mouse parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typing effect text
  const [displayText, setDisplayText] = useState("");
  const phrases = [
    "Luxury Villas",
    "Premium Apartments",
    "Exclusive Penthouses",
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const typeWriter = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        setDisplayText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        setTypingSpeed(50);
      } else {
        setDisplayText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        setTypingSpeed(100);
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    };

    const timer = setTimeout(typeWriter, typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex, typingSpeed]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle property type selection
  const handlePropertyTypeSelect = (typeName) => {
    setSearchForm(prev => ({
      ...prev,
      propertyType: prev.propertyType === typeName ? "" : typeName
    }));
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Build query parameters
    const params = new URLSearchParams();
    
    // Add keyword search
    if (searchForm.keyword) {
      params.append('keyword', searchForm.keyword);
    }
    
    // Add listing type
    if (searchForm.listingType) {
      params.append('listingType', searchForm.listingType);
    }
    
    if (searchForm.propertyType) {
      params.append('type', searchForm.propertyType.toLowerCase());
    }
    
    if (searchForm.location) {
      params.append('location', searchForm.location);
    }
    
    if (searchForm.minPrice) {
      params.append('minPrice', searchForm.minPrice);
    }
    
    if (searchForm.maxPrice) {
      params.append('maxPrice', searchForm.maxPrice);
    }
    
    // Simulate search delay for UX
    setTimeout(() => {
      // Navigate to listings page with search parameters
      router.push(`/listings?${params.toString()}`);
      setIsSearching(false);
    }, 800);
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="h-screen bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImages[currentBgIndex]}')`,
        transition: "background-image 1.5s ease-in-out",
      }}
    >
      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/0 z-10"></div>

      {/* Animated grid pattern with improved opacity */}
      <div className="absolute inset-0 z-20 opacity-15">
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

      {/* Enhanced floating elements with better blur */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-earth-600/10 blur-[100px] z-20"
        style={{
          x: useTransform(() => mousePosition.x * -30),
          y: useTransform(() => mousePosition.y * -30),
        }}
      ></motion.div>
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-earth-400/10 blur-[120px] z-20"
        style={{
          x: useTransform(() => mousePosition.x * 40),
          y: useTransform(() => mousePosition.y * 40),
        }}
      ></motion.div>

      {/* Decorative elements */}
      <div className="absolute left-10 top-1/3 w-px h-40 bg-gradient-to-b from-transparent via-earth-300/50 to-transparent z-20"></div>
      <div className="absolute right-10 top-1/4 w-px h-60 bg-gradient-to-b from-transparent via-earth-300/50 to-transparent z-20"></div>

      {/* Main content with improved layout */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-30"
        style={{ y, opacity }}
      >
        <div className="w-[90vw] md:w-[70vw] mx-auto text-center text-white">
          {/* Enhanced badge with gradient border */}
          <motion.div
            className="inline-block relative mb-6 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="absolute -inset-0.5 bg-gradient-to-r from-earth-400 to-earth-600 rounded-full opacity-75 blur-sm group-hover:opacity-100 transition duration-300"></span>
            <span className="relative inline-block px-5 py-1.5 bg-earth-800/80 backdrop-blur-sm rounded-full text-sm uppercase tracking-widest text-earth-100 border border-earth-700/50">
              Dubai's Premier Real Estate Agency
            </span>
          </motion.div>

          {/* Enhanced heading with decorative elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative lines */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-px bg-earth-400/70"></div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-px bg-earth-400/70"></div>
            
            <h1 className="font-light mb-6 leading-tight max-w-4xl mx-auto">
              Exceptional Properties for <br />
              <span className="text-[earth-200] relative">
                <span className="relative inline-block">
                  {displayText}
                  <span className="absolute right-0 top-0 h-full w-1 bg-earth-400 animate-blink"></span>
                </span>
              </span>
            </h1>
          </motion.div>

          {/* Enhanced description with gradient underline */}
          <motion.div
            className="mb-10 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-earth-100 max-w-2xl mx-auto font-light">
              Multi-award winning agency representing the finest properties across
              Dubai, from luxury villas to premium apartments and exclusive
              off-plan developments.
            </p>
            <div className="h-px w-24 mx-auto mt-6 bg-gradient-to-r from-transparent via-earth-400 to-transparent"></div>
          </motion.div>

          {/* Enhanced search container with glass morphism */}
          <motion.div
            className="max-w-4xl mx-auto mb-10 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <form onSubmit={handleSearch}>
              <div 
                className={`relative backdrop-blur-md rounded-xl border border-white/20 transition-all duration-500 overflow-hidden group ${
                  searchActive ? 'p-6' : 'p-4'
                }`}
              >
                {/* Glass morphism background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5"></div>
                
                {/* Search input with enhanced styling */}
                <div className="relative mb-4">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-300">
                    <FaSearch className="text-earth-300 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <input 
                    type="text" 
                    name="keyword"
                    placeholder="Search by property name, features or keywords" 
                    className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-10 pr-3 text-earth-100 placeholder-earth-300 focus:outline-none focus:ring-1 focus:ring-earth-400 transition-all duration-300"
                    value={searchForm.keyword}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && searchForm.keyword.trim()) {
                        e.preventDefault();
                        handleSearch(e);
                      }
                    }}
                  />
                  {searchForm.keyword && (
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-earth-300 hover:text-white transition-colors duration-300"
                      onClick={() => setSearchForm(prev => ({...prev, keyword: ""}))}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {/* Enhanced search button with gradient */}
                <motion.button
                  type="submit"
                  disabled={isSearching}
                  className="relative w-full py-3 rounded-lg hover:text-white font-medium transition-all duration-300 overflow-hidden group disabled:opacity-70 disabled:cursor-wait"
                  whileHover={{ scale: isSearching ? 1 : 1.02 }}
                  whileTap={{ scale: isSearching ? 1 : 0.98 }}
                >
                  {/* Button background layers */}
                  <span className="absolute inset-0 bg-earth-100"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-earth-500 to-earth-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  
                  {/* Button content */}
                  <span className="relative flex items-center justify-center text-earth-700 ">
                    {isSearching ? (
                      <>
                        <FaSpinner className="mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <FaSearch className="mr-2" />
                        Search {listingTypes.find(type => type.value === searchForm.listingType)?.name || 'Properties'}
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </form>
            
            {/* Enhanced floating data points with glass morphism */}
            <motion.div
              className="absolute -right-4 -top-4 w-24 h-24 rounded-full flex flex-col items-center justify-center text-white overflow-hidden group"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Glass background */}
              <div className="absolute inset-0 bg-earth-700/50 backdrop-blur-sm border border-earth-600/50"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-earth-600/30 to-earth-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <span className="relative text-2xl font-bold">500+</span>
              <span className="relative text-xs text-earth-200">Properties</span>
            </motion.div>

            <motion.div
              className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full flex flex-col items-center justify-center text-white overflow-hidden group"
              initial={{ scale: 0, rotate: 20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.4, duration: 0.5, type: "spring" }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Glass background */}
              <div className="absolute inset-0 bg-earth-700/50 backdrop-blur-sm border border-earth-600/50"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-earth-600/30 to-earth-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <span className="relative text-2xl font-bold">12+</span>
              <span className="relative text-xs text-earth-200">Years</span>
            </motion.div>
          </motion.div>

          {/* Enhanced CTA buttons with unique design */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* Speak to an Agent button */}
            <motion.a
              href="#contact"
              className="relative px-8 py-3 flex justify-center items-center rounded-lg transition-all overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button backgrounds */}
              <span className="absolute inset-0 bg-earth-700"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-earth-600 to-earth-700 transform -skew-x-10 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
              
              {/* Decorative elements */}
              <span className="absolute top-0 left-0 w-full h-full">
                <span className="absolute top-0 left-0 w-5 h-0.5 bg-earth-400 transform -translate-y-0.5"></span>
                <span className="absolute bottom-0 right-0 w-5 h-0.5 bg-earth-400 transform translate-y-0.5"></span>
              </span>
              
              {/* Button text */}
              <span className="relative z-10 font-medium text-white">Speak to an Agent</span>
            </motion.a>

            {/* Watch Showcase button */}
            <motion.button
              onClick={() => setShowVideo(true)}
              className="relative px-8 py-3 rounded-lg transition-all overflow-hidden flex items-center justify-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button backgrounds */}
              <span className="absolute inset-0 border border-earth-300"></span>
              <span className="absolute inset-0 bg-earth-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              
              {/* Play button */}
              <span className="relative w-8 h-8 rounded-full bg-earth-600 flex items-center justify-center mr-2 group-hover:bg-earth-500 transition-colors">
                <FaPlay className="text-white text-xs ml-0.5" />
              </span>
              
              {/* Button text */}
              <span className="relative font-medium text-white">Watch Showcase</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-40">
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
              className="w-10 h-10 border-2 border-white/60 rounded-full flex items-center justify-center group-hover:border-white transition-colors"
              animate={{ y: [0, 8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-2 h-2 bg-white/60 rounded-full group-hover:bg-white transition-colors"
                animate={{
                  opacity: [1, 0, 1],
                  scale: [1, 0.8, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </a>
        </motion.div>
      </div>

      {/* Enhanced video modal with glass morphism */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-4xl w-full overflow-hidden rounded-xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              {/* Glass morphism background */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-earth-400/30 to-earth-600/30 rounded-xl blur-sm"></div>
              <div className="relative bg-earth-800 rounded-xl overflow-hidden border border-earth-700">
                <div className="aspect-video bg-black relative">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/0gl9gBNTrVE" 
                    title="Breeze by Emaar | Private Beach Living at Dubai Creek Harbour" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6 backdrop-blur-sm bg-earth-800/90">
                  <h3 className="text-xl font-semibold text-earth-100 mb-2">Dubai's Finest Properties</h3>
                  <p className="text-earth-300 mb-4">Explore our exclusive portfolio of luxury properties across Dubai's most prestigious communities.</p>
                  <div className="flex justify-end">
                    <motion.button 
                      className="px-4 py-2 bg-earth-600 text-white rounded-lg relative overflow-hidden group"
                      onClick={() => setShowVideo(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-earth-500 to-earth-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative">Close</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add scan lines animation CSS */}
      <style jsx>{`
        .scan-lines {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(255, 255, 255, 0.05) 50%
          );
          background-size: 100% 4px;
          animation: scanlines 0.5s linear infinite;
        }

        @keyframes scanlines {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 4px;
          }
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </section>
  );
}
