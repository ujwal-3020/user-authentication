<template>
  <v-container>
    <h1>Hello, {{ user.username }}!</h1>
    <v-btn class="mt-3" @click="logout" color="error">Logout</v-btn>
  </v-container>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
  created() {
    this.$store.dispatch("getUserInfo");
  },
};
</script>
