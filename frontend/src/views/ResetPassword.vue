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
            :error-messages="passwordErrors"
            type="password"
          ></v-text-field>
          <v-text-field
            label="Confirm Password"
            v-model="confirmPassword"
            variant="outlined"
            required
            class="mt-3"
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
import { toast } from "vue3-toastify";

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
      this.passwordErrors = this.validatePassword(this.password);
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
          await axios.post(
            `http://192.1.200.84:3000/api/v1/auth/reset-password/${token}`,
            {
              password: this.password,
            },
            config
          );
          toast.success(
            "Password changed. You will be redirected to login page.",
            {
              autoClose: 1500,
              type: "success",
              position: "bottom-center",
              hideProgressBar: true,
            }
          );
          setTimeout(() => {
            this.$router.push("/login");
          }, 1500);
        } catch (error) {
          toast.error(error.response.data.error, {
            autoClose: 1500,
            type: "error",
            position: "bottom-center",
            hideProgressBar: true,
          });
        }
      }
    },
    validatePassword(password) {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const errors = [];
      if (!password) {
        errors.push("Password is required.");
      } else if (!passwordRegex.test(password)) {
        errors.push(
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character and length should be minimum 8."
        );
      }
      return errors;
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
</style>
