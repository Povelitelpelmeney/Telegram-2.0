import { createContext } from "react";
import { useDarkTheme } from "../hooks";

export type ThemeContextType = ReturnType<typeof useDarkTheme> | undefined;
export const ThemeContext = createContext<ThemeContextType>(undefined);

export type AuthContextType =
  | React.Dispatch<React.SetStateAction<"signIn" | "signUp">>
  | undefined;
export const AuthContext = createContext<AuthContextType>(undefined);
