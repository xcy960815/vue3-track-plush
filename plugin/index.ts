import type { App, DirectiveBinding, VNode } from 'vue';

import { BrowseTrack } from './browse';
import { ClickTrack } from './click';
import { ExposureTrack } from './exposure';
import type { TrackPlushConfig, TrackParamsValue } from './type';

export type {
  DirectiveTrackEntry,
  RequestConfig,
  TrackEntry,
  TrackMethod,
  TrackParamsValue,
  TrackPayload,
  TrackPlushConfig,
} from './type';

const CLICK_EVENT = 'click';
const BROWSE_EVENT = 'browse';
const EXPOSURE_EVENT = 'exposure';

const resolveDirectiveEvents = (arg?: string): string[] => {
  if (!arg) return [];
  return arg.split('|').map((item) => item.trim()).filter(Boolean);
};

const install = (app: App<HTMLElement>, trackPlushConfig: TrackPlushConfig): void => {
  app.directive('track', {
    mounted(
      el: HTMLElement,
      binding: DirectiveBinding<TrackParamsValue | undefined>,
      vnode: VNode,
    ) {
      resolveDirectiveEvents(binding.arg).forEach((eventName) => {
        if (eventName === CLICK_EVENT) {
          new ClickTrack(trackPlushConfig).handleClickEvent({
            el,
            binding,
            vnode,
            type: 'instruction',
          });
        }

        if (eventName === BROWSE_EVENT) {
          new BrowseTrack(trackPlushConfig).handleBrowseEvent({
            binding,
            vnode,
            type: 'instruction',
          });
        }

        if (eventName === EXPOSURE_EVENT) {
          new ExposureTrack(trackPlushConfig).handleExposureEvent({
            el,
            binding,
            vnode,
            type: 'instruction',
          });
        }
      });
    },
  });
};

export const clickEvent = (trackPlushConfig: TrackPlushConfig): void => {
  new ClickTrack(trackPlushConfig).handleClickEvent({
    ...trackPlushConfig,
    type: 'customize',
  });
};

export const browseEvent = (trackPlushConfig: TrackPlushConfig): void => {
  new BrowseTrack(trackPlushConfig).handleBrowseEvent({
    ...trackPlushConfig,
    type: 'customize',
  });
};

export const exposureEvent = (trackPlushConfig: TrackPlushConfig): void => {
  new ExposureTrack(trackPlushConfig).handleExposureEvent({
    ...trackPlushConfig,
    type: 'customize',
  });
};

export { install as vue3TrackPlush };

export default {
  install,
};
