import { createContext, useState } from "react";

export const LeadContext = createContext();

export function LeadProvider({ children }) {
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadData, setLeadData] = useState(null); // if you need to store lead data

  return (
    <LeadContext.Provider
      value={{ leadSubmitted, setLeadSubmitted, leadData, setLeadData }}
    >
      {children}
    </LeadContext.Provider>
  );
}
