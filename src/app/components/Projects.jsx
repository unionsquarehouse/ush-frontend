"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import AnimatedButton from "./ui/AnimatedButton";
import { BsArrowRight } from "react-icons/bs";

const projects = [
  {
    id: 1,
    title: "Terra Golf Collection",
    loc: "Jumeirah Golf Estates",
    info: "Premium villas with golf course views",
    price: "From AED 7.2M",
    beds: "6 BR",
    baths: "7 Bath",
    area: "8,500 sq.ft",
    image: "/assets/communities/dubai-hills-estate.jpeg",
    features: ["Golf Views", "Private Pool", "Smart Home"],
    color: "#7d7460", // earth-600
  },
  {
    id: 2,
    title: "South Living",
    loc: "Dubai South",
    info: "Modern apartments in emerging district",
    price: "From AED 600K",
    beds: "Studio-3BR",
    baths: "1-3 Bath",
    area: "450-1,200 sq.ft",
    image: "/assets/communities/downtown-dubai.jpg",
    features: ["Metro Access", "Community Mall", "Fitness Center"],
    color: "#645c4c", // earth-700
  },
  {
    id: 3,
    title: "Park Views Residences",
    loc: "Dubai Hills Estate",
    info: "Luxury apartments with park views",
    price: "From AED 1.45M",
    beds: "1-4 BR",
    baths: "1-4 Bath",
    area: "750-2,500 sq.ft",
    image: "/assets/deira_islands.jpg",
    features: ["Park Views", "Premium Finishes", "Resort Amenities"],
    color: "#968b74", // earth-500
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeProject, setActiveProject] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Auto-rotate projects unless hovering
  useEffect(() => {
    if (isHovering) return;

    const timer = setTimeout(() => {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeProject, isHovering]);

  return (
    <section
      id="projects"
      className="py-24 relative overflow-hidden bg-earth-50 text-earth-700"
      ref={sectionRef}
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
            <span className="text-earth-500">Featured</span> Off‑Plan Projects
          </h2>
          <div className="h-0.5 w-24 bg-earth-500 mx-auto mb-6"></div>
          <p className="text-xl text-earth-500 max-w-2xl mx-auto">
            Exclusive investment opportunities in Dubai's most sought-after locations
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2 + index * 0.1,
              }}
            >
              <PropertyCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center mt-12 gap-3">
          {projects.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveProject(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeProject
                  ? "bg-earth-500"
                  : "bg-earth-700 hover:bg-earth-600"
              }`}
              aria-label={`Go to project ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>

        <AnimatedButton
          href="/projects"
          isInView={isInView}
          animationDelay={0.6}
          containerClassName="mt-16 text-center"
          color="earth-600"
          hoverColor="earth-500"
          gradientFrom="earth-600"
          gradientTo="earth-500"
        >
          View All Projects
        </AnimatedButton>
      </motion.div>
    </section>
  );
}
