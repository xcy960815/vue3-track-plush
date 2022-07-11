
import { createApp } from "vue";
import App from "./App.vue";
import Vue3TrackPlush from "vue3-track-plush"
const app = createApp(App)
app.use(Vue3TrackPlush, {
    baseURL: "http://d.vdian.net",
    url: "/api/action/record"
})
app.mount("#app");