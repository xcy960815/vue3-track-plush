import type { App } from 'vue';

import { TrackerCore } from './core/tracker';
import { createTrackDirective } from './directive';
import type { TrackPlushConfig } from './type';
import { normalizeCustomParams } from './utils/params';

export type {
  Cleanup,
  DirectiveTrackEntry,
  ExposureOptions,
  RequestConfig,
  TrackEntry,
  TrackEventType,
  TrackMethod,
  TrackParamsValue,
  TrackPayload,
  TrackPayloadData,
  TrackPlushConfig,
  TrackTransport,
} from './type';

const install = (app: App<HTMLElement>, trackPlushConfig: TrackPlushConfig): void => {
  app.directive('track', createTrackDirective(trackPlushConfig));
};

export const clickEvent = (trackPlushConfig: TrackPlushConfig): void => {
  new TrackerCore(trackPlushConfig).track('click', normalizeCustomParams('click', trackPlushConfig));
};

export const browseEvent = (trackPlushConfig: TrackPlushConfig): void => {
  new TrackerCore(trackPlushConfig).track('browse', normalizeCustomParams('browse', trackPlushConfig));
};

export const exposureEvent = (trackPlushConfig: TrackPlushConfig): void => {
  new TrackerCore(trackPlushConfig).track('exposure', normalizeCustomParams('exposure', trackPlushConfig));
};

export { install as vue3TrackPlush };

export default {
  install,
};
