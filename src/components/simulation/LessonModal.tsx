import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';
import { AgeFriendlyButton } from '../ui/AgeFriendlyButton';
import { Scenario } from '../../data/scenarios';

interface Props {
  isOpen: boolean;
  isScamAction: boolean | null;
  scenario: Scenario;
  onContinue: () => void;
  onMinimize?: () => void;
}

export function LessonModal({ isOpen, isScamAction, scenario, onContinue, onMinimize }: Props) {
  if (!isOpen || isScamAction === null) return null;

  return (
    <AnimatePresence>
      <motion.div 
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
      />
      
      <motion.div 
        key="modal"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`fixed bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-[2rem] shadow-2xl z-50 p-6 flex flex-col ${
          !isScamAction ? 'bg-green-50 border-t-8 border-green-500' : 'bg-red-50 border-t-8 border-red-500'
        }`}
      >
        <div className="w-16 h-2 bg-slate-300 rounded-full mx-auto mb-6"></div>

        <div className="flex flex-col items-center text-center">
          {!isScamAction ? (
            <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
          ) : (
            <AlertTriangle className="w-20 h-20 text-red-500 mb-4" />
          )}

          <h3 className={`text-3xl font-extrabold mb-4 ${!isScamAction ? 'text-green-800' : 'text-red-800'}`}>
            {!isScamAction ? 'Muito bem!' : 'Cuidado!'}
          </h3>
          
          <p className="text-xl text-slate-800 leading-relaxed font-medium mb-6 px-2">
            {!isScamAction ? scenario.feedback.successText : scenario.feedback.failText}
          </p>
        </div>

        {isScamAction && scenario.media.highlights && scenario.media.highlights.length > 0 && (
          <div className="w-full mb-8 bg-white p-5 rounded-2xl shadow-sm border border-red-200">
            <h4 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6" /> Sinais do Golpe:
            </h4>
            <ul className="space-y-4">
              {scenario.media.highlights.map((hl) => (
                <li key={hl.id} className="flex gap-3 text-lg text-slate-800 items-start font-medium leading-snug">
                  <span className="text-red-500 mt-0.5 text-2xl leading-none">🚩</span>
                  <span>{hl.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mt-auto pt-4 pb-2 flex flex-col gap-3">
          <AgeFriendlyButton onClick={onContinue} variant={!isScamAction ? 'primary' : 'danger'}>
            Entendi, Continuar
          </AgeFriendlyButton>
          
          {isScamAction && onMinimize && (
            <button 
              onClick={onMinimize} 
              className="text-slate-600 font-bold py-3 outline-none focus:ring-2 rounded-lg hover:bg-red-100 active:scale-95 transition-all w-full text-lg"
            >
              👀 Analisar Mensagem Novamente
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
