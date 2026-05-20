import React from 'react';

interface Props extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children'> {
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
}

export function TabButton({ active, onClick, label, icon, className = '', ...props }: Props) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-pressed={active}
      className={
        'relative flex-1 min-h-[44px] px-4 py-3 rounded-2xl text-sm font-extrabold transition-colors ' +
        'focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:outline-none ' +
        (active ? 'bg-blue-600 text-white' : 'bg-transparent text-slate-700 hover:bg-white') +
        (className ? ` ${className}` : '')
      }
      {...props}
    >
      <span className="inline-flex items-center justify-center gap-2">
        {icon ? <span aria-hidden="true">{icon}</span> : null}
        <span>{label}</span>
      </span>
    </button>
  );
}
