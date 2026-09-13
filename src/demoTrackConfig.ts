import type { TrackPlushConfig, TrackTransport } from '../plugin';

import { defaultTransport } from '../plugin/transport';
import { recordTrackPayload } from './demoEventLog';

/**
 * 演示专用 transport：先记录 payload 供页面事件日志展示，
 * 再走内置 transport。debug 模式下内置 transport 只打印不请求，行为不变。
 */
const demoTransport: TrackTransport = {
  send(requestConfig) {
    recordTrackPayload(requestConfig.data);
    return defaultTransport.send(requestConfig);
  },
};

export const demoTrackConfig = {
  baseURL: '/track-api',
  url: '/action/record',
  projectName: 'vue3-track-plush-demo',
  exposureDuration: 300,
  debug: true,
  transport: demoTransport,
} satisfies TrackPlushConfig;
