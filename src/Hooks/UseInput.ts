import { useState, useCallback, useEffect } from "react";
import { useAppDispatch } from "./useRedux";
import { updatePersonalInfo } from "../Redux/personalInfoSlice";
import type { ValidationFunction } from "../components/Organisms/PersonalInfoForm/utils";

export interface UseInputReturn {
  value: string;
  errors: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldReqiredError: () => void;
  resetInput: () => void;
  isValid: boolean;
  hasErrors: boolean;
  clearErrors: () => void;
  validateField: () => void;
}

function useInput(
  initialValue: string,
  validations?: ValidationFunction[]
): UseInputReturn {
  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState(false);
  const dispatch = useAppDispatch();

  const validate = useCallback(
    (inputValue: string) => {
      const newErrors: string[] = [];

      if (validations && Array.isArray(validations)) {
        for (const validation of validations) {
          if (typeof validation === "function") {
            const error = validation(inputValue);
            if (error) {
              newErrors.push(error);
            }
          }
        }
      }

      setErrors(newErrors);
      return newErrors.length === 0;
    },
    [validations]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue: string = event.target.value;
      setTouched(true);
      dispatch(updatePersonalInfo({ [event.target.name]: newValue }));
      setValue(newValue);
      validate(newValue);
    },
    [dispatch, validate]
  );

  const setFieldReqiredError = useCallback(() => {
    setErrors(["*"]);
    setTouched(true);
  }, []);

  const resetInput = useCallback(() => {
    setValue("");
    setErrors([]);
    setTouched(false);
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const validateField = useCallback(() => {
    setTouched(true);
    return validate(value);
  }, [validate, value]);

  useEffect(() => {
    if (initialValue !== value && !touched) {
      setValue(initialValue);
    }
  }, [initialValue, value, touched]);

  const isValid = errors.length === 0 && touched;
  const hasErrors = errors.length > 0;

  return {
    value,
    errors,
    handleChange,
    setFieldReqiredError,
    resetInput,
    isValid,
    hasErrors,
    clearErrors,
    validateField,
  };
}
export default useInput;
