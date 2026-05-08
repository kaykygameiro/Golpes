import React from 'react';
import { motion } from 'motion/react';

interface Props {
  active: boolean;
  onClick: () => void;
  label: string;
}

export function TabButton({ active, onClick, label }: Props) {
  return (
    <button
      onClick={onClick}
      className={`relative flex-1 py-4 text-lg font-bold transition-colors ${
        active ? 'text-blue-700' : 'text-slate-500 hover:text-slate-700'
      }`}
    >
      {label}
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"
        />
      )}
    </button>
  );
}
