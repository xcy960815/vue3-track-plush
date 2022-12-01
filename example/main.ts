
import { createApp } from "vue";
// @ts-ignore
import App from "./App.vue";
import Vue3TrackPlush from "vue3-track-plush"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)

app.use(ElementPlus)

app.use(Vue3TrackPlush, {
    baseURL: "http://d.daily.vdian.net",
    url: "/api/action/record",
    projectName: "项目名称",
})
app.mount("#app");