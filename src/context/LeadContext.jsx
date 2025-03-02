import { createContext } from "react";
import { usePersistedState } from "../hooks/usePersistedState";

export const LeadContext = createContext();

export function LeadProvider({ children }) {
  const [leadSubmitted, setLeadSubmitted] = usePersistedState(
    "leadSubmitted",
    false
  );
  const [leadData, setLeadData] = usePersistedState("leadData", null); // if you need to store lead data

  return (
    <LeadContext.Provider
      value={{ leadSubmitted, setLeadSubmitted, leadData, setLeadData }}
    >
      {children}
    </LeadContext.Provider>
  );
}
