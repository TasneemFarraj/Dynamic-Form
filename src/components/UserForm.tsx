import React, { useState } from "react";
import { Input, Button } from "digitinary-ui";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import formConfig from "../formConfig.json";
import "./UserForm.scss";

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  helperText?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    regex?: string;
    min?: number;
    max?: number;
    message?: string;
  };
}

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleInputChange = (name: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name: string, value: any) => {
    const field = formConfig.fields.find((f: FormField) => f.name === name);
    if (!field) return;

    let error = "";

    if (field.required && !value) {
      error = field.validation?.message || `${field.label} is required.`;
    }

    if (field.validation) {
      if (field.validation.minLength && value.length < field.validation.minLength) {
        error = field.validation.message || `${field.label} is too short.`;
      }
      if (field.validation.regex && !new RegExp(field.validation.regex).test(value)) {
        error = field.validation.message || `${field.label} is invalid.`;
      }
      if (field.validation.min && value < field.validation.min) {
        error = field.validation.message || `${field.label} is too small.`;
      }
      if (field.validation.max && value > field.validation.max) {
        error = field.validation.message || `${field.label} is too large.`;
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const isFormValid = () =>
    formConfig.fields.every(
      (field: FormField) =>
        formData.hasOwnProperty(field.name) &&
        (field.required ? Boolean(formData[field.name]) : true) &&
        !errors[field.name]
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      toast.success("Form submitted successfully!");
      console.log("Form Data:", formData);
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  const renderField = (field: FormField) => {
    const error = errors[field.name];
    const value = formData[field.name] || "";
  
    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "number":
        return (
          <div key={field.name} className="form-group">
            <label>
              {field.label}
              {field.helperText && (
                <span className="helper-icon" title={field.helperText}>
                  !
                </span>
              )}
            </label>
            <Input
  type={field.type}
  value={value}
  placeholder={field.placeholder}
  required={field.required}
  onChange={(newValue: string | number) => 
    handleInputChange(field.name, field.type === "number" ? +newValue : newValue)
  }
/>



            {error && <p className="form-error">{error}</p>}
          </div>
        );
  
      case "select":
        return (
          <div key={field.name} className="form-group">
            <label>{field.label}</label>
            <select
              value={value}
              required={field.required}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
            >
              <option value="">{field.placeholder}</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {error && <p className="form-error">{error}</p>}
          </div>
        );
  
      case "checkbox":
        return (
          <div key={field.name} className="form-group agree-group">
            <label>
              <input
                type="checkbox"
                checked={Boolean(value)}
                required={field.required}
                onChange={(e) => handleInputChange(field.name, e.target.checked)}
              />
              {field.label}
            </label>
            {error && <p className="form-error">{error}</p>}
          </div>
        );
  
      default:
        return null;
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        {formConfig.fields.map((field: FormField) => renderField(field))}
        <Button type="submit" disabled={!isFormValid()}>
          Submit
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UserForm;
