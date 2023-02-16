import { createApp, type App } from "vue";
import AppVue from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./assets/main.css";
import { projectAuth } from "./firebase/config";

let app: App<Element>;

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(AppVue);
    app.use(router);
    app.mount("#app");
  }
});
