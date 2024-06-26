import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context) return context;
  else throw new Error("useTheme hook can only be used inside a ThemeProvider");
};
