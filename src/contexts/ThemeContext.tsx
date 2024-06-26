import {
  PropsWithChildren,
  createContext,
  memo,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useAppDispatch, useAppSelector, useMediaQuery } from "../hooks";
import { setTheme } from "../features/theme/themeSlice";

type ThemeContextType = {
  currentTheme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

const ThemeProvider = memo(({ children }: PropsWithChildren) => {
  const prefersDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const currentTheme = useMemo(() => {
    return theme || (prefersDarkTheme ? "dark" : "light");
  }, [theme, prefersDarkTheme]);

  const toggleTheme = useCallback(() => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    dispatch(setTheme(newTheme));
  }, [currentTheme, dispatch]);

  useEffect(() => {
    currentTheme === "dark"
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
});

export default ThemeProvider;
