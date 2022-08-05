import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/tailwind.css";
import "./assets/tailwind.css";
import { state } from "@/store/store";
import "./registerServiceWorker";

createApp(App).use(store).use(router).provide("State", state).mount("#app");
