import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import "./editorWorker?worker";

createApp(App).mount("#app");
