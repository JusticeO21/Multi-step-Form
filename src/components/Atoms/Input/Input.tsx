import React from "react";
import styles from "./Input.module.css";

type InputType =
  | "text"
  | "email"
  | "phone"
  | "password"
  | "checkbox"
  | "number";

type BaseInputProps = {
  type: InputType;
  name: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  pattern?: string;
  className?: string;
  "aria-describedby"?: string;
};

type TextInputProps = BaseInputProps & {
  type: "text" | "email" | "phone" | "password" | "number";
  value: string;
  checked?: never;
  cost?: never;
  description?: never;
};

type CheckboxInputProps = BaseInputProps & {
  type: "checkbox";
  value?: string;
  checked?: boolean;
  cost?: string;
  description?: string;
};

type InputProps = TextInputProps | CheckboxInputProps;

function Input({
  type,
  name,
  value,
  onChange,
  label,
  placeholder = "",
  error = "",
  required = false,
  disabled = false,
  maxLength,
  pattern,
  checked,
  cost,
  description,
  className = "",
  "aria-describedby": ariaDescribedBy,
}: Readonly<InputProps>) {
  const isCheckbox = type === "checkbox";
  const errorId = error ? `${name}-error` : undefined;

  const containerClasses = [
    styles.input_container,
    styles[type],
    error ? styles.input_error : "",
    checked ? styles.checked : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inputClasses = [styles.input_field, error ? styles.error_field : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <span>
        {label && <label htmlFor={name}>{label}</label>}
        {isCheckbox && description && (
          <p className={styles.checkbox_description}>{description}</p>
        )}
      </span>

      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        pattern={pattern}
        checked={checked}
        id={name}
        className={inputClasses}
        aria-describedby={ariaDescribedBy || errorId}
        aria-invalid={error ? "true" : "false"}
      />

      {isCheckbox && cost && <p className={styles.add_ons_price}>+{cost}</p>}

      {error && (
        <span
          id={errorId}
          className={styles.error_message}
          role="alert"
          aria-live="polite"
        >
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;
