import React from 'react';
import { ChevronRight, Lock, ShieldCheck, PlayCircle } from 'lucide-react';

interface Props {
  title: string;
  description: string;
  isLocked: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

export function ModuleCard({ title, description, isLocked, isCompleted, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`w-full text-left p-4 mb-3 rounded-xl border-2 transition-all flex items-center group shadow-sm
        ${isLocked ? 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed' : 
          isCompleted ? 'bg-green-50 border-green-300 hover:border-green-400' : 'bg-white border-blue-100 hover:border-blue-400'
        }
      `}
    >
      <div className="flex-1 pr-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={`text-xl font-bold ${isLocked ? 'text-slate-500' : 'text-slate-800'}`}>
            {title}
          </h3>
          {isCompleted && <ShieldCheck className="w-5 h-5 text-green-500" />}
        </div>
        <p className={`text-base font-medium line-clamp-2 ${isLocked ? 'text-slate-400' : 'text-slate-600'}`}>
          {description}
        </p>
      </div>
      
      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-slate-100">
        {isLocked ? (
          <Lock className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronRight className={`w-6 h-6 ${isCompleted ? 'text-green-600' : 'text-blue-600'} group-hover:scale-110 transition-transform`} />
        )}
      </div>
    </button>
  );
}
