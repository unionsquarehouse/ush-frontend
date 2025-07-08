"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { BsArrowLeft, BsArrowRight, BsBuilding, BsPlus } from "react-icons/bs";
import { FaStar, FaAward, FaCalendarAlt, FaChartLine } from "react-icons/fa";

const developers = [
  {
    id: 1,
    name: "Emaar Properties",
    logo: "/assets/emaar_logo.png",
    description:
      "Dubai's premier developer known for iconic projects like Burj Khalifa and Dubai Mall, setting new standards in luxury real estate development across the region.",
    established: 1997,
    projects: 42,
    rating: 4.8,
    featured: ["Burj Khalifa", "Dubai Mall", "Downtown Dubai"],
    color: "#7d7460", // earth-600
  },
  {
    id: 2,
    name: "DAMAC Properties",
    logo: "/assets/damac_logo.png",
    description:
      "Luxury developer with prestigious residential and commercial projects, known for partnerships with global brands like Versace, Fendi, and Trump Organization.",
    established: 2002,
    projects: 35,
    rating: 4.6,
    featured: ["DAMAC Hills", "AYKON City", "DAMAC Towers"],
    color: "#645c4c", // earth-700
  },
  {
    id: 3,
    name: "Nakheel",
    logo: "/assets/nakheel_logo.png",
    description:
      "Creator of Palm Jumeirah and other iconic waterfront developments, transforming Dubai's coastline with innovative and ambitious engineering projects.",
    established: 2000,
    projects: 28,
    rating: 4.7,
    featured: ["Palm Jumeirah", "Deira Islands", "The World Islands"],
    color: "#968b74", // earth-500
  },
  // {
  //   id: 4,
  //   name: "Meraas",
  //   logo: "/assets/meraas_logo.png",
  //   description: "Developer focused on creating unique lifestyle destinations and experiences",
  //   established: 2007,
  //   projects: 22,
  //   rating: 4.9,
  //   featured: ["Bluewaters Island", "City Walk", "La Mer"],
  //   color: "#aca189" // earth-400
  // },
  // {
  //   id: 5,
  //   name: "Dubai Properties",
  //   logo: "/assets/dubai_properties_logo.png",
  //   description: "Developer of mixed-use destinations and waterfront communities",
  //   established: 2004,
  //   projects: 30,
  //   rating: 4.5,
  //   featured: ["Jumeirah Beach Residence", "Business Bay", "Culture Village"],
  //   color: "#4d473b" // earth-800
  // }
];

export default function DevelopersSection() {
  const [activeDeveloper, setActiveDeveloper] = useState(0);
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const nextDeveloper = () => {
    setActiveDeveloper((prev) => (prev + 1) % developers.length);
  };

  const prevDeveloper = () => {
    setActiveDeveloper(
      (prev) => (prev - 1 + developers.length) % developers.length
    );
  };

  // Auto-rotate carousel unless hovering
  useEffect(() => {
    if (isHovering) return;

    const timer = setTimeout(() => {
      nextDeveloper();
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeDeveloper, isHovering]);

  return (
    <section
      className="py-24  relative overflow-hidden bg-earth-50 text-earth-700"
      ref={containerRef}
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
          onClick={() => window.open("https://maps.google.com", "_blank")}
        >
          <BsBuilding size={24} className="text-white" />
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
          onClick={() => window.open("/developers", "_self")}
        >
          <FaAward size={24} className="text-white" />
        </motion.div>
      </div> */}

      <motion.div
        style={{ opacity }}
        className="w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[75vw] mx-auto relative z-10"
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
            <span className="text-earth-500">Visionary</span> Developers
          </h2>
          <div className="h-0.5 w-24 bg-earth-500 mx-auto mb-6"></div>
          <p className="text-xl text-earth-500 max-w-2xl mx-auto">
            The masterminds behind Dubai's architectural marvels
          </p>
        </motion.div>

        {/* Developer showcase with fixed container */}
        <div className="relative pb-24">
          {/* Current developer display */}
          <div className="overflow-hidden">
            <div
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeDeveloper * 100}%)` }}
            >
              <div className="flex">
                {developers.map((developer, index) => (
                  <div key={developer.id} className="w-full flex-shrink-0 px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Left column - Logo and stats */}
                      <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-6">
                        {/* Logo container */}
                        <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-xl border border-earth-700 group">
                          <Image
                            src={developer.logo}
                            alt={`${developer.name} logo`}
                            fill
                            className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-earth-900/10 via-earth-900/5 to-transparent"></div>
                        </div>

                        {/* Stats */}
                        <div className="w-full bg-earth-100/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                          <div className="absolute inset-0 p-[2px] rounded-xl z-0 bg-gradient-to-br from-earth-400 via-earth-200 to-earth-500 opacity-20"></div>
                          <h3 className="text-xl font-medium mb-5 flex items-center">
                            <span className="w-4 h-0.5 bg-earth-500 mr-2"></span>
                            Key Metrics
                          </h3>

                          <div className="space-y-4">
                            <div className="flex items-center group">
                              <div className="w-10 h-10 rounded-full bg-earth-500 flex items-center justify-center mr-3 group-hover:bg-earth-700 transition-colors duration-300">
                                <FaCalendarAlt className="text-earth-100 group-hover:text-white transition-colors duration-300" />
                              </div>
                              <div className="flex-1">
                                <span className="text-earth-400 text-sm">
                                  Established
                                </span>
                                <p className="text-earth-500 font-medium group-hover:text-earth-700 transition-colors duration-300">
                                  {developer.established}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center group">
                              <div className="w-10 h-10 rounded-full bg-earth-500 flex items-center justify-center mr-3 group-hover:bg-earth-700 transition-colors duration-300">
                                <BsBuilding className="text-earth-100 group-hover:text-white transition-colors duration-300" />
                              </div>
                              <div className="flex-1">
                                <span className="text-earth-400 text-sm">
                                  Projects
                                </span>
                                <p className="text-earth-500 font-medium group-hover:text-earth-700 transition-colors duration-300">
                                  {developer.projects}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center group">
                              <div className="w-10 h-10 rounded-full bg-earth-500 flex items-center justify-center mr-3 group-hover:bg-earth-700 transition-colors duration-300">
                                <FaStar className="text-earth-100 group-hover:text-white transition-colors duration-300" />
                              </div>
                              <div className="flex-1">
                                <span className="text-earth-400 text-sm">
                                  Rating
                                </span>
                                <div className="flex items-center">
                                  <span className="text-earth-500 font-medium group-hover:text-earth-700 transition-colors duration-300 mr-2">
                                    {developer.rating}
                                  </span>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <FaStar
                                        key={i}
                                        className={
                                          i < Math.floor(developer.rating)
                                            ? "text-earth-500"
                                            : "text-earth-300"
                                        }
                                        size={14}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right column - Content */}
                      <div className="lg:col-span-8">
                        <div className="bg-earth-100/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg h-full">
                          <div className="absolute inset-0 p-[2px] rounded-xl z-0 bg-gradient-to-br from-earth-400 via-earth-200 to-earth-500 opacity-20"></div>
                          <h3 className="text-xl font-medium mb-5 flex items-center text-earth-700">
                            <span className="w-4 h-0.5 bg-earth-500 mr-2"></span>
                            {developer.name}
                          </h3>
                          <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-earth-500 flex items-center justify-center mr-3">
                              <FaAward className="text-earth-100" />
                            </div>
                            <span className="text-earth-500 font-medium">
                              Premium Developer
                            </span>
                          </div>

                          <p className="text-earth-500 mb-6 text-base leading-relaxed">
                            {developer.description}
                          </p>

                          <div className="mb-6">
                            <h4 className="text-xl font-medium mb-5 flex items-center text-earth-700">
                              <span className="w-4 h-0.5 bg-earth-500 mr-2"></span>
                              Signature Projects
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {developer.featured.map((project, idx) => (
                                <motion.div
                                  key={idx}
                                  className="group relative overflow-hidden rounded-lg aspect-video bg-earth-200 border border-earth-300"
                                  whileHover={{ y: -5 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  {/* Project background image */}
                                  <Image
                                    src={`/assets/${project
                                      .toLowerCase()
                                      .replace(/\s+/g, "_")}.jpg`}
                                    alt={project}
                                    fill
                                    className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 via-earth-900/30 to-transparent"></div>
                                  <div className="absolute inset-0 bg-earth-600/50 opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
                                  <div className="absolute bottom-0 left-0 p-3 w-full">
                                    <h5 className="text-white text-sm font-medium group-hover:text-white relative z-10">
                                      {project}
                                    </h5>
                                  </div>
                                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <BsArrowRight
                                      className="text-white"
                                      size={20}
                                    />
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3 mt-8">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Link
                                href={`/developers/${developer.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                                className="px-5 py-3 rounded-lg text-sm font-medium bg-earth-600 text-white hover:bg-earth-500 transition-colors flex items-center gap-1 relative overflow-hidden group"
                              >
                                <span className="relative z-10">
                                  View Portfolio
                                </span>
                                <BsArrowRight
                                  size={14}
                                  className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                                />
                                <span className="absolute inset-0 bg-gradient-to-r from-earth-500 to-earth-600 transform -skew-x-10 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                              </Link>
                            </motion.div>

                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Link
                                href={`/developers/${developer.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}/projects`}
                                className="px-5 py-3 rounded-lg text-sm font-medium border border-earth-600 text-earth-500 hover:bg-earth-100 transition-colors flex items-center gap-1"
                              >
                                All Projects
                                <BsArrowRight
                                  size={14}
                                  className="group-hover:translate-x-1 transition-transform duration-300 ml-1"
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
              onClick={prevDeveloper}
              className="w-12 h-12 rounded-full flex items-center justify-center border border-earth-600 text-earth-300 hover:bg-earth-700 transition-colors"
              aria-label="Previous developer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <BsArrowLeft size={20} />
            </motion.button>

            <div className="flex gap-3">
              {developers.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveDeveloper(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeDeveloper
                      ? "bg-earth-500"
                      : "bg-earth-700 hover:bg-earth-600"
                  }`}
                  aria-label={`Go to developer ${index + 1}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextDeveloper}
              className="w-12 h-12 rounded-full flex items-center justify-center border border-earth-600 text-earth-300 hover:bg-earth-700 transition-colors"
              aria-label="Next developer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <BsArrowRight size={20} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
