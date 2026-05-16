import { useState, useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';
import { MODULES } from '../data/scenarios';
import { useSpeechAudio } from './useSpeechAudio';

export function useSimulation() {
  const { currentModuleId, currentScenarioIndex, answerScenario, currentView, score } = useAppStore();
  const module = MODULES.find((m) => m.id === currentModuleId) ?? MODULES[0] ?? null;
  const safeIndex = module ? Math.max(0, Math.min(currentScenarioIndex, module.scenarios.length - 1)) : 0;
  const scenario = module?.scenarios[safeIndex] ?? null;
  const isLastScenarioOfModule = module ? safeIndex === module.scenarios.length - 1 : true;
  
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [localChoice, setLocalChoice] = useState<boolean | null>(null);
  
  const { speak, stop, hasSupport, isSpeaking, setAudioEnabled, audioEnabled } = useSpeechAudio();

  const handleOptionClick = useCallback((isScamAction: boolean) => {
    stop();
    setLocalChoice(isScamAction);
    setShowFeedbackModal(true);
    
    // Tactile feedback
    if (isScamAction && "vibrate" in navigator) {
      navigator.vibrate([200, 100, 200]); // Danger pattern
    } else if ("vibrate" in navigator) {
      navigator.vibrate([100]); // Success pattern
    }

    if (audioEnabled && scenario) {
      speak(isScamAction ? scenario.feedback.failText : scenario.feedback.successText);
    }
  }, [scenario, stop, speak, audioEnabled]);

  const handleNextScreen = useCallback(() => {
    if (localChoice === null) return;
    if (!scenario) return;
    answerScenario(scenario.id, !localChoice);
    setLocalChoice(null);
    setShowFeedbackModal(false);
    stop();
  }, [localChoice, answerScenario, scenario, stop]);

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    stop();
  };

  const replayCurrentAudio = () => {
    stop();
    if (audioEnabled) {
      setTimeout(() => {
        if (!scenario) return;
        if (showFeedbackModal && localChoice !== null) {
          speak(localChoice ? scenario.feedback.failText : scenario.feedback.successText);
          return;
        }
        speak(scenario.introAudioText);
      }, 50);
    }
  };

  return {
    scenario,
    score,
    currentView,
    currentScenarioIndex,
    isLastScenarioOfModule,
    showFeedbackModal,
    localChoice,
    audioEnabled,
    hasSupport,
    isSpeaking,
    handleOptionClick,
    handleNextScreen,
    toggleAudio,
    replayCurrentAudio,
  };
}
