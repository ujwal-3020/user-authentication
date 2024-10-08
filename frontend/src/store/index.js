import Vuex from "vuex";
import axios from "axios";
import { toast } from "vue3-toastify";

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
    user: {},
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    setUser(state, user) {
      state.user = user;
      // console.log(user);
    },
    logout(state) {
      state.token = "";
      localStorage.removeItem("token");
      state.user = {};
    },
  },
  actions: {
    async login({ commit }, userData) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };

        const res = await axios.post(
          "http://192.1.200.84:3000/api/v1/user/login",
          userData,
          config
        );

        commit("setToken", res.data.token);
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },

    async register(_, userData) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await axios.post(
          "http://192.1.200.84:3000/api/v1/user/register",
          userData,
          config
        );
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },

    async getUserInfo({ commit }, router) {
      try {
        const token = localStorage.getItem("token");
        const payload = JSON.parse(atob(token.split(".")[1]));
        const expirationTime = payload.exp * 1000;
        if (Date.now() > expirationTime) {
          toast.info("Session Timeout. Please login again.", {
            autoClose: 1500,
            type: "info",
            position: "bottom-center",
          });
          setTimeout(() => {
            router.push("/login");
          }, 1500);
          commit("logout");
          return;
        }
        const res = await axios.get("http://192.1.200.84:3000/api/v1/user/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        });
        commit("setUser", res.data.user);
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },

    logout({ commit }) {
      commit("logout");
      toast.success("Logged out Successfully", {
        autoClose: 1000,
        type: "success",
        position: "bottom-center",
      });
    },
  },
});
