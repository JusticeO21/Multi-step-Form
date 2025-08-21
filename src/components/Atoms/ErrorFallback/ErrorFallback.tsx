import styles from "./ErrorFallback.module.css";

type ErrorFallbackProps = {
  error?: Error;
  resetError?: () => void;
  message?: string;
  className?: string;
};

function ErrorFallback({ 
  error, 
  resetError, 
  message = "Something went wrong", 
  className = "" 
}: Readonly<ErrorFallbackProps>) {
  const containerClasses = [styles.container, className]
    .filter(Boolean)
    .join(" ");

  const handleReload = () => {
    if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={containerClasses} role="alert">
      <div className={styles.content}>
        <h2 className={styles.title}>Oops! {message}</h2>
        <p className={styles.description}>
          We encountered an unexpected error. Please try refreshing the page.
        </p>
        
        {error && process.env.NODE_ENV === 'development' && (
          <details className={styles.errorDetails}>
            <summary>Error Details (Development)</summary>
            <pre className={styles.errorMessage}>
              {error.message}
            </pre>
            {error.stack && (
              <pre className={styles.errorStack}>
                {error.stack}
              </pre>
            )}
          </details>
        )}
        
        <button 
          className={styles.retryButton}
          onClick={handleReload}
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;
