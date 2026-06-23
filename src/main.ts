import { createApp } from 'vue';

import Vue3TrackPlush from '../plugin';
import App from './App.vue';
import { demoTrackConfig } from './demoTrackConfig';
import { router } from './router';

const app = createApp(App);

app.use(router);
app.use(Vue3TrackPlush, demoTrackConfig);

app.mount('#app');
