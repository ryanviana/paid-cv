import { createContext } from "react";
import { usePersistedState } from "../hooks/usePersistedState";

export const ResultContext = createContext();

export function ResultProvider({ children }) {
  // result should be an array (e.g. one number per area)
  const [result, setResult] = usePersistedState("result", null);
  // leadSubmitted indicates if the lead capture was already completed
  const [leadSubmitted, setLeadSubmitted] = usePersistedState(
    "resultLeadSubmitted",
    false
  );

  return (
    <ResultContext.Provider
      value={{ result, setResult, leadSubmitted, setLeadSubmitted }}
    >
      {children}
    </ResultContext.Provider>
  );
}
