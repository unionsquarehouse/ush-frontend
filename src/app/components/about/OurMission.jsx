"use client";

import { motion } from "framer-motion";
import { FaTarget, FaLightbulb, FaHeart, FaClock, FaRoute, FaHandshake } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { useState } from "react";

export default function OurMission() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const missionPoints = [
    {
      icon: FiTarget,
      title: "Aim not to be the largest, but the finest",
      description: "Quality over quantity in everything we do",
      gradient: "from-brand to-brand-hover"
    },
    {
      icon: FaLightbulb,
      title: "Empower the client with all the information needed",
      description: "Providing comprehensive data for informed decisions",
      gradient: "from-brand to-brand-hover"
    },
    {
      icon: FaHeart,
      title: "Honesty is key",
      description: "Transparent and ethical practices in all dealings",
      gradient: "from-brand to-brand-hover"
    },
    {
      icon: FaClock,
      title: "Aim not for the quick gain, but the long goal",
      description: "Building lasting relationships and sustainable success",
      gradient: "from-brand to-brand-hover"
    },
    {
      icon: FaRoute,
      title: "Go the extra mile to find exactly what you need",
      description: "Dedicated service tailored to your specific requirements",
      gradient: "from-brand to-brand-hover"
    },
    {
    icon: FaHandshake,
    title: "Clients come first, always",
    description: "Putting your priorities at the heart of our mission",
    gradient: "from-brand to-brand-hover"
  }
  ];

  return (
    <section className="pt-20 pb-36 bg-gradient-to-b from-white via-earth-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-earth-600 rounded-full blur-3xl"></div>
      </div>

      <div className="w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[75vw] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-brand"></div>
            <span className="text-brand font-medium tracking-wider uppercase text-sm">Our Mission</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-brand"></div>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold mb-8 flex justify-center items-center gap-2">
            <span className="text-brand shine-effect">Our</span>{" "}
            <span className="text-black relative group">
              Mission
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-brand to-brand-hover rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </span>
          </h2>
          
          <p className="text-xl text-earth-600 max-w-4xl mx-auto leading-relaxed">
            For the thankful smiles that we receive after each successful deal, our endeavor is to see many more 
            of them in the years to come. Which is why, every member of the Union Square House team is aligned 
            to the company's mission and set of policies.
          </p>
        </motion.div>

        {/* Mission Cards */}
        <div className="relative">
          {/* Center connecting element */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-32 h-32 border-2 border-brand/20 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {missionPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative"
              >
                {/* Card */}
                <motion.div
                  whileHover={{ y: -10, rotateY: 5 }}
                  className={`relative overflow-hidden rounded-tl-[2rem] rounded-br-[2rem] p-8 h-full transition-all duration-500 ${
                    hoveredIndex === index ? 'bg-earth-50' : 'bg-white'
                  } border-2 ${
                    hoveredIndex === index ? 'border-brand/30' : 'border-earth-100'
                  } shadow-lg hover:shadow-2xl hover:shadow-earth-200/50`}
                  style={{
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Floating icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 rounded-tl-[1.5rem] rounded-br-[1.5rem] bg-gradient-to-r ${point.gradient} flex items-center justify-center mb-6 shadow-lg relative z-10`}
                  >
                    <point.icon className="text-white text-2xl" />
                    
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${point.gradient} blur-xl opacity-30 scale-150`}></div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-earth-800 mb-4 leading-tight group-hover:text-earth-900 transition-colors">
                    {point.title}
                  </h3>
                  
                  <p className="text-earth-600 leading-relaxed group-hover:text-earth-700 transition-colors">
                    {point.description}
                  </p>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                    <div className={`w-full h-full bg-gradient-to-br ${point.gradient} transform rotate-45 translate-x-10 -translate-y-10 rounded-lg`}></div>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-earth-50/50 to-transparent rounded-3xl pointer-events-none"
                  />

                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 group-hover:animate-shimmer"></div>
                  </div>
                </motion.div>

                {/* Connection line to center */}
                <div className="hidden lg:block absolute top-1/2 left-1/2 w-16 h-px bg-gradient-to-r from-brand/30 to-transparent transform -translate-y-1/2 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-block relative">
            <p className="text-lg text-earth-600 italic relative z-10 shine-effect">
              "The credo that helps us achieve our best everyday is quite simple."
            </p>
            <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}




