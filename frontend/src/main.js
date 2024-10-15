import { createApp } from "vue";
import App from "./App.vue";
import "vue3-toastify/dist/index.css";
import router from "./router/index.js";
import store from "./store/index.js";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VDateInput } from "vuetify/lib/labs/components.mjs";
import "./assets/style.css";

const vuetify = createVuetify({
  components: {
    ...components,
    VDateInput,
  },
  directives,
});

const app = createApp(App);

app.use(vuetify).use(store);

app.use(router);

app.mount("#app");
