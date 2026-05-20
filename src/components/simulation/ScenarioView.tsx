import React, { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { MODULES } from '../../data/scenarios';
import { AgeFriendlyButton } from '../ui/AgeFriendlyButton';

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function ShieldAlertIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function ScenarioView() {
  const { currentModuleId, currentScenarioIndex, answerScenario, goToDashboard, selectScenario } = useAppStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const currentModule = useMemo(() => MODULES.find((m) => m.id === currentModuleId) ?? null, [currentModuleId]);
  const scenario = currentModule?.scenarios[currentScenarioIndex] ?? null;

  if (!currentModule || !scenario) {
    return (
      <div className="p-6 text-center">
        <p className="text-xl font-bold text-slate-800">Cenário não encontrado.</p>
        <AgeFriendlyButton onClick={goToDashboard} variant="primary" className="mt-4">
          Voltar ao Dashboard
        </AgeFriendlyButton>
      </div>
    );
  }

  const handleOptionClick = (optionId: string, isScamAction: boolean) => {
    if (hasAnswered) return;
    setSelectedOption(optionId);
    setHasAnswered(true);
    answerScenario(scenario.id, !isScamAction);
  };

  const handleNext = () => {
    const nextIndex = currentScenarioIndex + 1;
    if (nextIndex < currentModule.scenarios.length) {
      setSelectedOption(null);
      setHasAnswered(false);
      selectScenario(currentModule.id, nextIndex);
    } else {
      goToDashboard();
    }
  };

  const chosenOption = scenario.options.find((o) => o.id === selectedOption) ?? null;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 pb-32 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md overflow-hidden border border-slate-200">
        <div className="bg-blue-600 p-4 text-white flex justify-between items-center gap-4">
          <span className="text-lg font-bold tracking-wide uppercase truncate" title={currentModule.title}>
            {currentModule.title}
          </span>
          <span className="text-base font-medium whitespace-nowrap">
            Questão {currentScenarioIndex + 1} de {currentModule.scenarios.length}
          </span>
        </div>

        <div className="p-4 md:p-6">
          <h2 className="text-2xl font-extrabold text-slate-800 mb-4">{scenario.title}</h2>
          <p className="text-lg text-slate-600 font-medium mb-6 bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
            {scenario.question}
          </p>

          <div className="relative border-2 border-slate-300 rounded-xl bg-slate-50 mb-6 shadow-inner overflow-hidden flex justify-center items-center p-2 min-h-[300px]">
            {/* Renderiza a imagem correspondente ao estado da resposta */}
            <img 
              src={hasAnswered ? scenario.media.highlightedImage : scenario.media.baseImage} 
              alt="Simulação de interface do golpe" 
              className="max-w-full h-auto rounded shadow-sm"
              style={{ maxHeight: '600px', objectFit: 'contain' }}
            />
          </div>

          {!hasAnswered && (
            <div className="space-y-3">
              {scenario.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleOptionClick(opt.id, opt.isScamAction)}
                  className="w-full text-left p-4 rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xl font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-200"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          )}

          {hasAnswered && chosenOption && (
            <div className="mt-6 border-t border-slate-200 pt-6">
              <div className={`p-4 rounded-xl border-2 flex items-start gap-4 mb-6 ${chosenOption.isScamAction ? 'bg-red-50 border-red-300 text-red-900' : 'bg-green-50 border-green-300 text-green-900'}`}>
                <div className="mt-1">
                  {chosenOption.isScamAction ? (
                    <ShieldAlertIcon className="w-8 h-8 text-red-600 flex-shrink-0" />
                  ) : (
                    <ShieldCheckIcon className="w-8 h-8 text-green-600 flex-shrink-0" />
                  )}
                </div>
                <div>
                  <h4 className="text-xl font-extrabold mb-1">
                    {chosenOption.isScamAction ? 'Você caiu na armadilha!' : 'Você se protegeu bem!'}
                  </h4>
                  <p className="text-lg font-medium">
                    {chosenOption.isScamAction ? scenario.feedback.failText : scenario.feedback.successText}
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-6">
                <h5 className="text-lg font-extrabold text-amber-900 mb-2 font-mono uppercase tracking-wide">
                  Análise Visual do Golpe
                </h5>
                <p className="text-base font-medium text-amber-800 mb-3">
                  A imagem acima foi atualizada com marcações em vermelho para apontar as fraudes na mensagem. Leia os detalhes abaixo:
                </p>

                {scenario.media.highlights.map((hl) => (
                  <div key={hl.id} className="p-3 rounded-lg bg-white border border-amber-100 transition-all text-left mt-2 shadow-sm">
                    <p className="text-base font-bold text-slate-800">{hl.description}</p>
                    <p className="text-sm text-slate-600 mt-1">{hl.detailedDescription}</p>
                    <div className="text-sm font-semibold text-green-700 mt-2 bg-green-50 p-2 rounded border border-green-100">
                      Dica de Proteção: {hl.preventionTip}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <AgeFriendlyButton onClick={handleNext} variant="primary" className="flex items-center gap-2 px-8">
                  <span>Avançar</span>
                  <ArrowRightIcon className="w-6 h-6" />
                </AgeFriendlyButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}