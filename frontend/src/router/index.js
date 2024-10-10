import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import Dashboard from "../views/Dashboard.vue";
import NotFound from "../components/NotFoundPage.vue";
import store from "../store/index.js";
import axios from "axios";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresAuth: false },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: { requiresAuth: false },
  },
  {
    path: "/reset-password/:token",
    name: "ResetPassword",
    component: ResetPassword,
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters.getisAuthenticated;

  if (isAuthenticated) {
    if (to.meta.requiresAuth) {
      next();
    } else {
      next("/dashboard");
    }
  } else {
    try {
      const result = await axios.get(
        "http://192.1.200.84:3000/api/v1/user/me",
        {
          withCredentials: true,
        }
      );

      store.commit("setUser", result.data.user);
      store.commit("setIsAuthenticated", true);

      if (
        to.path === "/login" ||
        to.path === "/register" ||
        to.path === "/forgot-password" ||
        to.path === "/reset-password"
      ) {
        next("/dashboard");
      } else {
        next();
      }
    } catch (error) {
      if (to.meta.requiresAuth) {
        next("/login");
      } else {
        next();
      }
    }
  }
});

export default router;
