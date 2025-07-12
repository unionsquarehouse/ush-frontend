"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaAward, FaUsers, FaBuilding, FaChartLine, FaHandshake, FaGem, FaGlobe, FaQuoteLeft, FaStar } from "react-icons/fa";
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
      statLabel: "Awards",
      color: "from-earth-600/80 to-earth-700/90"
    },
    {
      icon: FaUsers,
      title: "Expert Team",
      description: "Seasoned professionals with deep market knowledge",
      stat: "50+",
      statLabel: "Agents",
      color: "from-earth-700/80 to-earth-800/90"
    },
    {
      icon: FaBuilding,
      title: "Premium Portfolio",
      description: "Exclusive access to Dubai's most prestigious properties",
      stat: "500+",
      statLabel: "Properties",
      color: "from-earth-500/80 to-earth-600/90"
    },
    {
      icon: FaChartLine,
      title: "Market Leaders",
      description: "Proven track record of successful investments",
      stat: "5B+",
      statLabel: "AED Portfolio",
      color: "from-earth-800/80 to-earth-900/90"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-32 relative overflow-hidden bg-white text-black "
    >
      {/* Enhanced background with subtle pattern and gradient */}
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
        {/* Section header with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="relative mb-4 inline-block">
            <span className="w-24 h-0.5 bg-yellow-600 block"></span>
            <span className="absolute -top-1 left-0 w-12 h-0.5 bg-yellow-700 block"></span>
          </div>
          <h2 className="text-5xl font-semibold mb-4 tracking-tight ">
            <span className="text-yellow-600 ">About</span> Union Square House
          </h2>
        </motion.div>

        {/* Two-column layout with glass morphism */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Image with parallax and glass overlay */}
          <motion.div 
            className="relative"
            style={{ y }}
          >
            <div className="relative h-[500px] rounded-tl-[3rem] rounded-br-[3rem] overflow-hidden  border border-earth-700/30 group">
              <Image
                src="/assets/ush-office.webp"
                alt="Union Square House Office"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Enhanced gradient overlay with glass effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-earth-900/40 to-transparent transition-all duration-300 group-hover:backdrop-blur-none"></div>
              
              {/* Overlay content with glass card */}
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className=" p-6 rounded-xl ">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-earth-600/80 flex items-center justify-center">
                        <FaBuilding className="text-white text-xl" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        Union Square House
                      </h3>
                    </div>
                    
                    <p className="text-white/90 text-lg mb-4 max-w-md">
                      Founded in 2010, we've grown to become Dubai's most trusted luxury real estate agency.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Right column - Interactive cards with glass morphism */}
          <div className="space-y-6">
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-black text-lg mb-8 glass-card-earth p-6  backdrop-blur-sm relative overflow-hidden group hover-lift"
              whileHover={{ y: -5 }}
            >
              {/* Glass shimmer effect */}
              <div className="absolute inset-0 w-full h-full">
                <span className="absolute top-0 left-0 w-1/3 h-full bg-white/10 transform -skew-x-20 translate-x-[-150%] group-hover:translate-x-[300%] transition-transform duration-1000"></span>
              </div>
              <span className="relative z-10 block text-xl">
                Union Square House is Dubai's premier real estate agency, specializing in luxury properties across the UAE's most prestigious communities. With over a decade of experience, we've built a reputation for excellence, integrity, and unparalleled market knowledge.
              </span>
            </motion.p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  className={` p-5 cursor-pointer transition-all duration-300 overflow-hidden relative group ${
                    activeCard === idx ? 'ring-2 ring-earth-500 ' : 'h'
                  }`}
                  onClick={() => setActiveCard(activeCard === idx ? null : idx)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }} 
                  whileHover={{ y: -5 }}
                >
                  {/* Background gradient with glass effect */}
                  <div className="absolute inset-0 glass-card-earth"></div>
                  
                 
                  <div className="flex items-start relative z-10">
                    <div className="w-12 h-12 flex items-center justify-center mr-4 ">
                      <card.icon className="text-black text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-black mb-1">{card.title}</h4>
                      <p className="text-black/70 text-xl mb-3">{card.description}</p>
                      
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-black/70">{card.stat}</span>
                        <span className="text-black/70 text-base ml-1">{card.statLabel}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
