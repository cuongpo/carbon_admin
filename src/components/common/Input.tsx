import React from 'react';

type InputProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`form-group ${className}`}>
      <label 
        htmlFor={id} 
        className="form-label"
      >
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`form-input ${error ? 'border-danger' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default Input;
