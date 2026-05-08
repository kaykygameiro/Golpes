import React from 'react';
import { motion } from 'motion/react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'warning';
  children: React.ReactNode;
}

export function AgeFriendlyButton({ variant = 'primary', children, className = '', ...props }: Props) {
  const baseClasses = "w-full min-h-[64px] px-6 py-4 rounded-xl font-bold text-[1.15rem] transition-colors shadow-md outline-none focus:ring-4 focus:ring-offset-2 flex items-center justify-center gap-3";
  
  const variants = {
    primary: "bg-blue-800 hover:bg-blue-900 text-white focus:ring-blue-500",
    secondary: "bg-slate-800 hover:bg-slate-900 text-white focus:ring-slate-400",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-slate-900 focus:ring-yellow-500",
    outline: "bg-white border-4 border-slate-300 hover:border-blue-500 hover:bg-blue-50 text-slate-800 focus:ring-blue-300",
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
