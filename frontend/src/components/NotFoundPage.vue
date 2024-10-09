<!-- src/views/NotFound.vue -->
<template>
  <v-container class="text-center my-5">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card elevation="3" class="pa-5">
          <v-card-title class="headline">404 - Page Not Found</v-card-title>
          <v-card-text>
            Oops! The page you're looking for doesn't exist.
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="goHome">Go Back Home</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.replace("/");
    },
  },
};
</script>

<style scoped>
.v-card-title {
  color: #ff5252;
}
</style>
