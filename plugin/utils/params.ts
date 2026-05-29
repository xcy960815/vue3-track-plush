import type {
  NormalizedTrackPlushConfig,
  TrackDirectiveContext,
  TrackEventType,
  TrackParamsValue,
  TrackPlushConfig,
} from '../type';
import { getTrackEventDefinition } from '../core/event';

const DEFAULT_EXPOSURE_THRESHOLD = 0.5;
const DEFAULT_EXPOSURE_DURATION = 0;
const DEFAULT_EXPOSURE_ONCE = true;
const DEFAULT_EXPOSURE_ROOT = null;
const DEFAULT_EXPOSURE_ROOT_MARGIN = '0px';
const DEFAULT_EXPOSURE_QUEUE_MAX_SIZE = 20;
const DEFAULT_EXPOSURE_QUEUE_FLUSH_INTERVAL = 2000;
const DEFAULT_EXPOSURE_QUEUE_STORAGE_KEY = 'vue3-track-plush:exposure-queue';

const SYSTEM_PARAM_KEYS = new Set([
  'baseURL',
  'debug',
  'exposure',
  'exposureDuration',
  'exposureOnce',
  'exposureQueueFlushInterval',
  'exposureQueueMaxSize',
  'exposureQueueStorage',
  'exposureQueueStorageKey',
  'exposureRoot',
  'exposureRootMargin',
  'exposureThreshold',
  'headers',
  'method',
  'queue',
  'retry',
  'retryDelay',
  'timeout',
  'transport',
  'type',
  'url',
  'withCredentials',
]);

const getNumberOption = (value: unknown): number | undefined => {
  if (typeof value !== 'number' || Number.isNaN(value)) return undefined;
  return value;
};

const getPositiveNumberOption = (value: unknown): number | undefined => {
  const numberValue = getNumberOption(value);
  if (numberValue === undefined || numberValue <= 0) return undefined;
  return numberValue;
};

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

export const normalizeConfig = (config: TrackPlushConfig): NormalizedTrackPlushConfig => ({
  ...config,
  exposureThreshold:
    getNumberOption(config.exposureThreshold) ??
    getNumberOption(config.exposure?.threshold) ??
    DEFAULT_EXPOSURE_THRESHOLD,
  exposureDuration:
    getNumberOption(config.exposureDuration) ??
    getNumberOption(config.exposure?.duration) ??
    DEFAULT_EXPOSURE_DURATION,
  exposureOnce: config.exposureOnce ?? config.exposure?.once ?? DEFAULT_EXPOSURE_ONCE,
  exposureRoot: config.exposureRoot ?? config.exposure?.root ?? DEFAULT_EXPOSURE_ROOT,
  exposureRootMargin:
    config.exposureRootMargin ?? config.exposure?.rootMargin ?? DEFAULT_EXPOSURE_ROOT_MARGIN,
  exposureQueueMaxSize:
    getPositiveNumberOption(config.exposureQueueMaxSize) ??
    getPositiveNumberOption(config.queue?.maxBatchSize) ??
    DEFAULT_EXPOSURE_QUEUE_MAX_SIZE,
  exposureQueueFlushInterval:
    getPositiveNumberOption(config.exposureQueueFlushInterval) ??
    getPositiveNumberOption(config.queue?.flushInterval) ??
    DEFAULT_EXPOSURE_QUEUE_FLUSH_INTERVAL,
  exposureQueueStorageKey:
    config.exposureQueueStorageKey ??
    config.queue?.storageKey ??
    DEFAULT_EXPOSURE_QUEUE_STORAGE_KEY,
  debug: config.debug ?? false,
});
