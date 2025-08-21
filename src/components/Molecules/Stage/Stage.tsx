import StageNumber from "../../Atoms/StageNumber/StageNumber";
import styles from "./Stage.module.css";
import StageLabel from "../../Atoms/StageLabel/StageLabel";

type StageStatus = "upcoming" | "current" | "completed";

type StageProps = {
  stage: number;
  label: string;
  current: boolean;
  completed?: boolean;
  clickable?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
  className?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  disabled?: boolean;
  variant?: "default" | "compact";
};

function Stage({
  stage,
  label,
  current,
  completed = false,
  clickable = false,
  onClick,
  onKeyDown,
  className = "",
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  disabled = false,
  variant = "default",
}: Readonly<StageProps>) {
  let status: StageStatus = "upcoming";
  if (current) {
    status = "current";
  } else if (completed) {
    status = "completed";
  }

  const containerClasses = [
    styles.container,
    styles[variant],
    styles[status],
    clickable ? styles.clickable : "",
    disabled ? styles.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (disabled || !clickable || !onClick) return;
    onClick(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (disabled || !clickable) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (onClick) {
        onClick(e as any);
      }
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const defaultAriaLabel = `Step ${stage}: ${label}${
    current ? " (current step)" : ""
  }${completed ? " (completed)" : ""}`;

  const commonProps = {
    className: containerClasses,
    "aria-label": ariaLabel || defaultAriaLabel,
    "aria-describedby": ariaDescribedBy,
    "aria-current": current ? ("step" as const) : undefined,
    "aria-disabled": disabled,
  };

  if (clickable) {
    return (
      <button
        type="button"
        className={containerClasses}
        aria-label={ariaLabel || defaultAriaLabel}
        aria-describedby={ariaDescribedBy}
        aria-current={current ? "step" : undefined}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <StageNumber stage={stage} current={current} />
        <StageLabel stage={stage} label={label} />
      </button>
    );
  }

  return (
    <div {...commonProps}>
      <StageNumber stage={stage} current={current} />
      <StageLabel stage={stage} label={label} />
    </div>
  );
}

export default Stage;
