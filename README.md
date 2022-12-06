### vue3-track-plush

[![npm](https://img.shields.io/npm/v/vue3-track-plush.svg)](https://www.npmjs.com/package/vue3-track-plush)
[![npm](https://img.shields.io/npm/dw/vue3-track-plush.svg)](https://npmtrends.com/vue3-track-plush)
[![npm](https://img.shields.io/npm/l/vue3-track-plush.svg?sanitize=true)](https://www.npmjs.com/package/vue3-track-plush)
[![vue2](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://vuejs.org/)

#### 一款基于 vue3 的埋点插件 支持自定埋点上报 支持自定义埋点上报

```npm
npm i vue3-track-plush -S
```

### 使用方法 一

```ts
// main.ts
// 指令埋点上报
import { createApp } from "vue";
import App from "./App.vue";
import Vue3TrackPlush from "vue3-track-plush";
const app = createApp(App);
app.use(Vue3TrackPlush, {
  baseURL: "<接口域名>", // 必填
  url: "<接口地址>", // 必填
  projectName: "项目名称", //选填
});
app.mount("#app");
```

```html
<template>
  <h2 align="center">vue3-track-plush 测试demo</h2>
  <div class="container">
    <div class="container-item">
      <h3 align="center">上报静态数据</h3>
      <h3>测试参数传递对象</h3>
      <div class="button-box" v-track:click="{ pageName: '页面名称' }">
        <button v-track:click="{ buttonName: '按钮名称' }">
          指令点击上报(参数是对象)
        </button>
      </div>
      <h3>测试参数传递字符串</h3>
      <div class="button-box" v-track:browse="example">
        <button v-track:click="'指令点击上报(参数是字符串)'">
          指令点击上报(参数是字符串)
        </button>
      </div>
    </div>
    <div class="container-item">
      <h3 align="center">上报动态数据</h3>
      <h3>测试点击动态数据上报</h3>
      <div class="button-box">
        <button @click="clickParams++">动态修改上报点击数据</button> ===》{{
        clickParams }}
        <button
          v-track:click="{
            buttonName: '点击的上报数据',
            currentNumber: clickParams,
          }"
        >
          上报点击数据
        </button>
      </div>
      <h3>测试浏览动态数据上报</h3>
      <div class="button-box">
        <button @click="browseParams++">动态修改浏览上报数据</button> ===》 {{
        browseParams }}
        <button
          v-track:browse="{
            buttonName: '浏览的上报数据',
            currentNumber: browseParams,
          }"
        >
          上报浏览数据
        </button>
      </div>
    </div>
    <div class="container-item">
      <h3 align="center">自定义上报数据</h3>
      <h3>自定义点击上报</h3>
      <div class="button-box">
        <button @click="customClickReport">自定义点击上报</button>
        {{ clickNumber }}
      </div>
      <h3>自定义浏览上报</h3>
      <div class="button-box">
        <button @click="customBrowseReport">自定义浏览上报</button>
        {{ browseNumber }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { browseEvent, clickEvent } from "vue3-track-plush";
  import { ref } from "vue";
  const browseParams = ref(0);
  const clickParams = ref(0);
  const clickNumber = ref(0);
  const browseNumber = ref(0);

  // 自定义点击上报
  const customClickReport = () => {
    clickEvent({
      baseURL: "host",
      url: "/api/action/record",
      projectName: "测试开发",
      buttonName: "自定义点击上报",
      param1: "参数1",
      param2: "参数2",
      paramN: "参数n",
      clickNumber: clickNumber.value,
    });
    clickNumber.value++;
  };
  // 自定义浏览上报
  const customBrowseReport = () => {
    browseEvent({
      baseURL: "host",
      url: "/api/action/record",
      projectName: "测试开发",
      pageName: "自定义浏览上报",
      param1: "参数1",
      param2: "参数2",
      paramN: "参数n",
      browseNumber: browseNumber.value,
    });
    browseNumber.value++;
  };
</script>
<style lang="less" scoped>
  .container {
    display: flex;
    .container-item {
      flex: 1;
      margin: 0 20px;
      .button-box {
        margin-bottom: 10px;
        background-color: aqua;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        button {
          margin: 0 10px;
        }
      }
    }
  }
</style>
```
