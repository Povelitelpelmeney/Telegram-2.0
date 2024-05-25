import { useState, useEffect } from "react";

const initialColorScheme: string =
  localStorage.theme ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches && "dark") ||
  "light";

const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useState<string>(initialColorScheme);

  const toggleColorScheme = () => {
    const newColorScheme = colorScheme === "dark" ? "light" : "dark";
    localStorage.theme = newColorScheme;
    setColorScheme(newColorScheme);
  };

  useEffect(() => {
    colorScheme === "dark"
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [colorScheme]);

  return { colorScheme, toggleColorScheme };
};

export default useColorScheme;
