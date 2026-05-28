import { createApp } from 'vue';

import Vue3TrackPlush from '../plugin';
import App from './App.vue';
import { router } from './router';

const app = createApp(App);

app.use(router);
app.use(Vue3TrackPlush, {
  baseURL: '/track-api',
  url: '/action/record',
  projectName: 'vue3-track-plush-demo',
  exposureDuration: 300,
});

app.mount('#app');
