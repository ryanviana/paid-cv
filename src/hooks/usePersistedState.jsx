import { useState, useEffect } from "react";

export function usePersistedState(key, initialValue) {
  // Initialize state from localStorage, if available
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : initialValue;
  });

  // Whenever the state changes, update localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
