import { useState, useEffect } from "react";
import useMediaQuery from "./useMediaQuery";

const useDarkTheme = () => {
  const prefersDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || (prefersDarkTheme ? "dark" : "light"),
  );

  const toggleTheme = () => {
    const newColorScheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newColorScheme);
    setTheme(newColorScheme);
  };

  useEffect(() => {
    theme === "dark"
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [theme]);

  return { theme, toggleTheme } as const;
};

export default useDarkTheme;
