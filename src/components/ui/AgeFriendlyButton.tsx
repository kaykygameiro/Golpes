import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface Props extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
      />
    </svg>
  );
}

export function AgeFriendlyButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  type = 'button',
  ...props
}: Props) {
  const baseClasses =
    'inline-flex w-full items-center justify-center gap-3 rounded-2xl font-extrabold transition-colors ' +
    'focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:outline-none ' +
    'disabled:opacity-60 disabled:cursor-not-allowed';

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'min-h-[44px] px-4 text-sm',
    md: 'min-h-[48px] px-5 text-base',
    lg: 'min-h-[56px] px-6 text-lg'
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent text-slate-900 hover:bg-slate-100'
  };

  const contentOpacity = loading ? 'opacity-0' : 'opacity-100';

  return (
    <button
      type={type}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      <span className="relative inline-flex items-center justify-center">
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner className="h-5 w-5 animate-spin" />
          </span>
        )}
        <span className={`inline-flex items-center gap-3 ${contentOpacity}`}>
          {leftIcon ? <span aria-hidden="true">{leftIcon}</span> : null}
          <span>{children}</span>
          {rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
        </span>
      </span>
    </button>
  );
}
