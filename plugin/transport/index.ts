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

const sendByXhr = (url: string, method: TrackMethod, data: TrackPayloadData): void => {
  const xhr = new XMLHttpRequest();

  xhr.timeout = 10000;
  xhr.open(method, url, true);
  xhr.withCredentials = true;
  xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify(data || {}));
};

export const defaultTransport: TrackTransport = {
  send(requestConfig) {
    assertRequestConfig(requestConfig);

    const url = createRequestUrl(requestConfig);
    const method = (requestConfig.method || DEFAULT_METHOD).toUpperCase() as TrackMethod;

    if (method === 'POST' && sendByBeacon(url, requestConfig.data)) return;

    sendByFetch(url, method, requestConfig.data);
  },
};
