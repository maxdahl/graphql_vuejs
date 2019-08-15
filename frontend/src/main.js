import Vue from "vue";
import App from "./App.vue";
import apolloProvider from "./vue-apollo";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);

import VueRouter from "vue-router";
import { routes } from "./routes";

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: "history"
});

import { store } from "./store";
import * as types from "./store/types";

router.beforeEach((to, from, next) => {
  const user = store.getters[types.USER];

  if (!user.isLoggedIn) {
    store
      .dispatch(types.GET_USER)
      .then(() => {
        if (to.meta.redirectLoggedIn) {
          router.push("/");
        } else next();
      })
      .catch(err => {
        if (to.meta.redirectLoggedIn) next();
        else router.push({ name: "login" });
      });
  } else {
    if (to.meta.redirectLoggedIn) {
      router.push("/");
    } else next();
  }
});

new Vue({
  el: "#app",
  router,
  store,
  apolloProvider,
  render: h => h(App)
});
