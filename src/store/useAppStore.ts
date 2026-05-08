import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type GameState = 'home' | 'simulation' | 'post-scam' | 'dashboard';

export interface AppState {
  currentView: GameState;
  score: number;
  currentScenarioIndex: number;
  completedScenarios: string[]; // IDs of completed scenarios
  lastAnswerWasScam: boolean; // did the user fall for the scam?
  
  // Actions
  startGame: () => void;
  goToDashboard: () => void;
  goHome: () => void;
  answerScenario: (scenarioId: string, isScamAction: boolean, isLastLevel: boolean) => void;
  nextScenario: () => void;
  selectScenario: (index: number) => void;
  resetProgress: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentView: 'home',
      score: 0,
      currentScenarioIndex: 0,
      completedScenarios: [],
      lastAnswerWasScam: false,
      
      startGame: () => set({ currentView: 'simulation', currentScenarioIndex: 0 }),
      goToDashboard: () => set({ currentView: 'dashboard' }),
      goHome: () => set({ currentView: 'home' }),
      
      answerScenario: (scenarioId, isScamAction, isLastLevel) => set((state) => {
        const newScore = isScamAction ? state.score : state.score + 10;
        const newCompleted = state.completedScenarios.includes(scenarioId) 
          ? state.completedScenarios 
          : [...state.completedScenarios, scenarioId];
          
        return {
          score: newScore,
          completedScenarios: newCompleted,
          lastAnswerWasScam: isScamAction,
          currentView: isScamAction ? 'post-scam' : (isLastLevel ? 'dashboard' : 'simulation'),
        };
      }),
      
      nextScenario: () => set((state) => ({ 
        currentScenarioIndex: state.currentScenarioIndex + 1,
        currentView: 'simulation'
      })),

      selectScenario: (index: number) => set({
        currentScenarioIndex: index,
        currentView: 'simulation',
        lastAnswerWasScam: false
      }),
      
      resetProgress: () => set({
        score: 0,
        currentScenarioIndex: 0,
        completedScenarios: [],
        currentView: 'home',
        lastAnswerWasScam: false,
      })
    }),
    {
      name: 'antigolpe-storage',
      partialize: (state) => ({ score: state.score, completedScenarios: state.completedScenarios }),
    }
  )
);
