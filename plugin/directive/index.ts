import type { DirectiveBinding, VNode } from 'vue';

import { TrackerCore } from '../core/tracker';
import type { TrackDirectiveContext, TrackParamsValue, TrackPlushConfig } from '../type';
import { getDirectiveTrackParams, normalizeConfig } from '../utils/params';
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

const stringifyValue = (value: unknown): string => {
  try {
    return JSON.stringify(value);
  } catch (_error) {
    return '';
  }
};

export const createTrackDirective = (config: TrackPlushConfig) => {
  const normalizedConfig = normalizeConfig(config);
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
        if (eventType === 'exposure') mountExposureDirective(tracker, context, normalizedConfig);
      });
    },
    updated(
      el: HTMLElement,
      binding: DirectiveBinding<TrackParamsValue | undefined>,
      vnode: VNode,
    ) {
      const events = resolveDirectiveEvents(binding.arg);
      if (!events.length) return;

      const valueChanged = stringifyValue(binding.value) !== stringifyValue(binding.oldValue);
      if (!valueChanged) return;

      const context: TrackDirectiveContext = { el, binding, vnode };

      if (events.includes('browse')) {
        tracker.track('browse', getDirectiveTrackParams('browse', context));
      }

      if (events.includes('click') || events.includes('exposure')) {
        cleanupElement(el);
        if (events.includes('click')) mountClickDirective(tracker, context);
        if (events.includes('exposure')) mountExposureDirective(tracker, context, normalizedConfig);
      }
    },
    unmounted(el: HTMLElement) {
      cleanupElement(el);
    },
  };
};
