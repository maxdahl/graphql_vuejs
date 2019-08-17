import store from "../store";
import * as types from "../store/types";

export const checkAuth = (to, from, next) => {
  const user = store.getters[types.USER];

  if (to.matched.some(r => r.meta.reqAuth)) {
    if (user.isLoggedIn) {
      return next();
    }
    return next({ name: "login" });
  } else if (to.matched.some(r => r.meta.redirectLoggedIn) && user.isLoggedIn) {
    return next({ name: "home" });
  } else {
    return next();
  }
};

export const clearAuth = (to, from, next) => {
  const user = store.getters[types.USER];
  if (user.isLoggedIn) {
    store.dispatch(types.LOGOUT).then(() => {
      next({ name: "login" });
    });
  }
};
