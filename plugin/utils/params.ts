import type { TrackDirectiveContext, TrackEventType, TrackParamsValue } from '../type';
import { getTrackEventDefinition } from '../core/event';

const SYSTEM_PARAM_KEYS = new Set([
  'baseURL',
  'exposureDuration',
  'exposureOnce',
  'exposureRoot',
  'exposureRootMargin',
  'exposureThreshold',
  'method',
  'transport',
  'type',
  'url',
]);

export const normalizeParams = (
  eventType: TrackEventType,
  params: TrackParamsValue | Record<string, unknown> | undefined,
): Record<string, unknown> => {
  if (typeof params === 'string') {
    const eventDefinition = getTrackEventDefinition(eventType);
    return { [eventDefinition.meta.stringParamKey]: params };
  }

  return params || {};
};

export const getDirectiveTrackParams = (
  eventType: TrackEventType,
  context: Pick<TrackDirectiveContext, 'binding' | 'vnode'>,
): Record<string, unknown> => {
  const bindingValue = context.binding.value;
  if (bindingValue !== undefined) return normalizeParams(eventType, bindingValue);

  const props = context.vnode.props;
  const trackParams = props?.['track-params'] || props?.trackParams;

  return normalizeParams(eventType, trackParams as TrackParamsValue | undefined);
};

export const normalizeCustomParams = (
  eventType: TrackEventType,
  params: Record<string, unknown>,
): Record<string, unknown> => {
  const normalizedParams = normalizeParams(eventType, params);

  return Object.entries(normalizedParams).reduce<Record<string, unknown>>((result, [key, value]) => {
    if (!SYSTEM_PARAM_KEYS.has(key)) result[key] = value;
    return result;
  }, {});
};

