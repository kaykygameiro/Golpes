import React from 'react';
import { AgeFriendlyButton } from '../ui/AgeFriendlyButton';
import { useAppStore } from '../../store/useAppStore';

export function PostScamAction() {
  const { goToDashboard } = useAppStore();

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center space-y-6">
      <h2 className="text-2xl font-extrabold text-slate-900">Treino atualizado</h2>
      <p className="text-lg font-medium text-slate-700 leading-relaxed">
        Esta versão concentra o aprendizado na análise do feedback e nos destaques visuais após a resposta.
      </p>
      <AgeFriendlyButton onClick={goToDashboard} variant="primary">
        Voltar ao Dashboard
      </AgeFriendlyButton>
    </div>
  );
}
