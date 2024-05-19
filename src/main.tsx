import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/client";
import App from "./App.tsx";
import Header from "./components/Header/Header.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Header />
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
