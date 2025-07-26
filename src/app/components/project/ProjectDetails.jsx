"use client";

import { motion } from "framer-motion";
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaTag, FaHome, FaStar } from "react-icons/fa";

export default function ProjectDetails({ project }) {
  const title = project?.data?.title?.en;
  const location = project?.location;
  const price = project?.data?.price?.amounts?.sale;
  const size = project?.data?.size;
  const bedrooms = project?.data?.bedrooms;
  const bathrooms = project?.data?.bathrooms;
  const completionStatus = project?.data?.projectStatus;
  const reference = project?.data?.reference;
  const type = project?.data?.type;

  const features = [
    { icon: <FaBed />, label: "Bedrooms", value: bedrooms },
    { icon: <FaBath />, label: "Bathrooms", value: bathrooms },
    { icon: <FaRuler />, label: "Size", value: `${size} sqft` },
    { icon: <FaHome />, label: "Type", value: type },
  ];

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-6">
        {/* Title */}
        {title && (
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-light text-earth-900 tracking-wide leading-tight"
          >
            {title}
          </motion.h1>
        )}

        {/* Location */}
        {location && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center text-earth-600 space-x-3"
          >
            <FaMapMarkerAlt className="text-[#9F3349] text-lg" />
            <span className="text-xl font-light">{location}</span>
          </motion.div>
        )}

        {/* Decorative Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "8rem" }}
          transition={{ duration: 1, delay: 0.4 }}
          className="h-0.5 bg-gradient-to-r from-[#9F3349] via-[#ac895e] to-earth-400 mx-auto rounded-full"
        />
      </div>

      {/* Price Section */}
      {price && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-[#9F3349] to-[#ac895e] text-white px-8 py-4 rounded-2xl shadow-xl">
            <FaTag className="mr-3 text-xl" />
            <div className="text-left">
              <div className="text-sm font-light opacity-90">Starting from</div>
              <div className="text-2xl md:text-3xl font-light">
                AED {Number(price).toLocaleString()}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Features Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
            className="group text-center space-y-4"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-br from-earth-200/50 to-earth-300/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-earth-100 to-earth-200 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-500">
                <div className="text-[#9F3349] text-xl">
                  {feature.icon}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-light text-earth-900">{feature.value}</div>
              <div className="text-sm text-earth-600 font-light uppercase tracking-wider">{feature.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Status & Reference */}
      <div className="flex flex-wrap justify-center gap-6 pt-8">
        {completionStatus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-earth-500 to-earth-600 text-white rounded-xl shadow-lg"
          >
            <FaStar className="mr-2" />
            <span className="font-light">{completionStatus}</span>
          </motion.div>
        )}
        
        {reference && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="px-6 py-3 bg-white border-2 border-earth-200 text-earth-700 rounded-xl shadow-lg"
          >
            <span className="font-light">Ref: {reference}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
