"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaAward, FaUsers, FaBuilding, FaChartLine } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

export default function About() {
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const cards = [
    {
      icon: FaAward,
      title: "Award-Winning",
      description: "Multi-award winning agency recognized by leading developers",
      stat: "15+",
      statLabel: "Awards"
    },
    {
      icon: FaUsers,
      title: "Expert Team",
      description: "Seasoned professionals with deep market knowledge",
      stat: "50+",
      statLabel: "Agents"
    },
    {
      icon: FaBuilding,
      title: "Premium Portfolio",
      description: "Exclusive access to Dubai's most prestigious properties",
      stat: "500+",
      statLabel: "Properties"
    },
    {
      icon: FaChartLine,
      title: "Market Leaders",
      description: "Proven track record of successful investments",
      stat: "5B+",
      statLabel: "AED Portfolio"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-earth-50 text-earth-700"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

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
            <span className="text-earth-500">About</span> Union Square House
          </h2>
          <div className="h-0.5 w-24 bg-earth-500 mx-auto mb-6"></div>
          <p className="text-xl text-earth-500 max-w-2xl mx-auto">
            Dubai's premier real estate agency with a decade of excellence
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Image with parallax */}
          <motion.div 
            className="relative"
            style={{ y }}
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl border border-earth-700/30">
              <Image
                src="/assets/ush-office.webp"
                alt="Union Square House Office"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 via-earth-900/30 to-transparent"></div>
              
              {/* Overlay content */}
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-earth-600/80 backdrop-blur-sm flex items-center justify-center">
                      <FaBuilding className="text-white text-xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Union Square House
                    </h3>
                  </div>
                  
                  <p className="text-white/90 text-lg mb-4 max-w-md">
                    Founded in 2010, we've grown to become Dubai's most trusted luxury real estate agency.
                  </p>
                  
                  <div className="flex gap-4">
                    <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <p className="text-white/70 text-xs">Experience</p>
                      <p className="text-white font-medium text-lg">12+ Years</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <p className="text-white/70 text-xs">Portfolio</p>
                      <p className="text-white font-medium text-lg">5B+ AED</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Right column - Interactive cards */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-earth-700 text-lg mb-8"
            >
              Union Square House is Dubai's premier real estate agency, specializing in luxury properties across the UAE's most prestigious communities. With over a decade of experience, we've built a reputation for excellence, integrity, and unparalleled market knowledge.
            </motion.p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  className={`bg-white/60 backdrop-blur-sm rounded-xl p-5 shadow-md border border-earth-200/50 cursor-pointer transition-all duration-300 ${activeCard === idx ? 'ring-2 ring-earth-500 shadow-lg' : 'hover:shadow-lg'}`}
                  onClick={() => setActiveCard(activeCard === idx ? null : idx)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-earth-100 flex items-center justify-center mr-4 group-hover:bg-earth-500 transition-colors">
                      <card.icon className="text-earth-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-earth-700 mb-1">{card.title}</h4>
                      <p className="text-earth-500 text-sm mb-3">{card.description}</p>
                      
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-earth-600">{card.stat}</span>
                        <span className="text-earth-500 text-sm ml-1">{card.statLabel}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              className="mt-8 flex justify-center sm:justify-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link
                href="/about"
                className="group px-6 py-3 rounded-lg text-sm font-medium bg-earth-600 text-white hover:bg-earth-500 transition-colors flex items-center gap-2 relative overflow-hidden"
              >
                <span className="relative z-10">Discover Our Story</span>
                <BsArrowRight
                  size={16}
                  className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                />
                <span className="absolute inset-0 bg-gradient-to-r from-earth-500 to-earth-600 transform -skew-x-10 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
