import styles from "./ThankYou.module.css";
import Icon from "../../Atoms/Icon/Icon";
import { useCallback, useState } from "react";
import useCustomNavigate from "../../../Hooks/UseNavigate";
import { reset as resetStep } from "../../../Redux/sidebarSlice";
import { useAppDispatch } from "../../../Hooks/useRedux";
import useCountdown from "../../../Hooks/useCountdown";

type ThankYouProps = {
  title?: string;
  message?: string;
  supportEmail?: string;
  autoRedirectDelay?: number;
  redirectPath?: string;
  showCountdown?: boolean;
  allowCancelRedirect?: boolean;
  onRedirect?: () => void;
  className?: string;
};

function ThankYou({
  title = "Thank you!",
  message = "Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at",
  supportEmail = "support@loremgaming.com",
  autoRedirectDelay = 5000,
  redirectPath = "/",
  showCountdown = true,
  allowCancelRedirect = true,
  onRedirect,
  className = "",
}: Readonly<ThankYouProps>) {
  const { goTo } = useCustomNavigate();
  const dispatch = useAppDispatch();
  const [isRedirectCancelled, setIsRedirectCancelled] = useState(false);

  const handleRedirect = useCallback(() => {
    if (onRedirect) {
      onRedirect();
    }
    dispatch(resetStep());
    goTo(redirectPath);
  }, [onRedirect, dispatch, goTo, redirectPath]);

  const { timeLeft: countdown, cancel: cancelCountdown } = useCountdown({
    initialTime: autoRedirectDelay,
    onComplete: handleRedirect,
    autoStart: autoRedirectDelay > 0 && !isRedirectCancelled,
  });

  const cancelRedirect = useCallback(() => {
    setIsRedirectCancelled(true);
    cancelCountdown();
  }, [cancelCountdown]);
  // Build container classes
  const containerClasses = [styles.container, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <main className={styles.thank_you} role="main" aria-live="polite">
        <Icon
          src="/Images/icon-thank-you.svg"
          alt="Success checkmark"
          position="center"
          size={70}
        />
        <h1>{title}</h1>
        <p className={styles.message}>
          {message}{" "}
          <a
            href={`mailto:${supportEmail}`}
            className={styles.email_link}
            aria-label={`Send email to ${supportEmail}`}
          >
            {supportEmail}
          </a>
          
        </p>

        {showCountdown && !isRedirectCancelled && autoRedirectDelay > 0 && (
          <div className={styles.redirect_info} aria-live="polite">
            <p className={styles.countdown_text}>
              Redirecting to home page in{" "}
              <span
                className={styles.countdown_number}
                aria-label={`${countdown} seconds`}
              >
                {countdown}
              </span>{" "}
              {countdown === 1 ? "second" : "seconds"}...
            </p>
            {allowCancelRedirect && (
              <button
                type="button"
                onClick={cancelRedirect}
                className={styles.cancel_button}
                aria-label="Cancel automatic redirect"
              >
                Stay on this page
              </button>
            )}
          </div>
        )}

        {(isRedirectCancelled || !autoRedirectDelay) && (
          <div className={styles.manual_navigation}>
            <button
              type="button"
              onClick={handleRedirect}
              className={styles.home_button}
              aria-label="Go to home page"
            >
              Go to Home
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default ThankYou;
