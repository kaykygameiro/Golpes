import React, { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { MODULES } from '../../data/scenarios';
import { TabButton } from './TabButton';
import { ModuleCard } from './ModuleCard';
import { HelpSection } from './HelpSection';
import { BottomNav } from './BottomNav';
import { AgeFriendlyButton } from '../ui/AgeFriendlyButton';

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
  const { score, completedScenarios, selectModule, resetProgress, goToDashboard } = useAppStore();
  const [activeTab, setActiveTab] = useState<'modules' | 'help'>('modules');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const completionByScenarioId = useMemo(() => {
    return new Set(completedScenarios);
  }, [completedScenarios]);

  const { totalScenarios, totalCompleted, globalPercent } = useMemo(() => {
    const total = MODULES.reduce((acc, m) => acc + m.scenarios.length, 0);
    const done = completedScenarios.length;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { totalScenarios: total, totalCompleted: done, globalPercent: percent };
  }, [completedScenarios]);

  const rankLabel = useMemo(() => {
    const maxScore = totalScenarios * 10;
    const ratio = maxScore > 0 ? score / maxScore : 0;
    if (ratio >= 0.85) return 'Guardião Digital';
    if (ratio >= 0.6) return 'Protetor Atento';
    if (ratio >= 0.3) return 'Vigilante';
    return 'Iniciante';
  }, [score, totalScenarios]);

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
    setActiveTab('modules');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center pb-24">
      <header className="w-full bg-blue-600 text-white">
        <div className="max-w-md mx-auto px-4 pt-8 pb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold">Seu Progresso</h1>
              <p className="mt-1 text-sm font-medium text-blue-100">Treine para identificar golpes digitais.</p>
            </div>

            <div className="shrink-0">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-2xl px-3 py-2">
                <StarIcon className="w-5 h-5 text-yellow-300" />
                <div className="leading-tight">
                  <div className="text-lg font-extrabold">{score}</div>
                  <div className="text-[11px] font-extrabold text-blue-100">PONTOS</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 text-slate-900">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center" aria-hidden="true">
                  <TrophyIcon className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-500">RANK</div>
                  <div className="text-base font-extrabold text-slate-900">{rankLabel}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                aria-label="Resetar progresso"
                className="min-h-[44px] px-3 rounded-2xl text-sm font-extrabold text-red-700 hover:bg-red-50 focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:outline-none"
              >
                Resetar
              </button>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-extrabold text-slate-600">
                <span>Progresso global</span>
                <span>
                  {totalCompleted}/{totalScenarios}
                </span>
              </div>
              <div
                className="mt-2 h-3 rounded-full bg-slate-200 overflow-hidden"
                role="progressbar"
                aria-valuenow={totalCompleted}
                aria-valuemin={0}
                aria-valuemax={totalScenarios}
                aria-label="Progresso global"
              >
                <div className="h-full rounded-full bg-blue-600" style={{ width: `${globalPercent}%` }} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full max-w-md px-4 mt-6">
        {showResetConfirm && (
          <section
            className="mb-4 bg-white border border-slate-200 rounded-2xl shadow-sm p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Confirmar reset"
          >
            <h2 className="text-base font-extrabold text-slate-900">Resetar progresso?</h2>
            <p className="mt-1 text-sm font-medium text-slate-700">
              Isso zera sua pontuação e marcações de cenários concluídos.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <AgeFriendlyButton
                variant="secondary"
                size="sm"
                aria-label="Cancelar reset"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancelar
              </AgeFriendlyButton>
              <AgeFriendlyButton
                variant="danger"
                size="sm"
                aria-label="Confirmar reset"
                onClick={handleReset}
              >
                Resetar
              </AgeFriendlyButton>
            </div>
          </section>
        )}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-2">
          <div className="grid grid-cols-2 gap-2">
            <TabButton
              active={activeTab === 'modules'}
              onClick={() => setActiveTab('modules')}
              label="Módulos"
              aria-label="Ver módulos"
            />
            <TabButton
              active={activeTab === 'help'}
              onClick={() => setActiveTab('help')}
              label="Ajuda"
              aria-label="Ver ajuda"
            />
          </div>
        </div>

        <div className="mt-4">
          {activeTab === 'modules' ? (
            <div className="space-y-3">
              {MODULES.map((mod, index) => {
                const previousMod = index > 0 ? MODULES[index - 1] : null;
                const isLocked = previousMod ? !previousMod.scenarios.every((s) => completionByScenarioId.has(s.id)) : false;
                const completedCount = mod.scenarios.filter((s) => completionByScenarioId.has(s.id)).length;
                const allScenariosCompleted = completedCount === mod.scenarios.length;

                const moduleEmojis = ['🧠', '💳', '🛒'];
                const iconEmoji = moduleEmojis[index] ?? '📘';

                return (
                  <div
                    key={mod.id}
                    className={
                      'transition-all duration-300 ' +
                      (mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3')
                    }
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    <ModuleCard
                      moduleNumber={index + 1}
                      title={mod.title}
                      description={mod.description}
                      iconEmoji={iconEmoji}
                      isLocked={isLocked}
                      isCompleted={allScenariosCompleted}
                      completedCount={completedCount}
                      totalCount={mod.scenarios.length}
                      onClick={() => selectModule(mod.id)}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <HelpSection />
          )}
        </div>
      </main>

      <BottomNav
        activeTab={activeTab === 'help' ? 'help' : 'home'}
        onTabChange={(tab) => {
          if (tab === 'home') {
            goToDashboard();
            setActiveTab('modules');
            return;
          }
          setActiveTab('help');
        }}
      />
    </div>
  );
}
