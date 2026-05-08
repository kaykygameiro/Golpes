import React, { useState } from 'react';
import { AgeFriendlyButton } from '../ui/AgeFriendlyButton';
import { useAppStore } from '../../store/useAppStore';
import { SCENARIOS } from '../../data/scenarios';
import { AlertTriangle, Phone, ShieldAlert } from 'lucide-react';

export function PostScamAction() {
  const { currentScenarioIndex, nextScenario } = useAppStore();
  const scenario = SCENARIOS[currentScenarioIndex];
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  if (!scenario.postScamSteps) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center space-y-6">
        <AgeFriendlyButton onClick={nextScenario}>Continuar Treinamento</AgeFriendlyButton>
      </div>
    );
  }

  const handleStepAction = (index: number) => {
    if (!completedSteps.includes(index)) {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const allStepsCompleted = completedSteps.length === scenario.postScamSteps.length;

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-red-50 border-4 border-red-200 p-6 rounded-2xl">
        <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-center gap-2">
          <ShieldAlert className="w-8 h-8" />
          Simulação de Proteção
        </h3>
        <p className="text-xl text-red-900 mb-6 font-medium leading-relaxed">
          Como você caiu neste golpe na vida real, o que você deve fazer agora para se proteger? Vamos treinar:
        </p>
        
        <div className="space-y-4">
          {scenario.postScamSteps.map((step, index) => {
            const isDone = completedSteps.includes(index);
            return (
              <div key={index} className={`p-4 rounded-xl border-2 transition-colors ${isDone ? 'bg-green-50 border-green-300' : 'bg-white border-slate-300'}`}>
                <p className="text-lg font-medium text-slate-800 mb-4">{step.instruction}</p>
                <AgeFriendlyButton 
                  variant={isDone ? 'secondary' : 'danger'}
                  onClick={() => handleStepAction(index)}
                  disabled={isDone}
                  className={isDone ? 'opacity-50' : ''}
                >
                  {step.actionText} {isDone && '✓'}
                </AgeFriendlyButton>
              </div>
            );
          })}
        </div>
      </div>

      {allStepsCompleted && (
        <AgeFriendlyButton onClick={nextScenario} variant="primary">
          Continuar Treinamento
        </AgeFriendlyButton>
      )}
    </div>
  );
}
