// src/hooks/usePersistedState.jsx
import { useState, useEffect } from "react";

export function usePersistedState(key, defaultValue) {
  const storedValue = localStorage.getItem(key);
  let initial;

  if (storedValue !== null) {
    try {
      initial = JSON.parse(storedValue);
    } catch (error) {
      console.warn(
        `Error parsing JSON from localStorage for key "${key}". Resetting to default value.`,
        error
      );
      // Remove the invalid entry and use defaultValue
      localStorage.removeItem(key);
      initial = defaultValue;
    }
  } else {
    initial = defaultValue;
  }

  const [state, setState] = useState(initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
