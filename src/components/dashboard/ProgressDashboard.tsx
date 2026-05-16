import React, { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { MODULES } from '../../data/scenarios';
import { TabButton } from './TabButton';
import { ModuleCard } from './ModuleCard';
import { HelpSection } from './HelpSection';
import { BottomNav } from './BottomNav';

function TrophyIcon({ className }: { className?: string }) {
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
      <path d="M8 4h8v3a4 4 0 01-8 0V4z" />
      <path d="M6 4H4v3a4 4 0 004 4" />
      <path d="M18 4h2v3a4 4 0 01-4 4" />
      <path d="M12 11v3" />
      <path d="M8 21h8" />
      <path d="M10 14h4" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M12 17.3l-5.8 3.5 1.6-6.6L2.6 9.6l6.8-.6L12 2.7l2.6 6.3 6.8.6-5.2 4.6 1.6 6.6z" />
    </svg>
  );
}

export function ProgressDashboard() {
  const { score, completedScenarios, selectModule, goToDashboard } = useAppStore();
  const [activeTab, setActiveTab] = useState<'modules' | 'help'>('modules');

  const completionByScenarioId = useMemo(() => {
    return new Set(completedScenarios);
  }, [completedScenarios]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pb-24">
      <div className="w-full max-w-md bg-blue-600 px-6 pt-10 pb-6 rounded-b-[40px] shadow-lg flex flex-col items-center text-white relative z-10">
        <div className="bg-white p-4 rounded-full border-4 border-blue-200 shadow-md mb-4 mt-2">
          <TrophyIcon className="w-12 h-12 text-yellow-500" />
        </div>
        <h1 className="text-3xl font-extrabold mb-1">Seu Progresso</h1>
        <p className="text-blue-100 font-medium mb-6 text-lg">Continue protegendo seus dados!</p>

        <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 flex items-center justify-center gap-3">
          <StarIcon className="w-6 h-6 text-yellow-400" />
          <span className="text-2xl font-extrabold">{score}</span>
          <span className="text-sm font-bold text-blue-200 uppercase tracking-widest leading-none mt-1">Pontos</span>
        </div>
      </div>

      <div className="w-full max-w-md px-4 mt-6">
        <div className="flex bg-slate-200/50 p-1 rounded-2xl mb-6 relative">
          <TabButton active={activeTab === 'modules'} onClick={() => setActiveTab('modules')} label="MÓDULOS" />
          <TabButton active={activeTab === 'help'} onClick={() => setActiveTab('help')} label="AJUDA" />
        </div>

        <div className="relative">
          {activeTab === 'modules' ? (
            <div className="space-y-3">
              {MODULES.map((mod, index) => {
                const previousMod = index > 0 ? MODULES[index - 1] : null;
                const isLocked = previousMod
                  ? !previousMod.scenarios.every((s) => completionByScenarioId.has(s.id))
                  : false;

                const allScenariosCompleted = mod.scenarios.every((s) => completionByScenarioId.has(s.id));

                return (
                  <ModuleCard
                    key={mod.id}
                    title={mod.title}
                    description={mod.description}
                    icon={`M${index + 1}`}
                    isLocked={isLocked}
                    isCompleted={allScenariosCompleted}
                    onClick={() => selectModule(mod.id)}
                  />
                );
              })}
            </div>
          ) : (
            <HelpSection />
          )}
        </div>
      </div>

      <BottomNav onHomeClick={goToDashboard} />
    </div>
  );
}
