import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type GameState = 'dashboard' | 'simulation';

export interface AppState {
  currentView: GameState;
  score: number;
  currentModuleId: string | null;
  currentScenarioIndex: number;
  completedScenarios: string[];

  goToDashboard: () => void;
  selectModule: (moduleId: string) => void;
  selectScenario: (moduleId: string, index: number) => void;
  answerScenario: (scenarioId: string, isCorrect: boolean) => void;
  resetProgress: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentView: 'dashboard',
      score: 0,
      currentModuleId: null,
      currentScenarioIndex: 0,
      completedScenarios: [],

      goToDashboard: () => set({ currentView: 'dashboard', currentModuleId: null }),

      selectModule: (moduleId: string) =>
        set({
          currentModuleId: moduleId,
          currentScenarioIndex: 0,
          currentView: 'simulation'
        }),

      selectScenario: (moduleId: string, index: number) =>
        set({
          currentModuleId: moduleId,
          currentScenarioIndex: index,
          currentView: 'simulation'
        }),

      answerScenario: (scenarioId: string, isCorrect: boolean) =>
        set((state) => {
          const newScore = isCorrect ? state.score + 10 : state.score;
          const newCompleted = state.completedScenarios.includes(scenarioId)
            ? state.completedScenarios
            : [...state.completedScenarios, scenarioId];
          return {
            score: newScore,
            completedScenarios: newCompleted
          };
        }),

      resetProgress: () =>
        set({
          score: 0,
          currentModuleId: null,
          currentScenarioIndex: 0,
          completedScenarios: [],
          currentView: 'dashboard'
        })
    }),
    {
      name: 'antigolpe-storage',
      partialize: (state) => ({ score: state.score, completedScenarios: state.completedScenarios })
    }
  )
);
