import styles from "./AddOnsForm.module.css";
import FormPreview from "../../Atoms/FormPreview/FormPreview";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import Header from "../../Atoms/Header/Header";
import { useAppDispatch, useAppSelector } from "../../../Hooks/useRedux";
import { updateAddOns, removeAddOn } from "../../../Redux/PlanAndAddOnSlice";
import { goToNextStep, goBack } from "../../../Redux/sidebarSlice";
import useCustomNavigate from "../../../Hooks/UseNavigate";
import { useCallback, useMemo, useState } from "react";
import {
  ADD_ONS_CONFIG,
  type AddOnConfig,
  formatPrice,
} from "../../../data/addOnsConfig";

type AddOnsFormProps = {
  title?: string;
  subtitle?: string;
  allowSkip?: boolean;
  maxSelections?: number;
  className?: string;
};

function AddOnsForm({
  title = "Pick add-ons",
  subtitle = "Add-ons help enhance your gaming experience",
  allowSkip = true,
  maxSelections,
  className = "",
}: Readonly<AddOnsFormProps>) {
  const { addOns, isAYearPlan } = useAppSelector(
    (state) => state.planAndAddOns
  );
  const dispatch = useAppDispatch();
  const { goToSelectedStep } = useCustomNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Calculate selected add-ons count
  const selectedCount = useMemo(() => {
    return addOns ? Object.keys(addOns).length : 0;
  }, [addOns]);

  // Validate selections
  const validateSelections = useCallback(() => {
    const newErrors: string[] = [];

    if (maxSelections && selectedCount > maxSelections) {
      newErrors.push(`You can select a maximum of ${maxSelections} add-ons`);
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  }, [selectedCount, maxSelections]);

  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, addOnConfig: AddOnConfig) => {
      const { id, monthlyPrice, yearlyPrice } = addOnConfig;
      const cost = isAYearPlan ? yearlyPrice : monthlyPrice;

      if (e.target.checked) {
        // Check if we're exceeding max selections
        if (maxSelections && selectedCount >= maxSelections) {
          setErrors([`You can select a maximum of ${maxSelections} add-ons`]);
          e.target.checked = false;
          return;
        }

        dispatch(updateAddOns({ [id]: cost }));
      } else {
        dispatch(removeAddOn(id));
      }

      // Clear errors when selection changes
      setErrors([]);
    },
    [dispatch, isAYearPlan, maxSelections, selectedCount]
  );

  const handleNextButtonClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (!validateSelections()) {
        return;
      }

      setIsLoading(true);

      try {
        dispatch(goToNextStep());
        goToSelectedStep();
      } catch (error) {
        console.error("Navigation error:", error);
        setErrors([
          error instanceof Error
            ? `Navigation failed: ${error.message}`
            : "An error occurred during navigation. Please try again.",
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, goToSelectedStep, validateSelections]
  );

  const handleBackButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      dispatch(goBack());
      goToSelectedStep();
    },
    [dispatch, goToSelectedStep]
  );

  // Format cost display
  const formatCost = useCallback(
    (addOn: AddOnConfig) => {
      const price = isAYearPlan ? addOn.yearlyPrice : addOn.monthlyPrice;
      return formatPrice(price, isAYearPlan);
    },
    [isAYearPlan]
  );

  // Get button text based on loading state and skip allowance
  const getButtonText = useCallback(() => {
    if (isLoading) {
      return "Processing...";
    }
    return allowSkip ? "Next Step" : "Continue";
  }, [isLoading, allowSkip]);

  // Build container classes
  const containerClasses = [styles.container, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <Header stageHeader={title} explainHeader={subtitle} />

      {errors.length > 0 && (
        <div className={styles.errorContainer} role="alert" aria-live="polite">
          {errors.map((error, index) => (
            <p key={index ** 2} className={styles.errorMessage}>
              {error}
            </p>
          ))}
        </div>
      )}

      <FormPreview>
        <fieldset className={styles.addOnsFieldset}>
          {ADD_ONS_CONFIG.map((addOn) => (
            <div key={addOn.id} className={styles.addOnItem}>
              <Input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(e, addOn)}
                label={addOn.name}
                value=""
                name={addOn.id}
                cost={formatCost(addOn)}
                checked={!!addOns?.[addOn.id]}
                description={addOn.description}
                disabled={isLoading}
                className={addOn.popular ? styles.popularAddOn : ""}
              />
              {addOn.popular && (
                <span
                  className={styles.popularBadge}
                  aria-label="Popular choice"
                >
                  Popular
                </span>
              )}
            </div>
          ))}
        </fieldset>
      </FormPreview>

      {selectedCount > 0 && (
        <div className={styles.selectionSummary} aria-live="polite">
          <p>
            {selectedCount} add-on{selectedCount !== 1 ? "s" : ""} selected
            {maxSelections && ` (${maxSelections - selectedCount} remaining)`}
          </p>
        </div>
      )}

      <div className={styles.addonsButtonGroup}>
        <Button text="Go Back" onClick={handleBackButtonClick} />
        <Button
          positionButton="right"
          text={getButtonText()}
          onClick={handleNextButtonClick}
        />
      </div>
    </div>
  );
}

export default AddOnsForm;
