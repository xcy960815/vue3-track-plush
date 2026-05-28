import type { DirectiveTrackEntry, TrackParamsValue } from './type';

export const getDirectiveTrackParams = (entry: DirectiveTrackEntry): TrackParamsValue | undefined => {
  if (entry.binding?.value !== undefined) return entry.binding.value;

  const props = entry.vnode?.props;
  const trackParams = props?.['track-params'] || props?.trackParams;

  return trackParams as TrackParamsValue | undefined;
};

export const normalizeCustomParams = <T extends Record<string, unknown>>(
  params: T,
): Omit<T, 'baseURL' | 'method' | 'type' | 'url'> => {
  const { baseURL: _baseURL, method: _method, type: _type, url: _url, ...rest } = params;
  return rest;
};
