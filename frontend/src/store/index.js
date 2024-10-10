import Vuex from "vuex";
import axios from "axios";
import { toast } from "vue3-toastify";
import encryptPassword from "../utils/encryptPassword";

export default new Vuex.Store({
  state: {
    // token: "",
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
    // setToken(state, token) {
    //   state.token = token;
    //   localStorage.setItem("token", token);
    // },
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

        // localStorage.setItem("isAuthenticated", true);
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

    async getUserInfo({ state, commit }) {
      // console.log(jsCookie.get("token"));

      try {
        const res = await axios.get("http://192.1.200.84:3000/api/v1/user/me", {
          withCredentials: true,
        });
        commit("setUser", res.data.user);
        commit("setIsAuthenticated", true);
      } catch (error) {
        commit("setUser", {});
        commit("setIsAuthenticated", false);
        throw new Error(error.response.data.error);
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
        // localStorage.removeItem("isAuthenticated");

        toast.success("Logged out Successfully", {
          autoClose: 1000,
          type: "success",
          position: "top-right",
          hideProgressBar: true,
        });
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
  },
});
