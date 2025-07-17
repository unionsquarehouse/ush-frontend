import { motion } from "framer-motion";
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

export default function PropertyCard({ project }) {
  return (
    <div className="glass-card-earth rounded-2xl overflow-hidden shadow-lg h-full group hover-lift">
      {/* Property image */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-900/70 via-earth-900/30 to-transparent"></div>
        
        {/* Price tag with glass effect */}
        <div className="absolute top-4 right-0 glass-earth clip-path-price px-4 py-2">
          <span className="text-sm font-medium text-white">{project.price}</span>
        </div>
        
        {/* Status badge with glass effect */}
        {project.status && (
          <div className="absolute top-4 left-4 glass-light rounded-full px-3 py-1">
            <span className="text-xs font-medium text-earth-800">{project.status}</span>
          </div>
        )}
      </div>
      
      {/* Content with glass effect */}
      <div className="p-6 relative">
        {/* Glass shimmer effect */}
        <div className="absolute inset-0 w-full h-full">
          <span className="absolute top-0 left-0 w-1/3 h-full bg-earth-400/10 transform -skew-x-20 translate-x-[-150%] group-hover:translate-x-[300%] transition-transform duration-1500"></span>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-xl font-semibold text-earth-800 mb-2">{project.title}</h3>
          <p className="text-earth-600 text-sm flex items-center mb-4">
            <FaMapMarkerAlt className="mr-2 text-earth-500" />
            {project.location}
          </p>
          
          {/* Features with glass effect */}
          <div className="flex justify-between mb-4">
            <div className="flex items-center glass-light px-2 py-1 rounded-lg">
              <FaBed className="text-earth-600 mr-1" />
              <span className="text-xs text-earth-700">{project.beds} Beds</span>
            </div>
            <div className="flex items-center glass-light px-2 py-1 rounded-lg">
              <FaBath className="text-earth-600 mr-1" />
              <span className="text-xs text-earth-700">{project.baths} Baths</span>
            </div>
            <div className="flex items-center glass-light px-2 py-1 rounded-lg">
              <FaRuler className="text-earth-600 mr-1" />
              <span className="text-xs text-earth-700">{project.area} sqft</span>
            </div>
          </div>
          
          {/* CTA button with glass effect */}
          <Link 
            href={`/properties/${project.id}`} 
            className="w-full btn-glass-earth py-2 rounded-lg flex items-center justify-center mt-4"
          >
            <span className="relative z-10 flex items-center">
              View Details
              <FaArrowRight className="ml-2 text-sm" />
            </span>
            <span className="absolute inset-0 w-full h-full">
              <span className="absolute top-0 left-0 w-1/3 h-full bg-white/20 transform -skew-x-20 translate-x-[-150%] group-hover:translate-x-[300%] transition-transform duration-1000"></span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
