import Vuex from "vuex";
import axios from "axios";
import { toast } from "vue3-toastify";
import cookies from "js-cookie";

export default new Vuex.Store({
  state: {
    // token: "",
    user: {},
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
    logout(state) {
      // state.token = "";
      cookies.remove("token");
      state.user = {};
    },
  },
  actions: {
    async login(_, userData) {
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

        // commit("setToken", res.data.token);
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
        const res = await axios.get("http://192.1.200.84:3000/api/v1/user/me", {
          // headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        // console.log(res);

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
        position: "top-right",
        hideProgressBar: true,
      });
    },
  },
});
