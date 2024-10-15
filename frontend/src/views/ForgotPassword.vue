<template>
  <v-container class="d-flex align-center justify-center h-screen">
    <div class="form-container">
      <div class="py-3 bg-primary rounded-corner">
        <h2 class="text-center">Forgot Password</h2>
      </div>
      <div class="pa-5">
        <v-form @submit.prevent="submitForgotPassword">
          <v-text-field
            label="Email"
            v-model="email"
            variant="outlined"
            required
            class="mt-3"
            color="primary"
            :error-messages="emailErrors"
          ></v-text-field>
          <v-row class="mt-3 mb-3 d-flex justify-center px-3">
            <v-btn type="submit" color="primary" class="w-100">Submit</v-btn>
          </v-row>
          <v-row class="mt-3 mb-3 d-flex justify-center">
            <v-col class="d-flex align-center justify-center">
              <span>Remember Password? </span>
              <v-btn
                variant="text"
                @click="goToLogin"
                color="secondary"
                class="login-link"
                density="compact"
              >
                Login
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        An email containing link to reset the password will be sent to you at
        the provided email id.
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import generateToast from "../utils/generateToast.js";
import { validateEmail } from "../utils/validations.js";

export default {
  data() {
    return {
      email: "",
      emailErrors: [],
    };
  },
  methods: {
    async submitForgotPassword() {
      this.emailErrors = validateEmail(this.email);

      if (this.emailErrors.length == 0) {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };

          const res = await axios.post(
            "http://192.1.200.84:3000/api/v1/auth/forgot-password",
            {
              email: this.email,
            },
            config
          );

          generateToast(res.data.message, "success");
        } catch (error) {
          generateToast(error.response.data.message, "error");
        }
      }
    },
    goToLogin() {
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped></style>
