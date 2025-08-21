import styles from "./SelectedPlan.module.css";

type PlanVariant = "main_plan" | "addon";

type SelectedPlanProps = {
  planCost: string;
  plan: string;
  variant?: PlanVariant;
  showChangeButton?: boolean;
  onChangeClick?: () => void;
  changeButtonText?: string;
  className?: string;
  "aria-label"?: string;
};

function SelectedPlan({
  planCost,
  plan,
  variant,
  showChangeButton = false,
  onChangeClick,
  changeButtonText = "change",
  className = "",
  "aria-label": ariaLabel,
}: Readonly<SelectedPlanProps>) {
  const containerClasses = [
    styles.container,
    variant ? styles[variant] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleChangeClick = () => {
    if (onChangeClick) {
      onChangeClick();
    }
  };

  return (
    <article
      className={containerClasses}
      aria-label={ariaLabel || `Selected plan: ${plan}, Cost: ${planCost}`}
    >
      <div className={styles.plan}>
        <h5>{plan}</h5>
        {showChangeButton && (
          <button
            type="button"
            onClick={handleChangeClick}
            aria-label={`Change ${plan} plan`}
            className={styles.change_button}
          >
            {changeButtonText}
          </button>
        )}
      </div>
      <p className={styles.plan_cost} aria-label={`Cost: ${planCost}`}>
        {planCost}
      </p>
    </article>
  );
}

export default SelectedPlan;
