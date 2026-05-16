import React from 'react';
import { AgeFriendlyButton } from '../ui/AgeFriendlyButton';
import { Scenario } from '../../data/scenarios';

interface Props {
  isOpen: boolean;
  isScamAction: boolean | null;
  scenario: Scenario;
  onContinue: () => void;
  onMinimize?: () => void;
}

export function LessonModal({ isOpen, isScamAction, scenario, onContinue, onMinimize }: Props) {
  if (!isOpen || isScamAction === null) return null;

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40" />

      <div
        className={`fixed bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-4xl shadow-2xl z-50 p-6 flex flex-col border-t-8 ${
          !isScamAction ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={!isScamAction ? 'Feedback de acerto' : 'Feedback de erro'}
      >
        <div className="w-16 h-2 bg-slate-300 rounded-full mx-auto mb-6" />

        <div className="flex flex-col items-center text-center">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 border-4 ${
              !isScamAction ? 'bg-green-100 border-green-200 text-green-700' : 'bg-red-100 border-red-200 text-red-700'
            }`}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {!isScamAction ? (
                <path d="M20 6L9 17l-5-5" />
              ) : (
                <>
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                  <path d="M10.3 4.2l-7.7 13.3A2 2 0 004.3 20h15.4a2 2 0 001.7-2.5L13.7 4.2a2 2 0 00-3.4 0z" />
                </>
              )}
            </svg>
          </div>

          <h3 className={`text-3xl font-extrabold mb-4 ${!isScamAction ? 'text-green-800' : 'text-red-800'}`}>
            {!isScamAction ? 'Muito bem' : 'Cuidado'}
          </h3>

          <p className="text-xl text-slate-800 leading-relaxed font-medium mb-6 px-2">
            {!isScamAction ? scenario.feedback.successText : scenario.feedback.failText}
          </p>
        </div>

        {isScamAction && scenario.media.highlights.length > 0 && (
          <div className="w-full mb-8 bg-white p-5 rounded-2xl shadow-sm border border-red-200">
            <h4 className="text-xl font-extrabold text-red-800 mb-4">Sinais do golpe</h4>
            <ul className="space-y-4">
              {scenario.media.highlights.map((hl) => (
                <li
                  key={hl.id}
                  className="flex gap-3 text-lg text-slate-800 items-start font-medium leading-snug"
                >
                  <span
                    className="mt-2 h-3 w-3 rounded-full bg-red-600 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{hl.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto pt-4 pb-2 flex flex-col gap-3">
          <AgeFriendlyButton onClick={onContinue} variant={!isScamAction ? 'primary' : 'danger'}>
            Entendi, continuar
          </AgeFriendlyButton>

          {isScamAction && onMinimize && (
            <button
              type="button"
              onClick={onMinimize}
              className="text-slate-700 font-extrabold py-3 outline-none focus:ring-4 rounded-xl hover:bg-red-100 transition-colors w-full text-lg"
            >
              Analisar mensagem novamente
            </button>
          )}
        </div>
      </div>
    </>
  );
}
