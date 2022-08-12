import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/tailwind.css";
import "./assets/tailwind.css";
import { state } from "@/store/store";
import "./registerServiceWorker";

createApp(App).use(router).provide("State", state).mount("#app");
