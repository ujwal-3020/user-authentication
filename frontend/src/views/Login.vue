<template>
  <v-container class="d-flex align-center justify-center h-screen">
    <div class="form-container">
      <div class="py-3 bg-primary rounded-corner">
        <h2 class="text-center">Login into Your Account</h2>
      </div>
      <div class="pa-5">
        <v-form @submit.prevent="submitLogin">
          <v-text-field
            label="Email"
            v-model="email"
            variant="outlined"
            required
            class="mt-3"
            :error-messages="emailErrors"
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
            label="Select Role"
            v-model="selectedRole"
            :items="roles"
            variant="outlined"
            class="mt-3"
            :error-messages="roleErrors"
            required
          ></v-select>
          <v-row>
            <v-col class="text-right">
              <v-btn variant="text" @click="goToForgotPassword" color="error"
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
              <span>Not a member? </span>
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
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  data() {
    return {
      email: "",
      password: "",
      selectedRole: null,
      roles: ["Customer", "Delivery Partner", "Restaurant Owner"],
      emailErrors: [],
      passwordErrors: [],
      roleErrors: [],
      visible: false,
    };
  },
  watch: {
    email(newVal) {
      this.emailErrors = newVal ? [] : ["Email is required"];
    },
    password(newVal) {
      this.passwordErrors = newVal ? [] : ["Password is required"];
    },
    selectedRole(newVal) {
      this.roleErrors = newVal ? [] : ["Role is required."];
    },
  },
  methods: {
    async submitLogin() {
      try {
        await this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
          role: this.selectedRole,
        });

        toast.success("Login Successfully", {
          autoClose: 2000,
          type: "success",
          position: "bottom-center",
        });

        setTimeout(() => {
          this.$router.push("/dashboard");
        }, 4000);
      } catch (error) {
        toast.error(error.message, {
          autoClose: 2000,
          type: "error",
          position: "bottom-center",
        });
      }
    },
    goToRegister() {
      this.$router.push("/register");
    },
    goToForgotPassword() {
      this.$router.push("/forgot-password");
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
