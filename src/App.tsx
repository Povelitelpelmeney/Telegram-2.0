import { ApolloProvider } from "@apollo/client";
import { RouterProvider } from "react-router-dom";
import { useColorScheme } from "./hooks";
import { ThemeContext } from "./contexts";
import client from "./apollo";
import router from "./routes";
import { useEffect } from "react";

const App = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  useEffect(() => {
    localStorage.setItem("theme", "dark")
  }, [])

  return (
    <div className="fixed flex h-screen w-screen flex-row bg-slate-100 dark:bg-slate-800">
      <ApolloProvider client={client}>
        <ThemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
          <RouterProvider router={router} />
        </ThemeContext.Provider>
      </ApolloProvider>
    </div>
  );
};

export default App;
