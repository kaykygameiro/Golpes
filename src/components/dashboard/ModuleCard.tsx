import React from 'react';

interface Props {
  moduleNumber: number;
  title: string;
  description: string;
  iconEmoji: string;
  isLocked: boolean;
  isCompleted: boolean;
  completedCount: number;
  totalCount: number;
  onClick: () => void;
}
function StatusBadge({
  tone,
  label
}: {
  tone: 'locked' | 'done' | 'progress';
  label: string;
}) {
  const classes: Record<typeof tone, string> = {
    locked: 'bg-slate-100 text-slate-700 border-slate-200',
    done: 'bg-green-50 text-green-700 border-green-200',
    progress: 'bg-amber-50 text-amber-800 border-amber-200'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-extrabold ${classes[tone]}`}>
      {label}
    </span>
  );
}

export function ModuleCard({
  moduleNumber,
  title,
  description,
  iconEmoji,
  isLocked,
  isCompleted,
  completedCount,
  totalCount,
  onClick
}: Props) {
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const status = isLocked ? 'locked' : isCompleted ? 'done' : completedCount > 0 ? 'progress' : 'progress';
  const statusLabel = isLocked ? 'Bloqueado' : isCompleted ? 'Concluído' : completedCount > 0 ? 'Em progresso' : 'Não iniciado';

  const accentClass = isLocked ? 'bg-slate-300' : isCompleted ? 'bg-green-600' : completedCount > 0 ? 'bg-blue-600' : 'bg-slate-300';
  const iconBgClass = isLocked
    ? 'bg-slate-100 border-slate-200'
    : isCompleted
      ? 'bg-green-50 border-green-200'
      : completedCount > 0
        ? 'bg-blue-50 border-blue-200'
        : 'bg-slate-100 border-slate-200';

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      aria-label={isLocked ? `Módulo ${moduleNumber} bloqueado` : `Abrir módulo ${moduleNumber}`}
      className={
        'w-full text-left rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors ' +
        'focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:outline-none ' +
        (isLocked ? 'opacity-60 cursor-not-allowed' : 'hover:bg-slate-50')
      }
    >
      <div className={`h-1 w-full ${accentClass}`} aria-hidden="true" />
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div
            className={`shrink-0 h-12 w-12 rounded-2xl border flex items-center justify-center ${iconBgClass}`}
            aria-hidden="true"
          >
            <span className="text-xl">{iconEmoji}</span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-extrabold text-slate-500">MÓDULO {moduleNumber}</p>
                <h3 className={`text-lg font-extrabold leading-snug ${isLocked ? 'text-slate-500' : 'text-slate-900'}`}>
                  {title}
                </h3>
              </div>
              <StatusBadge tone={status} label={statusLabel} />
            </div>

            <p className={`mt-2 text-sm font-medium leading-relaxed ${isLocked ? 'text-slate-400' : 'text-slate-700'}`}>
              {description}
            </p>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-extrabold text-slate-600">
                <span>Progresso</span>
                <span>
                  {completedCount}/{totalCount}
                </span>
              </div>
              <div
                className="mt-2 h-3 rounded-full bg-slate-200 overflow-hidden"
                role="progressbar"
                aria-valuenow={completedCount}
                aria-valuemin={0}
                aria-valuemax={totalCount}
                aria-label={`Progresso do módulo ${moduleNumber}`}
              >
                <div
                  className={
                    'h-full rounded-full ' +
                    (isCompleted ? 'bg-green-600' : progressPercent > 0 ? 'bg-blue-600' : 'bg-slate-300')
                  }
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
