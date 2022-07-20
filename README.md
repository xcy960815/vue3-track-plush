### vue3-track-plush 
#### 一款基于vue3的埋点插件 支持自定埋点上报 支持自定义埋点上报

```npm
npm i vue3-track-plush -S
```

or

```npm
yarn add vue3-track-plush 
```


### 使用方法 一
```ts
// main.ts
// 指令埋点上报
import { createApp } from "vue";
import App from "./App.vue";
import Vue3TrackPlush from "vue3-track-plush"
const app = createApp(App)
app.use(Vue3TrackPlush, {
    baseURL: "<接口域名>", // 必填
    url: "<接口地址>", // 必填
    projectName: "项目名称" //选填
})
app.mount("#app");
```
```html
<!-- 测试参数传递对象 -->
<div class='example' v-track:browse :track-params="{ name: 'testName', pageName: 'pageName' }">
    <button v-track:click :track-params="{ buttonName: '指令点击上报(参数是对象)' }">指令点击上报(参数是对象)</button>
</div>
<!-- 测试参数传递字符串 -->
<div class='example' v-track:browse track-params="example">
    <button v-track:click track-params="指令点击上报(参数是字符串)">指令点击上报(参数是字符串)</button>
</div>
```

### 使用方法二

```ts
<script lang='ts' setup>
import { browseEvent, clickEvent } from "vue3-track-plush"
// 自定义点击上报
const customClickReport = () => {
    clickEvent({
        baseURL: "<接口域名>",
        url: "<接口地址>",
        projectName: "测试开发",
        buttonName: "按钮名称",
        param1: "参数1",
        param2: "参数2",
        ...
        paramN:"参数n"
    })
}
// 自定义浏览上班
const customBrowseReport = () => {
    browseEvent({
        baseURL: "<接口域名>",
        url: "<接口地址>",
        projectName: "测试开发",
        pageName: "页面名称",
        param1: "参数1",
        param2: "参数2",
        ...
        paramN:"参数n"
    })
}
</script>
```
