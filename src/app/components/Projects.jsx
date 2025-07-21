"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import AnimatedButton from "./ui/AnimatedButton";

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeProject, setActiveProject] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [projects, setProjects] = useState([]);

  // ✅ Fetch projects from Strapi API
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch(
        "http://localhost:1337/api/projects?populate[features]=true&populate[image]=true"
      );
      const json = await res.json();

      const formattedProjects = json.data.map((item) => {
        const attrs = item;

        return {
          id: attrs.id,
          title: attrs.title,
          location: attrs.loc, // Renamed to match PropertyCard props
          info: attrs.info,
          price: attrs.price,
          beds: attrs.beds,
          baths: attrs.baths,
          area: attrs.area,
          color: attrs.color,
          features: attrs.features?.map((f) => f.feature) || [],
          image: attrs?.image?.formats?.large?.url ?
            "http://localhost:1337" + attrs?.image?.formats?.large?.url :
            attrs?.image?.formats?.large?.url,
          status: "Off-Plan" // Adding status for PropertyCard
        };
      });

      setProjects(formattedProjects.slice(0, 3));
    };

    fetchProjects();
  }, []);

  // Auto-rotate projects
  useEffect(() => {
    if (isHovering || projects.length === 0) return;
    const timer = setTimeout(() => {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeProject, isHovering, projects.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="projects"
      className="pb-32 relative overflow-hidden bg-earth-50 text-earth-700"
      ref={sectionRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
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
          <h2 className="text-5xl mb-4 text-black flex items-center justify-center">
            <span className="text-[#ac895e] shine-effect mr-2">Featured</span>{" "}
            Off‑Plan Projects
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-[#876F4E] to-[#68543b] mx-auto mb-6"></div>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <PropertyCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center mt-12 gap-3">
          {projects.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveProject(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeProject
                  ? "bg-gradient-to-r from-[#876F4E] to-[#68543b] scale-125"
                  : "bg-gradient-to-r from-[#ad8f65] to-[#947753]"
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
          color="yellow-600"
          hoverColor="yellow-500"
          gradientFrom="yellow-600"
          gradientTo="yellow-500"
          variant="solid"
        >
          View All Projects
        </AnimatedButton>
      </motion.div>
    </section>
  );
}
