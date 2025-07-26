// components/project/ProjectFeatures.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FaCheck, FaStar, FaHome, FaSwimmingPool } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function ProjectFeatures({ features, amenities }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative space-y-20">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-4xl font-bold text-earth-800 mb-4">
          Property <span className="bg-gradient-to-r from-brand to-brand-hover bg-clip-text text-transparent">Features</span>
        </h2>
        <p className="text-earth-600 max-w-2xl mx-auto text-lg">
          Exceptional details that define luxury living
        </p>
      </motion.div>

      {/* Signature Features */}
      <motion.div
        className="space-y-12"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Card className="bg-gradient-to-br from-brand/10 to-brand-hover/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-3xl">
          <CardContent className="p-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-earth-800 mb-2">Signature Details</h3>
              <p className="text-earth-600">Carefully curated specifications</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {features?.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                  className="group flex items-center space-x-6 p-6 rounded-2xl hover:bg-earth-50/50 transition-all duration-500"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-brand/10 to-brand-hover/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaCheck className="text-brand text-lg" />
                  </div>
                  <span className="text-earth-800 text-xl font-light group-hover:text-earth-900 transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Amenities Section */}
      {amenities && amenities.length > 0 && (
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="bg-gradient-to-br from-brand/10 to-brand-hover/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-3xl">
            <CardContent className="p-12">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-earth-800 mb-2">Lifestyle Amenities</h3>
                <p className="text-earth-600">World-class facilities and services</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {amenities?.map((amenity, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6, delay: 0.5 + idx * 0.05 }}
                    className="group text-center space-y-4 p-6 rounded-2xl hover:bg-earth-50/50 transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-earth-100 to-earth-200 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <div className="w-4 h-4 bg-gradient-to-br from-brand to-brand-hover rounded-full"></div>
                    </div>
                    
                    <span className="text-earth-700 font-light capitalize leading-relaxed group-hover:text-earth-900 transition-colors block">
                      {amenity.replace(/-/g, " ")}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <Card className="bg-gradient-to-br from-brand/10 to-brand-hover/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-3xl">
          <CardContent className="p-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-earth-800 mb-2">Property Excellence</h3>
              <p className="text-earth-600">Premium features and world-class amenities</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-center space-y-4 group"
              >
                <div className="relative">
                  <div className="absolute -inset-3 bg-gradient-to-br from-brand/20 to-brand-hover/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-brand to-brand-hover rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                    <FaHome className="text-white text-2xl" />
                  </div>
                </div>
                <div className="text-4xl font-light text-earth-900">{features?.length || 0}</div>
                <div className="text-earth-600 font-light uppercase tracking-wider">Key Features</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center space-y-4 group"
              >
                <div className="relative">
                  <div className="absolute -inset-3 bg-gradient-to-br from-earth-500/20 to-earth-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-earth-500 to-earth-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                    <FaSwimmingPool className="text-white text-2xl" />
                  </div>
                </div>
                <div className="text-4xl font-light text-earth-900">{amenities?.length || 0}</div>
                <div className="text-earth-600 font-light uppercase tracking-wider">Amenities</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="text-center space-y-4 group"
              >
                <div className="relative">
                  <div className="absolute -inset-3 bg-gradient-to-br from-brand/20 to-earth-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-brand to-earth-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                    <FaStar className="text-white text-2xl" />
                  </div>
                </div>
                <div className="text-4xl font-light text-earth-900">Premium</div>
                <div className="text-earth-600 font-light uppercase tracking-wider">Quality</div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
