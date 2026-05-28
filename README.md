# vue3-track-plush

[中文文档](./README.zh-CN.md)

A lightweight Vue 3 tracking plugin based on custom directives. It supports page view, click, and exposure tracking through directives and manual reporting APIs.

## Features

- Vue 3 plugin with a single `v-track` directive.
- Supports `click`, `browse`, and `exposure` events.
- Manual APIs: `clickEvent`, `browseEvent`, and `exposureEvent`.
- Exposure tracking based on `IntersectionObserver`.
- Configurable exposure options: `threshold`, `duration`, `once`, `root`, and `rootMargin`.
- Exposure queue with batch flush, interval flush, local storage cache, and page-leave flush.
- Pluggable transport layer.
- Debug mode for local development.
- Default transport uses `navigator.sendBeacon`, then falls back to `fetch` and `XMLHttpRequest`.
- TypeScript declarations included.
- Vite based demo and library build.

## Installation

```bash
pnpm add vue3-track-plush
```

```bash
npm install vue3-track-plush
```

```bash
yarn add vue3-track-plush
```

## Quick Start

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

## Directive Usage

Use the directive argument to choose the event type.

```vue
<template>
  <section v-track:browse="{ pageName: 'Home' }">
    <button v-track:click="{ buttonName: 'Create order' }">
      Create order
    </button>
  </section>
</template>
```

### Click Tracking

```vue
<button v-track:click="{ buttonName: 'Save', moduleName: 'profile' }">
  Save
</button>
```

String values are mapped to `buttonName`.

```vue
<button v-track:click="'Save profile'">Save</button>
```

### Browse Tracking

Browse events are reported when the bound element is mounted.

```vue
<section v-track:browse="{ pageName: 'Product detail', productId: '10001' }">
  Product detail
</section>
```

String values are mapped to `pageName`.

```vue
<section v-track:browse="'Product detail'">Product detail</section>
```

### Exposure Tracking

Exposure events are reported when the element enters the viewport and matches the configured exposure options.

```vue
<div v-track:exposure="{ exposureName: 'Hero banner', moduleName: 'home' }">
  Hero banner
</div>
```

Per-element exposure options can override global options.

```vue
<div
  v-track:exposure="{
    exposureName: 'Pricing card',
    threshold: 0.75,
    duration: 1000,
    once: true
  }"
>
  Pricing card
</div>
```

### Legacy `track-params`

The plugin still supports the previous `track-params` syntax for compatibility.

```vue
<button v-track:click track-params="Legacy button">Legacy button</button>

<button
  v-track:click
  :track-params="{ buttonName: 'Legacy object button', moduleName: 'legacy' }"
>
  Legacy object button
</button>
```

## Manual Reporting

```ts
import { browseEvent, clickEvent, exposureEvent } from 'vue3-track-plush';

clickEvent({
  baseURL: 'https://example.com',
  url: '/api/track',
  projectName: 'example-app',
  buttonName: 'Create order',
  moduleName: 'order',
});

browseEvent({
  baseURL: 'https://example.com',
  url: '/api/track',
  projectName: 'example-app',
  pageName: 'Order detail',
  orderId: '10001',
});

exposureEvent({
  baseURL: 'https://example.com',
  url: '/api/track',
  projectName: 'example-app',
  exposureName: 'Promotion banner',
  moduleName: 'home',
});
```

## Configuration

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
  exposureQueueMaxSize: 20,
  exposureQueueFlushInterval: 2000,
  exposureQueueStorageKey: 'vue3-track-plush:exposure-queue',
  debug: import.meta.env.DEV,
});
```

| Option | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `baseURL` | `string` | Yes | - | API origin or base path. |
| `url` | `string` | Yes | - | Tracking endpoint path. |
| `projectName` | `string` | Yes | - | Project identifier sent with every event. |
| `method` | `'GET' \| 'POST'` | No | `'POST'` | Request method. |
| `pageUrl` | `string` | No | `window.location.href` | Page URL override. |
| `userAgent` | `string` | No | `navigator.userAgent` | User agent override. |
| `exposureThreshold` | `number` | No | `0.5` | Default visible ratio for exposure tracking. |
| `exposureDuration` | `number` | No | `0` | Default visible duration in milliseconds before reporting exposure. |
| `exposureOnce` | `boolean` | No | `true` | Whether an exposure element should report only once. |
| `exposureRoot` | `Element \| Document \| null` | No | `null` | Default `IntersectionObserver` root. |
| `exposureRootMargin` | `string` | No | `'0px'` | Default `IntersectionObserver` root margin. |
| `exposureQueueMaxSize` | `number` | No | `20` | Maximum queued exposure events before an immediate flush. |
| `exposureQueueFlushInterval` | `number` | No | `2000` | Exposure queue flush interval in milliseconds. |
| `exposureQueueStorageKey` | `string` | No | `'vue3-track-plush:exposure-queue'` | Local storage key for pending exposure events. |
| `exposureQueueStorage` | `Storage` | No | `window.localStorage` | Custom storage for pending exposure events. |
| `debug` | `boolean` | No | `false` | Print tracking payload JSON to the console and skip network requests. |
| `transport` | `TrackTransport` | No | built-in transport | Custom reporting transport. |

## Event Payload

Every event includes the base context fields and any custom parameters you pass.

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

Click and browse events are sent immediately. Exposure events are queued and flushed as a batch. Therefore `requestConfig.data` in a custom transport may be either a single payload or an array of payloads.

```ts
type RequestData = TrackPayload | TrackPayload[];
```

## Custom Transport

Use a custom transport when you need to integrate with an existing request client, add signatures, or change retry behavior.

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

## Debug Mode

Enable `debug` during local development to inspect tracking payloads without sending network requests. When `debug` is `true`, the built-in transport prints JSON to the console and does not call `sendBeacon`, `fetch`, or `XMLHttpRequest`.

```ts
app.use(Vue3TrackPlush, {
  baseURL: '/track-api',
  url: '/action/record',
  projectName: 'example-app',
  debug: import.meta.env.DEV,
});
```

Console output:

```json
{
  "userAgent": "...",
  "pageUrl": "http://localhost:5173/#/basic",
  "projectName": "example-app",
  "actionType": "点击事件",
  "buttonName": "Create order"
}
```

## Demo

The repository includes a Vite demo with route-based cases:

- Basic directive tracking.
- Legacy `track-params` compatibility.
- Exposure tracking options.
- Manual reporting APIs.

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

The build outputs:

- `dist/vue3-track-plush.esm.js`
- `dist/vue3-track-plush.umd.js`
- `types/vue3-track-plush.d.ts`

## Development

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm build
```

## Browser Support

Exposure tracking uses `IntersectionObserver`. If `IntersectionObserver` is not available, exposure events are reported immediately when the directive is mounted.

## License

MIT
