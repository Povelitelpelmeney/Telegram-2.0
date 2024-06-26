import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { Reference, getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { setContext } from "@apollo/client/link/context";
import { createClient } from "graphql-ws";
import { store } from "./store";
import { Message } from "../graphql";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_HTTP_GRAPHQL_ENDPOINT,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_WS_GRAPHQL_ENDPOINT,
    lazy: true,
    connectionParams: {
      authorization: store.getState().token,
    },
  }),
);

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: store.getState().token,
    },
  };
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

const cache = new InMemoryCache({
  typePolicies: {
    Chat: {
      fields: {
        messages: {
          keyArgs: false,
          merge: (
            existing: Reference[] = [],
            incoming: Reference[],
            { readField },
          ) => {
            const readId = (ref: Reference) =>
              readField<Message["id"]>("id", ref);
            const existingIds = new Set(existing.map((mes) => readId(mes)));
            return existing.concat(
              incoming.filter((message) => !existingIds.has(readId(message))),
            );
          },
        },
      },
    },
    Message: {
      keyFields: ["id", "chatId"],
    },
    User: {
      keyFields: ["login"],
    },
  },
});

export const client = new ApolloClient({ link, cache });
