'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaArrowRight, FaChevronRight, FaRegGem } from 'react-icons/fa';
import { RiVipCrownLine } from 'react-icons/ri';
import { IoIosFlash } from 'react-icons/io';
import ContactModal from './ContactModal';

export default function CallToAction() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
  const [hoveredButton, setHoveredButton] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const handleMouseEnter = (buttonId) => {
    setHoveredButton(buttonId);
  };
  
  const handleMouseLeave = () => {
    setHoveredButton(null);
  };
  
  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const handleFormSubmit = () => {
    // Store the current timestamp in localStorage
    localStorage.setItem('formSubmissionDate', Date.now().toString());
    // Close the modal
    setShowModal(false);
  };

  return (
    <>
      <section 
        ref={containerRef}
        className=" relative overflow-hidden pb-40"
        id="cta-section"
      >
        {/* Futuristic background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white -z-10"></div>
        
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px] -z-5"></div>
        
      
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-radial-gradient -z-5"></div>
        
       
        
        {/* Main content container */}
        <motion.div 
          style={{ opacity, y, scale }}
          className="w-[95vw] lg:w-[70vw] mx-auto relative"
        >
          {/* Premium glass card */}
          <div className="relative mx-auto overflow-hidden">
            {/* Glassmorphism card background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-lg  z-0"></div>
            
            {/* Animated border */}
            <div className="absolute inset-0  border border-white/30 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent animate-shimmer"></div>
            </div>
            
            {/* Glowing corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20">
            <div className="absolute top-0 left-0 w-px h-20 bg-gradient-to-b from-[#0F2134]/80 to-transparent"></div>
            <div className="absolute top-0 left-0 w-20 h-px bg-gradient-to-r from-[#0F2134]/80 to-transparent"></div>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20">
            <div className="absolute top-0 right-0 w-px h-20 bg-gradient-to-b from-[#0F2134]/80 to-transparent"></div>
            <div className="absolute top-0 right-0 w-20 h-px bg-gradient-to-r from-transparent to-[#0F2134]/80"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-20 h-20">
            <div className="absolute bottom-0 left-0 w-px h-20 bg-gradient-to-t from-[#0F2134]/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-20 h-px bg-gradient-to-r from-[#0F2134]/80 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-20 h-20">
            <div className="absolute bottom-0 right-0 w-px h-20 bg-gradient-to-t from-[#0F2134]/80 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-20 h-px bg-gradient-to-r from-transparent to-[#0F2134]/80"></div>
            </div>
            
            {/* Content with padding */}
            <div className="relative z-10 p-12 md:p-16">
              {/* Elegant heading with animated underline */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block"
                >
                  <span className="text-brand text-sm tracking-[0.3em] uppercase font-light">Limited Time Opportunity</span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mt-3 mb-6 text-gray-900">
                  Secure Your <span className="font-medium text-[#ac895e]">Legacy</span>
                  </h2>
                  <div className="relative h-px w-24 mx-auto bg-brand/30 overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-brand"
                      initial={{ x: "-100%" }}
                      whileInView={{ x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-gray-600 max-w-2xl mx-auto mt-6 text-lg"
                >
                  Experience the pinnacle of Dubai's architectural innovation. Arthouse Residences offers a rare investment opportunity with exceptional growth potential.
                </motion.p>
              </div>
              
              {/* Premium feature highlights */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid md:grid-cols-3 gap-6 mb-12"
              >
                {/* Feature 1 */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-sm rounded-tl-[2rem] rounded-br-[2rem] border border-white/30 group-hover:border-[#0F2134]/30 transition-colors duration-300"></div>
                  <div className="relative z-10 p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center">
                      <RiVipCrownLine className="text-2xl text-brand" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Premium Location</h3>
                    <p className="text-gray-600 text-sm">Prime positioning in Meydan with exceptional connectivity to Dubai's landmarks</p>
                  </div>
                </div>
                
                {/* Feature 2 */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-sm rounded-tl-[2rem] rounded-br-[2rem] border border-white/30 group-hover:border-[#0F2134]/30 transition-colors duration-300"></div>
                  <div className="relative z-10 p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center">
                      <FaRegGem className="text-2xl text-brand" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Exclusive Design</h3>
                    <p className="text-gray-600 text-sm">Artistically crafted living spaces with premium finishes and smart home technology</p>
                  </div>
                </div>
                
                {/* Feature 3 */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-sm rounded-tl-[2rem] rounded-br-[2rem] border border-white/30 group-hover:border-[#0F2134]/30 transition-colors duration-300"></div>
                  <div className="relative z-10 p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center">
                      <IoIosFlash className="text-2xl text-brand" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Investment Potential</h3>
                    <p className="text-gray-600 text-sm">Projected ROI of 8-12% with strong capital appreciation in an emerging district</p>
                  </div>
                </div>
              </motion.div>
              
              {/* CTA buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
              >
                {/* Primary CTA Button - Now opens modal */}
                <motion.button
                  className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-[#866c4c] to-[#ac895e] text-white rounded-tl-[2rem] rounded-br-[2rem] shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => handleMouseEnter('primary')}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setShowModal(true)}
                >
                  {/* Button background with animated gradient */}
                  <div className="absolute inset-0  -z-10"></div>
                  
                  {/* Animated shine effect */}
                  <div className={`absolute top-0 -left-[100%] w-[80%] h-full bg-white opacity-20 transform rotate-45 transition-all duration-1000 ${hoveredButton === 'primary' ? 'left-[120%]' : ''}`}></div>
                  
                  {/* Button content */}
                  <span className="relative z-10 flex items-center justify-center font-medium tracking-wide">
                    Reserve Your Unit
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </motion.button>
                
                {/* Secondary CTA Button */}
                
              </motion.div>
              
              {/* Premium note */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-10 text-center"
              >
                <p className="text-gray-500 text-sm italic">
                  *Limited units available. Priority reservations now open.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Custom animations */}
        <style jsx global>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          @keyframes orb-float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(20px, -30px) scale(1.05); }
            50% { transform: translate(0, 10px) scale(1); }
            75% { transform: translate(-20px, -15px) scale(0.95); }
          }
          
          @keyframes beam-float {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.7; }
          }
          
          .animate-shimmer {
            animation: shimmer 5s infinite;
          }
          
          .animate-orb-float {
            animation: orb-float 20s infinite;
          }
          
          .animate-beam-float {
            animation: beam-float 10s infinite;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          
      
          
          .bg-radial-gradient {
            background: radial-gradient(circle at center, transparent 0%, white 70%);
          }
        `}</style>
      </section>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onSubmit={handleFormSubmit}
      />
    </>
  );
}
