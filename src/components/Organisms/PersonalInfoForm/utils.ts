export type ValidationFunction = (value: string) => string | null;

export function required(value: string): string | null {
  const trimmedValue = value?.trim();
  return trimmedValue && trimmedValue.length > 0
    ? null
    : "This field is required";
}

export function minLength(min: number): ValidationFunction {
  return function (value: string): string | null {
    const trimmedValue = value?.trim() || "";
    return trimmedValue.length >= min
      ? null
      : `Must be at least ${min} character${min !== 1 ? "s" : ""} long`;
  };
}

export function maxLength(max: number): ValidationFunction {
  return function (value: string): string | null {
    const trimmedValue = value?.trim() || "";
    return trimmedValue.length <= max
      ? null
      : `Must be no more than ${max} character${max !== 1 ? "s" : ""} long`;
  };
}

export function emailPattern(value: string): string | null {
  const trimmedValue = value?.trim();
  if (!trimmedValue) return null;

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return emailRegex.test(trimmedValue)
    ? null
    : "Please enter a valid email address";
}

export function numberPattern(value: string): string | null {
  const trimmedValue = value?.trim();
  if (!trimmedValue) return null;

  const cleanedValue = trimmedValue.replace(/[\s\-\(\)\.]/g, "");
  const phoneRegex = /^\+[1-9]\d{1,14}$/;

  if (!phoneRegex.test(cleanedValue)) {
    return "Please enter a valid phone number (e.g., +1 234 567 8900)";
  }

  if (cleanedValue.length < 8 || cleanedValue.length > 16) {
    return "Phone number must be between 8 and 15 digits";
  }

  return null;
}

export function namePattern(value: string): string | null {
  const trimmedValue = value?.trim();
  if (!trimmedValue) return null;

  const nameRegex = /^[a-zA-Z\s\-'\.]+$/;

  if (!nameRegex.test(trimmedValue)) {
    return "Name can only contain letters, spaces, hyphens, and apostrophes";
  }

  if (/[\s\-'\.]{2,}/.test(trimmedValue)) {
    return "Name cannot contain consecutive spaces or special characters";
  }

  return null;
}
