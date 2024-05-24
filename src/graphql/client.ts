import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { setContext } from "@apollo/client/link/context";
import { createClient } from "graphql-ws";

interface Headers {
  authorization?: string;
  [key: string]: string | undefined;
}

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_HTTP_GRAPHQL_ENDPOINT,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_WS_GRAPHQL_ENDPOINT,
    lazy: true,
    connectionParams: {
      authorization: localStorage.getItem("token") || "",
    },
  }),
);

const authLink = setContext((_, { headers }: { headers?: Headers }) => {
  const token = localStorage.getItem("token");
  const authHeaders: Headers = {
    ...headers,
    authorization: token ? `Bearer ${token}` : "",
  };

  return { headers: authHeaders };
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
