import Vuex from "vuex";
import axios from "axios";
import { toast } from "vue3-toastify";
import jsCookie from "js-cookie";

export default new Vuex.Store({
  state: {
    // token: "",
    user: {},
  },
  getters: {
    getUser(state) {
      return state.user;
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
  },
  actions: {
    async login({ dispatch }, userData) {
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

        localStorage.setItem("isAuthenticated", true);
        
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
      } catch (error) {
        commit("setUser", {});
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
        localStorage.removeItem("isAuthenticated");

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
