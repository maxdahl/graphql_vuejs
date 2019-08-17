// import ApolloClient from "apollo-boost";

// const apolloClient = new ApolloClient({
//   uri: "http://localhost:4000",
//   credentials: "include"
// });

// export default apolloClient;

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

import router from "./router";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache"
  },
  query: {
    fetchPolicy: "no-cache"
  }
};

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        if (webpackHotUpdate) {
          // dev mode
          graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
          });
          graphQLErrors.map(({ message }) => {
            if (message === "NOAUTH")
              router.push({ name: "logout" }).catch(err => {
                // dummy hack because it gives an unreasonable error
              });
          });
        }
      }
      if (networkError) {
        if (webpackHotUpdate) console.log(`[Network error]: ${networkError}`);
        switch (networkError.statusCode) {
          case 401:
            router.push({ name: "logout" });
            break;
          // default:
          //   router.push({ name: "error" });
        }
      }
    }),
    new HttpLink({
      uri: "http://localhost:4000",
      credentials: "include"
    })
  ]),
  cache: new InMemoryCache(),
  defaultOptions
});

export default client;
