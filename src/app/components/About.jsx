'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

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
      <span className={`text-5xl font-bold ${glitching ? 'text-transparent' : 'text-earth-800'} transition-colors`}>
        {count}{suffix}
      </span>
      {glitching && (
        <span className="absolute inset-0 text-5xl font-bold text-earth-800 blur-[1px] animate-pulse">
          {count}{suffix}
        </span>
      )}
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
    { number: "12", suffix: "+", text: "Years Experience" },
    { number: "5", suffix: "B+", text: "AED Portfolio" },
    { number: "500", suffix: "+", text: "Properties Sold" },
    { number: "15", suffix: "+", text: "Industry Awards" }
  ];
  
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
      <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] bg-repeat opacity-5 z-0"></div>
      
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
          
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div 
              className="rounded-xl overflow-hidden shadow-2xl group relative"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-earth-800/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
              <div className="absolute inset-0 border border-earth-200/30 z-20 transition-all duration-500 group-hover:border-earth-400/50"></div>
              <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-earth-400/30 z-20"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-earth-400/30 z-20"></div>
              <img 
                src="/assets/ush-office.webp" 
                alt="Union Square House Office" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-earth-900/70 to-transparent p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white/90 text-sm font-medium">Our headquarters in Dubai, designed to provide an exceptional client experience</p>
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
              
              <p className="text-xl text-earth-700 leading-relaxed">
                Union Square House has been consistently recognised by top
                master‑developers in Dubai, including <span className="font-medium text-earth-800 relative inline-block">
                  <span className="relative z-10">Emaar, Dubai Properties, Deyaar and Nshama</span>
                  <span className="absolute bottom-1 left-0 right-0 h-2 bg-earth-200/50 -z-0"></span>
                </span>, earning multiple prestigious awards for excellence.
              </p>
              
              <p className="text-lg text-earth-600 leading-relaxed">
                With over a decade of experience in Dubai's premium real estate market,
                we've established ourselves as a trusted partner for investors and homeowners alike,
                managing a portfolio worth over <span className="font-medium text-earth-800">AED 5 billion</span>.
              </p>
              
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
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-28"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="relative p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-earth-100 hover:border-earth-200 group overflow-hidden"
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-earth-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-earth-100/30 rounded-full -mr-8 -mt-8 group-hover:bg-earth-200/30 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-earth-100/20 rounded-full -ml-6 -mb-6 group-hover:bg-earth-200/20 transition-colors duration-500"></div>
                
                <div className="mb-3 relative z-10">
                  <FuturisticCounter target={stat.number} suffix={stat.suffix} duration={2.5 - (index * 0.3)} />
                </div>
                <p className="text-earth-600 font-medium relative z-10">{stat.text}</p>
                
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-earth-400 to-earth-200 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
