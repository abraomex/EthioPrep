import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  onChange: (value: string) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      onChange,
      id,
      required,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        <label
          htmlFor={id}
          className="text-body-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="text-status-error ml-1">*</span>}
        </label>
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            required={required}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            className={`
              w-full px-4 py-2.5 text-body bg-surface border rounded-button
              transition-all duration-200
              placeholder:text-text-muted
              focus:border-border-focus focus:ring-2 focus:ring-brand-teal/20 focus:outline-none
              ${leftIcon ? 'pl-10' : ''}
              ${error
                ? 'border-status-error ring-2 ring-status-error/20'
                : 'border-border'
              }
              ${disabled ? 'bg-surface-muted opacity-60 cursor-not-allowed' : ''}
            `.trim()}
            {...props}
          />
        </div>
        {error && (
          <p className="text-caption text-status-error" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-caption text-text-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
