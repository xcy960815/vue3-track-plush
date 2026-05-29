import { TrackerCore } from '../core/tracker';
import type { ExposureOptions, NormalizedTrackPlushConfig, TrackDirectiveContext } from '../type';
import { getDirectiveTrackParams } from '../utils/params';
import { addElementCleanup } from './cleanup';

const getNumberOption = (value: unknown): number | undefined => {
  if (typeof value !== 'number' || Number.isNaN(value)) return undefined;
  return value;
};

const clampThreshold = (threshold: number): number => Math.min(Math.max(threshold, 0), 1);

const resolveExposureOptions = (
  config: NormalizedTrackPlushConfig,
  params: Record<string, unknown>,
): Required<Pick<ExposureOptions, 'once' | 'threshold' | 'duration' | 'rootMargin'>> &
  Pick<ExposureOptions, 'root'> => {
  const threshold =
    getNumberOption(params.exposureThreshold) ??
    getNumberOption(params.threshold) ??
    config.exposureThreshold;

  const duration =
    getNumberOption(params.exposureDuration) ??
    getNumberOption(params.duration) ??
    config.exposureDuration;

  return {
    once:
      typeof params.once === 'boolean'
        ? params.once
        : typeof params.exposureOnce === 'boolean'
          ? params.exposureOnce
          : config.exposureOnce,
    threshold: clampThreshold(threshold),
    duration: Math.max(duration, 0),
    root:
      (params.root as Element | Document | null | undefined) ??
      (params.exposureRoot as Element | Document | null | undefined) ??
      config.exposureRoot,
    rootMargin:
      typeof params.rootMargin === 'string'
        ? params.rootMargin
        : typeof params.exposureRootMargin === 'string'
          ? params.exposureRootMargin
          : config.exposureRootMargin,
  };
};

const removeExposureOptionParams = (params: Record<string, unknown>): Record<string, unknown> => {
  const {
    duration: _duration,
    exposureDuration: _exposureDuration,
    exposureRoot: _exposureRoot,
    exposureRootMargin: _exposureRootMargin,
    exposureThreshold: _exposureThreshold,
    once: _once,
    root: _root,
    rootMargin: _rootMargin,
    threshold: _threshold,
    ...trackParams
  } = params;

  return trackParams;
};

export const mountExposureDirective = (
  tracker: TrackerCore,
  context: TrackDirectiveContext,
  config: NormalizedTrackPlushConfig,
): void => {
  const params = getDirectiveTrackParams('exposure', context);
  const options = resolveExposureOptions(config, params);
  const trackParams = removeExposureOptionParams(params);
  let tracked = false;
  let visibleTimer: ReturnType<typeof setTimeout> | null = null;

  const clearVisibleTimer = () => {
    if (!visibleTimer) return;
    clearTimeout(visibleTimer);
    visibleTimer = null;
  };

  const reportExposure = () => {
    if (options.once && tracked) return;
    tracked = true;
    tracker.track('exposure', trackParams);
  };

  if (!('IntersectionObserver' in window)) {
    reportExposure();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          clearVisibleTimer();
          return;
        }

        if (options.duration > 0) {
          clearVisibleTimer();
          visibleTimer = setTimeout(() => {
            reportExposure();
            if (options.once) observer.disconnect();
          }, options.duration);
          return;
        }

        reportExposure();
        if (options.once) observer.disconnect();
      });
    },
    {
      root: options.root,
      rootMargin: options.rootMargin,
      threshold: options.threshold,
    },
  );

  observer.observe(context.el);
  addElementCleanup(context.el, () => {
    clearVisibleTimer();
    observer.disconnect();
  });
};
