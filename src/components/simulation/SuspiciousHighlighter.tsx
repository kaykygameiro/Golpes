import React, { useState } from 'react';
import { Highlight } from '../../data/scenarios';
import { Info, ShieldCheck, X } from 'lucide-react';

interface Props {
  content: string;
  sender: string;
  type: string;
  highlights?: Highlight[];
  showHighlights: boolean;
}

export function SuspiciousHighlighter({ content, sender, type, highlights, showHighlights }: Props) {
  const [activeHighlightId, setActiveHighlightId] = useState<string | null>(null);

  const activeHighlight = highlights?.find((h) => h.id === activeHighlightId);

  return (
    <div className="bg-slate-200 p-4 rounded-xl shadow-inner border border-slate-300 relative">
      <div className="flex items-center gap-3 mb-3 border-b border-slate-300 pb-3">
        <div className="w-14 h-14 rounded-full bg-slate-400 flex items-center justify-center text-white font-bold text-2xl">
          {sender.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-slate-900 text-xl">{sender}</p>
          <p className="text-base text-slate-600 uppercase tracking-wide font-medium">{type}</p>
        </div>
      </div>
      
      <div className="relative bg-white p-5 rounded-2xl rounded-tl-none shadow-sm text-xl text-slate-800 leading-relaxed max-w-[90%] inline-block">
        <p className="relative z-10">{content}</p>
        
        {showHighlights && highlights && highlights.map(hl => (
          <div 
            key={hl.id} 
            onClick={() => setActiveHighlightId(hl.id)}
            className={`absolute border-4 rounded-lg z-20 cursor-pointer transition-colors ${activeHighlightId === hl.id ? 'border-red-700 bg-red-100/30' : 'border-red-500 hover:border-red-600'} animate-pulse`}
            style={{
              top: `${hl.y}%`,
              left: `${hl.x}%`,
              width: `${hl.width}%`,
              height: `${hl.height}%`,
            }}
          >
            {activeHighlightId !== hl.id && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-red-600 text-white text-base font-bold px-3 py-2 rounded shadow-lg w-max max-w-[200px] text-center leading-tight pointer-events-none">
                {hl.description}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-red-600 pointer-events-none"></div>
              </div>
            )}
            
            {/* Click affordance */}
            <div className={`absolute -right-3 -top-3 bg-red-600 text-white rounded-full p-1 shadow-md z-30 transition-opacity ${activeHighlightId === hl.id ? 'opacity-0' : 'opacity-100'}`}>
              <Info className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Highlight Modal overlay */}
      {activeHighlight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setActiveHighlightId(null)}>
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border-4 border-red-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-red-50 border-b-2 border-red-100 p-4 flex justify-between items-center text-red-800">
              <h4 className="font-bold text-xl flex items-center gap-2">
                <Info className="w-6 h-6" /> Análise do Golpe
              </h4>
              <button 
                onClick={() => setActiveHighlightId(null)}
                className="p-2 hover:bg-red-100 rounded-full transition-colors active:scale-95"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">O que encontramos:</p>
                <p className="text-xl font-bold text-slate-800">{activeHighlight.description}</p>
              </div>
              
              {activeHighlight.detailedDescription && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-lg text-slate-700 leading-relaxed">
                  {activeHighlight.detailedDescription}
                </div>
              )}
              
              {activeHighlight.preventionTip && (
                <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-xl">
                  <h5 className="font-bold text-blue-800 text-lg flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5" /> Como se Proteger:
                  </h5>
                  <p className="text-blue-900 font-medium">
                    {activeHighlight.preventionTip}
                  </p>
                </div>
              )}
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200">
              <button 
                onClick={() => setActiveHighlightId(null)}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-xl text-lg shadow active:scale-95 transition-all"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
