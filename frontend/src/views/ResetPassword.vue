<template>
  <v-container class="d-flex align-center justify-center h-screen">
    <div class="form-container">
      <div class="py-3 bg-primary rounded-corner">
        <h2 class="text-center">Reset Password</h2>
      </div>
      <div class="pa-5">
        <v-form @submit.prevent="submitResetPassword">
          <v-text-field
            label="Password"
            v-model="password"
            variant="outlined"
            required
            class="mt-3"
            color="primary"
            :error-messages="passwordErrors"
            type="password"
          ></v-text-field>
          <v-text-field
            label="Confirm Password"
            v-model="confirmPassword"
            variant="outlined"
            required
            class="mt-3"
            color="primary"
            :error-messages="confirmPasswordErrors"
            :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"
            @click:appendInner="visible = !visible"
          ></v-text-field>
          <v-row class="mt-3 mb-3 d-flex justify-center">
            <v-btn type="submit" color="primary">Reset Password</v-btn>
          </v-row>
        </v-form>
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import generateToast from "../utils/generateToast.js";
import encryptPassword from "../utils/encryptPassword";
import { validatePassword } from "../utils/validations.js";

export default {
  data() {
    return {
      password: "",
      passwordErrors: [],
      confirmPassword: "",
      confirmPasswordErrors: [],
      visible: false,
    };
  },
  methods: {
    async submitResetPassword() {
      this.passwordErrors = validatePassword(this.password);

      if (this.passwordErrors.length == 0) {
        this.confirmPasswordErrors = this.validateConfirmPassword(
          this.password,
          this.confirmPassword
        );
      }
      if (
        this.passwordErrors.length == 0 &&
        this.confirmPasswordErrors.length == 0
      ) {
        const token = this.$route.params.token;
        // console.log(token);

        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };

          const encryptedPassword = encryptPassword(this.password);

          await axios.post(
            `http://192.1.200.84:3000/api/v1/auth/reset-password/${token}`,
            {
              password: encryptedPassword,
            },
            config
          );

          this.$router.replace("/login").then(() => {
            generateToast(
              "Password changed. You will be redirected to login page.",
              "success"
            );
          });
        } catch (error) {
          if (error.status != 400) {
            this.$router.replace("/forgot-password").then(() => {
              generateToast(error.response.data.message, "error");
            });
          } else {
            generateToast(error.response.data.message, "error");
          }
        }
      }
    },
    validateConfirmPassword(password, confirmPassword) {
      const errors = [];
      if (password != confirmPassword) {
        errors.push("Confirm Password and password must be same");
      }
      return errors;
    },
  },
};
</script>

<style scoped></style>
