<template>
  <v-container class="d-flex align-center justify-center h-screen">
    <div class="form-container">
      <div class="py-3 bg-primary rounded-corner">
        <h2 class="text-center">Login into Your Account</h2>
      </div>
      <div class="pa-5">
        <v-form @submit.prevent="submitLogin">
          <v-text-field
            label="Email / Username"
            v-model="loginIdentifier"
            variant="outlined"
            required
            class="mt-3"
            :error-messages="loginIdentifierErrors"
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            variant="outlined"
            required
            class="mt-3"
            :error-messages="passwordErrors"
            :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"
            @click:appendInner="visible = !visible"
          ></v-text-field>
          <v-select
            label="Login as"
            v-model="selectedRole"
            :items="roles"
            variant="outlined"
            class="mt-3"
            :error-messages="roleErrors"
            required
          ></v-select>
          <v-row>
            <v-col class="text-right">
              <v-btn
                variant="text"
                @click="goToForgotPassword"
                color="error"
                density="compact"
                class="pa-0"
                >Forgot Password?</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn type="submit" color="primary" class="w-100">Login</v-btn>
            </v-col>
          </v-row>
          <v-row class="mt-3 d-flex justify-center">
            <v-col class="d-flex align-center justify-center">
              <span>Don't have an account? </span>
              <v-btn
                variant="text"
                @click="goToRegister"
                color="secondary"
                class="register-link"
                density="compact"
              >
                Register here
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </div>
  </v-container>
</template>

<script>
import generateToast from "../utils/generateToast.js";

export default {
  data() {
    return {
      loginIdentifier: "",
      password: "",
      selectedRole: null,
      roles: ["Customer", "Delivery Partner", "Restaurant Owner"],
      loginIdentifierErrors: [],
      passwordErrors: [],
      roleErrors: [],
      visible: false,
    };
  },
  watch: {
    loginIdentifier(newVal) {
      this.loginIdentifierErrors = newVal
        ? []
        : ["Please enter your email or username"];
    },
    password(newVal) {
      this.passwordErrors = newVal ? [] : ["Please enter your password"];
    },
    selectedRole(newVal) {
      this.roleErrors = newVal ? [] : ["Please select a role"];
    },
  },
  methods: {
    async submitLogin() {
      try {
        this.loginIdentifierErrors = this.loginIdentifier
          ? []
          : ["Please enter your email or username"];
        this.passwordErrors = this.password
          ? []
          : ["Please enter your password"];
        this.roleErrors = this.selectedRole ? [] : ["Please select a role"];

        if (
          this.loginIdentifierErrors.length ||
          this.passwordErrors.length ||
          this.roleErrors.length
        ) {
          return;
        }

        await this.$store.dispatch("login", {
          loginIdentifier: this.loginIdentifier,
          password: this.password,
          role: this.selectedRole,
        });

        generateToast('Login successfully', "success");

        setTimeout(() => {
          this.$router.replace("/dashboard");
        }, 2500);
        
      } catch (error) {
        generateToast(error.message, "error");
      }
    },
    goToRegister() {
      this.$router.replace("/register");
    },
    goToForgotPassword() {
      this.$router.replace("/forgot-password");
    },
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}

.form-container {
  max-width: 400px;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.register-link {
  padding: 0;
  text-transform: none;
  font-weight: bold;
}

.register-link:hover {
  background-color: #e0f7fa;
  border-radius: 5px;
}

.rounded-corner {
  border-radius: 8px 8px 0 0;
}
</style>
