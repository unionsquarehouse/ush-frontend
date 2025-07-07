"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  FaMapMarkerAlt,
  FaHome,
  FaBuilding,
  FaTree,
  FaSwimmingPool,
  FaInfoCircle,
  FaChevronRight,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import {
  BsArrowRight,
  BsArrowLeft,
  BsBuilding,
  BsGeoAlt,
  BsStars,
  BsZoomIn,
} from "react-icons/bs";

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
  const [activeCommunity, setActiveCommunity] = useState(0);
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showImageZoom, setShowImageZoom] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const nextCommunity = () => {
    setActiveCommunity((prev) => (prev + 1) % communities.length);
    // Reset all modals when changing communities
    setShowVirtualTour(false);
    setShowContactModal(false);
    setSelectedFeature(null);
    setShowImageZoom(false);
  };

  const prevCommunity = () => {
    setActiveCommunity(
      (prev) => (prev - 1 + communities.length) % communities.length
    );
    // Reset all modals when changing communities
    setShowVirtualTour(false);
    setShowContactModal(false);
    setSelectedFeature(null);
    setShowImageZoom(false);
  };

  // Auto-rotate carousel unless user is interacting
  useEffect(() => {
    if (
      isHovering ||
      showVirtualTour ||
      showContactModal ||
      selectedFeature ||
      showImageZoom
    )
      return;

    const timer = setTimeout(() => {
      nextCommunity();
    }, 5000);

    return () => clearTimeout(timer);
  }, [
    activeCommunity,
    isHovering,
    showVirtualTour,
    showContactModal,
    selectedFeature,
    showImageZoom,
  ]);

  const handleContactAgent = () => {
    setShowContactModal(true);
  };

  const handleVirtualTour = () => {
    setShowVirtualTour(true);
  };

  const handleFeatureClick = (feature, idx) => {
    setSelectedFeature({ feature, idx });
  };

  const handleImageZoom = () => {
    setShowImageZoom(true);
  };

  return (
    <section
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-earth-900 text-white"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
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
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Interactive floating elements */}
      <div className="absolute top-1/4 right-[5%] z-10">
        <motion.div
          className="w-16 h-16 rounded-full bg-earth-600/30 backdrop-blur-sm border border-earth-500/30 flex items-center justify-center cursor-pointer"
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(125, 116, 96, 0.5)",
          }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            backgroundColor: { duration: 0.3 },
          }}
          onClick={() => window.open("https://maps.google.com", "_blank")}
        >
          <BsGeoAlt size={24} className="text-white" />
        </motion.div>
      </div>

      <div className="absolute bottom-1/4 left-[5%] z-10">
        <motion.div
          className="w-16 h-16 rounded-full bg-earth-600/30 backdrop-blur-sm border border-earth-500/30 flex items-center justify-center cursor-pointer"
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(125, 116, 96, 0.5)",
          }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
            backgroundColor: { duration: 0.3 },
          }}
          onClick={() => window.open("/communities", "_self")}
        >
          <BsBuilding size={24} className="text-white" />
        </motion.div>
      </div>

      <motion.div
        style={{ opacity }}
        className="w-[90vw] md:w-[70vw] mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
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
            <span className="text-earth-400">Explore</span> Dubai Communities
          </h2>
          <div className="h-0.5 w-24 bg-earth-500 mx-auto mb-6"></div>
          <p className="text-xl text-earth-300 max-w-2xl mx-auto">
            Discover Dubai's most prestigious neighborhoods and find your
            perfect home
          </p>
        </motion.div>

        {/* Community showcase with fixed container */}
        <div className="relative pb-24">
          {/* Current community display */}
          <div className="overflow-hidden">
            <div
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeCommunity * 100}%)` }}
            >
              <div className="flex">
                {communities.map((community, index) => (
                  <div key={community.id} className="w-full flex-shrink-0 px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Left column - Image and quick stats */}
                      <div className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-6">
                        {/* Community image container with interactive elements */}
                        <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-xl border border-earth-700 group">
                          <Image
                            src={community.image}
                            alt={community.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 via-earth-900/30 to-transparent"></div>

                          {/* Interactive hotspots */}
                          <div className="absolute inset-0">
                            {/* Virtual Tour Button */}
                            <motion.button
                              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-earth-600/80 backdrop-blur-sm flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={handleVirtualTour}
                              aria-label="View virtual tour"
                            >
                              <BsZoomIn className="text-white" />
                            </motion.button>

                            {/* Map Location Button */}
                            <motion.button
                              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-earth-600/80 backdrop-blur-sm flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                window.open(community.mapLink, "_blank")
                              }
                              aria-label="View on map"
                            >
                              <BsGeoAlt className="text-white" />
                            </motion.button>

                            {/* Contact Agent Button */}
                            <motion.button
                              className="absolute bottom-20 right-4 w-10 h-10 rounded-full bg-earth-600/80 backdrop-blur-sm flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={handleContactAgent}
                              aria-label="Contact agent"
                            >
                              <FaPhone className="text-white" />
                            </motion.button>
                          </div>

                          {/* Community name overlay */}
                          <div className="absolute bottom-0 left-0 p-6 w-full">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-10 h-10 rounded-full bg-earth-700/50 backdrop-blur-sm flex items-center justify-center">
                                <FaMapMarkerAlt className="text-white" />
                              </div>
                              <h3 className="text-2xl font-bold text-white">
                                {community.name}
                              </h3>
                            </div>

                            <div className="flex gap-4 mt-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                  <FaHome className="text-white text-sm" />
                                </div>
                                <div>
                                  <p className="text-xs text-white/70">
                                    Properties
                                  </p>
                                  <p className="text-white font-medium">
                                    {community.properties}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                  <FaBuilding className="text-white text-sm" />
                                </div>
                                <div>
                                  <p className="text-xs text-white/70">
                                    Price Range
                                  </p>
                                  <p className="text-white font-medium">
                                    {community.priceRange}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Full image view button */}
                          <button
                            className="absolute inset-0 w-full h-full cursor-zoom-in opacity-0"
                            onClick={handleImageZoom}
                            aria-label="Zoom image"
                          />
                        </div>

                        {/* Community features */}
                        <div className="w-full bg-earth-800/80 backdrop-blur-sm rounded-2xl border border-earth-700 p-6 shadow-lg">
                          <h3 className="text-xl font-medium mb-5 flex items-center text-earth-100">
                            <span className="w-4 h-0.5 bg-earth-500 mr-2"></span>
                            Key Features
                          </h3>

                          <div className="space-y-4">
                            {community.features.map((feature, idx) => (
                              <motion.div
                                key={idx}
                                className="flex items-center group cursor-pointer"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                onClick={() => handleFeatureClick(feature, idx)}
                              >
                                <div className="w-10 h-10 rounded-full bg-earth-700 flex items-center justify-center mr-3 group-hover:bg-earth-600 transition-colors duration-300">
                                  {idx === 0 && (
                                    <FaSwimmingPool className="text-earth-200 group-hover:text-white transition-colors duration-300" />
                                  )}
                                  {idx === 1 && (
                                    <FaTree className="text-earth-200 group-hover:text-white transition-colors duration-300" />
                                  )}
                                  {idx === 2 && (
                                    <FaBuilding className="text-earth-200 group-hover:text-white transition-colors duration-300" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="text-earth-200 font-medium group-hover:text-white transition-colors duration-300">
                                    {feature}
                                  </p>
                                </div>
                                <FaInfoCircle className="text-earth-500 group-hover:text-earth-300 transition-colors duration-300" />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right column - Content */}
                      <div className="lg:col-span-7">
                        <div className="bg-earth-800/80 backdrop-blur-sm rounded-2xl border border-earth-700 p-6 sm:p-8 shadow-lg h-full">
                          <h3 className="text-3xl font-semibold mb-2 text-white">
                            {community.name}
                          </h3>
                          <div className="flex items-center mb-4">
                            <div className="h-0.5 w-8 bg-earth-500 mr-2"></div>
                            <span className="text-earth-300 text-sm">
                              Premium Community
                            </span>
                          </div>

                          <p className="text-earth-200 mb-6 text-base leading-relaxed">
                            {community.description}
                          </p>

                          <div className="mb-6">
                            <h4 className="text-lg font-medium mb-4 flex items-center text-earth-100">
                              <FaMapMarkerAlt className="text-earth-400 mr-2" />
                              <span>Location Highlights</span>
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <motion.div
                                className="flex items-start group cursor-pointer"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <div className="w-8 h-8 rounded-full bg-earth-700 flex items-center justify-center mt-1 mr-3 group-hover:bg-earth-600 transition-colors duration-300">
                                  <span className="text-earth-200 text-xs font-medium group-hover:text-white transition-colors duration-300">
                                    01
                                  </span>
                                </div>
                                <div>
                                  <h5 className="font-medium text-earth-100 mb-1 group-hover:text-white transition-colors duration-300">
                                    Strategic Location
                                  </h5>
                                  <p className="text-sm text-earth-300 group-hover:text-earth-200 transition-colors duration-300">
                                    {community.name === "Palm Jumeirah" &&
                                      "Iconic man-made island with stunning sea views"}
                                    {community.name === "Downtown Dubai" &&
                                      "Heart of the city near Burj Khalifa"}
                                    {community.name === "Dubai Marina" &&
                                      "Waterfront community with yacht harbor"}
                                    {community.name === "Arabian Ranches" &&
                                      "Serene desert-themed community"}
                                    {community.name === "Dubai Hills Estate" &&
                                      "Prestigious area with golf course views"}
                                  </p>
                                </div>
                              </motion.div>

                              <motion.div
                                className="flex items-start group cursor-pointer"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <div className="w-8 h-8 rounded-full bg-earth-700 flex items-center justify-center mt-1 mr-3 group-hover:bg-earth-600 transition-colors duration-300">
                                  <span className="text-earth-200 text-xs font-medium group-hover:text-white transition-colors duration-300">
                                    02
                                  </span>
                                </div>
                                <div>
                                  <h5 className="font-medium text-earth-100 mb-1 group-hover:text-white transition-colors duration-300">
                                    Connectivity
                                  </h5>
                                  <p className="text-sm text-earth-300 group-hover:text-earth-200 transition-colors duration-300">
                                    {community.name === "Palm Jumeirah" &&
                                      "30 min to Dubai Airport, 15 min to Dubai Marina"}
                                    {community.name === "Downtown Dubai" &&
                                      "15 min to Dubai Airport, central location"}
                                    {community.name === "Dubai Marina" &&
                                      "35 min to Dubai Airport, near JBR Beach"}
                                    {community.name === "Arabian Ranches" &&
                                      "25 min to Downtown, near Dubai Autodrome"}
                                    {community.name === "Dubai Hills Estate" &&
                                      "20 min to Downtown, near Al Khail Road"}
                                  </p>
                                </div>
                              </motion.div>

                              <motion.div
                                className="flex items-start group cursor-pointer"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <div className="w-8 h-8 rounded-full bg-earth-700 flex items-center justify-center mt-1 mr-3 group-hover:bg-earth-600 transition-colors duration-300">
                                  <span className="text-earth-200 text-xs font-medium group-hover:text-white transition-colors duration-300">
                                    03
                                  </span>
                                </div>
                                <div>
                                  <h5 className="font-medium text-earth-100 mb-1 group-hover:text-white transition-colors duration-300">
                                    Lifestyle
                                  </h5>
                                  <p className="text-sm text-earth-300 group-hover:text-earth-200 transition-colors duration-300">
                                    {community.name === "Palm Jumeirah" &&
                                      "Luxury beachfront living with 5-star hotels"}
                                    {community.name === "Downtown Dubai" &&
                                      "Urban lifestyle with shopping and dining"}
                                    {community.name === "Dubai Marina" &&
                                      "Vibrant waterfront lifestyle with cafes"}
                                    {community.name === "Arabian Ranches" &&
                                      "Family-friendly with equestrian center"}
                                    {community.name === "Dubai Hills Estate" &&
                                      "Modern luxury with parks and retail"}
                                  </p>
                                </div>
                              </motion.div>

                              <motion.div
                                className="flex items-start group cursor-pointer"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <div className="w-8 h-8 rounded-full bg-earth-700 flex items-center justify-center mt-1 mr-3 group-hover:bg-earth-600 transition-colors duration-300">
                                  <span className="text-earth-200 text-xs font-medium group-hover:text-white transition-colors duration-300">
                                    04
                                  </span>
                                </div>
                                <div>
                                  <h5 className="font-medium text-earth-100 mb-1 group-hover:text-white transition-colors duration-300">
                                    Investment Value
                                  </h5>
                                  <p className="text-sm text-earth-300 group-hover:text-earth-200 transition-colors duration-300">
                                    {community.name === "Palm Jumeirah" &&
                                      "Premium ROI with consistent appreciation"}
                                    {community.name === "Downtown Dubai" &&
                                      "High rental yields in central location"}
                                    {community.name === "Dubai Marina" &&
                                      "Strong rental demand from professionals"}
                                    {community.name === "Arabian Ranches" &&
                                      "Stable investment with family appeal"}
                                    {community.name === "Dubai Hills Estate" &&
                                      "Growing area with appreciation potential"}
                                  </p>
                                </div>
                              </motion.div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3 mt-8">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Link
                                href={`/communities/${community.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                                className="px-5 py-3 rounded-lg text-sm font-medium bg-earth-600 text-white hover:bg-earth-500 transition-colors flex items-center gap-1 relative overflow-hidden group"
                              >
                                <span className="relative z-10">
                                  View Properties
                                </span>
                                <BsArrowRight
                                  size={14}
                                  className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                                />
                                <span className="absolute inset-0 bg-gradient-to-r from-earth-500 to-earth-600 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                              </Link>
                            </motion.div>

                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Link
                                href={`/communities`}
                                className="px-5 py-3 rounded-lg text-sm font-medium border border-earth-600 text-earth-300 hover:bg-earth-700 transition-colors flex items-center gap-1"
                              >
                                All Communities
                                <BsArrowRight
                                  size={14}
                                  className="group-hover:translate-x-1 transition-transform duration-300"
                                />
                              </Link>
                            </motion.div>
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
            <motion.button
              onClick={prevCommunity}
              className="w-12 h-12 rounded-full flex items-center justify-center border border-earth-600 text-earth-300 hover:bg-earth-700 transition-colors"
              aria-label="Previous community"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <BsArrowLeft size={20} />
            </motion.button>

            <div className="flex gap-3">
              {communities.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveCommunity(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeCommunity
                      ? "bg-earth-500"
                      : "bg-earth-700 hover:bg-earth-600"
                  }`}
                  aria-label={`Go to community ${index + 1}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextCommunity}
              className="w-12 h-12 rounded-full flex items-center justify-center border border-earth-600 text-earth-300 hover:bg-earth-700 transition-colors"
              aria-label="Next community"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <BsArrowRight size={20} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Virtual Tour Modal */}
      <AnimatePresence>
        {showVirtualTour && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-earth-800 rounded-xl overflow-hidden w-full max-w-4xl relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="p-4 flex justify-between items-center border-b border-earth-700">
                <h3 className="text-xl font-medium text-white">
                  Virtual Tour - {communities[activeCommunity].name}
                </h3>
                <button
                  onClick={() => setShowVirtualTour(false)}
                  className="w-8 h-8 rounded-full bg-earth-700 flex items-center justify-center hover:bg-earth-600"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={communities[activeCommunity].virtualTour}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`Virtual tour of ${communities[activeCommunity].name}`}
                ></iframe>
              </div>
              <div className="p-6">
                <p className="text-earth-200 mb-4">
                  Explore {communities[activeCommunity].name} in immersive 360°
                  view. Navigate through the community to experience the
                  lifestyle and amenities.
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowVirtualTour(false)}
                    className="px-4 py-2 bg-earth-700 text-white rounded-lg hover:bg-earth-600 transition-colors"
                  >
                    Close Tour
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Agent Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-earth-800 rounded-xl overflow-hidden w-full max-w-md relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="p-4 flex justify-between items-center border-b border-earth-700">
                <h3 className="text-xl font-medium text-white">
                  Contact Specialist - {communities[activeCommunity].name}
                </h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="w-8 h-8 rounded-full bg-earth-700 flex items-center justify-center hover:bg-earth-600"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-earth-700 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">
                      Community Specialist
                    </h4>
                    <p className="text-earth-300 text-sm">
                      Available 24/7 for inquiries
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <a
                    href={`tel:${communities[activeCommunity].contactAgent}`}
                    className="flex items-center p-3 bg-earth-700 rounded-lg hover:bg-earth-600 transition-colors"
                  >
                    <FaPhone className="text-earth-300 mr-3" />
                    <span className="text-white">Call Now</span>
                  </a>

                  <a
                    href={`https://wa.me/${communities[
                      activeCommunity
                    ].contactAgent.replace(/\+/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-earth-700 rounded-lg hover:bg-earth-600 transition-colors"
                  >
                    <FaWhatsapp className="text-earth-300 mr-3" />
                    <span className="text-white">WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:info@ushre.com?subject=Inquiry about ${communities[activeCommunity].name}`}
                    className="flex items-center p-3 bg-earth-700 rounded-lg hover:bg-earth-600 transition-colors"
                  >
                    <FaEnvelope className="text-earth-300 mr-3" />
                    <span className="text-white">Email</span>
                  </a>
                </div>

                <div className="text-center text-earth-400 text-sm">
                  <p>Our specialist will get back to you within 30 minutes</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature Detail Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-earth-800 rounded-xl overflow-hidden w-full max-w-md relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="p-4 flex justify-between items-center border-b border-earth-700">
                <h3 className="text-xl font-medium text-white">
                  {selectedFeature.feature} -{" "}
                  {communities[activeCommunity].name}
                </h3>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="w-8 h-8 rounded-full bg-earth-700 flex items-center justify-center hover:bg-earth-600"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <div className="w-16 h-16 rounded-full bg-earth-700 flex items-center justify-center mx-auto mb-4">
                    {selectedFeature.idx === 0 && (
                      <FaSwimmingPool className="text-white text-2xl" />
                    )}
                    {selectedFeature.idx === 1 && (
                      <FaTree className="text-white text-2xl" />
                    )}
                    {selectedFeature.idx === 2 && (
                      <FaBuilding className="text-white text-2xl" />
                    )}
                  </div>

                  <p className="text-earth-200 mb-4">
                    {selectedFeature.feature === "Beachfront" &&
                      "Private beach access with pristine white sand and crystal-clear waters. Enjoy water sports, sunbathing, and breathtaking sunsets right at your doorstep."}
                    {selectedFeature.feature === "Luxury Hotels" &&
                      "World-class 5-star hotels offering premium dining, spa services, and exclusive beach clubs accessible to residents."}
                    {selectedFeature.feature === "Fine Dining" &&
                      "Michelin-star restaurants and gourmet dining options featuring international cuisines prepared by renowned chefs."}
                    {/* Add more feature descriptions as needed */}
                  </p>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="px-4 py-2 border border-earth-600 text-earth-300 rounded-lg hover:bg-earth-700 transition-colors"
                  >
                    Close
                  </button>

                  <button
                    onClick={() => {
                      setSelectedFeature(null);
                      handleContactAgent();
                    }}
                    className="px-4 py-2 bg-earth-600 text-white rounded-lg hover:bg-earth-500 transition-colors"
                  >
                    Inquire About This Feature
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {showImageZoom && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowImageZoom(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl aspect-[16/9] cursor-zoom-out"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <Image
                src={communities[activeCommunity].image}
                alt={communities[activeCommunity].name}
                fill
                className="object-contain"
              />

              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-earth-800/80 flex items-center justify-center"
                onClick={() => setShowImageZoom(false)}
              >
                <span className="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
