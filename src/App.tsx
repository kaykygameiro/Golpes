import React from 'react';
import { useAppStore } from './store/useAppStore';
import { ScenarioView } from './components/simulation/ScenarioView';
import { ProgressDashboard } from './components/dashboard/ProgressDashboard';

export default function App() {
  const { currentView } = useAppStore();

  if (currentView === 'dashboard') {
    return <ProgressDashboard />;
  }

  return <ScenarioView />;
}
