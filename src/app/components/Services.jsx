"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaBuilding, FaHome, FaKey, FaChevronRight, FaInfoCircle, FaMapMarkerAlt } from "react-icons/fa";
import { BsArrowRight, BsGeoAlt, BsZoomIn } from "react-icons/bs";
import AnimatedButton from "./ui/AnimatedButton";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    title: "Off‑Plan Projects",
    desc: "Investor‑friendly, over 500+ freehold developments with premium ROI potential.",
    icon: FaBuilding,
    features: [
      "Pre-launch access",
      "Developer partnerships",
      "Payment plan options",
    ],
    color: "from-earth-800/80 to-earth-700/90",
    image: "/assets/services/offplan.jpg",
  },
  {
    title: "Residential Sales",
    desc: "Exclusive villas, townhouses & luxury apartments across Dubai's most prestigious communities.",
    icon: FaHome,
    features: ["Premium listings", "Virtual tours", "Negotiation expertise"],
    color: "from-earth-700/80 to-earth-600/90",
    image: "/assets/services/residential.jpg",
  },
  {
    title: "Rentals & Leasing",
    desc: "Expert guidance on premium rentals tailored to your lifestyle and investment objectives.",
    icon: FaKey,
    features: ["Tenant screening", "Property management", "Legal assistance"],
    color: "from-earth-600/80 to-earth-500/90",
    image: "/assets/services/rentals.jpg",
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeService, setActiveService] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-rotate services unless hovering
  useEffect(() => {
    if (isHovering) return;

    const timer = setTimeout(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeService, isHovering]);

  return (
    <section
      id="services"
      className="py-32 relative overflow-hidden bg-earth-50 text-earth-700"
      ref={sectionRef}
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

      {/* Interactive floating elements - REMOVED */}
      {/* <div className="absolute top-1/4 right-[5%] z-10">
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
          onClick={() => window.open("/contact", "_self")}
        >
          <BsZoomIn size={24} className="text-white" />
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
          onClick={() => window.open("/services", "_self")}
        >
          <FaKey size={24} className="text-white" />
        </motion.div>
      </div> */}

      <div className="w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[75vw] mx-auto relative z-10">
        <motion.div
          className="flex flex-col items-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl font-semibold mb-4">
            <span className="text-earth-500">Our Premium</span> Services
          </h2>
          <div className="h-0.5 w-24 bg-earth-500 mx-auto mb-6"></div>
          <p className="text-xl text-earth-500 max-w-2xl mx-auto text-center">
            Exceptional real estate solutions tailored to your unique requirements
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2 + index * 0.1,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="bg-earth-100/40 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl h-full">
                {/* Gradient border effect */}
                <div className="absolute inset-0 p-[2px] rounded-xl z-0 bg-gradient-to-br from-earth-400 via-earth-200 to-earth-500 opacity-20"></div>
                
                {/* Service image */}
                <div className="relative h-48 w-full overflow-hidden">
                  {service.image && (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 via-earth-900/30 to-transparent"></div>
                  
                  {/* Service title overlay */}
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-earth-500 flex items-center justify-center mr-3">
                        <service.icon className="text-earth-100" />
                      </div>
                      <h3 className="text-xl font-medium text-white">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-earth-500 mb-6 text-base leading-relaxed">
                    {service.desc}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-xl font-medium mb-5 flex items-center text-earth-700">
                      <span className="w-4 h-0.5 bg-earth-500 mr-2"></span>
                      Key Features
                    </h4>
                    
                    <div className="space-y-4">
                      {service.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center group cursor-pointer"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="w-10 h-10 rounded-full bg-earth-500 flex items-center justify-center mr-3 group-hover:bg-earth-700 transition-colors duration-300">
                            {idx === 0 && (
                              <FaHome className="text-earth-100 group-hover:text-white transition-colors duration-300" />
                            )}
                            {idx === 1 && (
                              <FaBuilding className="text-earth-100 group-hover:text-white transition-colors duration-300" />
                            )}
                            {idx === 2 && (
                              <FaKey className="text-earth-100 group-hover:text-white transition-colors duration-300" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-earth-500 font-medium group-hover:text-earth-700 transition-colors duration-300">
                              {feature}
                            </p>
                          </div>
                          <FaInfoCircle className="text-earth-500 group-hover:text-earth-700 transition-colors duration-300" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-auto"
                  >
                    <Link
                      href={`/services/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="px-5 py-3 rounded-lg text-sm font-medium bg-earth-600 text-white hover:bg-earth-500 transition-colors flex items-center gap-1 relative overflow-hidden group w-full justify-center"
                    >
                      <span className="relative z-10">
                        Explore {service.title}
                      </span>
                      <BsArrowRight
                        size={14}
                        className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                      />
                      <span className="absolute inset-0 bg-gradient-to-r from-earth-500 to-earth-600 transform -skew-x-10 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* <div className="flex items-center justify-center mt-12 gap-6">
          <div className="flex gap-3">
            {services.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveService(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeService
                    ? "bg-earth-500"
                    : "bg-earth-700 hover:bg-earth-600"
                }`}
                aria-label={`Go to service ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        </div> */}

        <AnimatedButton
          href="/services"
          isInView={isInView}
          animationDelay={0.6}
          containerClassName="mt-20 text-center"
        >
          View All Services
        </AnimatedButton>
      </div>
    </section>
  );
}
