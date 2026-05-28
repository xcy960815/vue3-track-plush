# vue3-track-plush

[English](./README.md)

一个基于 Vue 3 自定义指令的轻量级埋点插件，支持通过指令和手动 API 上报浏览、点击、曝光事件。

## 特性

- Vue 3 插件，统一使用 `v-track` 指令。
- 支持 `click`、`browse`、`exposure` 三类事件。
- 支持手动 API：`clickEvent`、`browseEvent`、`exposureEvent`。
- 曝光埋点基于 `IntersectionObserver`。
- 曝光参数可配置：`threshold`、`duration`、`once`、`root`、`rootMargin`。
- 支持自定义上报 transport。
- 默认上报优先使用 `navigator.sendBeacon`，然后回退到 `fetch` 和 `XMLHttpRequest`。
- 内置 TypeScript 类型声明。
- 使用 Vite 作为 demo 和库构建工具。

## 安装

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

## 指令用法

通过指令参数声明事件类型。

```vue
<template>
  <section v-track:browse="{ pageName: '首页' }">
    <button v-track:click="{ buttonName: '创建订单' }">
      创建订单
    </button>
  </section>
</template>
```

### 点击埋点

```vue
<button v-track:click="{ buttonName: '保存', moduleName: 'profile' }">
  保存
</button>
```

字符串参数会被映射为 `buttonName`。

```vue
<button v-track:click="'保存资料'">保存</button>
```

### 浏览埋点

浏览埋点会在绑定元素挂载时上报。

```vue
<section v-track:browse="{ pageName: '商品详情', productId: '10001' }">
  商品详情
</section>
```

字符串参数会被映射为 `pageName`。

```vue
<section v-track:browse="'商品详情'">商品详情</section>
```

### 曝光埋点

曝光埋点会在元素进入视口，并满足曝光配置后上报。

```vue
<div v-track:exposure="{ exposureName: '首页 Banner', moduleName: 'home' }">
  首页 Banner
</div>
```

单个元素可以覆盖全局曝光配置。

```vue
<div
  v-track:exposure="{
    exposureName: '价格卡片',
    threshold: 0.75,
    duration: 1000,
    once: true
  }"
>
  价格卡片
</div>
```

### 兼容 `track-params`

插件仍兼容旧版本的 `track-params` 写法。

```vue
<button v-track:click track-params="旧写法按钮">旧写法按钮</button>

<button
  v-track:click
  :track-params="{ buttonName: '旧写法对象按钮', moduleName: 'legacy' }"
>
  旧写法对象按钮
</button>
```

## 手动上报

```ts
import { browseEvent, clickEvent, exposureEvent } from 'vue3-track-plush';

clickEvent({
  baseURL: 'https://example.com',
  url: '/api/track',
  projectName: 'example-app',
  buttonName: '创建订单',
  moduleName: 'order',
});

browseEvent({
  baseURL: 'https://example.com',
  url: '/api/track',
  projectName: 'example-app',
  pageName: '订单详情',
  orderId: '10001',
});

exposureEvent({
  baseURL: 'https://example.com',
  url: '/api/track',
  projectName: 'example-app',
  exposureName: '促销 Banner',
  moduleName: 'home',
});
```

## 配置项

```ts
app.use(Vue3TrackPlush, {
  baseURL: 'https://example.com',
  url: '/api/track',
  projectName: 'example-app',
  method: 'POST',
  pageUrl: window.location.href,
  userAgent: navigator.userAgent,
  exposureThreshold: 0.5,
  exposureDuration: 0,
  exposureOnce: true,
  exposureRoot: null,
  exposureRootMargin: '0px',
});
```

| 配置 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `baseURL` | `string` | 是 | - | 接口域名或基础路径。 |
| `url` | `string` | 是 | - | 埋点上报接口路径。 |
| `projectName` | `string` | 是 | - | 项目标识，每次上报都会携带。 |
| `method` | `'GET' \| 'POST'` | 否 | `'POST'` | 请求方法。 |
| `pageUrl` | `string` | 否 | `window.location.href` | 页面地址覆盖值。 |
| `userAgent` | `string` | 否 | `navigator.userAgent` | 用户代理覆盖值。 |
| `exposureThreshold` | `number` | 否 | `0.5` | 默认曝光可见比例。 |
| `exposureDuration` | `number` | 否 | `0` | 默认曝光停留时长，单位毫秒。 |
| `exposureOnce` | `boolean` | 否 | `true` | 曝光元素是否只上报一次。 |
| `exposureRoot` | `Element \| Document \| null` | 否 | `null` | 默认 `IntersectionObserver` root。 |
| `exposureRootMargin` | `string` | 否 | `'0px'` | 默认 `IntersectionObserver` rootMargin。 |
| `transport` | `TrackTransport` | 否 | 内置 transport | 自定义上报实现。 |

## 上报数据

每次上报都会包含基础上下文字段，以及你传入的自定义参数。

```ts
{
  userAgent: string;
  pageUrl: string;
  projectName: string;
  actionType: '点击事件' | '浏览事件' | '曝光事件';
  buttonName?: string;
  pageName?: string;
  exposureName?: string;
  [key: string]: unknown;
}
```

## 自定义上报

当你需要接入已有请求库、增加签名或调整重试策略时，可以传入自定义 transport。

```ts
import Vue3TrackPlush, { type TrackTransport } from 'vue3-track-plush';

const transport: TrackTransport = {
  send(requestConfig) {
    return fetch(`${requestConfig.baseURL}${requestConfig.url}`, {
      method: requestConfig.method || 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(requestConfig.data),
      credentials: 'include',
      keepalive: true,
    });
  },
};

app.use(Vue3TrackPlush, {
  baseURL: 'https://example.com',
  url: '/api/track',
  projectName: 'example-app',
  transport,
});
```

## Demo

仓库内置了基于 Vite 和 Vue Router 的 demo，包含以下测试页面：

- 基础指令埋点。
- 旧版 `track-params` 兼容。
- 曝光配置。
- 手动上报 API。

```bash
pnpm install
pnpm dev
```

## 构建

```bash
pnpm build
```

构建产物：

- `dist/vue3-track-plush.esm.js`
- `dist/vue3-track-plush.umd.js`
- `types/vue3-track-plush.d.ts`

## 开发

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm build
```

## 浏览器兼容

曝光埋点依赖 `IntersectionObserver`。如果当前浏览器不支持 `IntersectionObserver`，曝光事件会在指令挂载时立即上报。

## License

MIT

