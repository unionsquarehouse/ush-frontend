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
import { useRouter } from "next/navigation";

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
    keyword: "", // Add keyword field
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
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
    setSearchForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle property type selection
  const handlePropertyTypeSelect = (typeName) => {
    setSearchForm((prev) => ({
      ...prev,
      propertyType: prev.propertyType === typeName ? "" : typeName,
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
      params.append("keyword", searchForm.keyword);
    }

    // Add listing type
    if (searchForm.listingType) {
      params.append("listingType", searchForm.listingType);
    }

    if (searchForm.propertyType) {
      params.append("type", searchForm.propertyType.toLowerCase());
    }

    if (searchForm.location) {
      params.append("location", searchForm.location);
    }

    if (searchForm.minPrice) {
      params.append("minPrice", searchForm.minPrice);
    }

    if (searchForm.maxPrice) {
      params.append("maxPrice", searchForm.maxPrice);
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
      {/* Futuristic overlay elements */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Content container */}
      <motion.div
        className="relative z-30 h-full flex flex-col justify-center items-center px-4 md:px-0"
        style={{ opacity }}
      >
        <div className="w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[75vw] mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white text-center mb-4 md:mb-6 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Luxury Real Estate <br className="md:hidden" />
            <span className="text-earth-300">in Dubai</span>
          </motion.h1>

          <motion.p
            className="mb-6 md:mb-8 lg:mb-10 text-earth-100 max-w-2xl mx-auto font-light text-center text-base md:text-lg lg:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Multi-award winning agency representing the finest properties across
            Dubai, from luxury villas to premium apartments and exclusive
            off-plan developments.
          </motion.p>

          {/* Interactive property search */}
          <motion.div
            className="w-full max-w-4xl mx-auto mb-6 md:mb-8 lg:mb-10 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <form onSubmit={handleSearch}>
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3 md:p-4 lg:p-5">
                <div className="relative">
                  <FaSearch className="absolute left-3 md:left-4 lg:left-5 top-1/2 transform -translate-y-1/2 text-earth-300 text-sm md:text-base lg:text-lg" />
                  <input
                    type="text"
                    placeholder="Search properties or locations..."
                    className="w-full bg-white/10 border border-white/20 rounded-lg py-3 md:py-4 lg:py-5 pl-10 md:pl-12 lg:pl-14 pr-16 md:pr-32 text-earth-100 placeholder-earth-300 focus:outline-none focus:ring-1 focus:ring-earth-400 text-base md:text-lg"
                    value={searchForm.keyword}
                    onChange={handleInputChange}
                  />
                  {searchForm.keyword && (
                    <button
                      type="button"
                      className="absolute right-16 md:right-24 lg:right-28 top-1/2 transform -translate-y-1/2 text-earth-300 hover:text-white"
                      onClick={() =>
                        setSearchForm((prev) => ({ ...prev, keyword: "" }))
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isSearching || !searchForm.keyword?.trim()}
                    className="absolute right-2 md:right-3 lg:right-4 top-1/2 transform -translate-y-1/2 bg-earth-600 hover:bg-earth-500 text-white px-3 md:px-4 lg:px-6 py-1.5 md:py-2 lg:py-2.5 rounded-lg font-medium transition-colors flex items-center disabled:bg-earth-700/70 disabled:cursor-not-allowed text-sm md:text-base lg:text-lg"
                  >
                    {isSearching ? (
                      <>
                        <FaSpinner className="mr-1 md:mr-2 animate-spin" />
                        <span className="hidden md:inline">Searching...</span>
                        <span className="md:hidden">...</span>
                      </>
                    ) : (
                      <>
                        <span>Search</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Stats circles */}
          <motion.div
            className="flex justify-center gap-3 md:gap-6 lg:gap-8 xl:gap-10 mb-6 md:mb-8 lg:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {[
              { value: "12+", label: "Years" },
              { value: "500+", label: "Properties" },
              { value: "5B+", label: "AED Portfolio" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-earth-200 group-hover:text-white transition-colors">
                  {stat.value}
                </span>
                <span className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base text-earth-300 text-center group-hover:text-earth-200 transition-colors px-1">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-6 justify-center w-full px-4 sm:px-0 sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="#contact"
              className="bg-earth-700 hover:bg-earth-600 text-white px-6 md:px-8 lg:px-10 py-3 md:py-3.5 lg:py-4 flex justify-center items-center rounded-lg transition-all hover:scale-105 font-medium relative overflow-hidden group text-sm md:text-base lg:text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Speak to an Agent</span>
              <span className="absolute inset-0 bg-gradient-to-r from-earth-600 to-earth-700 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            </motion.a>

            <motion.button
              onClick={() => setShowVideo(true)}
              className="border border-earth-300 hover:bg-earth-800/20 text-white px-6 md:px-8 lg:px-10 py-3 md:py-3.5 lg:py-4 rounded-lg transition-all hover:scale-105 flex items-center justify-center group text-sm md:text-base lg:text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-full bg-earth-600 flex items-center justify-center mr-2 group-hover:bg-earth-500 transition-colors">
                <FaPlay className="text-white text-[8px] md:text-xs lg:text-sm ml-0.5" />
              </span>
              Watch Showcase
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Improved scroll indicator */}
      <div className="hidden absolute bottom-8 left-0 right-0 lg:flex justify-center z-40">
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

      {/* Video modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6 lg:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-earth-800 rounded-xl overflow-hidden w-full max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl shadow-2xl border border-earth-700"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
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
              <div className="p-4 md:p-6 lg:p-8">
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-earth-100 mb-1 md:mb-2 lg:mb-3">
                  Dubai's Finest Properties
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-earth-300 mb-3 md:mb-4 lg:mb-6">
                  Explore our exclusive portfolio of luxury properties across
                  Dubai's most prestigious communities.
                </p>
                <div className="flex justify-end">
                  <motion.button
                    className="px-3 py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-3 bg-earth-600 text-white rounded-lg text-sm md:text-base lg:text-lg"
                    onClick={() => setShowVideo(false)}
                    whileHover={{ scale: 1.05, backgroundColor: "#5c5545" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
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
