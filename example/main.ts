
import { createApp } from "vue";
import App from "./App.vue";
import Vue3TrackPlush from "vue3-track-plush"
const app = createApp(App)
app.use(Vue3TrackPlush, {
    // baseURL: <上报域名>,
    // url: <上报地址>
})
app.mount("#app");