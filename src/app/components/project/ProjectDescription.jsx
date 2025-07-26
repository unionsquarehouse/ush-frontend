"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ProjectDescription({ description }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  if (!description) return null;

  return (
    <section ref={ref} className="relative">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative mb-8">
          <span className="w-24 h-0.5 bg-gradient-to-r from-[#876F4E] to-[#68543b] block mx-auto"></span>
          <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-[#ac895e] block"></span>
        </div>
        <h2 className="text-4xl font-light text-earth-900 tracking-wide mb-4">
          Property <span className="text-[#ac895e]">Overview</span>
        </h2>
        <p className="text-earth-600 max-w-2xl mx-auto text-lg">
          Discover what makes this property exceptional
        </p>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div className="absolute -inset-4 bg-gradient-to-r from-earth-100/50 to-earth-200/50 rounded-3xl blur-xl opacity-60"></div>
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9F3349] via-[#ac895e] to-earth-400"></div>
          <div className="p-12">
            <div className="prose prose-xl max-w-none">
              <p className="text-earth-700 leading-relaxed text-xl font-light tracking-wide text-center">
                {description}
              </p>
            </div>
            
            {/* Decorative Elements */}
            <div className="mt-8 pt-8 border-t border-earth-100">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-3 h-3 bg-[#ac895e] rounded-full"></div>
                <div className="w-16 h-px bg-gradient-to-r from-[#ac895e] to-[#9F3349]"></div>
                <div className="w-3 h-3 bg-[#9F3349] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
