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

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="M11 18l-6-6 6-6" />
    </svg>
  );
}

function ZoomInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
      <path d="M11 8v6" />
      <path d="M8 11h6" />
    </svg>
  );
}

function ZoomOutIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
      <path d="M8 11h6" />
    </svg>
  );
}

type ScenarioImageKind = 'base' | 'highlighted';

function getScenarioImageUrl(moduleId: string, scenarioNumber: number, kind: ScenarioImageKind) {
  const map: Record<string, { base: string[]; highlighted: string[] }> = {
    'mod-mensagens': {
      base: [
        new URL('../../imgs/mod1/scenario1_baseImage.png', import.meta.url).href,
        new URL('../../imgs/mod1/scenario2_baseImage.png', import.meta.url).href,
        new URL('../../imgs/mod1/scenario3_baseImage.png', import.meta.url).href,
        new URL('../../imgs/mod1/scenario4_baseImage.png', import.meta.url).href,
        new URL('../../imgs/mod1/scenario5_baseImage.png', import.meta.url).href
      ],
      highlighted: [
        new URL('../../imgs/mod1/scenario1_highlightedImage.png', import.meta.url).href,
        new URL('../../imgs/mod1/scenario2_highlightedImage.png', import.meta.url).href,
        new URL('../../imgs/mod1/scenario3_highlightedImage.png', import.meta.url).href,
        new URL('../../imgs/mod1/scenario4_highlightedImage.png', import.meta.url).href,
        new URL('../../imgs/mod1/scenario5_highlightedImage.png', import.meta.url).href
      ]
    },
    'mod-financeiro': {
      base: [
        new URL('../../imgs/mod2/scenario1_baseImage.png', import.meta.url).href,
        new URL('../../imgs/mod2/scenario2_baseImage.png', import.meta.url).href,
        new URL('../../imgs/mod2/scenario3_baseImage.png', import.meta.url).href,
        new URL('../../imgs/mod2/scenario4_baseImage.png', import.meta.url).href,
        new URL('../../imgs/mod2/scenario5_baseImage.png', import.meta.url).href
      ],
      highlighted: [
        new URL('../../imgs/mod2/scenario1_highlightedImage.png', import.meta.url).href,
        new URL('../../imgs/mod2/scenario2_highlightedImage.png', import.meta.url).href,
        new URL('../../imgs/mod2/scenario3_highlightedImage.png', import.meta.url).href,
        new URL('../../imgs/mod2/scenario4_highlightedImage.png', import.meta.url).href,
        new URL('../../imgs/mod2/scenario5_highlightedImage.png', import.meta.url).href
      ]
    },
    'mod-compras': {
      base: [
        new URL('../../imgs/mod3/scenario1_baseImage (1).png', import.meta.url).href,
        new URL('../../imgs/mod3/scenario2_baseImage.png', import.meta.url).href,
        new URL('../../imgs/mod3/scenario3_baseImage.png', import.meta.url).href,
        new URL('../../imgs/mod3/scenario4_baseImage.png', import.meta.url).href,
        new URL('../../imgs/mod3/scenario5_baseImage.png', import.meta.url).href
      ],
      highlighted: [
        new URL('../../imgs/mod3/scenario1_highlightedImage.png', import.meta.url).href,
        new URL('../../imgs/mod3/scenario2_highlightedImage.png', import.meta.url).href,
        new URL('../../imgs/mod3/scenario3_highlightedImage.png', import.meta.url).href,
        new URL('../../imgs/mod3/scenario4_highlightedImage.png', import.meta.url).href,
        new URL('../../imgs/mod3/scenario5_highlightedImage.png', import.meta.url).href
      ]
    }
  };

  const bucket = map[moduleId];
  const idx = scenarioNumber - 1;
  if (!bucket || idx < 0) return null;
  const arr = kind === 'base' ? bucket.base : bucket.highlighted;
  return arr[idx] ?? null;
}

export function ScenarioView() {
  const { currentModuleId, currentScenarioIndex, answerScenario, goToDashboard, selectScenario } = useAppStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

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
      setIsZoomed(false);
      selectScenario(currentModule.id, nextIndex);
    } else {
      goToDashboard();
    }
  };

  const chosenOption = scenario.options.find((o) => o.id === selectedOption) ?? null;
  const correctOption = scenario.options.find((o) => !o.isScamAction) ?? null;
  const isCorrect = chosenOption ? !chosenOption.isScamAction : false;

  const scenarioNumber = currentScenarioIndex + 1;
  const baseImageUrl =
    (currentModuleId ? getScenarioImageUrl(currentModuleId, scenarioNumber, 'base') : null) ?? scenario.media.baseImage;
  const highlightedImageUrl =
    (currentModuleId ? getScenarioImageUrl(currentModuleId, scenarioNumber, 'highlighted') : null) ??
    scenario.media.highlightedImage;

  const activeImageUrl = hasAnswered ? highlightedImageUrl : baseImageUrl;
  const imageAlt = hasAnswered
    ? `Imagem analisada com destaques do cenário: ${scenario.title}`
    : `Imagem do cenário: ${scenario.title}`;

  const progressPercent = currentModule.scenarios.length > 0 ? Math.round((scenarioNumber / currentModule.scenarios.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="sticky top-0 z-20 bg-blue-600 text-white border-b border-blue-700">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goToDashboard}
              aria-label="Voltar ao dashboard"
              className="min-h-[44px] px-3 rounded-2xl hover:bg-white/10 focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:outline-none inline-flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span className="text-sm font-extrabold">Voltar</span>
            </button>

            <div className="text-right">
              <div className="text-xs font-extrabold text-blue-100">{currentModule.title}</div>
              <div className="text-sm font-extrabold">
                Questão {scenarioNumber} de {currentModule.scenarios.length}
              </div>
            </div>
          </div>

          <div className="mt-2">
            <div
              className="h-2 rounded-full bg-white/20 overflow-hidden"
              role="progressbar"
              aria-label="Progresso do módulo"
              aria-valuenow={scenarioNumber}
              aria-valuemin={1}
              aria-valuemax={currentModule.scenarios.length}
            >
              <div className="h-full bg-white rounded-full" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 pb-10">
        <div className="max-w-2xl mx-auto">
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5">
              <h1 className="text-lg font-extrabold text-slate-900">{scenario.title}</h1>
              <p className="mt-3 bg-blue-50 border border-blue-200 rounded-2xl p-4 text-slate-900 text-sm font-medium leading-relaxed">
                {scenario.question}
              </p>

              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="text-xs font-extrabold text-slate-500">Análise visual</div>
                <button
                  type="button"
                  onClick={() => setIsZoomed((v) => !v)}
                  aria-label={isZoomed ? 'Reduzir imagem' : 'Ampliar imagem'}
                  className="min-h-[44px] px-3 rounded-2xl text-sm font-extrabold text-slate-900 border border-slate-200 bg-white hover:bg-slate-50 focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:outline-none inline-flex items-center gap-2"
                >
                  {isZoomed ? <ZoomOutIcon className="h-5 w-5" /> : <ZoomInIcon className="h-5 w-5" />}
                  <span>{isZoomed ? 'Reduzir' : 'Ampliar'}</span>
                </button>
              </div>

              <div
                className={
                  'mt-3 rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center ' +
                  (isZoomed ? 'max-h-[600px]' : 'max-h-[360px]')
                }
              >
                <div className="relative w-full flex items-center justify-center">
                  <img
                    key={activeImageUrl}
                    src={activeImageUrl}
                    alt={imageAlt}
                    className="w-full h-auto object-contain transition-opacity duration-200"
                    style={{ maxHeight: isZoomed ? 600 : 360 }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="mt-4 bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
            <h2 className="text-base font-extrabold text-slate-900">O que você faz agora?</h2>
            <p className="mt-1 text-sm font-medium text-slate-700">Escolha a opção mais segura.</p>

            <div className="mt-4 space-y-3">
              {scenario.options.map((opt) => {
                const isSelected = opt.id === selectedOption;
                const isOptionCorrect = !opt.isScamAction;
                const showState = hasAnswered;

                const stateClasses = !showState
                  ? 'border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-300'
                  : isOptionCorrect
                    ? 'border-green-300 bg-green-50'
                    : isSelected
                      ? 'border-red-300 bg-red-50'
                      : 'border-slate-200 bg-white opacity-80';

                const stateLabel = !showState
                  ? ''
                  : isOptionCorrect
                    ? ' (Resposta correta)'
                    : isSelected
                      ? ' (Sua escolha)'
                      : '';

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleOptionClick(opt.id, opt.isScamAction)}
                    disabled={hasAnswered}
                    aria-label={`Escolher opção: ${opt.text}${stateLabel}`}
                    className={
                      'w-full text-left rounded-2xl border px-4 py-3 min-h-[44px] transition-colors ' +
                      'focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:outline-none ' +
                      stateClasses
                    }
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm font-extrabold text-slate-900 leading-snug">{opt.text}</div>
                      {hasAnswered && (
                        <div className="shrink-0 mt-0.5" aria-hidden="true">
                          {isOptionCorrect ? (
                            <ShieldCheckIcon className="h-5 w-5 text-green-600" />
                          ) : isSelected ? (
                            <ShieldAlertIcon className="h-5 w-5 text-red-600" />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {hasAnswered && chosenOption && (
            <section className="mt-4">
              <div className="grid gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
                  <h3 className="text-base font-extrabold text-slate-900">Resultado</h3>
                  <div className="mt-3 grid gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="text-xs font-extrabold text-slate-600">Sua escolha</div>
                      <div className="mt-1 text-sm font-extrabold text-slate-900">{chosenOption.text}</div>
                    </div>
                    {correctOption && (
                      <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
                        <div className="text-xs font-extrabold text-green-700">Resposta correta</div>
                        <div className="mt-1 text-sm font-extrabold text-slate-900">{correctOption.text}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={
                    'rounded-2xl border shadow-sm p-5 ' +
                    (isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300')
                  }
                  aria-label={isCorrect ? 'Veredito: acerto' : 'Veredito: erro'}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5" aria-hidden="true">
                      {isCorrect ? (
                        <ShieldCheckIcon className="h-6 w-6 text-green-600" />
                      ) : (
                        <ShieldAlertIcon className="h-6 w-6 text-red-600" />
                      )}
                    </div>
                    <div>
                      <h3 className={`text-base font-extrabold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                        {isCorrect ? 'Você se protegeu bem' : 'Você caiu na armadilha'}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-slate-900 leading-relaxed">
                        {isCorrect ? scenario.feedback.successText : scenario.feedback.failText}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl shadow-sm p-5">
                  <h3 className="text-base font-extrabold text-amber-900">Análise técnica</h3>
                  <p className="mt-1 text-sm font-medium text-amber-800">
                    Veja os sinais identificados na imagem (marcados após a resposta).
                  </p>

                  <div className="mt-4 space-y-3">
                    {scenario.media.highlights.map((hl, idx) => (
                      <div key={hl.id} className="bg-white border border-amber-200 rounded-2xl p-4">
                        <div className="flex items-start gap-3">
                          <div
                            className="shrink-0 h-8 w-8 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-900 font-extrabold"
                            aria-hidden="true"
                          >
                            {idx + 1}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-extrabold text-slate-900">{hl.description}</div>
                            <div className="mt-2 text-sm font-medium text-slate-700 leading-relaxed">
                              {hl.detailedDescription}
                            </div>
                            <div className="mt-3 rounded-2xl bg-green-50 border border-green-200 p-3">
                              <div className="text-xs font-extrabold text-green-700">Dica de prevenção</div>
                              <div className="mt-1 text-sm font-medium text-slate-900">{hl.preventionTip}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <AgeFriendlyButton
                    onClick={handleNext}
                    variant="primary"
                    size="md"
                    rightIcon={<ArrowRightIcon className="h-5 w-5" />}
                    aria-label="Avançar para a próxima questão"
                    className="max-w-[220px]"
                  >
                    Avançar
                  </AgeFriendlyButton>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}