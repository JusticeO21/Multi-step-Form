import { useState, useEffect, useCallback } from 'react';

interface UseCountdownOptions {
  initialTime: number; // in milliseconds
  onComplete?: () => void;
  interval?: number; // in milliseconds, default 1000
  autoStart?: boolean;
}

interface UseCountdownReturn {
  timeLeft: number; // in seconds
  isActive: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  cancel: () => void;
}

/**
 * Custom hook for countdown functionality
 * @param options - Configuration options for the countdown
 * @returns Object with countdown state and control functions
 */
function useCountdown({
  initialTime,
  onComplete,
  interval = 1000,
  autoStart = true,
}: UseCountdownOptions): UseCountdownReturn {
  const [timeLeft, setTimeLeft] = useState(Math.ceil(initialTime / 1000));
  const [isActive, setIsActive] = useState(autoStart);
  const [isCancelled, setIsCancelled] = useState(false);

  const start = useCallback(() => {
    setIsActive(true);
    setIsCancelled(false);
  }, []);

  const pause = useCallback(() => {
    setIsActive(false);
  }, []);

  const reset = useCallback(() => {
    setTimeLeft(Math.ceil(initialTime / 1000));
    setIsActive(autoStart);
    setIsCancelled(false);
  }, [initialTime, autoStart]);

  const cancel = useCallback(() => {
    setIsActive(false);
    setIsCancelled(true);
  }, []);

  useEffect(() => {
    if (!isActive || isCancelled || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          if (onComplete) {
            onComplete();
          }
          return 0;
        }
        return prev - 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isActive, isCancelled, timeLeft, onComplete, interval]);

  return {
    timeLeft,
    isActive,
    start,
    pause,
    reset,
    cancel,
  };
}

export default useCountdown;
