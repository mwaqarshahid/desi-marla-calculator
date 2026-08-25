"use client";

import { createContext, useCallback, useContext, useState } from "react";

export type CalculatorTab = "marla" | "sqft";

const CalculatorTabContext = createContext<{
  tab: CalculatorTab;
  setTab: (tab: CalculatorTab) => void;
} | null>(null);

export function CalculatorTabProvider({ children }: { children: React.ReactNode }) {
  const [tab, setTabState] = useState<CalculatorTab>("marla");

  const setTab = useCallback((next: CalculatorTab) => {
    setTabState(next);
  }, []);

  return (
    <CalculatorTabContext.Provider value={{ tab, setTab }}>
      {children}
    </CalculatorTabContext.Provider>
  );
}

export function useCalculatorTab() {
  const ctx = useContext(CalculatorTabContext);
  if (!ctx) {
    throw new Error("useCalculatorTab must be used within CalculatorTabProvider");
  }
  return ctx;
}
