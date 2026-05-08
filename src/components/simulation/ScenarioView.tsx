import React, { useEffect, useState } from 'react';
import { SuspiciousHighlighter } from './SuspiciousHighlighter';
import { PostScamAction } from './PostScamAction';
import { Volume2, VolumeX, Shield, RotateCcw, Megaphone } from 'lucide-react';
import { useSimulation } from '../../hooks/useSimulation';
import { LessonModal } from './LessonModal';
import { AgeFriendlyButton } from '../ui/AgeFriendlyButton';
import { SCENARIOS } from '../../data/scenarios';
import { motion, AnimatePresence } from 'motion/react';

export function ScenarioView() {
  const {
    scenario,
    score,
    currentView,
    currentScenarioIndex,
    showFeedbackModal,
    localChoice,
    audioEnabled,
    hasSupport,
    isSpeaking,
    handleOptionClick,
    handleNextScreen,
    toggleAudio,
    replayCurrentAudio,
  } = useSimulation();

  const [isModalMinimized, setIsModalMinimized] = useState(false);

  useEffect(() => {
    if (audioEnabled && scenario && !showFeedbackModal && currentView === 'simulation') {
      replayCurrentAudio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario?.id, currentView]);

  // Reset minimized state when starting a new scenario or when modal is hidden
  useEffect(() => {
    if (!showFeedbackModal) {
      setIsModalMinimized(false);
    }
  }, [showFeedbackModal]);

  if (!scenario) return null;

  if (currentView === 'post-scam') {
    return (
      <div className="max-w-xl mx-auto min-h-screen bg-slate-50 p-4">
        <PostScamAction />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto min-h-screen bg-slate-50 flex flex-col relative shadow-2xl overflow-hidden">
      {/* Header */}
      <header className="bg-blue-900 text-white p-6 rounded-b-3xl shadow-lg relative z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8" />
            <span className="font-bold text-2xl">Pontos: {score}</span>
          </div>
          <div className="flex gap-4">
            {hasSupport && (
              <>
                <button 
                  onClick={replayCurrentAudio}
                  disabled={!audioEnabled || isSpeaking}
                  className={`p-3 rounded-full transition active:scale-95 border-2 ${(!audioEnabled || isSpeaking) ? 'opacity-50 cursor-not-allowed bg-slate-800 border-transparent' : 'bg-blue-950 hover:bg-slate-800 border-transparent hover:border-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-400'}`}
                  title="Ouvir Novamente"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
                <button 
                  onClick={toggleAudio}
                  className="bg-blue-950 p-3 rounded-full hover:bg-slate-800 transition active:scale-95 border-2 border-transparent hover:border-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-400"
                  title="Ativar/Desativar Áudio"
                >
                  {audioEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6 opacity-50" />}
                </button>
              </>
            )}
          </div>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-4 shadow-inner">
          <div 
            className="bg-yellow-400 h-4 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${((currentScenarioIndex) / SCENARIOS.length) * 100}%` }}
          ></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col gap-6" style={{ paddingBottom: (showFeedbackModal && !isModalMinimized) ? '30vh' : '24px' }}>
        <div className="flex items-start gap-4">
          <h2 className="font-bold text-3xl text-slate-800 leading-tight flex-1">{scenario.title}</h2>
        </div>
        
        <p className="text-2xl text-slate-700 leading-snug font-medium border-l-8 border-yellow-400 pl-5">
           {!isModalMinimized ? scenario.question : "Toque nos itens destacados de vermelho abaixo para entender o perigo."}
        </p>

        <SuspiciousHighlighter 
          type={scenario.media.type}
          sender={scenario.media.sender}
          content={scenario.media.content}
          highlights={scenario.media.highlights}
          showHighlights={showFeedbackModal && localChoice === true} 
        />

        {/* Options */}
        <AnimatePresence mode="popLayout">
          {!showFeedbackModal ? (
            <motion.div 
              key="options"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-5 mt-4"
            >
              {scenario.options.map((opt, i) => {
                // Apply danger warning visual cues if the action is scam
                const isDanger = opt.text.toLowerCase().includes('pagar') || opt.text.toLowerCase().includes('clicar') || opt.text.toLowerCase().includes('baixar');
                
                return (
                  <motion.div
                    key={opt.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <AgeFriendlyButton 
                      variant={isDanger ? "warning" : "outline"}
                      onClick={() => handleOptionClick(opt.isScamAction)}
                    >
                      {opt.text}
                    </AgeFriendlyButton>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : isModalMinimized ? (
            <motion.div
              key="minimized-actions"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col gap-4 mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl"
            >
              <p className="text-red-900 font-bold text-lg text-center">
                Analise a imagem acima.
              </p>
              <div className="flex gap-3 flex-col mt-2">
                 <button onClick={() => setIsModalMinimized(false)} className="text-slate-700 font-bold underline py-2 flex-1 text-lg">
                   Ver Lição Novamente
                 </button>
                 <AgeFriendlyButton onClick={handleNextScreen} variant="primary">
                   Entendi, Continuar
                 </AgeFriendlyButton>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      <LessonModal 
        isOpen={showFeedbackModal && !isModalMinimized} 
        isScamAction={localChoice} 
        scenario={scenario} 
        onContinue={handleNextScreen} 
        onMinimize={() => setIsModalMinimized(true)}
      />
    </div>
  );
}
