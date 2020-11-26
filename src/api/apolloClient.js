import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, split } from "apollo-link";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { RetryLink } from "apollo-link-retry";
import { WebSocketLink } from "apollo-link-ws";
import { createUploadLink } from "apollo-upload-client";
import { getMainDefinition } from "apollo-utilities";
import { toast } from "react-toastify";
import { BASE_URL, WS_URL } from "./constant";

const cache = new InMemoryCache({
});

const uploadLink = createUploadLink({
  uri: BASE_URL + "/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      if (message) {
        const [f, msg, x] = message.split("\"");
        console.log(msg);
        toast.error(msg ? msg : message);
      }

      console.dir(message);
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`
      );
    });
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});


const wsLink = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true,
    connectionParams: async () => ({
      token: localStorage.getItem("token"),
    }),
  },
});

const authMiddleware = setContext(async (_, { headers }) => {

  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem("token"), // token.replace(new RegExp('"', "g"), "")
    },
  };
});

const retryLink = new RetryLink();

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind == "OperationDefinition" && operation == "subscription";
  },
  wsLink,
  uploadLink,

);

const client = new ApolloClient({
  link: ApolloLink.from([authMiddleware, errorLink, retryLink, link]),

  cache,
  connectToDevTools: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

export default client;