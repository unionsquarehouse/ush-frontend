"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
  FaCity,
  FaGem,
  FaWater,
  FaGolfBall,
  FaUsers,
} from "react-icons/fa";
import { BsArrowRight, BsArrowLeft, BsBuilding, BsGeoAlt, BsStars, BsZoomIn } from "react-icons/bs";

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
    color: "#7d7460",
    category: "waterfront",
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
    color: "#645c4c",
    category: "family",
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
    color: "#968b74",
    category: "waterfront",
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
    color: "#aca189",
    category: "golf",
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
    color: "#4d473b",
    category: "golf",
  },
];

export default function CommunitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Cursor light state (smoothed)
  const containerRef = useRef(null);
  const targetPosRef = useRef({ x: 0, y: 0 });
  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });

  const categories = [
    { id: "all", name: "All Communities", icon: <FaCity /> },
    { id: "luxury", name: "Ultra Luxury", icon: <FaGem /> },
    { id: "waterfront", name: "Waterfront", icon: <FaWater /> },
    { id: "golf", name: "Golf Communities", icon: <FaGolfBall /> },
    { id: "family", name: "Family Living", icon: <FaUsers /> },
  ];

  // Auto-scroll carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredCommunities.length);
    }, 4000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoPlaying]);

  // Track raw mouse and set target position relative to section
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const onMove = (e) => {
      const rect = node.getBoundingClientRect();
      targetPosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    node.addEventListener("mousemove", onMove);
    return () => node.removeEventListener("mousemove", onMove);
  }, []);

  // Smoothly interpolate light position (lerp) for premium feel
  useEffect(() => {
    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      setLightPos((prev) => {
        const nx = lerp(prev.x, targetPosRef.current.x, 0.12);
        const ny = lerp(prev.y, targetPosRef.current.y, 0.12);
        return { x: nx, y: ny };
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const filteredCommunities =
    selectedCategory === "all"
      ? communities
      : communities.filter((c) => c.category === selectedCategory);

  // Safety: reset activeIndex if filter reduces list
  useEffect(() => {
    if (activeIndex >= filteredCommunities.length) setActiveIndex(0);
  }, [filteredCommunities.length, activeIndex]);

  return (
    <section
      ref={containerRef}
      className="py-32 bg-black relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Cursor-following light (subtle) */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(240px 240px at ${lightPos.x}px ${lightPos.y}px, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 20%, transparent 60%)`,
          transition: "background 120ms linear",
        }}
      />

      {/* Animated base background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-5" />
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(194,178,128,0.20) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(134,108,76,0.20) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(172,137,94,0.20) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        />
      </div>

      <div className="w-[75vw] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className=" flex justify-center items-center mb-4 text-whitie">
            <span className="text-brand  mr-2">Our</span>{" "}
            Communities
          </h2>
         
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-white max-w-3xl mx-auto leading-relaxed"
          >
            Discover where luxury meets lifestyle in Dubai's most prestigious neighborhoods
          </motion.p>
        </motion.div>

     

        {/* Carousel */}
        <div className="relative">
          {/* Featured card */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative">
                <motion.div whileHover={{ scale: 1.02 }} className="relative h-96 lg:h-[500px] overflow-hidden shadow-2xl ">
                  <Image src={filteredCommunities[activeIndex]?.image} alt={filteredCommunities[activeIndex]?.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Floating stats */}
                  <div className="absolute top-6 left-6 space-y-3">
                    <div className="bg-brand backdrop-blur-md text-white px-4 py-2 text-sm flex items-center gap-2">
                      <FaGem className="text-white" />
                      {filteredCommunities[activeIndex]?.priceRange}
                    </div>
                    <div className="bg-brand2 backdrop-blur-md text-white px-4 py-2 text-sm flex items-center gap-2 ">
                      <FaHome className="text-white" />
                      {filteredCommunities[activeIndex]?.properties} Properties
                    </div>
                  </div>

                 
                </motion.div>

                {/* Decorative blur orbs */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-xl" />
              </div>

              {/* Content */}
              <div className="space-y-8">
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                  <div className="w-fit px-4 py-2 bg-gradient-to-r from-brand/20 to-brand-hover/20 rounded-full text-brand text-sm font-medium mb-4 flex items-center gap-2">
                    <FaGem className="text-brand" />
                    Featured Community
                  </div>

                  <h3 className="text-5xl font-bold text-white mb-6">
                    {filteredCommunities[activeIndex]?.name}
                  </h3>

                  <p className="text-xl text-slate-300 leading-relaxed mb-8">
                    {filteredCommunities[activeIndex]?.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {filteredCommunities[activeIndex]?.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.08 }}
                        className="flex items-center space-x-3 p-3 bg-slate-800/50 border border-slate-700"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-brand to-brand-hover rounded-full flex items-center justify-center text-white text-sm">
                          <FaChevronRight />
                        </div>
                        <span className="text-slate-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(194, 178, 128, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-brand to-brand-hover text-white font-bold shadow-lg "
                    >
                      Explore Properties
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 border border-earth-600 text-earth-300  hover:bg-earth-800/50 transition-all duration-300"
                    >
                      Schedule Visit
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Carousel controls */}
          <div className="flex justify-center items-center space-x-6 mb-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                setActiveIndex((prev) => (prev - 1 + filteredCommunities.length) % filteredCommunities.length)
              }
              className="w-12 h-12 bg-slate-800 border border-slate-600x flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-all duration-300"
              aria-label="Previous"
            >
              ←
            </motion.button>

            <div className="flex space-x-3">
              {filteredCommunities.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-gradient-to-r from-brand to-brand2 scale-125"
                      : "bg-slate-600 hover:bg-slate-500"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveIndex((prev) => (prev + 1) % filteredCommunities.length)}
              className="w-12 h-12 bg-slate-800 border border-slate-600  flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-all duration-300"
              aria-label="Next"
            >
              →
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
