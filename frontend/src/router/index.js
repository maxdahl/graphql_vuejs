import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { checkAuth } from "./utils";

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  checkAuth(to, from, next);
});

export default router;
