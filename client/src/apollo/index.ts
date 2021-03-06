import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import fetch from "isomorphic-unfetch";
import jscookie from "js-cookie";
import { NextPageContext } from "next";
import { useMemo } from "react";
import { getTokenCookie, TOKEN_NAME } from "utils/cookieUtils";

let apolloClient: ApolloClient<unknown>;
const token = jscookie.get(TOKEN_NAME) || "";

if (process.browser) {
  global.fetch = fetch;
}

const WS_URI =
  process.env.NODE_ENV === "production"
    ? `ws://jointheirs-server-724077.us1.kinto.io/api/graphql`
    : "ws://localhost:8000/api/graphql";
const HTTP_URI =
  process.env.NODE_ENV === "production"
    ? `https://jointheirs-server-724077.us1.kinto.io/api/graphql`
    : "http://localhost:8000/api/graphql";

// const WS_URI = "ws://localhost:8000/api/graphql";
// const HTTP_URI = "http://localhost:8000/api/graphql";

const createLink = (initialState: any, t: string) => {
  const httpLink = createHttpLink({
    uri: HTTP_URI,
    credentials: "same-origin",
    fetch,
    headers: {
      Authorization: `Bearer ${t || token}`,
    },
  });

  const wsLink = process.browser
    ? new WebSocketLink({
        uri: WS_URI,

        options: {
          reconnect: true,
          lazy: true,
          timeout: 20000,
          connectionParams: () => ({
            header: {
              Authorization: `Bearer ${t || token}`,
            },
          }),
        },
      })
    : null;

  const link = process.browser
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link,
    cache: new InMemoryCache().restore(initialState || {}),
  });
};

export const initializeApollo = (
  initialState: unknown,
  ctx?: NextPageContext
): ApolloClient<unknown> => {
  const cookie = getTokenCookie(ctx?.req);
  if (!process.browser) {
    return createLink(initialState, cookie);
  }
  if (!apolloClient) {
    apolloClient = createLink(initialState, cookie);
  }

  return apolloClient;
};

export const useApollo = (initialState) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};

// export const connectApollo = (ctx: NextPageContext): ((initialState: any, t?: string) => any) => {
//   const cookie = getTokenCookie(ctx?.req)
//   const init = (initialState) => {
//     if (!process.browser) {
//       return createLink(initialState, cookie);
//     }
//     if (!apolloClient) {
//       apolloClient = createLink(initialState, cookie);
//     }

//     return apolloClient;
//   };

//   return init;
// };
