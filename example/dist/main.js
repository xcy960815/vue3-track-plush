"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
var vue3_track_plush_1 = require("vue3-track-plush");
var app = vue_1.createApp(App_vue_1["default"]);
app.use(vue3_track_plush_1["default"], {
    baseURL: "<接口域名>",
    url: "<接口地址>",
    projectName: "项目名称"
});
app.mount("#app");
