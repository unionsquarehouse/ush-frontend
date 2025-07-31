'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AnimatedButton({ 
  href, 
  children, 
  className = '',
  isInView = true,
  animationDelay = 0.6,
  color = 'yellow-600',
  hoverColor = 'yellow-600',
  gradientFrom = 'yellow-600',
  gradientTo = 'yellow-600',
  size = 'default',
  containerClassName = 'mt-20 text-center',
  variant = 'solid', // 'solid', 'glass', 'glass-earth'
}) {
  // Size variants
  const sizeClasses = {
    small: 'px-6 py-3 text-base',
    default: 'px-8 py-4 text-lg',
    large: 'px-10 py-5 text-xl'
  };
  
  // Get the appropriate classes based on the color props
  const getButtonClasses = () => {
    if (variant === 'solid') {
      // Hardcoded classes for specific colors
      if (color === 'yellow-600') {
        return 'bg-gradient-to-r from-[#9F3349]  via-[#a53047] to-[#e24d6b] ';
      } else if (color === 'earth-600') {
        return 'bg-earth-600 text-white hover:bg-earth-500';
      } else {
        return 'bg-yellow-600 text-white hover:bg-yellow-500'; // Default fallback
      }
    } else if (variant === 'glass') {
      return 'btn-glass text-black';
    } else if (variant === 'glass-earth') {
      return 'btn-glass-earth';
    }
    
    return 'bg-gradient-to-r from-[#e24d6b]  via-[#a53047] to-[#9F3349] '; // Default fallback
  };
  
  // Get gradient classes
  const getGradientClasses = () => {
    if (gradientFrom === 'yellow-600' && gradientTo === 'yellow-500') {
      return ' bg-gradient-to-r from-[#9F3349]  via-[#a53047] to-[#e24d6b] ';
    } else if (gradientFrom === 'earth-600' && gradientTo === 'earth-500') {
      return 'bg-gradient-to-r from-[#9F3349]  via-[#a53047] to-[#e24d6b] ';
    }
    
    return 'bg-gradient-to-r from-[#9F3349]  via-[#a53047] to-[#e24d6b] '; // Default fallback
  };
  
  return (
    <motion.div 
      className={containerClassName}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: animationDelay }}
    >
      <Link 
        href={href} 
        className={`inline-flex items-center ${sizeClasses[size]} ${getButtonClasses()}  transition-all duration-300 group relative overflow-hidden ${className}`}
      >
        {/* Button content */}
        <span className="relative z-10">{children}</span>
        
        {/* Glass shimmer effect */}
        {variant.includes('glass') && (
          <span className="absolute inset-0 w-full h-full">
            <span className="absolute top-0 left-0 w-1/3 h-full bg-white/20 transform -skew-x-20 translate-x-[-150%] group-hover:translate-x-[300%] transition-transform duration-1000"></span>
          </span>
        )}
        
        {/* Gradient background for solid variant */}
        {variant === 'solid' && (
          <span className={`absolute inset-0 bg-gradient-to-r ${getGradientClasses()} transform -skew-x-10 translate-x-full group-hover:translate-x-0 transition-transform duration-500`}></span>
        )}
      </Link>
    </motion.div>
  );
}
