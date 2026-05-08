import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { SCENARIOS } from '../../data/scenarios';
import { Trophy, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TabButton } from './TabButton';
import { ModuleCard } from './ModuleCard';
import { HelpSection } from './HelpSection';
import { BottomNav } from './BottomNav';

export function ProgressDashboard() {
  const { score, completedScenarios, goHome, selectScenario } = useAppStore();
  const [activeTab, setActiveTab] = useState<'modules' | 'help'>('modules');
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pb-24">
      {/* Header and User Stats */}
      <div className="w-full max-w-md bg-blue-600 px-6 pt-10 pb-6 rounded-b-[40px] shadow-lg flex flex-col items-center text-white relative z-10">
        <div className="bg-white p-4 rounded-full border-4 border-blue-200 shadow-md mb-4 mt-2">
          <Trophy className="w-12 h-12 text-yellow-500" />
        </div>
        <h1 className="text-3xl font-extrabold mb-1">Seu Progresso</h1>
        <p className="text-blue-100 font-medium mb-6 text-lg">Continue protegendo seus dados!</p>

        <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 flex items-center justify-center gap-3">
          <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
          <span className="text-2xl font-extrabold">{score}</span>
          <span className="text-sm font-bold text-blue-200 uppercase tracking-widest leading-none mt-1">Pontos</span>
        </div>
      </div>

      <div className="w-full max-w-md px-4 mt-6">
        {/* Tabs */}
        <div className="flex bg-slate-200/50 p-1 rounded-2xl mb-6 relative">
          <TabButton 
            active={activeTab === 'modules'} 
            onClick={() => setActiveTab('modules')} 
            label="MÓDULOS" 
          />
          <TabButton 
            active={activeTab === 'help'} 
            onClick={() => setActiveTab('help')} 
            label="AJUDA" 
          />
        </div>

        {/* Dynamic Content Area */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === 'modules' ? (
              <motion.div
                key="modules"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                {SCENARIOS.map((scenario, index) => {
                  const isCompleted = completedScenarios.includes(scenario.id);
                  const isLocked = index > 0 && !completedScenarios.includes(SCENARIOS[index - 1].id) && !isCompleted;

                  return (
                    <ModuleCard
                      key={scenario.id}
                      title={`Módulo ${index + 1}: ${scenario.title}`}
                      description={scenario.introAudioText}
                      isLocked={isLocked}
                      isCompleted={isCompleted}
                      onClick={() => selectScenario(index)}
                    />
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="help"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <HelpSection />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <BottomNav onHomeClick={goHome} />
    </div>
  );
}
