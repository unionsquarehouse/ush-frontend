
"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaArrowRight, FaDownload } from 'react-icons/fa';

// Data updated with grid span properties to match the image layout
const propertyData = [
  { id: 1, label: 'Luxury Villas', img: '/assets/damac_hills.jpg', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
  { id: 2, label: 'Penthouse Suites', img: '/assets/damac_towers.jpg', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
  { id: 3, label: 'Apartments', img: '/assets/deira_islands.jpg', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-2' },
  { id: 4, label: 'Beachfront Properties', img: '/assets/communities/palm-jumeirah.jpg', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-2' },
  { id: 5, label: 'Golf Course Residences', img: '/assets/communities/arabian-ranches.jpg', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
  { id: 6, label: 'Commercial Spaces', img: '/assets/communities/downtown-dubai.jpg', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
  { id: 7, label: 'Townhouses', img: '/assets/communities/dubai-hills-estate.jpeg', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
  { id: 8, label: 'Waterfront Homes', img: '/assets/communities/dubai-marina.jpg', colSpan: 'md:col-span-2', rowSpan: 'md:row-span-1' },
  { id: 9, label: 'Holiday Homes', img: '/assets/hero-bg2.jpg', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
  {
    id: 10,
    type: 'cta', // Special type for the text-only card
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1'
  },
  { id: 11, label: 'Eco-friendly Properties', img: '/assets/properties/signature-villas.jpg', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-2' },
  { id: 12, label: 'Investment', img: '/assets/hero-bg4.jpg', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
  { id: 13, label: 'Desert Retreats', img: '/assets/ush-office.webp', colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
];


export default function DiscoverProperty() {
  return (
    <div className="pb-40 bg-gradient-to-b from-earth-50 to-white min-h-screen">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 pt-20"
      >
        <h2 className="flex justify-center items-center mb-6 text-earth-900 text-4xl md:text-5xl lg:text-6xl font-bold">
          <span className="text-brand shine-effect mr-3">Discover</span>
          Property Types
        </h2>
        <div className="h-1 w-32 bg-gradient-to-r from-brand via-brand-hover to-brand mx-auto mb-8 rounded-full"></div>
        <p className="max-w-3xl mx-auto text-earth-600 text-lg md:text-xl leading-relaxed px-4">
          Explore Dubai's finest real estate offerings across diverse property categories
        </p>
      </motion.div>

      {/* Masonry-style Layout */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, staggerChildren: 0.1 }}
        className="w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[75vw] mx-auto"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 auto-rows-[250px]">
          {/* Row 1 */}
          <PropertyCard item={propertyData[0]} index={0} className="col-span-1 row-span-1" />
          <PropertyCard item={propertyData[1]} index={1} className="col-span-1 row-span-2" />
          <PropertyCard item={propertyData[2]} index={2} className="col-span-1 row-span-1" />
          <PropertyCard item={propertyData[3]} index={3} className="col-span-1 row-span-1" />
          <PropertyCard item={propertyData[4]} index={4} className="col-span-1 row-span-2" />
          <PropertyCard item={propertyData[5]} index={5} className="col-span-1 row-span-1" />

          {/* Row 2 */}
          <PropertyCard item={propertyData[6]} index={6} className="col-span-1 row-span-1" />
          {/* CTA Card spans 2x2 in center */}
          <div className="col-span-2 row-span-2 flex items-center justify-center">
            <CTACard />
          </div>
          <PropertyCard item={propertyData[7]} index={7} className="col-span-1 row-span-1" />

          {/* Row 3 */}
          <PropertyCard item={propertyData[8]} index={8} className="col-span-1 row-span-1" />
          <PropertyCard item={propertyData[9]} index={9} className="col-span-1 row-span-1" />

          {/* Row 4 - Below CTA */}
          <PropertyCard item={propertyData[10]} index={10} className="col-span-1 row-span-1" />
          <PropertyCard item={propertyData[11]} index={11} className="col-span-1 row-span-1" />
          <PropertyCard item={propertyData[12]} index={12} className="col-span-2 row-span-1" />
          <PropertyCard item={propertyData[0]} index={13} className="col-span-1 row-span-1" />
          <PropertyCard item={propertyData[1]} index={14} className="col-span-1 row-span-1" />
          <PropertyCard item={propertyData[2]} index={14} className="col-span-1 row-span-1" />

          <PropertyCard item={propertyData[3]} index={14} className="col-span-1 row-span-1" />


         

         
        </div>
      </motion.div>
    </div>
  );
}

// Property Card Component
function PropertyCard({ item, index, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.05 }}
      className={`group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer ${className}`}
    >
      {/* Image Container */}
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={item.img}
          alt={item.label}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 text-white z-10">
        {/* Top Section - Number */}
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold"
          >
            {String(item.id).padStart(2, '0')}
          </motion.div>
        </div>

        {/* Bottom Section - Title */}
        <div className="space-y-2">
          <motion.h3 
            className="text-sm md:text-base font-bold leading-tight group-hover:text-brand transition-colors duration-300"
          >
            {item.label}
          </motion.h3>
          
          {/* Explore Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
          >
            <button className="bg-brand hover:bg-brand-hover text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
              View
              <FaArrowRight className="text-xs" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-brand/0 group-hover:border-brand/30 rounded-2xl transition-all duration-500"></div>
    </motion.div>
  );
}

// CTA Card Component - Perfectly centered
function CTACard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      whileHover={{ y: -10, scale: 1.05 }}
      className=" p-6  transition-all duration-500 group cursor-pointer w-full h-full flex flex-col justify-center relative max-w-sm mx-auto"
    >
      {/* Glowing border effect */}
      
      <div className="text-center space-y-4 relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16  flex items-center justify-center mx-auto "
        >
          <FaDownload className="text-white text-xl" />
        </motion.div>

        {/* Content */}
        <div>
          <h3 className="text-xl font-bold text-earth-800 mb-3 group-hover:text-brand transition-colors">
            Property Catalog
          </h3>
          <p className="text-earth-600 text-sm leading-relaxed mb-4">
            Explore Our Diverse Range of Property Types and Find Your Perfect Match
          </p>
        </div>

        {/* CTA Button */}
        <motion.a
          href="/catalog.pdf"
          download
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-brand to-brand-hover text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <FaDownload />
          Download Catalog
        </motion.a>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-brand/10 to-transparent rounded-full opacity-50"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-brand-hover/10 to-transparent rounded-full opacity-30"></div>
    </motion.div>
  );
}
