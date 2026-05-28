import type { DirectiveBinding, VNode } from 'vue';

import { TrackerCore } from '../core/tracker';
import type { TrackDirectiveContext, TrackParamsValue, TrackPlushConfig } from '../type';
import { mountBrowseDirective } from './browse';
import { cleanupElement } from './cleanup';
import { mountClickDirective } from './click';
import { mountExposureDirective } from './exposure';

const TRACK_EVENT_TYPES = ['click', 'browse', 'exposure'] as const;

const resolveDirectiveEvents = (arg?: string): Array<(typeof TRACK_EVENT_TYPES)[number]> => {
  if (!arg) return [];

  return arg
    .split('|')
    .map((item) => item.trim())
    .filter((item): item is (typeof TRACK_EVENT_TYPES)[number] => {
      return TRACK_EVENT_TYPES.includes(item as (typeof TRACK_EVENT_TYPES)[number]);
    });
};

export const createTrackDirective = (config: TrackPlushConfig) => {
  const tracker = new TrackerCore(config);

  return {
    mounted(
      el: HTMLElement,
      binding: DirectiveBinding<TrackParamsValue | undefined>,
      vnode: VNode,
    ) {
      const context: TrackDirectiveContext = { el, binding, vnode };

      resolveDirectiveEvents(binding.arg).forEach((eventType) => {
        if (eventType === 'click') mountClickDirective(tracker, context);
        if (eventType === 'browse') mountBrowseDirective(tracker, context);
        if (eventType === 'exposure') mountExposureDirective(tracker, context, config);
      });
    },
    unmounted(el: HTMLElement) {
      cleanupElement(el);
    },
  };
};

