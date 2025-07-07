'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaBed, FaBath, FaRuler } from 'react-icons/fa';
import { useState } from 'react';

export default function PropertyCard({ title, loc, info, image, price, beds, baths, area }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative h-full perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Card Container */}
      <motion.div 
        className="relative h-full w-full preserve-3d duration-200"
        animate={{ 
          rotateY: isHovered ? 180 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-xl">
          {/* Gradient border effect */}
          <div className="absolute inset-0 p-[2px] rounded-xl z-0 bg-gradient-to-br from-earth-400 via-earth-200 to-earth-500 opacity-70"></div>
          
          {/* Main content */}
          <div className="absolute inset-0 m-[2px] bg-white rounded-[10px] overflow-hidden z-10">
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden">
              {image ? (
                <Image 
                  src={image} 
                  alt={title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-earth-200" />
              )}
              
              {/* Diagonal overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-earth-900/70 via-transparent to-transparent"></div>
              
              {/* Price tag */}
              {price && (
                <div className="absolute top-0 left-0 bg-earth-800 text-white text-sm px-4 py-2 clip-path-price">
                  {price}
                </div>
              )}
              
              {/* Location pill */}
              <div className="absolute bottom-4 left-4 bg-white/90 text-earth-800 text-xs px-3 py-1 rounded-full flex items-center">
                <FaMapMarkerAlt className="mr-1 text-earth-600" />
                <span>{loc}</span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-5">
              <h4 className="text-xl font-medium mb-3 text-earth-800">
                {title}
              </h4>
              
              <p className="text-earth-600 text-sm mb-4">
                {info}
              </p>
              
              {/* Property features */}
              {(beds || baths || area) && (
                <div className="flex items-center justify-between mb-4">
                  {beds && (
                    <div className="flex flex-col items-center">
                      <FaBed className="text-earth-700 mb-1" />
                      <span className="text-xs text-earth-600">{beds}</span>
                    </div>
                  )}
                  {baths && (
                    <div className="flex flex-col items-center">
                      <FaBath className="text-earth-700 mb-1" />
                      <span className="text-xs text-earth-600">{baths}</span>
                    </div>
                  )}
                  {area && (
                    <div className="flex flex-col items-center">
                      <FaRuler className="text-earth-700 mb-1" />
                      <span className="text-xs text-earth-600">{area}</span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="text-center mt-2">
                <span className="text-earth-500 text-sm">Hover to explore</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back Face */}
        <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-xl rotate-y-180">
          {/* Gradient border effect */}
          <div className="absolute inset-0 p-[2px] rounded-xl z-0 bg-gradient-to-br from-earth-400 via-earth-200 to-earth-500 opacity-70"></div>
          
          {/* Main content */}
          <div className="absolute inset-0 m-[2px] bg-gradient-to-br from-earth-800 to-earth-900 rounded-[10px] overflow-hidden z-10 p-6 flex flex-col">
            <h4 className="text-2xl font-light mb-4 text-white">
              {title}
            </h4>
            
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-earth-700/50 flex items-center justify-center">
                <FaMapMarkerAlt className="text-white" />
              </div>
              <div className="ml-3">
                <p className="text-earth-100">{loc}</p>
              </div>
            </div>
            
            <p className="text-earth-300 mb-6 text-sm">
              {info}
            </p>
            
            {/* Property features with more details */}
            {(beds || baths || area) && (
              <div className="grid grid-cols-3 gap-4 mb-6">
                {beds && (
                  <div className="bg-earth-700/30 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FaBed className="text-earth-300 mr-2" />
                      <span className="text-earth-100">Bedrooms</span>
                    </div>
                    <p className="text-white font-medium">{beds}</p>
                  </div>
                )}
                {baths && (
                  <div className="bg-earth-700/30 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FaBath className="text-earth-300 mr-2" />
                      <span className="text-earth-100">Bathrooms</span>
                    </div>
                    <p className="text-white font-medium">{baths}</p>
                  </div>
                )}
                {area && (
                  <div className="bg-earth-700/30 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FaRuler className="text-earth-300 mr-2" />
                      <span className="text-earth-100">Area</span>
                    </div>
                    <p className="text-white font-medium">{area}</p>
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-auto">
              <Link 
                href={`/projects/${title.toLowerCase().replace(/\s+/g, '-')}`}
                className="block w-full bg-earth-50 hover:bg-white text-earth-800 text-center py-3 rounded-lg font-medium transition-colors duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
