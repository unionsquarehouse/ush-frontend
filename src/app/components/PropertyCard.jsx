import { motion } from "framer-motion";
import {
  FaBed,
  FaBath,
  FaRuler,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PropertyCard({ project }) {
  const router = useRouter();

  const handleImageClick = () => {
    console.log("hi");

    router.push(`/projects/${project.id}`);
  };

  return (
    <motion.div
      key={project.id}
      className="perspective-1000 h-[50vh] group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      // transition={{ delay: index * 0.1 }}
      onClick={handleImageClick}
    >
      <div className="relative h-full w-full preserve-3d transition-all duration-500 group-hover:[transform:rotateY(10deg)]">
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden overflow-hidden">
          <div className="relative h-full">
            <div className="relative h-full w-full cursor-pointer">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="absolute inset-0  bg-black opacity-30"></div>

            {/* Price tag with clip path */}
            <div className="absolute top-6 right-0 clip-path-price bg-gradient-to-r from-[#9F3349]  via-[#a53047] to-[#e24d6b]  shine-effect-absolute text-white py-2 px-6 font-display">
              {project.price} AED
            </div>

            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h3
                className="text-lg text-white mb-1 cursor-pointer"
                onClick={handleImageClick}
              >
                {project.title}
              </h3>
              <p className="text-white text-lg flex items-center mb-3">
                <FaMapMarkerAlt className="mr-1" /> {project.location}
              </p>
              <div className="flex items-center justify-between text-base text-white mb-3">
                <span className="flex items-center">
                  <FaBed className="mr-1" />
                  {project.beds} Bed{project.beds > 1 ? "s" : ""}
                </span>
                <span className="flex items-center">
                  <FaBath className="mr-1" />
                  {project.baths} Bath{project.baths > 1 ? "s" : ""}
                </span>
                <span className="flex items-center">
                  <FaRuler className="mr-1" />
                  {project.area} sqft
                </span>
              </div>

              <div className="flex gap-4">
                {/* Developer */}
                {project.developer && (
                  <div className="text-base text-white mb-2">
                    <span className="inline-block px-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg shadow-lg">
                      Developer: {project.developer}
                    </span>
                  </div>
                )}

                {/* Completion Status */}
                {project.completionStatus && (
                  <div className="text-base text-white mb-3">
                    <span className="inline-block px-3 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg shadow-lg">
                      {project.completionStatus
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Shadow effect */}
        <div className="absolute -bottom-10 left-5 right-5 h-[20px] bg-black/20 blur-xl transform-gpu transition-all duration-500 group-hover:scale-110"></div>
      </div>
    </motion.div>
  );
}
