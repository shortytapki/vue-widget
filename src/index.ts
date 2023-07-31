import { createApp } from "vue";
import { createVuetify } from "vuetify";
import { createPinia } from "pinia";
import App from "./app/App.vue";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});
const app = createApp(App);

app.use(createPinia());
app.use(vuetify);
app.mount("#widget");
