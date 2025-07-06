import React from "react";

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  label: string;
  name: string;
  value: string;
  options: SelectOption[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

  className?: string;
  labelClassName?: string;
  selectClassName?: string;
  optionClassName?: string;

  required?: boolean;
  disabled?: boolean;
};

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  value,
  options,
  onChange,

  className = "",
  labelClassName = "block text-sm font-medium text-gray-700 mb-1",
  selectClassName = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
  optionClassName = "",

  required = false,
  disabled = false,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={selectClassName}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className={optionClassName}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
