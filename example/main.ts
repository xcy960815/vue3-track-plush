
import { createApp } from "vue";
import App from "./App.vue";
import rollupVue3TsTemplate from "rollup-vue3-ts-template"
const app = createApp(App)
app.use(rollupVue3TsTemplate)
app.mount("#app");