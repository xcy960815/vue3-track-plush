import { createApp } from 'vue';

import Vue3TrackPlush from '../plugin';
import App from './App.vue';

const app = createApp(App);

app.use(Vue3TrackPlush, {
  baseURL: '/track-api',
  url: '/action/record',
  projectName: 'vue3-track-plush-demo',
});

app.mount('#app');

