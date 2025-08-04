"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative py-32 bg-earth-50 overflow-hidden">
      {/* Background Pattern */}
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
                stroke="black"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[75vw] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <span className="w-24 h-0.5 bg-gradient-to-r from-[#876F4E] to-[#68543b] block mb-4"></span>
              <h2 className=" text-brand shine-effect mb-6">
                About <span className="text-black">Union Square House</span>
              </h2>
            </div>

            <p className=" text-earth-700 leading-relaxed mb-8">
              The investor-friendly city of Dubai has over{" "}
              <strong>473 freehold projects</strong> (off-plan / ready). Each
              different from the other, while new ones come up. Which one would
              you choose to invest in? Well, that's where{" "}
              <strong>Union Square House</strong> comes in.
            </p>

            <p className=" text-earth-600 leading-relaxed">
              A real estate advisory firm committed to helping investors and
              residents make the right decision when it comes to buying a
              property in Dubai. Over the years, we have helped thousands of
              property buyers swiftly navigate through to the right investment
              opportunity, time and again.
            </p>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[500px] overflow-hidden shadow-2xl">
              <Image
                src="/assets/ush-office.webp"
                alt="Union Square House Office"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-900/30 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
