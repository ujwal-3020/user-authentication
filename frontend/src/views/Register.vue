<template>
  <v-container class="d-flex align-center justify-center h-screen">
    <div class="form-container">
      <div class="py-3 bg-primary rounded-corner">
        <h2 class="text-center">Create Your Account</h2>
      </div>

      <div class="pa-5">
        <v-form ref="form" @submit.prevent="submitRegister">
          <v-text-field
            label="Username"
            v-model="username"
            required
            variant="outlined"
            :error-messages="usernameErrors"
          ></v-text-field>

          <v-text-field
            label="Email"
            v-model="email"
            variant="outlined"
            required
            class="mt-4"
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
            label="Register As"
            v-model="selectedRole"
            :items="roles"
            variant="outlined"
            class="mt-3"
            :error-messages="roleErrors"
            required
          ></v-select>

          <v-row class="mt-3">
            <v-col>
              <v-btn type="submit" color="primary" class="w-100"
                >Register</v-btn
              >
            </v-col>
          </v-row>

          <v-row class="mt-3 d-flex justify-center">
            <v-col class="d-flex align-center justify-center">
              <span>Already have an account? </span>
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
      </div>
    </div>
  </v-container>
</template>

<script>
import { toast } from "vue3-toastify";
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../utils/validations.js";
import encryptPassword from "../utils/encryptPassword.js";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      selectedRole: null,
      roles: ["Customer", "Delivery Partner", "Restaurant Owner"],
      usernameErrors: [],
      emailErrors: [],
      passwordErrors: [],
      roleErrors: [],
      visible: false,
    };
  },
  watch: {
    username(newVal) {
      this.usernameErrors = newVal ? [] : ["Username is required"];
    },
    email(newVal) {
      this.emailErrors = validateEmail(newVal);
    },
    password(newVal) {
      this.passwordErrors = validatePassword(newVal);
    },
    selectedRole(newVal) {
      this.roleErrors = newVal ? [] : ["Please select a role"];
    },
  },
  methods: {
    async submitRegister() {
      this.usernameErrors = validateUsername(this.username);
      this.emailErrors = validateEmail(this.email);
      this.passwordErrors = validatePassword(this.password);
      this.roleErrors = this.selectedRole ? [] : ["Please select a role"];

      if (
        this.usernameErrors.length ||
        this.emailErrors.length ||
        this.passwordErrors.length ||
        this.roleErrors.length
      ) {
        return;
      }

      try {
        const encryptedPassword = encryptPassword(this.password);

        await this.$store.dispatch("register", {
          username: this.username,
          email: this.email,
          password: encryptedPassword,
          role: this.selectedRole,
        });

        toast.success("Registered Successfully", {
          autoClose: 2000,
          type: "success",
          position: "top-right",
          hideProgressBar: true,
        });

        setTimeout(() => {
          this.$router.replace("/login");
        }, 2500);
        
      } catch (error) {
        toast.error(error.message, {
          autoClose: 2000,
          type: "error",
          position: "top-right",
          hideProgressBar: true,
        });
      }
    },

    goToLogin() {
      this.$router.replace("/login");
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

.login-link {
  min-width: 0px;
  padding: 0px;
  text-transform: none;
  font-weight: bold;
}

.login-link:hover {
  background-color: #e0f7fa;
  border-radius: 5px;
}

.rounded-corner {
  border-radius: 8px 8px 0 0;
}
</style>
