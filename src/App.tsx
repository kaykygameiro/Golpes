import React, { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { ScenarioView } from './components/simulation/ScenarioView';
import { ProgressDashboard } from './components/dashboard/ProgressDashboard';
import { AgeFriendlyButton } from './components/ui/AgeFriendlyButton';
import { Shield } from 'lucide-react';

export default function App() {
  const { currentView, startGame } = useAppStore();

  if (currentView === 'home') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-slate-900">
        <div className="bg-white p-8 rounded-[2rem] shadow-2xl max-w-md w-full text-center border-8 border-blue-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-blue-600 rounded-b-[50px] z-0"></div>
          
          <div className="relative z-10 bg-white p-6 rounded-full inline-block shadow-lg border-4 border-blue-100 mx-auto mb-8 mt-4">
            <Shield className="w-16 h-16 text-blue-600" />
          </div>
          
          <h1 className="text-4xl font-extrabold mb-6 text-slate-800 tracking-tight">Antigolpe</h1>
          
          <p className="text-2xl mb-12 text-slate-600 leading-relaxed font-medium">
            Treine seu olho vivo e aprenda a se proteger de golpes no celular sem correr riscos.
          </p>
          
          <AgeFriendlyButton onClick={startGame} variant="primary">
            Começar Treinamento
          </AgeFriendlyButton>
        </div>
      </div>
    );
  }

  if (currentView === 'dashboard') {
    return <ProgressDashboard />;
  }

  return <ScenarioView />;
}
