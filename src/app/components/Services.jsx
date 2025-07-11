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
      className="pb-32 relative overflow-hidden bg-earth-50 text-earth-700"
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
          <h2 className="text-5xl font-semibold mb-4">
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-[400px] overflow-hidden rounded-tl-[3rem] rounded-br-[3rem]"
            >
              {/* Background image with zoom effect */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              
              {/* Glass overlay that slides up on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-earth-900/90 to-transparent transition-all duration-500 group-hover:from-earth-900/70" />
              
              {/* Content that moves on hover */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end transition-all duration-500 group-hover:translate-y-[-20px]">
                <div className="text-white mb-4 opacity-0 transform translate-y-10 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <service.icon className="text-2xl mb-2" />
                </div>
                <h3 className="text-2xl font-display text-white mb-2">{service.title}</h3>
                <p className="text-earth-100 mb-4 opacity-80 text-base">{service.desc}</p>
                
                {/* Features that appear on hover */}
                <ul className="space-y-2 mb-4 opacity-0 transform translate-y-10 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-earth-100  flex items-center text-base">
                      <span className="w-1.5 h-1.5 bg-earth-300 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
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
