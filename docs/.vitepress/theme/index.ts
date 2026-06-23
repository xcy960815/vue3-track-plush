import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';

import Vue3TrackPlush from '../../../plugin';
import { demoTrackConfig } from '../../../src/demoTrackConfig';
import DocsEmbeddedDemo from '../../../src/docs/EmbeddedDemo.vue';

import './style.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(Vue3TrackPlush, demoTrackConfig);
    app.component('DocsEmbeddedDemo', DocsEmbeddedDemo);
  },
} satisfies Theme;
