# Install

`vue3-track-plush` targets Vue 3 browser applications and works especially well when you want a directive-led tracking setup without bringing in a heavier analytics SDK.

## Package manager

```bash
pnpm add vue3-track-plush
```

```bash
npm install vue3-track-plush
```

```bash
yarn add vue3-track-plush
```

## Quick start

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

## Directive example

```vue
<template>
  <section v-track:browse="{ pageName: 'Home' }">
    <button v-track:click="{ buttonName: 'Create order', moduleName: 'checkout' }">
      Create order
    </button>
  </section>
</template>
```

## Runtime notes

- Vue `^3.2.13`
- Browser environment with `IntersectionObserver` support for exposure tracking
- TypeScript declarations are published with the package
- For Vue 2.7 projects, use [`vue-track-plush`](https://www.npmjs.com/package/vue-track-plush)
