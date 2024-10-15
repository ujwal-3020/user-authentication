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
            color="primary"
            :error-messages="usernameErrors"
          ></v-text-field>

          <v-text-field
            label="Email"
            v-model="email"
            variant="outlined"
            required
            class="mt-3"
            color="primary"
            :error-messages="emailErrors"
          ></v-text-field>

          <v-text-field
            label="Password"
            v-model="password"
            variant="outlined"
            required
            class="mt-3"
            color="primary"
            :error-messages="passwordErrors"
            :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"
            @click:appendInner="visible = !visible"
          ></v-text-field>

          <v-date-input
            v-model="dob"
            label="Date of Birth"
            variant="outlined"
            prepend-icon=""
            prepend-inner-icon="$calendar"
            :max="maxDate"
            class="mt-3"
            color="primary"
            :error-messages="dobErrors"
          ></v-date-input>

          <v-select
            label="Register As"
            v-model="selectedRole"
            :items="roles"
            variant="outlined"
            class="mt-3"
            color="primary"
            :error-messages="roleErrors"
            required
          ></v-select>

          <v-row class="mt-1">
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
import generateToast from "../utils/generateToast.js";
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateAge,
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
      dob: null,
      dobErrors: [],
    };
  },
  watch: {
    username(newVal) {
      this.usernameErrors = validateUsername(newVal);
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
    dob(newVal) {
      this.dobErrors = validateAge(newVal);
    },
  },
  computed: {
    maxDate() {
      const today = new Date();
      return today.toISOString().substr(0, 10);
    },
  },
  methods: {
    async submitRegister() {
      this.usernameErrors = validateUsername(this.username);
      this.emailErrors = validateEmail(this.email);
      this.passwordErrors = validatePassword(this.password);
      this.roleErrors = this.selectedRole ? [] : ["Please select a role"];
      this.dobErrors = validateAge(this.dob);

      if (
        this.usernameErrors.length ||
        this.emailErrors.length ||
        this.passwordErrors.length ||
        this.roleErrors.length ||
        this.dobErrors.length
      ) {
        return;
      }

      try {
        const encryptedPassword = encryptPassword(this.password);

        await this.$store.dispatch("register", {
          username: this.username,
          email: this.email,
          password: encryptedPassword,
          dob: this.dob,
          role: this.selectedRole,
        });

        generateToast("Registered Successfully", "success");

        setTimeout(() => {
          this.$router.replace("/login");
        }, 2500);
      } catch (error) {
        generateToast(error.message, "error");
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
