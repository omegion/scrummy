import { createApp, ref } from "vue";
import App from "./App.vue";
import VueSocketIOExt from "vue-socket.io-extended";
import socketIO from "socket.io-client";

import router from "./router";
import store from "./store";

import "./assets/style.css";

const port = process.env.PORT || 3000;

const app = createApp(App);
const socket = socketIO(`:${port}`, {
  secure: true,
  transports: ["websocket", "polling"],
});

app.use(router);
app.use(store);
app.use(VueSocketIOExt, socket, { store: store });

app.mount("#app");
