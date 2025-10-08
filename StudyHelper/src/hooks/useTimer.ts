// =============================================
// useTimer.ts
// ---------------------------------------------
// A custom React hook that provides timer functionality
// for the StudyTracker screen.
//
// Features:
// - Tracks elapsed time in seconds.
// - Supports starting, stopping, and resetting the timer.
// - Automatically updates every second using useEffect.
// =============================================

import { useEffect, useRef, useState } from 'react';

export default function useTimer() {
  // The number of seconds elapsed since the timer started
  const [seconds, setSeconds] = useState(0);

  // Indicates whether the timer is currently running
  const [running, setRunning] = useState(false);

  // Store a reference to the interval ID so it can be cleared later
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function: start timer
  const start = () => {
    if (!running) {
      setRunning(true);
      // Start interval that ticks every second
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  // Function: stop timer
  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Stop interval
      intervalRef.current = null;
    }
    setRunning(false);
  };

  // Function: reset timer to 0
  const reset = () => {
    setSeconds(0);
  };

  // Clean up interval when component unmounts or when running changes
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Return values and control functions to the caller
  return { seconds, running, start, stop, reset };
}
