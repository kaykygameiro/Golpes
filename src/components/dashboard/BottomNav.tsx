import React from 'react';
export type BottomNavTab = 'home' | 'help';

interface Props {
  activeTab: BottomNavTab;
  onTabChange: (tab: BottomNavTab) => void;
}

function NavButton({
  active,
  label,
  onClick,
  ariaLabel
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={active ? 'page' : undefined}
      className={
        'relative flex-1 min-h-[44px] px-4 py-3 rounded-2xl font-extrabold text-sm ' +
        'focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:outline-none ' +
        (active ? 'text-blue-700' : 'text-slate-600 hover:text-slate-900')
      }
    >
      <span className="block text-center">{label}</span>
      <span
        aria-hidden="true"
        className={
          'absolute left-1/2 -translate-x-1/2 bottom-1.5 h-1.5 w-1.5 rounded-full ' +
          (active ? 'bg-blue-600' : 'bg-transparent')
        }
      />
    </button>
  );
}

export function BottomNav({ activeTab, onTabChange }: Props) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-sm px-4 py-3 z-50"
      aria-label="Navegação inferior"
    >
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2">
        <NavButton
          active={activeTab === 'home'}
          label="Início"
          ariaLabel="Ir para o início"
          onClick={() => onTabChange('home')}
        />
        <NavButton
          active={activeTab === 'help'}
          label="Ajuda"
          ariaLabel="Abrir ajuda"
          onClick={() => onTabChange('help')}
        />
      </div>
    </nav>
  );
}
