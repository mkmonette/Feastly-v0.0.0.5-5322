import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300";
  
  const variants = {
    primary: "border-transparent text-white bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 shadow-lg hover:shadow-orange-500/30",
    secondary: "border-transparent text-orange-600 bg-orange-100 hover:bg-orange-200 focus:ring-orange-500",
    outline: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-orange-500",
    ghost: "border-transparent text-gray-600 hover:text-orange-600 hover:bg-orange-50",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;