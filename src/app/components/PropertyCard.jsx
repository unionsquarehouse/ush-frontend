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

export default function PropertyCard({ project }) {
  return (
    <motion.div
      key={project.id}
      className="perspective-1000 h-[450px] group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      // transition={{ delay: index * 0.1 }}
    >
      <div className="relative h-full w-full preserve-3d transition-all duration-500 group-hover:[transform:rotateY(10deg)]">
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden rounded-tl-[3rem] rounded-br-[3rem] overflow-hidden">
          <div className="relative h-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 via-transparent to-transparent"></div>

            {/* Price tag with clip path */}
            <div className="absolute top-6 right-0 clip-path-price bg-gradient-to-r from-[#866c4c] to-[#ac895e] shine-effect-absolute text-white py-2 px-6 font-display">
              {project.price}
            </div>

            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h3 className="text-xl text-white  mb-1">{project.title}</h3>
              <p className="text-earth-100 text-lg flex items-center mb-3">
                <FaMapMarkerAlt className="mr-1" /> {project.loc}
              </p>
              <div className="flex justify-between text-base   text-earth-100">
                <span>{project.beds}</span>
                <span>{project.baths}</span>
                <span>{project.area}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shadow effect */}
        <div className="absolute -bottom-10 left-5 right-5 h-[20px] bg-black/20 blur-xl rounded-full transform-gpu transition-all duration-500 group-hover:scale-110"></div>
      </div>
    </motion.div>
  );
}
