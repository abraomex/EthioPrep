import { forwardRef, type SelectHTMLAttributes } from 'react';
import { useLanguage } from '../../lib/i18n';

interface SelectOption {
  value: string;
  labelEn: string;
  labelAm: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      label,
      placeholder,
      error,
      id,
      required,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const { language } = useLanguage();

    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        <label
          htmlFor={id}
          className="text-body-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="text-status-error ml-1">*</span>}
        </label>
        <select
          ref={ref}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          className={`
            w-full px-4 py-2.5 text-body bg-surface border rounded-button
            transition-all duration-200 appearance-none
            focus:border-border-focus focus:ring-2 focus:ring-brand-teal/20 focus:outline-none
            ${error
              ? 'border-status-error ring-2 ring-status-error/20'
              : 'border-border'
            }
            ${disabled ? 'bg-surface-muted opacity-60 cursor-not-allowed' : ''}
          `.trim()}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {language === 'am' ? opt.labelAm : opt.labelEn}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-caption text-status-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
