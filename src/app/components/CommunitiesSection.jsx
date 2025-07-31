"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import {
  FaHome,
  FaBuilding,
  FaTree,
  FaSwimmingPool,
  FaInfoCircle,
  FaChevronRight,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  BsArrowRight,
  BsArrowLeft,
  BsBuilding,
  BsGeoAlt,
  BsStars,
  BsZoomIn,
} from "react-icons/bs";
import AnimatedButton from "./ui/AnimatedButton";

const communities = [
  {
    id: 1,
    name: "Palm Jumeirah",
    description:
      "Iconic man-made island featuring luxury villas and apartments with private beach access and stunning sea views.",
    image: "/assets/communities/palm-jumeirah.jpg",
    properties: 120,
    priceRange: "AED 2.5M - 100M",
    features: ["Beachfront", "Luxury Hotels", "Fine Dining"],
    color: "#7d7460", // earth-600
    mapLink: "https://maps.app.goo.gl/5KQvnHE5RGdQFGZS7",
    virtualTour: "https://www.youtube.com/watch?v=example1",
    contactAgent: "+971501234567",
  },
  {
    id: 2,
    name: "Downtown Dubai",
    description:
      "Home to Burj Khalifa and Dubai Mall, offering premium apartments with world-class amenities in the heart of the city.",
    image: "/assets/communities/downtown-dubai.jpg",
    properties: 85,
    priceRange: "AED 1.2M - 15M",
    features: ["Urban Living", "Shopping", "Nightlife"],
    color: "#645c4c", // earth-700
  },
  {
    id: 3,
    name: "Dubai Marina",
    description:
      "Stunning waterfront community with luxury high-rise apartments, yacht club access, and vibrant promenade living.",
    image: "/assets/communities/dubai-marina.jpg",
    properties: 150,
    priceRange: "AED 800K - 20M",
    features: ["Waterfront", "Yacht Club", "Beach Access"],
    color: "#968b74", // earth-500
  },
  {
    id: 4,
    name: "Arabian Ranches",
    description:
      "Exclusive desert-themed villa community with championship golf course, equestrian center and family-friendly amenities.",
    image: "/assets/communities/arabian-ranches.jpg",
    properties: 65,
    priceRange: "AED 3.5M - 18M",
    features: ["Golf Course", "Equestrian Center", "Family-friendly"],
    color: "#aca189", // earth-400
  },
  {
    id: 5,
    name: "Dubai Hills Estate",
    description:
      "Prestigious community with lush parks, championship golf course and luxury homes offering modern family living.",
    image: "/assets/communities/dubai-hills-estate.jpeg",
    properties: 95,
    priceRange: "AED 1.8M - 30M",
    features: ["Golf Views", "Central Park", "Modern Living"],
    color: "#4d473b", // earth-800
  },
];

export default function CommunitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const containerRef = useRef(null);
  const carouselRef = useRef(null);

  const categories = [
    { id: 'all', name: 'All Communities', icon: '🏙️' },
    { id: 'luxury', name: 'Ultra Luxury', icon: '💎' },
    { id: 'waterfront', name: 'Waterfront', icon: '🌊' },
    { id: 'golf', name: 'Golf Communities', icon: '⛳' },
    { id: 'family', name: 'Family Living', icon: '👨‍👩‍👧‍👦' }
  ];

  // Auto-scroll carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % communities.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const filteredCommunities = selectedCategory === 'all' 
    ? communities 
    : communities.filter(c => c.category === selectedCategory);

  return (
    <section 
      ref={containerRef}
      className="py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <motion.div 
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 183, 77, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl shadow-2xl">
                🏙️
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur opacity-30 animate-pulse"></div>
            </div>
          </motion.div>

          <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-orange-300 bg-clip-text text-transparent">
            Dubai's Finest
          </h2>
          <h3 className="text-3xl md:text-4xl font-light text-slate-300 mb-8">
            Exclusive Communities
          </h3>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            Discover where luxury meets lifestyle in Dubai's most prestigious neighborhoods
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 shadow-lg shadow-yellow-500/25'
                  : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:bg-slate-700/50 hover:border-slate-600'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Main Carousel */}
        <div className="relative">
          {/* Featured Community Showcase */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image Side */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={filteredCommunities[activeIndex]?.image}
                    alt={filteredCommunities[activeIndex]?.name}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Floating Stats */}
                  <div className="absolute top-6 left-6 space-y-3">
                    <div className="bg-black/30 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm">
                      💰 {filteredCommunities[activeIndex]?.priceRange}
                    </div>
                    <div className="bg-black/30 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm">
                      🏠 {filteredCommunities[activeIndex]?.properties} Properties
                    </div>
                  </div>

                  {/* Virtual Tour Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-slate-900 text-2xl shadow-lg"
                  >
                    👁️
                  </motion.button>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-xl"></div>
              </div>

              {/* Content Side */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full text-yellow-400 text-sm font-medium mb-4">
                    ⭐ Featured Community
                  </div>
                  
                  <h3 className="text-5xl font-bold text-white mb-6">
                    {filteredCommunities[activeIndex]?.name}
                  </h3>
                  
                  <p className="text-xl text-slate-300 leading-relaxed mb-8">
                    {filteredCommunities[activeIndex]?.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {filteredCommunities[activeIndex]?.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-slate-900 text-sm">
                          ✓
                        </div>
                        <span className="text-slate-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 183, 77, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold rounded-xl shadow-lg"
                    >
                      Explore Properties
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 border border-slate-600 text-slate-300 rounded-xl hover:bg-slate-800/50 transition-all duration-300"
                    >
                      Schedule Visit
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Carousel Navigation */}
          <div className="flex justify-center items-center space-x-6 mb-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveIndex((prev) => (prev - 1 + filteredCommunities.length) % filteredCommunities.length)}
              className="w-12 h-12 bg-slate-800 border border-slate-600 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-all duration-300"
            >
              ←
            </motion.button>

            {/* Dots */}
            <div className="flex space-x-3">
              {filteredCommunities.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 scale-125'
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveIndex((prev) => (prev + 1) % filteredCommunities.length)}
              className="w-12 h-12 bg-slate-800 border border-slate-600 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-all duration-300"
            >
              →
            </motion.button>
          </div>

          {/* Community Grid Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {filteredCommunities.slice(0, 3).map((community, index) => (
              <motion.div
                key={community.id}
                whileHover={{ y: -10, scale: 1.02 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group cursor-pointer"
              >
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-600 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={community.image}
                      alt={community.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Hover Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-yellow-500/20 to-transparent"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-2">{community.name}</h4>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{community.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-400 font-semibold">{community.priceRange}</span>
                      <span className="text-slate-500 text-sm">{community.properties} units</span>
                    </div>
                  </div>
                </div>

                {/* Glow Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                  className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl blur-xl -z-10"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
