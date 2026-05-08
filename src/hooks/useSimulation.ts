import { useState, useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';
import { SCENARIOS } from '../data/scenarios';
import { useSpeechAudio } from './useSpeechAudio';

export function useSimulation() {
  const { currentScenarioIndex, answerScenario, currentView, score } = useAppStore();
  const scenario = SCENARIOS[currentScenarioIndex];
  
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

    if (audioEnabled) {
      speak(isScamAction ? scenario.feedback.failAudio : scenario.feedback.successAudio);
    }
  }, [scenario, stop, speak, audioEnabled]);

  const handleNextScreen = useCallback(() => {
    if (localChoice === null) return;
    const isLast = currentScenarioIndex === SCENARIOS.length - 1;
    answerScenario(scenario.id, localChoice, isLast);
    setLocalChoice(null);
    setShowFeedbackModal(false);
    stop();
  }, [localChoice, currentScenarioIndex, answerScenario, scenario.id, stop]);

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    stop();
  };

  const replayCurrentAudio = () => {
    stop();
    if (audioEnabled) {
      setTimeout(() => {
        if (showFeedbackModal && localChoice !== null) {
          speak(localChoice ? scenario.feedback.failAudio : scenario.feedback.successAudio);
        } else {
          speak(scenario.introAudioText);
        }
      }, 50);
    }
  };

  return {
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
  };
}
