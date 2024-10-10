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
import { toast } from "vue3-toastify";

export default {
  data() {
    return {
      email: "",
      emailErrors: [],
    };
  },
  methods: {
    async submitForgotPassword() {
      this.emailErrors = this.validateEmail(this.email);

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

          toast.success(res.data.message, {
            autoClose: 2000,
            type: "success",
            position: "top-right",
            hideProgressBar: true,
          });
        } catch (error) {
          toast.error(error.response.data.message, {
            autoClose: 2000,
            type: "error",
            position: "top-right",
            hideProgressBar: true,
          });
        }
      }
    },
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
      const errors = [];
      if (!email) {
        errors.push("Email is required.");
      } else if (!emailRegex.test(email)) {
        errors.push("Email must be a valid email address.");
      }
      // console.log(errors);

      return errors;
    },
    goToLogin() {
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.text-center {
  text-align: center;
}

.rounded-corner {
  border-radius: 8px 8px 0 0;
}

.login-link {
  padding: 0;
  text-transform: none;
  font-weight: bold;
}

.login-link:hover {
  background-color: #e0f7fa;
  border-radius: 5px;
}
</style>
