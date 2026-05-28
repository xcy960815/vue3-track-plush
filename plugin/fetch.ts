import type { RequestConfig, TrackMethod } from './type';

const DEFAULT_METHOD: TrackMethod = 'POST';

export const createRequest = (requestConfig: RequestConfig): void => {
  if (!requestConfig.baseURL || !requestConfig.url) {
    throw new Error('baseURL 或 url 不能为空');
  }

  const xhr = new XMLHttpRequest();
  const url = `${requestConfig.baseURL}${requestConfig.url}`;
  const method = (requestConfig.method || DEFAULT_METHOD).toUpperCase() as TrackMethod;

  xhr.timeout = 10000;
  xhr.open(method, url, true);
  xhr.withCredentials = true;
  xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify(requestConfig.data || {}));
};

