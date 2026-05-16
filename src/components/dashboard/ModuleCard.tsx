import React from 'react';

interface Props {
  title: string;
  description: string;
  icon: string;
  isLocked: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 11V8a5 5 0 0110 0v3" />
      <rect x="5" y="11" width="14" height="10" rx="2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function ModuleCard({ title, description, icon, isLocked, isCompleted, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 group shadow-sm outline-none focus:ring-4 focus:ring-blue-300
        ${
          isLocked
            ? 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
            : isCompleted
              ? 'bg-green-50 border-green-300 hover:border-green-400'
              : 'bg-white border-blue-100 hover:border-blue-400'
        }`}
    >
      <div className="shrink-0">
        <div
          className={`h-14 w-14 rounded-2xl flex items-center justify-center text-sm font-extrabold border ${
            isLocked
              ? 'bg-slate-100 border-slate-200 text-slate-500'
              : isCompleted
                ? 'bg-green-100 border-green-200 text-green-800'
                : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <h3 className={`text-2xl font-extrabold leading-tight ${isLocked ? 'text-slate-500' : 'text-slate-900'}`}>
            {title}
          </h3>
          {isCompleted && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 border border-green-200 text-sm font-extrabold">
              <CheckIcon className="w-5 h-5" /> Concluído
            </span>
          )}
          {isLocked && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-sm font-extrabold">
              <LockIcon className="w-5 h-5" /> Bloqueado
            </span>
          )}
        </div>
        <p className={`mt-2 text-lg font-medium leading-relaxed ${isLocked ? 'text-slate-400' : 'text-slate-700'}`}>
          {description}
        </p>
      </div>

      <div className="shrink-0">
        <div className="h-12 w-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
          {isLocked ? (
            <LockIcon className="w-6 h-6 text-slate-500" />
          ) : (
            <ChevronRightIcon className="w-7 h-7 text-blue-700 group-hover:translate-x-0.5 transition-transform" />
          )}
        </div>
      </div>
    </button>
  );
}
