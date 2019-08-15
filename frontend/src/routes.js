import Home from "./components/home.vue";

import Auth from "./components/auth/auth.vue";
import Login from "./components/auth/login.vue";
import Register from "./components/auth/register.vue";

export const routes = [
  {
    path: "",
    name: "home",
    component: Home,
    meta: { auth: true }
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
      }
    ]
  }
];
