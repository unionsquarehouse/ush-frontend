"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  FaBuilding,
  FaHome,
  FaKey,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import AnimatedButton from "./ui/AnimatedButton";

const amenities = [
  {
    icon: <FaBuilding />,
    title: "Off‑Plan Projects",
    description:
      "Investor‑friendly, over 500+ freehold developments with premium ROI potential and exclusive pre-launch access.",
    image: "/assets/services/offplan.jpg",
    color: "#EAB308",
    gradient: "from-earth-800/80 to-earth-700/90",
    features: [
      "Pre-launch Access",
      "Developer Partnerships",
      "Payment Plan Options",
      "ROI Analysis",
    ],
  },
  {
    icon: <FaHome />,
    title: "Residential Sales",
    description:
      "Exclusive villas, townhouses & luxury apartments across Dubai's most prestigious communities with expert guidance.",
    image: "/assets/services/residential.jpg",
    color: "#EAB308",
    gradient: "from-earth-700/80 to-earth-600/90",
    features: [
      "Premium Listings",
      "Virtual Tours",
      "Negotiation Expertise",
      "Market Analysis",
    ],
  },
  {
    icon: <FaKey />,
    title: "Rentals & Leasing",
    description:
      "Expert guidance on premium rentals tailored to your lifestyle and investment objectives with comprehensive support.",
    image: "/assets/services/rentals.jpg",
    color: "#EAB308",
    gradient: "from-earth-600/80 to-earth-500/90",
    features: [
      "Tenant Screening",
      "Property Management",
      "Legal Assistance",
      "Rental Optimization",
    ],
  },
];

export default function Services() {
  const [activeAmenity, setActiveAmenity] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Handle auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveAmenity((prev) => (prev + 1) % amenities.length);
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Navigation functions
  const goToPrev = () => {
    setActiveAmenity(
      (prev) => (prev - 1 + amenities.length) % amenities.length
    );
  };

  const goToNext = () => {
    setActiveAmenity((prev) => (prev + 1) % amenities.length);
  };

  const goToAmenity = (index) => {
    setActiveAmenity(index);
  };

  return (
    <section
      className="bg-gradient-to-b from-white to-gray-50 text-black overflow-hidden"
      id="amenities"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-[85vw] lg:w-[80vw] mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl 2xl:text-5xl font-light mb-4 flex items-center justify-center">
            <span className="text-[#876F4E] shine-effect mr-2">
              Our Premium
            </span>{" "}
            Services
          </h2>
          <div className="h-0.5 w-24  bg-gradient-to-r from-[#876F4E] to-[#68543b] mx-auto mb-6"></div>

          {/* <p className="text-gray-500 max-w-2xl mx-auto text-lg 2xl:text-xl">
           Exceptional real estate solutions tailored to your unique requirements
          </p> */}
        </motion.div>

        {/* 3D Carousel - Fixed to prevent overlapping */}
        <div className="relative h-[50vh] lg:h-[60vh] perspective-1000">
          <div className="absolute top-1/2 left-4 z-30 hidden lg:block">
            <button
              onClick={goToPrev}
              className="w-12 h-12  rounded-tl-xl rounded-br-xl flex items-center justify-center border border-[#876F4E] text-[#876F4E] hover:bg-[#876F4E] hover:text-white transition-colors"
              aria-label="Previous amenity"
            >
              <FaChevronLeft className="text-xl" />
            </button>
          </div>

          <div className="absolute top-1/2 right-4 z-30 hidden lg:block">
            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-tl-xl rounded-br-xl flex items-center justify-center border border-[#876F4E] text-[#876F4E] hover:bg-[#876F4E] hover:text-white transition-colors"
              aria-label="Next amenity"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </div>

          {/* 3D Carousel Items */}
          <div className="relative h-full w-full preserve-3d">
            {amenities.map((amenity, index) => {
              // Calculate position in the carousel
              const isActive = index === activeAmenity;
              const isPrev =
                index === activeAmenity - 1 ||
                (activeAmenity === 0 && index === amenities.length - 1);
              const isNext =
                index === activeAmenity + 1 ||
                (activeAmenity === amenities.length - 1 && index === 0);

              // Determine position class
              let positionClass = "hidden";
              if (isActive) positionClass = "center-item";
              else if (isPrev) positionClass = "left-item";
              else if (isNext) positionClass = "right-item";

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isActive ? 1 : isPrev || isNext ? 0.7 : 0,
                    x: isActive ? 0 : isPrev ? -350 : isNext ? 350 : 0,
                    scale: isActive ? 1 : 0.8,
                    zIndex: isActive ? 20 : isPrev ? 10 : isNext ? 10 : 5,
                    rotateY: isActive ? 0 : isPrev ? 15 : -15,
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className={`absolute top-0 w-full h-full ${positionClass} ${
                    isActive ? "z-20" : "z-10"
                  }`}
                >
                  <div className="w-full max-w-2xl mx-auto h-full shadow-2xl overflow-hidden border border-gray-200 bg-white rounded-tl-[3rem] rounded-br-[3rem]">
                    <div className="w-full h-full flex flex-col ">
                      {/* Image Section - Mobile responsive */}
                      <div className="relative h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden">
                        {amenity.image ? (
                          <Image
                            src={amenity.image}
                            alt={amenity.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index === activeAmenity}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <div className="text-yellow-600 text-6xl sm:text-8xl">
                              {amenity.icon}
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                      </div>

                      {/* Content Section - Mobile responsive */}
                      <div className="p-4 sm:p-6 md:p-8 flex-grow flex flex-col">
                        {/* Top Section with Icon */}
                        <div className="flex items-center mb-4 sm:mb-6">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-black/60 flex items-center justify-center text-white text-xl sm:text-2xl md:text-3xl mr-3 sm:mr-4 md:mr-5 shadow-md">
                            {amenity.icon}
                          </div>
                          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light">
                            {amenity.title}
                          </h3>
                        </div>

                        {/* Middle Section with Description */}
                        <div className="flex-grow">
                          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                            {amenity.description}
                          </p>
                        </div>

                        {/* Bottom Section with Features */}
                        <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                          {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="flex items-center">
                              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-brand mr-2 sm:mr-3"></div>
                              <span className="text-gray-500 text-xs sm:text-sm">
                                {i === 0
                                  ? "Premium Experience"
                                  : i === 1
                                  ? "Exclusive Access"
                                  : i === 2
                                  ? "Luxury Design"
                                  : "Personalized Service"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Amenities Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {amenities.map((_, index) => (
            <button
              key={index}
              onClick={() => goToAmenity(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeAmenity
                  ? "bg-gradient-to-r from-[#876F4E] to-[#68543b] scale-125"
                  : "bg-gradient-to-r from-[#ad8f65] to-[#947753] hover:bg-[#876F4E]"
              }`}
              aria-label={`Go to amenity ${index + 1}`}
            />
          ))}
        </div>

        <AnimatedButton
          href="/services"
          isInView={isInView}
          animationDelay={0.6}
          containerClassName="mt-20 text-center"
        >
          View All Services
        </AnimatedButton>

        {/* Amenities Quick Access */}
      </div>

      {/* Add CSS for 3D perspective */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        .center-item {
          transform: translateZ(0px);
        }

        .left-item {
          transform: translateZ(-150px) translateX(-350px) rotateY(15deg);
        }

        .right-item {
          transform: translateZ(-150px) translateX(350px) rotateY(-15deg);
        }
      `}</style>
    </section>
  );
}
