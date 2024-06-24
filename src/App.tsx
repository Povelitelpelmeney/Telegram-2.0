import { memo } from "react";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { RouterProvider } from "react-router-dom";
import { client, router, store } from "./lib";
import ThemeProvider from "./contexts/ThemeContext";

const App = memo(() => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ApolloProvider>
    </Provider>
  );
});

export default App;
