import React from 'react';

type TextAreaProps = {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
};

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  rows = 4,
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
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={`form-textarea ${error ? 'border-danger' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default TextArea;
