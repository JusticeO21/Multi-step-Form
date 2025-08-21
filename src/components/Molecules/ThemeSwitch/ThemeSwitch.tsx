import styles from "./ThemeSwitch.module.css";

type ThemeSwitchProps = {
  isYearly: boolean;
  onToggle: (isYearly: boolean) => void;
  leftLabel?: string;
  rightLabel?: string;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  size?: "small" | "medium" | "large";
  variant?: "default" | "compact";
};

function ThemeSwitch({
  isYearly,
  onToggle,
  leftLabel = "Monthly",
  rightLabel = "Yearly",
  disabled = false,
  className = "",
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  size = "medium",
  variant = "default",
}: Readonly<ThemeSwitchProps>) {
  // Handle toggle change
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onToggle(e.target.checked);
  };

  // Build container classes
  const containerClasses = [
    styles.switchContainer,
    styles[size],
    styles[variant],
    disabled ? styles.disabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Generate unique ID for accessibility
  const switchId = `theme-switch-${Math.random()
    .toString(36)
    .substring(2, 11)}`;

  return (
    <fieldset className={containerClasses} aria-labelledby={switchId}>
      <span
        className={`${styles.label} ${styles.leftLabel} ${
          !isYearly ? styles.active : ""
        }`}
        aria-hidden="true"
      >
        {leftLabel}
      </span>

      <label className={styles.switch} htmlFor={switchId}>
        <input
          id={switchId}
          type="checkbox"
          className={styles.toggle}
          onChange={handleToggle}
          checked={isYearly}
          disabled={disabled}
          aria-label={
            ariaLabel ||
            `Switch between ${leftLabel.toLowerCase()} and ${rightLabel.toLowerCase()} billing`
          }
          aria-describedby={ariaDescribedBy}
        />
        <span className={`${styles.slider} ${styles.round}`} aria-hidden="true">
          <span className={styles.sliderText}>
            {isYearly ? rightLabel.charAt(0) : leftLabel.charAt(0)}
          </span>
        </span>
      </label>

      <span
        className={`${styles.label} ${styles.rightLabel} ${
          isYearly ? styles.active : ""
        }`}
        aria-hidden="true"
      >
        {rightLabel}
      </span>
    </fieldset>
  );
}

export default ThemeSwitch;
