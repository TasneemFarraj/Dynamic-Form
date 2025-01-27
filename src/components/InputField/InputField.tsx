import React from "react";
import { Input } from "digitinary-ui";

interface InputFieldProps {
    name: string;
    label: string;
    type: "text" | "number" | "password" | "email"; 
    value: string | number;
    placeholder?: string;
    required?: boolean;
    helperText?: string;
    error?: string;
    onChange: (name: string, value: string | number) => void;
  }
  
const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type,
  value,
  placeholder,
  required,
  helperText,
  error,
  onChange,
}) => (
  <div className="form-group">
    <label>
      {label}
      {helperText && <span className="helper-icon" title={helperText}>!</span>}
    </label>
    <Input
      type={type}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={(newValue) =>
        onChange(name, type === "number" ? +newValue : newValue)
      }
    />
    {error && <p className="form-error">{error}</p>}
  </div>
);

export default InputField;
