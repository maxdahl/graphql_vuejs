import { clearAuth } from "./utils";

import Home from "../components/home.vue";

import Auth from "../components/auth/auth.vue";
import Login from "../components/auth/login.vue";
import Register from "../components/auth/register.vue";
import User from "../components/user.vue";

const routes = [
  {
    path: "",
    name: "home",
    component: Home,
    meta: { reqAuth: true }
  },

  {
    path: "/user",
    name: "user",
    component: User,
    meta: { reqAuth: true }
  },

  {
    path: "/user/auth",
    component: Auth,
    children: [
      {
        meta: { redirectLoggedIn: true },
        path: "register",
        component: Register,
        name: "register"
      },

      {
        meta: { redirectLoggedIn: true },
        path: "login",
        component: Login,
        name: "login"
      },

      {
        path: "logout",
        name: "logout",
        //meta: { reqAuth: true },
        beforeEnter: (to, from, next) => {
          clearAuth(to, from, next);
        }
      }
    ]
  }
];

export default routes;
