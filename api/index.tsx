import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import * as AbsintheSocket from "@absinthe/socket";
// @ts-ignore
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";
// import Cookies from "js-cookie";

const HTTP_URL = "https://chat.thewidlarzgroup.com/api/graphql";
const WS_URL = "wss://chat.thewidlarzgroup.com/socket";

// Create an HTTP link to the Absinthe server.
const httpLink = createHttpLink({
  uri: HTTP_URL,
});

// Use setContext to create a chainable link object that sets
// the token cookie to the Authorization header.
const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("token");

  // Add the new Authorization header.
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Chain the HTTP link and the authorization link.
const authedHttpLink = authLink.concat(httpLink);

// Create a standard Phoenix websocket connection. If you need
// to provide additional params, like an authentication token,
// you can configure them in the `params` option.
const phoenixSocket = new PhoenixSocket(WS_URL, {
  params: async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return {};
    return {
      token,
    };
  },
});

// Wrap the Phoenix socket in an AbsintheSocket.
const absintheSocket = AbsintheSocket.create(phoenixSocket);

// Create an Apollo link from the AbsintheSocket instance.
const websocketLink = createAbsintheSocketLink(absintheSocket);

// If the query contains a subscription, send it through the
// websocket link. Otherwise, send it through the HTTP link.
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  websocketLink,
  authedHttpLink
);

// Apollo also requires you to provide a cache implementation
// for caching query results. The InMemoryCache is suitable
// for most use cases.
const cache = new InMemoryCache();

// Create the client.
export const client = new ApolloClient({
  link,
  cache,
});
