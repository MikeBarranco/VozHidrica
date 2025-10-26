import { AlertCircle } from 'lucide-react';

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  maxLength?: number;
  helperText?: string;
}

export default function InputField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  maxLength,
  helperText,
}: InputFieldProps) {
  const hasError = !!error;
  const hasValue = value.length > 0;

  return (
    <div className="w-full">
      <div className="relative">
        <label
          className={`block font-gotham font-book text-12 mb-5 ${
            disabled ? 'text-text-disabled' : 'text-text-secondary'
          }`}
        >
          {label}
        </label>
        <div className="relative">
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            className={`w-full px-10 py-10 font-gotham font-medium text-15 rounded bg-background-field border-none outline-none transition-all ${
              disabled
                ? 'text-text-disabled cursor-not-allowed'
                : hasError
                ? 'text-text-primary'
                : 'text-text-primary'
            } ${hasError ? 'ring-2 ring-text-error' : ''}`}
          />
          {hasError && (
            <div className="absolute right-10 top-1/2 -translate-y-1/2">
              <AlertCircle className="w-20 h-20 text-text-primary" />
            </div>
          )}
        </div>
        {helperText && hasValue && !hasError && (
          <p className="mt-5 font-gotham font-book text-12 text-text-secondary">
            {helperText}
          </p>
        )}
        {hasError && (
          <p className="mt-5 font-gotham font-book text-12 text-text-error">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
