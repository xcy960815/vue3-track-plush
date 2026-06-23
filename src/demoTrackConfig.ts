import type { TrackPlushConfig } from '../plugin';

export const demoTrackConfig = {
  baseURL: '/track-api',
  url: '/action/record',
  projectName: 'vue3-track-plush-demo',
  exposureDuration: 300,
  debug: true,
} satisfies TrackPlushConfig;
