import React from 'react';
import { Home, Settings, Search } from 'lucide-react';

interface Props {
  onHomeClick?: () => void;
}

export function BottomNav({ onHomeClick }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-4 pt-2 px-6 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center h-16">
        <button className="flex flex-col items-center gap-1 min-w-[64px] text-blue-600" onClick={onHomeClick}>
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Início</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 min-w-[64px] text-slate-400 hover:text-slate-600">
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Buscar</span>
        </button>
        
        <button className="flex flex-col items-center gap-1 min-w-[64px] text-slate-400 hover:text-slate-600">
          <Settings className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Config</span>
        </button>
      </div>
    </nav>
  );
}
