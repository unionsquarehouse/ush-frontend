'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AnimatedButton({ 
  href, 
  children, 
  className = '',
  isInView = true,
  animationDelay = 0.6,
  color = 'earth-800',
  hoverColor = 'earth-700',
  gradientFrom = 'earth-700',
  gradientTo = 'earth-700',
  size = 'default',
  containerClassName = 'mt-20 text-center',
  variant = 'solid', // 'solid', 'glass', 'glass-earth'
}) {
  // Size variants
  const sizeClasses = {
    small: 'px-6 py-2 text-base',
    default: 'px-8 py-4 text-lg',
    large: 'px-10 py-5 text-xl'
  };
  
  // Style variants
  const variantClasses = {
    solid: `bg-${color} text-white hover:bg-${hoverColor}`,
    glass: 'btn-glass text-white',
    'glass-earth': 'btn-glass-earth'
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
        className={`inline-flex items-center ${sizeClasses[size]} ${variantClasses[variant]} rounded-tl-[2rem] rounded-br-[2rem] transition-all duration-300 group relative overflow-hidden ${className}`}
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
          <span className={`absolute inset-0 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} transform -skew-x-10 translate-x-full group-hover:translate-x-0 transition-transform duration-500`}></span>
        )}
      </Link>
    </motion.div>
  );
}
