import React from "react";

interface CheckboxFieldProps {
  name: string;
  label: string;
  checked: boolean;
  required?: boolean;
  error?: string;
  onChange: (name: string, checked: boolean) => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  checked,
  required,
  error,
  onChange,
}) => (
  <div className="form-group agree-group">
    <label>
      <input
        type="checkbox"
        checked={checked}
        required={required}
        onChange={(e) => onChange(name, e.target.checked)}
      />
      {label}
    </label>
    {error && <p className="form-error">{error}</p>}
  </div>
);

export default CheckboxField;
