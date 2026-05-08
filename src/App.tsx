import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useAppStore } from './store/useAppStore';
import { ScenarioView } from './components/simulation/ScenarioView';
import { ProgressDashboard } from './components/dashboard/ProgressDashboard';
import { AgeFriendlyButton } from './components/ui/AgeFriendlyButton';
import { Shield } from 'lucide-react';

export default function App() {
  const { currentView, startGame } = useAppStore();

  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-8"
            >
              <Shield className="w-24 h-24 text-white drop-shadow-lg" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-tight drop-shadow-lg">
              Antigolpe: Sua Defesa Digital
            </h1>

            <p className="text-xl md:text-2xl mb-12 text-blue-100 leading-relaxed font-medium max-w-lg mx-auto">
              Treine seu olho vivo e aprenda a se proteger de golpes no celular sem correr riscos.
            </p>

            <div className="mb-8">
              <AgeFriendlyButton 
                onClick={startGame} 
                variant="primary"
                className="shadow-lg hover:shadow-2xl transition-shadow"
              >
                Começar Treinamento
              </AgeFriendlyButton>
            </div>

            <p className="text-sm md:text-base text-blue-200 font-medium">
              Junte-se a centenas de idosos que já aprenderam a se proteger nas Naves do Conhecimento
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'dashboard') {
    return <ProgressDashboard />;
  }

  return <ScenarioView />;
}
