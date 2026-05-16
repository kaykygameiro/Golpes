import React from 'react';

function NavIcon({ type, className }: { type: 'home' | 'search' | 'settings'; className?: string }) {
  if (type === 'home') {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 10.5l9-7 9 7" />
        <path d="M9 22V12h6v10" />
      </svg>
    );
  }

  if (type === 'search') {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
      <path d="M19.4 15a8 8 0 00.1-2l2-1-2-3-2 .5a8 8 0 00-1.7-1L15 4h-6l-.8 4.5a8 8 0 00-1.7 1L4.5 9 2.5 12l2 1a8 8 0 00.1 2l-2 1 2 3 2-.5a8 8 0 001.7 1L9 20h6l.8-4.5a8 8 0 001.7-1l2 .5 2-3-2-1z" />
    </svg>
  );
}

interface Props {
  onHomeClick?: () => void;
}

export function BottomNav({ onHomeClick }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-4 pt-2 px-6 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center h-16">
        <button className="flex flex-col items-center gap-1 min-w-16 text-blue-600" onClick={onHomeClick}>
          <NavIcon type="home" className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Início</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 min-w-16 text-slate-400 hover:text-slate-600">
          <NavIcon type="search" className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Buscar</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 min-w-16 text-slate-400 hover:text-slate-600">
          <NavIcon type="settings" className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Config</span>
        </button>
      </div>
    </nav>
  );
}
