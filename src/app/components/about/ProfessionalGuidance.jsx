"use client";

import { motion } from "framer-motion";
import { FaAward, FaUsers, FaGlobe, FaHandshake } from "react-icons/fa";
import Image from "next/image";

export default function ProfessionalGuidance() {
  const achievements = [
    {
      icon: FaAward,
      title: "Award-Winning",
      description: "Multiple awards from Emaar, Dubai Properties, Deyaar and Nshama",
      stat: "15+",
      statLabel: "Awards"
    },
    {
      icon: FaUsers,
      title: "Expert Team",
      description: "Multi-lingual, multi-cultural team of certified professionals",
      stat: "50+",
      statLabel: "Agents"
    },
    {
      icon: FaGlobe,
      title: "Market Coverage",
      description: "Specializing in every freehold area in Dubai",
      stat: "473+",
      statLabel: "Projects"
    },
    {
      icon: FaHandshake,
      title: "Client Success",
      description: "Thousands of satisfied property buyers and investors",
      stat: "5000+",
      statLabel: "Clients"
    }
  ];

  return (
    <section className="pt-40 pb-32 bg-white">
      <div className="w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[75vw] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-earth-800 mb-6">
              Professional, Dependable Guidance
            </h2>
            
            <p className="text-lg text-earth-600 leading-relaxed mb-8">
              Our professional team of agents have been trained to deliver sound advice and guidance to clients 
              as well as prospects. We have developed a multi-lingual, multi-cultural team of agents specializing 
              in every other freehold area in Dubai.
            </p>

            <p className="text-lg text-earth-600 leading-relaxed mb-8">
              Looking for advice on where to invest / reside? We can connect you to one of our agents fit to 
              satisfactorily take care of your property needs in Dubai. Our agents have all the knowledge there 
              is to know about the real estate market in Dubai.
            </p>

            <div className="bg-gradient-to-r from-[#ac895e] to-[#876F4E] rounded-tl-[2rem] rounded-br-[2rem] p-6 text-white">
              <p className="text-lg font-medium">
                Union Square House has won awards from all the well-known master developers in Dubai, 
                including <strong>Emaar, Dubai Properties, Deyaar and Nshama</strong> – multiple times – 
                in the last few years alone.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-earth-50 rounded-tl-[1.5rem] rounded-br-[1.5rem] p-6 border border-earth-200 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#ac895e] to-[#876F4E] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <achievement.icon className="text-white text-xl" />
                  </div>
                  <div className="text-3xl font-bold text-[#ac895e] mb-1">{achievement.stat}</div>
                  <div className="text-sm text-earth-600 mb-2">{achievement.statLabel}</div>
                  <h4 className="text-lg font-bold text-earth-800 mb-2">{achievement.title}</h4>
                  <p className="text-sm text-earth-600 leading-relaxed">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}