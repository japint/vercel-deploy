import React from "react";

type CheckboxProps = {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
  disabled?: boolean;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  checked,
  onChange,
  className = "",
  value = "",
  disabled = false,
}) => {
  return (
    <div className={`flex items-center mb-4 ${className}`}>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        value={value}
        disabled={disabled}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label htmlFor={name} className="ml-2 block text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};
