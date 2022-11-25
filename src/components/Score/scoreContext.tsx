import type { ReactNode } from "react";

import { createContext, useContext, useState, useCallback } from "react";

interface ScoreContextValues {
  xWins: number;
  oWins: number;
  addWinX: () => void;
  addWinO: () => void;
}

const ScoreContext = createContext<ScoreContextValues | null>(null);

export const useScore = () => {
  const context = useContext(ScoreContext);

  if (!context) {
    throw new Error("Must use useScore inside of ScoreContextProvider");
  }

  return context;
};

interface ScoreContextProviderProps {
  children: ReactNode;
}

export const ScoreContextProvider = ({
  children,
}: ScoreContextProviderProps) => {
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);

  const addWinX = useCallback(() => setXWins((prevX) => prevX + 1), []);
  const addWinO = useCallback(() => setOWins((prevO) => prevO + 1), []);

  return (
    <ScoreContext.Provider value={{ xWins, oWins, addWinX, addWinO }}>
      {children}
    </ScoreContext.Provider>
  );
};
