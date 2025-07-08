import { motion } from "framer-motion";
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

export default function PropertyCard({ project }) {
  return (
    <div className="bg-earth-100/40 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg h-full border border-earth-200/50 group">
      {/* Property image */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 via-earth-900/30 to-transparent"></div>
        
        {/* Price tag */}
        <div className="absolute top-4 right-0 bg-earth-600 text-white px-4 py-2 clip-path-price">
          <span className="text-sm font-medium">{project.price}</span>
        </div>
        
        {/* Location */}
        <div className="absolute bottom-4 left-4 flex items-center text-white">
          <FaMapMarkerAlt className="mr-2" />
          <span className="text-sm">{project.loc}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-medium text-earth-800 mb-2">{project.title}</h3>
        <p className="text-earth-500 mb-4 text-sm">{project.info}</p>
        
        {/* Property details */}
        <div className="flex justify-between mb-6">
          <div className="flex items-center text-earth-600">
            <FaBed className="mr-1" />
            <span className="text-sm">{project.beds}</span>
          </div>
          <div className="flex items-center text-earth-600">
            <FaBath className="mr-1" />
            <span className="text-sm">{project.baths}</span>
          </div>
          <div className="flex items-center text-earth-600">
            <FaRuler className="mr-1" />
            <span className="text-sm">{project.area}</span>
          </div>
        </div>
        
        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.features.map((feature, idx) => (
            <span 
              key={idx} 
              className="text-xs bg-earth-200 text-earth-700 px-3 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
        
        {/* CTA */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href={`/projects/${project.title.toLowerCase().replace(/\s+/g, "-")}`}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-earth-600 text-white hover:bg-earth-500 transition-colors flex items-center justify-center gap-1 relative overflow-hidden group w-full"
          >
            <span className="relative z-10">View Details</span>
            <BsArrowRight
              size={14}
              className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
            />
            <span className="absolute inset-0 bg-gradient-to-r from-earth-500 to-earth-600 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
