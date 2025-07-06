import React from "react";

type InputProps = {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;

  className?: string;
  labelClassName?: string;
  inputClassName?: string;

  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  error?: string;
  helperText?: string;
  min?: number;
  max?: number;
  step?: number;
};

export const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",

  className = "",
  labelClassName = "block text-sm font-medium text-gray-700 mb-1",
  inputClassName = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",

  required = false,
  disabled = false,

  autoComplete = "off",
  min,
  max,
  step,

  error = "",
  helperText = "",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className={labelClassName}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        min={min}
        max={max}
        step={step}
        className={inputClassName}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
