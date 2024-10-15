import Vuex from "vuex";
import axios from "axios";
import encryptPassword from "../utils/encryptPassword";
import generateToast from "../utils/generateToast.js";
import router from "../router/index.js";

export default new Vuex.Store({
  state: {
    user: {},
    isAuthenticated: false,
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getisAuthenticated(state) {
      return state.isAuthenticated;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      // console.log(user);
    },
    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
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

        userData.password = encryptPassword(userData.password);

        const res = await axios.post(
          "http://192.1.200.84:3000/api/v1/user/login",
          userData,
          config
        );

        commit("setIsAuthenticated", true);
      } catch (error) {
        throw new Error(error.response.data.message);
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
        throw new Error(error.response.data.message);
      }
    },

    async getUserInfo({ commit, dispatch }) {
      try {
        const res = await axios.get("http://192.1.200.84:3000/api/v1/user/me", {
          withCredentials: true,
        });

        commit("setUser", res.data.user);
        commit("setIsAuthenticated", true);
      } catch (error) {
        generateToast(error.response.data.message, "error", () =>
          dispatch("logout")
        );
      }
    },

    async logout({ commit }) {
      try {
        const res = await axios.post(
          "http://192.1.200.84:3000/api/v1/user/logout",
          {},
          {
            withCredentials: true,
          }
        );

        commit("setUser", {});
        commit("setIsAuthenticated", false);

        router.replace("/login").then(() => {
          generateToast("Logged out successfully", "success");
        });
      } catch (error) {
        commit("setUser", {});
        commit("setIsAuthenticated", false);
        router.replace("/login").then(() => {
          generateToast(error.response.data.message, "error");
        });
      }
    },
  },
});
