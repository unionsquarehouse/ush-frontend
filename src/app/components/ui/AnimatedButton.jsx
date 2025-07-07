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
  containerClassName = 'mt-20 text-center'
}) {
  // Size variants
  const sizeClasses = {
    small: 'px-6 py-2 text-sm',
    default: 'px-8 py-4',
    large: 'px-10 py-5 text-lg'
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
        className={`inline-flex items-center ${sizeClasses[size]} bg-${color} text-white rounded-lg hover:bg-${hoverColor} transition-all duration-300 group relative overflow-hidden ${className}`}
      >
        <span className="relative z-10">{children}</span>
        <span className={`absolute inset-0 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} transform -skew-x-10 translate-x-full group-hover:translate-x-0 transition-transform duration-500`}></span>
      </Link>
    </motion.div>
  );
}