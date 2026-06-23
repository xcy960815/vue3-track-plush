# 安装

`vue3-track-plush` 面向 Vue 3 浏览器应用，适合希望用“自定义指令优先”的方式快速接入前端埋点的场景。

## 包管理器安装

```bash
pnpm add vue3-track-plush
```

```bash
npm install vue3-track-plush
```

```bash
yarn add vue3-track-plush
```

## 快速开始

```ts
import { createApp } from 'vue';
import App from './App.vue';
import Vue3TrackPlush from 'vue3-track-plush';

const app = createApp(App);

app.use(Vue3TrackPlush, {
  baseURL: 'https://example.com',
  url: '/api/track',
  projectName: 'example-app',
});

app.mount('#app');
```

## 指令示例

```vue
<template>
  <section v-track:browse="{ pageName: '首页' }">
    <button v-track:click="{ buttonName: '创建订单', moduleName: 'checkout' }">
      创建订单
    </button>
  </section>
</template>
```

## 运行环境说明

- Vue `^3.2.13`
- 曝光埋点依赖浏览器提供 `IntersectionObserver`
- npm 包已包含 TypeScript 类型声明
- 如果你在 Vue 2.7 项目中使用，请改用 [`vue-track-plush`](https://www.npmjs.com/package/vue-track-plush)
