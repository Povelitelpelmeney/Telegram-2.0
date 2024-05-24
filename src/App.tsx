import { ApolloProvider } from "@apollo/client";
import { RouterProvider } from "react-router-dom";
import { ThemeContext } from "./contexts";
import { useDarkTheme } from "./hooks";
import client from "./apollo";
import router from "./routes";

const App = () => {
  const [theme, toggleTheme] = useDarkTheme();

  return (
    <div className="fixed flex h-screen w-screen flex-row bg-slate-100 dark:bg-slate-800">
      <ApolloProvider client={client}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <RouterProvider router={router} />
        </ThemeContext.Provider>
      </ApolloProvider>
    </div>
  );
};

export default App;
