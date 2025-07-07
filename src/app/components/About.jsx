'use client';

import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaAward, FaBuilding, FaChartLine, FaUsers, FaInfoCircle, FaArrowRight } from 'react-icons/fa';

// Futuristic animated counter with glitch effect
const FuturisticCounter = ({ target, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, amount: 0.5 });
  
  // Random glitch effect
  useEffect(() => {
    if (!isInView) return;
    
    const glitchInterval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 150);
    }, 2000);
    
    return () => clearInterval(glitchInterval);
  }, [isInView]);
  
  // Counter animation
  useEffect(() => {
    if (!isInView) return;
    
    let startValue = 0;
    const targetValue = parseInt(target);
    const steps = Math.max(40, targetValue);
    const increment = targetValue / steps;
    const timePerStep = (duration * 1000) / steps;
    
    const timer = setInterval(() => {
      startValue += increment;
      if (startValue >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(startValue));
      }
    }, timePerStep);
    
    return () => clearInterval(timer);
  }, [isInView, target, duration]);
  
  return (
    <div ref={counterRef} className="relative">
      <span className={`text-5xl font-bold text-earth-600 transition-colors`}>
        {count}{suffix}
      </span>
      
    </div>
  );
};

// Interactive feature card with hover effects
const FeatureCard = ({ icon: Icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-earth-100 shadow-lg relative overflow-hidden group"
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-earth-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-earth-100/30 rounded-full -mr-12 -mt-12 group-hover:bg-earth-200/30 transition-colors duration-500"></div>
      
      <div className="w-14 h-14 rounded-full bg-earth-100 flex items-center justify-center mb-4 group-hover:bg-earth-200 transition-all duration-300 relative z-10">
        <Icon className="text-earth-700 text-xl" />
      </div>
      
      <h4 className="text-xl font-semibold text-earth-800 mb-3 relative z-10">{title}</h4>
      <p className="text-earth-600 relative z-10">{description}</p>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-earth-100 to-transparent p-4"
            initial={{ y: 60 }}
            animate={{ y: 0 }}
            exit={{ y: 60 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-end">
              <motion.div 
                className="w-8 h-8 rounded-full bg-earth-700 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaArrowRight className="text-white text-sm" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Interactive timeline component
const Timeline = () => {
  const [activeItem, setActiveItem] = useState(0);
  const timelineItems = [
    { year: "2010", title: "Company Founded", description: "Union Square House was established in Dubai" },
    { year: "2015", title: "Market Leader", description: "Became one of Dubai's top real estate agencies" },
    { year: "2018", title: "International Expansion", description: "Opened offices in key global markets" },
    { year: "2022", title: "Digital Transformation", description: "Launched innovative property tech solutions" }
  ];
  
  return (
    <div className="py-10">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-earth-200"></div>
        
        {/* Timeline items */}
        <div className="space-y-12">
          {timelineItems.map((item, index) => (
            <motion.div 
              key={index}
              className={`relative pl-8 cursor-pointer ${activeItem === index ? 'opacity-100' : 'opacity-70'}`}
              onClick={() => setActiveItem(index)}
              whileHover={{ x: 5 }}
            >
              {/* Timeline dot */}
              <motion.div 
                className={`absolute left-0 top-0 w-5 h-5 rounded-full border-2 ${activeItem === index ? 'bg-earth-600 border-earth-200' : 'bg-white border-earth-300'} -translate-x-[10px]`}
                animate={{ scale: activeItem === index ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="flex flex-col">
                <span className="text-sm font-bold text-earth-500">{item.year}</span>
                <h4 className="text-xl font-semibold text-earth-800 mb-1">{item.title}</h4>
                <p className="text-earth-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const stats = [
    { number: "12", suffix: "+", text: "Years Experience", icon: FaChartLine },
    { number: "5", suffix: "B+", text: "AED Portfolio", icon: FaBuilding },
    { number: "500", suffix: "+", text: "Properties Sold", icon: FaUsers },
    { number: "15", suffix: "+", text: "Industry Awards", icon: FaAward }
  ];
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  const features = [
    {
      title: "Expert Advisors",
      icon: FaUsers,
      description: "Our team of seasoned professionals provides unparalleled market insights"
    },
    {
      title: "Premium Portfolio",
      icon: FaBuilding,
      description: "Access to Dubai's most exclusive properties and developments"
    },
    {
      title: "Investment Success",
      icon: FaChartLine,
      description: "Proven track record of maximizing returns for our investors"
    }
  ];
  
  const handleShowModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };
  
  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Futuristic background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-earth-50/80 to-white z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,190,170,0.2)_0%,rgba(255,255,255,0)_60%)] z-0"></div>
      <motion.div 
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-earth-100/30 blur-3xl"
        style={{ y, opacity }}
      ></motion.div>
      <motion.div 
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-earth-200/20 blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]), opacity }}
      ></motion.div>
      
      {/* Grid overlay for futuristic effect */}
   <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                        <path d="M25,0 L50,14.4 L50,43.4 L25,57.8 L0,43.4 L0,14.4 Z" fill="none" stroke="#7d7460" strokeWidth="0.5" />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#hexagons)" />
                    </svg>
                  </div>
      
      
      <div className="w-[90vw] md:w-[85vw] mx-auto relative z-10">
        <motion.div 
          className="mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          <motion.div 
            className="flex flex-col items-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative mb-8">
              <span className="w-24 h-0.5 bg-earth-400 block"></span>
              <span className="absolute -top-1 left-0 w-12 h-0.5 bg-earth-600 block"></span>
            </div>
            <h3 className="text-5xl font-semibold mb-6 text-earth-800 text-center tracking-tight">
              About Union Square House
            </h3>
            <p className="text-earth-600 text-center italic max-w-2xl text-lg">
              Dubai's most trusted real estate agency with over a decade of excellence
            </p>
          </motion.div>
          
          {/* Interactive Tabs */}
          <div className="flex justify-center mb-16">
            <div className="bg-earth-100/50 backdrop-blur-sm p-1 rounded-full flex space-x-1">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'history', label: 'Our History' },

              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.id 
                      ? 'bg-white text-earth-800 shadow-md' 
                      : 'text-earth-600 hover:text-earth-800'
                  }`}
                  whileHover={{ scale: activeTab === tab.id ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid md:grid-cols-2 gap-20 items-center">
                  <motion.div 
                    className="rounded-xl overflow-hidden shadow-2xl group relative"
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleShowModal({
                      title: "Our Dubai Headquarters",
                      image: "/assets/ush-office.webp",
                      description: "Our state-of-the-art headquarters in Dubai, designed to provide an exceptional client experience with cutting-edge technology and luxurious amenities."
                    })}
                  >
                    {/* Futuristic overlay elements */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-earth-800/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
                    <div className="absolute inset-0 border border-earth-200/30 z-20 transition-all duration-500 group-hover:border-earth-400/50"></div>
                    
                    {/* Geometric decorative elements */}
                    <svg className="absolute top-0 left-0 w-full h-full z-20 opacity-30 group-hover:opacity-60 transition-opacity duration-500" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <polygon points="0,0 100,0 100,20" fill="none" stroke="white" strokeWidth="0.2" />
                      <polygon points="0,100 0,80 20,100" fill="none" stroke="white" strokeWidth="0.2" />
                      <polygon points="100,100 80,100 100,80" fill="none" stroke="white" strokeWidth="0.2" />
                    </svg>
                    
                    <img 
                      src="/assets/ush-office.webp" 
                      alt="Union Square House Office" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Futuristic data overlay */}
                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-2 rounded-full border border-white/20 text-xs text-white font-mono z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-earth-300">Location:</span> Dubai, UAE
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-earth-900/70 via-earth-900/40 to-transparent p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center mb-2">
                        <div className="w-2 h-2 rounded-full bg-earth-400 mr-2 animate-pulse"></div>
                        <p className="text-white/90 text-sm font-medium font-mono">USH.HEADQUARTERS</p>
                      </div>
                      <p className="text-white/80 text-sm">Our headquarters in Dubai, designed to provide an exceptional client experience</p>
                    </div>
                    
                    {/* Interactive hotspot */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                      <motion.div
                        className="w-16 h-16 rounded-full bg-earth-600/30 backdrop-blur-sm border border-earth-500/30 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaInfoCircle size={24} className="text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  >
                    <div className="relative inline-block">
                      <h4 className="text-3xl font-semibold text-earth-800 mb-6">
                        Award-Winning Excellence
                      </h4>
                      <span className="absolute -bottom-2 left-0 w-16 h-0.5 bg-earth-400"></span>
                    </div>
                    
                    <p className="text-lg text-earth-600 leading-relaxed">
                      With over a decade of experience in Dubai's premium real estate market,
                      we've established ourselves as a trusted partner for investors and homeowners alike,
                      managing a portfolio worth over <span className="font-medium text-earth-800">AED 5 billion</span>.
                    </p>
                    
                    {/* Futuristic stats display */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      {[
                        { label: "Client Satisfaction", value: "98%" },
                        { label: "Market Coverage", value: "85%" }
                      ].map((stat, i) => (
                        <div key={i} className="bg-earth-50/80 backdrop-blur-sm rounded-lg p-4 border border-earth-100">
                          <div className="text-2xl font-bold text-earth-800 mb-1 font-mono">{stat.value}</div>
                          <div className="text-sm text-earth-600">{stat.label}</div>
                          <div className="w-full h-1 bg-earth-200 mt-2 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-earth-600"
                              initial={{ width: 0 }}
                              animate={{ width: stat.value }}
                              transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-8">
                      <a 
                        href="/about" 
                        className="inline-flex items-center text-earth-800 font-medium hover:text-earth-600 transition-all duration-300 group relative"
                      >
                        <span className="relative z-10 flex items-center">
                          <span className="mr-2">Learn more about our journey</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-earth-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                        <span className="absolute inset-0 bg-earth-100/0 group-hover:bg-earth-100/30 -z-0 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-all duration-500"></span>
                      </a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                {/* Futuristic timeline visualization */}
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-earth-300 via-earth-400 to-earth-200"></div>
                  <div className="absolute left-0 top-0 w-4 h-4 rounded-full border-2 border-earth-400 bg-white transform -translate-x-[7px]"></div>
                  <div className="absolute left-0 bottom-0 w-4 h-4 rounded-full border-2 border-earth-200 bg-white transform -translate-x-[7px]"></div>
                  
                  {/* Timeline content */}
                  <div className="space-y-16 pl-12">
                    {[
                      { 
                        year: "2010", 
                        title: "Company Founded", 
                        description: "Union Square House was established in Dubai with a vision to transform the luxury real estate experience.",
                        image: "/assets/timeline-2010.jpg"
                      },
                      { 
                        year: "2015", 
                        title: "Market Leader", 
                        description: "Became one of Dubai's top real estate agencies with a portfolio exceeding AED 2 billion.",
                        image: "/assets/timeline-2015.jpg"
                      },
                      { 
                        year: "2018", 
                        title: "International Expansion", 
                        description: "Opened offices in key global markets and established partnerships with international developers.",
                        image: "/assets/timeline-2018.jpg"
                      },
                      { 
                        year: "2022", 
                        title: "Digital Transformation", 
                        description: "Launched innovative property tech solutions to enhance client experience and streamline transactions.",
                        image: "/assets/timeline-2022.jpg"
                      }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="relative"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {/* Timeline node */}
                        <div className="absolute left-0 top-0 w-3 h-3 bg-earth-500 rounded-full transform -translate-x-[6.5px] -translate-y-[6px]">
                          <div className="absolute inset-0 bg-earth-400 rounded-full animate-ping opacity-75"></div>
                        </div>
                        
                        {/* Content card */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-earth-100 hover:border-earth-200 transition-all duration-300 group">
                          <div className="grid md:grid-cols-5">
                            {/* Image section */}
                            <div className="md:col-span-2 relative h-full min-h-[180px] bg-earth-100">
                              {item.image && (
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-r from-earth-800/40 to-transparent"></div>
                              
                              {/* Futuristic year display */}
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <div className="inline-block bg-earth-800/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-mono">
                                  <span className="text-earth-400 text-xs">YEAR</span>
                                  <div className="text-2xl font-bold">{item.year}</div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Content section */}
                            <div className="md:col-span-3 p-6">
                              <h4 className="text-xl font-semibold text-earth-800 mb-3">{item.title}</h4>
                              <p className="text-earth-600">{item.description}</p>
                              
                              {/* Interactive element */}
                              <div className="mt-4 flex justify-end">
                                <motion.button
                                  className="flex items-center text-earth-700 text-sm font-medium"
                                  whileHover={{ scale: 1.05, color: "#7d7460" }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <span>View details</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                  </svg>
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                
              </motion.div>
            )}
            
            
          </AnimatePresence>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-28"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="relative p-8 bg-white/80 backdrop-blur-sm rounded-xl  hover:shadow-xl transition-all duration-300 border border-earth-200 hover:border-earth-3 00 group overflow-hidden"
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300 }
                }}
                onClick={() => handleShowModal({
                  title: stat.text,
                  icon: stat.icon,
                  value: stat.number + stat.suffix,
                  description: [
                    "Years Experience: Over a decade of excellence in Dubai's luxury real estate market.",
                    "AED Portfolio: Managing properties worth over 5 billion AED across premium locations.",
                    "Properties Sold: Successfully closed deals on more than 500 premium properties.",
                    "Industry Awards: Recognized with 15+ prestigious awards for outstanding service."
                  ][index]
                })}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-earth-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-earth-100/30 rounded-full -mr-8 -mt-8 group-hover:bg-earth-200/30 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-earth-100/20 rounded-full -ml-6 -mb-6 group-hover:bg-earth-200/20 transition-colors duration-500"></div>
                
                <div className="mb-3 relative z-10">
                  <FuturisticCounter target={stat.number} suffix={stat.suffix} duration={2.5 - (index * 0.3)} />
                </div>
                <p className="text-earth-500 font-medium relative z-10">{stat.text}</p>
                
                {/* Interactive indicator */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-earth-100 flex items-center justify-center"
                    whileHover={{ scale: 1.2, backgroundColor: "#e2dfd7" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaInfoCircle className="text-earth-700" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Modal */}
      <AnimatePresence>
        {showModal && modalContent && (
          <motion.div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-xl overflow-hidden max-w-lg w-full shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              {modalContent.image && (
                <div className="w-full h-64 relative">
                  <img 
                    src={modalContent.image} 
                    alt={modalContent.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {modalContent.icon && (
                    <div className="w-12 h-12 rounded-full bg-earth-100 flex items-center justify-center mr-4">
                      <modalContent.icon className="text-earth-700 text-xl" />
                    </div>
                  )}
                  <h3 className="text-2xl font-semibold text-earth-800">
                    {modalContent.value ? (
                      <span>
                        {modalContent.value} <span className="text-lg font-normal text-earth-600">{modalContent.title}</span>
                      </span>
                    ) : (
                      modalContent.title
                    )}
                  </h3>
                </div>
                
                <p className="text-earth-600 mb-6">{modalContent.description}</p>
                
                <div className="flex justify-end">
                  <motion.button 
                    className="px-4 py-2 bg-earth-700 text-white rounded-lg"
                    onClick={() => setShowModal(false)}
                    whileHover={{ scale: 1.05, backgroundColor: "#5c5545" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
