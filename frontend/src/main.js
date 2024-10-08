import { createApp } from "vue";
import App from "./App.vue";
import "vue3-toastify/dist/index.css";
import router from "./router/index.js";
import store from "./store/index.js";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(vuetify).use(store).use(router);

app.mount("#app");
