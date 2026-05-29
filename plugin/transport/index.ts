import type { RequestConfig, TrackMethod, TrackPayloadData, TrackTransport } from '../type';

const DEFAULT_METHOD: TrackMethod = 'POST';

const assertRequestConfig = (requestConfig: RequestConfig): void => {
  if (!requestConfig.baseURL || !requestConfig.url) {
    throw new Error('baseURL 或 url 不能为空');
  }
};

const createRequestUrl = (requestConfig: RequestConfig): string => {
  return `${requestConfig.baseURL}${requestConfig.url}`;
};

const outputDebugLog = (requestConfig: RequestConfig): void => {
  console.log('[vue3-track-plush debug]', JSON.stringify(requestConfig.data, null, 2));
};

const sendByBeacon = (url: string, data: TrackPayloadData): boolean => {
  if (typeof navigator === 'undefined' || typeof navigator.sendBeacon !== 'function') return false;

  const blob = new Blob([JSON.stringify(data)], {
    type: 'application/json;charset=UTF-8',
  });

  return navigator.sendBeacon(url, blob);
};

const sendByFetch = (url: string, method: TrackMethod, data: TrackPayloadData): void => {
  if (typeof fetch !== 'function') {
    sendByXhr(url, method, data);
    return;
  }

  fetch(url, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(data),
    keepalive: true,
  }).catch(() => {
    sendByXhr(url, method, data);
  });
};

const appendQuery = (url: string, data: TrackPayloadData): string => {
  const payload = Array.isArray(data) ? { list: data } : data;
  const searchParams = new URLSearchParams();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    searchParams.append(key, typeof value === 'string' ? value : JSON.stringify(value));
  });

  const query = searchParams.toString();
  if (!query) return url;
  return `${url}${url.includes('?') ? '&' : '?'}${query}`;
};

const sendByXhr = (
  url: string,
  method: TrackMethod,
  data: TrackPayloadData,
  requestConfig?: RequestConfig,
  retryLeft = requestConfig?.retry || 0,
): void => {
  const xhr = new XMLHttpRequest();

  xhr.timeout = requestConfig?.timeout || 10000;
  xhr.open(method, method === 'GET' ? appendQuery(url, data) : url, true);
  xhr.withCredentials = requestConfig?.withCredentials ?? true;
  xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

  Object.entries(requestConfig?.headers || {}).forEach(([key, value]) => {
    try {
      xhr.setRequestHeader(key, value);
    } catch (_error) {
      // Invalid custom headers should not break host applications.
    }
  });

  const retryOrFail = () => {
    if (retryLeft <= 0) return;

    window.setTimeout(() => {
      sendByXhr(url, method, data, requestConfig, retryLeft - 1);
    }, requestConfig?.retryDelay || 300);
  };

  xhr.onerror = retryOrFail;
  xhr.ontimeout = retryOrFail;
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) return;
    retryOrFail();
  };

  xhr.send(method === 'GET' ? null : JSON.stringify(data || {}));
};

export const defaultTransport: TrackTransport = {
  send(requestConfig) {
    assertRequestConfig(requestConfig);

    if (requestConfig.debug) {
      outputDebugLog(requestConfig);
      return;
    }

    const url = createRequestUrl(requestConfig);
    const method = (requestConfig.method || DEFAULT_METHOD).toUpperCase() as TrackMethod;

    if (method === 'POST' && sendByBeacon(url, requestConfig.data)) return;

    const canUseFetchFallback =
      method === 'POST' &&
      !requestConfig.headers &&
      requestConfig.withCredentials === undefined &&
      requestConfig.timeout === undefined &&
      requestConfig.retry === undefined &&
      requestConfig.retryDelay === undefined;

    if (canUseFetchFallback) {
      sendByFetch(url, method, requestConfig.data);
      return;
    }

    sendByXhr(url, method, requestConfig.data, requestConfig);
  },
};
