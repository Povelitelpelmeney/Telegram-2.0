import { useState, useEffect } from "react";
import { useMediaQuery } from "./";

const useColorScheme = () => {
  const prefersDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const [colorScheme, setColorScheme] = useState<string>(
    localStorage.getItem("theme") || (prefersDarkTheme ? "dark" : "light"),
  );

  const toggleColorScheme = () => {
    const newColorScheme = colorScheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newColorScheme);
    setColorScheme(newColorScheme);
  };

  useEffect(() => {
    colorScheme === "dark"
      ? document.getElementById("root")!.classList.add("dark")
      : document.getElementById("root")!.classList.remove("dark");
  }, [colorScheme]);

  return { colorScheme, toggleColorScheme } as const;
};

export default useColorScheme;
