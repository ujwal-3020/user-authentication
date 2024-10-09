import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import Dashboard from "../views/Dashboard.vue";
import store from "../store/index.js";

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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next("/login");
    } else {
      next();
    }
  } else {
    if (
      isAuthenticated &&
      (to.path === "/login" ||
        to.path === "/register" ||
        to.path === "/forgot-password" ||
        to.path === "/reset-password")
    ) {
      next("/dashboard");
    } else {
      next();
    }
  }
});

export default router;
