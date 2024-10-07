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
import "vue3-toastify/dist/index.css";

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
      this.usernameErrors = newVal ? [] : ["Username is required."];
    },
    email(newVal) {
      this.emailErrors = this.validateEmail(newVal);
    },
    password(newVal) {
      this.passwordErrors = this.validatePassword(newVal);
    },
    selectedRole(newVal) {
      this.roleErrors = newVal ? [] : ["Role is required."];
    },
  },
  methods: {
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const errors = [];
      if (!email) {
        errors.push("Email is required.");
      } else if (!emailRegex.test(email)) {
        errors.push("Email must be a valid email address.");
      }
      return errors;
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

    async submitRegister() {
      this.usernameErrors = this.username ? [] : ["Username is required."];
      this.emailErrors = this.validateEmail(this.email);
      this.passwordErrors = this.validatePassword(this.password);
      this.roleErrors = this.selectedRole ? [] : ["Role is required."];

      if (
        this.usernameErrors.length ||
        this.emailErrors.length ||
        this.passwordErrors.length ||
        this.roleErrors.length
      ) {
        toast.error("Please enter all the values correctly", {
          autoClose: 1500,
          type: "error",
          position: "bottom-center",
        });
        return;
      }

      try {
        await this.$store.dispatch("register", {
          username: this.username,
          email: this.email,
          password: this.password,
          role: this.selectedRole,
        });

        toast.success("Registered Successfully", {
          autoClose: 1500,
          type: "success",
          position: "bottom-center",
        });

        setTimeout(() => {
          this.$router.push("/login");
        }, 1500);
      } catch (error) {
        toast.error(error.message, {
          autoClose: 1500,
          type: "error",
          position: "bottom-center",
        });
      }
    },

    goToLogin() {
      this.$router.push("/login");
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
