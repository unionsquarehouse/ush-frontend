"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PropertyCard from "./PropertyCard";
import AnimatedButton from "./ui/AnimatedButton";

const projects = [
  {
    title: "Terra Golf Collection",
    loc: "Jumeirah Golf Estates",
    info: "Premium villas with golf course views",
    price: "From AED 7.2M",
    beds: "6 BR",
    baths: "7 Bath",
    area: "8,500 sq.ft",
    image: "/assets/communities/dubai-hills-estate.jpeg",
  },
  {
    title: "South Living",
    loc: "Dubai South",
    info: "Modern apartments in emerging district",
    price: "From AED 600K",
    beds: "Studio-3BR",
    baths: "1-3 Bath",
    area: "450-1,200 sq.ft",
    image: "/assets/communities/downtown-dubai.jpg",
  },
  {
    title: "Park Views Residences",
    loc: "Dubai Hills Estate",
    info: "Luxury apartments with park views",
    price: "From AED 1.45M",
    beds: "1-4 BR",
    baths: "1-4 Bath",
    area: "750-2,500 sq.ft",
    image: "/assets/deira_islands.jpg",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="projects"
      className="pb-32 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Futuristic background elements */}
      <div className="absolute inset-0 bg-white z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(200,190,170,0.15)_0%,rgba(255,255,255,0)_70%)] z-0"></div>

      {/* Decorative elements */}
      <div className="absolute top-40 right-10 w-64 h-64 border border-earth-200/30 rounded-full"></div>
      <div className="absolute top-60 right-20 w-32 h-32 border border-earth-300/20 rounded-full"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 border border-earth-200/30 rounded-full"></div>

      {/* Grid overlay for futuristic effect */}
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
            Featured Off‑Plan Projects
          </h3>
          <p className="text-earth-600 text-center max-w-2xl text-lg">
            Exclusive investment opportunities in Dubai's most sought-after
            locations
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-3 ">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              className="h-[400px]"
            >
              <PropertyCard {...project} />
            </motion.div>
          ))}
        </div>

        <AnimatedButton
          href="/projects"
          isInView={isInView}
          animationDelay={0.6}
          containerClassName="mt-20 text-center"
        >
          View All Projects
        </AnimatedButton>
      </div>
    </section>
  );
}
