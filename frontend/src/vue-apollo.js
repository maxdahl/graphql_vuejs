import Vue from "vue";
import VueApollo from "vue-apollo";

import ApolloClient from "apollo-boost";

Vue.use(VueApollo);

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000",
  credentials: "include"
});

const instance = new VueApollo({
  defaultClient: apolloClient
});

export default instance;
