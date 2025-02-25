import { createContext, useState } from "react";

export const ResultContext = createContext();

export function ResultProvider({ children }) {
  // result should be an array (e.g. one number per area)
  const [result, setResult] = useState(null);
  // leadSubmitted indicates if the lead capture was already completed
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  return (
    <ResultContext.Provider
      value={{ result, setResult, leadSubmitted, setLeadSubmitted }}
    >
      {children}
    </ResultContext.Provider>
  );
}
