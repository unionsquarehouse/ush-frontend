"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FaBuilding, FaHome, FaKey, FaChevronRight } from "react-icons/fa";
import AnimatedButton from "./ui/AnimatedButton";

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

  return (
    <section
      id="services"
      className="pb-32 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Futuristic background elements - matching Projects section */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-earth-50/50 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(200,190,170,0.15)_0%,rgba(255,255,255,0)_70%)] z-0"></div>

      {/* Decorative elements - matching Projects section */}
      <div className="absolute top-20 left-10 w-64 h-64 border border-earth-200/30 rounded-full"></div>
      <div className="absolute top-40 left-20 w-32 h-32 border border-earth-300/20 rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-earth-200/30 rounded-full"></div>

      {/* Grid overlay for futuristic effect - matching Projects section */}
      <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] bg-repeat opacity-5 z-0"></div>

      <div className="w-[90vw] md:w-[70vw] mx-auto relative z-10">
        <motion.div
          className="flex flex-col items-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative mb-8">
            <span className="w-24 h-0.5 bg-earth-400 block"></span>
            <span className="absolute -top-1 left-0 w-12 h-0.5 bg-earth-600 block"></span>
          </div>
          <h3 className="text-5xl font-semibold mb-6 text-earth-800 text-center tracking-tight">
            Our Premium Services
          </h3>
          <p className="text-earth-600 text-center max-w-2xl text-lg">
            Exceptional real estate solutions tailored to your unique
            requirements
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="relative h-[400px] perspective-1000"
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
              <motion.div
                className="relative h-full w-full preserve-3d duration-200"
                animate={{
                  rotateY: hoveredIndex === index ? 180 : 0,
                }}
              >
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-xl">
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 p-[2px] rounded-xl z-0 bg-gradient-to-br from-earth-400 via-earth-200 to-earth-500 opacity-70"></div>

                  {/* Main content */}
                  <div className="absolute inset-0 m-[2px] bg-white rounded-[10px] overflow-hidden z-10">
                    {/* Service image */}
                    <div className="relative h-40 w-full overflow-hidden">
                      {service.image && (
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-br from-earth-900/70 via-transparent to-transparent"></div>
                    </div>

                    <div className="p-6 pt-4 relative h-[calc(100%-160px)] flex flex-col">
                      <div className="mb-4 flex items-center">
                        <div className="w-12 h-12 rounded-lg bg-earth-100 flex items-center justify-center">
                          <service.icon className="text-earth-800 text-2xl" />
                        </div>
                        <div className="ml-4 h-px bg-earth-200 flex-grow"></div>
                      </div>

                      <h4 className="text-2xl font-light mb-3 text-earth-800">
                        {service.title}
                      </h4>

                      <p className="text-earth-600 mb-4 text-sm">
                        {service.desc}
                      </p>

                      <div className="mt-auto text-center">
                        <span className="text-earth-500 text-sm">
                          Hover to explore
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-xl rotate-y-180">
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 p-[2px] rounded-xl z-0 bg-gradient-to-br from-earth-400 via-earth-200 to-earth-500 opacity-70"></div>

                  {/* Main content */}
                  <div
                    className={`absolute inset-0 m-[2px] bg-gradient-to-br ${service.color} rounded-[10px] overflow-hidden z-10 p-6 flex flex-col`}
                  >
                    <h4 className="text-2xl font-light mb-4 text-white">
                      {service.title}
                    </h4>

                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-earth-50/20 flex items-center justify-center">
                        <service.icon className="text-white" />
                      </div>
                      <div className="ml-3">
                        <p className="text-earth-100">{service.title}</p>
                      </div>
                    </div>

                    <p className="text-earth-50/90 mb-6">{service.desc}</p>

                    <div className="space-y-4 mb-6">
                      <h5 className="text-white text-lg font-medium">
                        Key Features:
                      </h5>
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-earth-50 mr-2"></div>
                          <span className="text-earth-50/80">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* <div className="mt-auto">
                      <a 
                        href={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block w-full bg-earth-50 hover:bg-white text-earth-800 text-center py-3 rounded-lg font-medium transition-colors duration-300"
                      >
                        Explore {service.title}x
                      </a>
                    </div> */}
                  </div>
                </div>
              </motion.div>
            </motion.div>
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
      </div>
    </section>
  );
}
