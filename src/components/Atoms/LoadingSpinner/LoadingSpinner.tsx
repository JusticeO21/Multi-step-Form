import styles from "./LoadingSpinner.module.css";

type LoadingSpinnerProps = {
  size?: "small" | "medium" | "large";
  message?: string;
  className?: string;
};

function LoadingSpinner({ 
  size = "medium", 
  message = "Loading...", 
  className = "" 
}: Readonly<LoadingSpinnerProps>) {
  const containerClasses = [
    styles.container,
    styles[size],
    className
  ].filter(Boolean).join(" ");

  return (
    <div className={containerClasses}>
      <div className={styles.spinner} aria-hidden="true" />
      <p className={styles.message} aria-live="polite">
        {message}
      </p>
    </div>
  );
}

export default LoadingSpinner;
