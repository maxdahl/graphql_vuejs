import Vue from "vue";
import App from "./App.vue";
import babelPolyfill from "babel-polyfill";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);

import store from "./store";
import { GET_USER } from "./store/types";
import router from "./router";

const createVue = () => {
  new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
  });
};

store
  .dispatch(GET_USER)
  .then(() => {
    createVue();
  })
  .catch(err => {
    createVue();
  });
