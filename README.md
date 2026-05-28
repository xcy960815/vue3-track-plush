# vue3-track-plush

一款基于 Vue 3 自定义指令的埋点统计插件，支持点击、浏览、曝光的指令埋点和手动埋点上报。

```npm
npm i vue3-track-plush -S
```

or

```npm
yarn add vue3-track-plush
```

## 插件注册

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import Vue3TrackPlush from 'vue3-track-plush';

const app = createApp(App);

app.use(Vue3TrackPlush, {
  baseURL: '<接口域名>',
  url: '<接口地址>',
  projectName: '项目名称',
  exposureThreshold: 0.5,
});

app.mount('#app');
```

## 指令埋点

```html
<!-- 参数传递对象 -->
<div class="example" v-track:browse :track-params="{ name: 'testName', pageName: 'pageName' }">
  <button v-track:click :track-params="{ buttonName: '指令点击上报(参数是对象)' }">
    指令点击上报（参数是对象）
  </button>
</div>

<!-- 参数传递字符串 -->
<div class="example" v-track:browse track-params="example">
  <button v-track:click track-params="指令点击上报(参数是字符串)">
    指令点击上报（参数是字符串）
  </button>
</div>

<!-- 曝光埋点：元素进入视口达到 exposureThreshold 后上报一次 -->
<div v-track:exposure :track-params="{ exposureName: '曝光区域', moduleName: 'banner' }">
  曝光埋点区域
</div>
```

## 手动埋点

```ts
import { browseEvent, clickEvent, exposureEvent } from 'vue3-track-plush';

const customClickReport = () => {
  clickEvent({
    baseURL: '<接口域名>',
    url: '<接口地址>',
    projectName: '测试开发',
    buttonName: '按钮名称',
    param1: '参数1',
  });
};

const customBrowseReport = () => {
  browseEvent({
    baseURL: '<接口域名>',
    url: '<接口地址>',
    projectName: '测试开发',
    pageName: '页面名称',
    param1: '参数1',
  });
};

const customExposureReport = () => {
  exposureEvent({
    baseURL: '<接口域名>',
    url: '<接口地址>',
    projectName: '测试开发',
    exposureName: '曝光区域名称',
    param1: '参数1',
  });
};
```

## 开发

```bash
pnpm install
pnpm dev
pnpm build
```
