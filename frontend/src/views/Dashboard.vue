<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Food Delivery</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="goToProfile" color="white" variant="text"> Profile </v-btn>
      <v-btn @click="logout" color="white" variant="text"> Logout </v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="mt-5">
        <h1>Welcome to the Dashboard, {{ user.username }}!</h1>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import generateToast from "../utils/generateToast.js";
export default {
  computed: {
    user() {
      // console.log(this.$store.state.user);

      return this.$store.state.user;
    },
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout");
        setTimeout(() => {
          this.$router.replace("/login");
        }, 2500);
      } catch (error) {
        generateToast(error.message, "error");
      }
    },
    goToProfile() {
      alert("This functionality will be available soon.");
    },
  },
  created() {
    this.$store.dispatch("getUserInfo", this.$router);
  },
};
</script>
