import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

interface Headers {
  authorization?: string;
  [key: string]: string | undefined;
}

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }: { headers?: Headers }) => {
  const token = localStorage.getItem("token");
  const authHeaders: Headers = {
    ...headers,
    authorization: token ? `Bearer ${token}` : "",
  };

  return { headers: authHeaders };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
