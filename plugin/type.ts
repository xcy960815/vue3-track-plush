import type { DirectiveBinding, VNode } from 'vue';

export type TrackEventType = 'click' | 'browse' | 'exposure';

export type TrackAction = '点击事件' | '浏览事件' | '曝光事件';

export type TrackMethod = 'GET' | 'POST' | 'get' | 'post';

export type TrackParamsValue = string | Record<string, unknown>;

export interface ExposureOptions {
  once?: boolean;
  threshold?: number;
  duration?: number;
  root?: Element | Document | null;
  rootMargin?: string;
}

export interface TrackPlushConfig extends Record<string, unknown> {
  projectName: string;
  baseURL: string;
  url: string;
  pageName?: string;
  pageUrl?: string;
  userAgent?: Navigator['userAgent'];
  method?: TrackMethod;
  buttonName?: string;
  exposureName?: string;
  timeout?: number;
  withCredentials?: boolean;
  headers?: Record<string, string>;
  retry?: number;
  retryDelay?: number;
  exposureThreshold?: number;
  exposureOnce?: boolean;
  exposureDuration?: number;
  exposureRoot?: Element | Document | null;
  exposureRootMargin?: string;
  exposureQueueMaxSize?: number;
  exposureQueueFlushInterval?: number;
  exposureQueueStorageKey?: string;
  exposureQueueStorage?: Storage;
  queue?: QueueConfig;
  exposure?: ExposureConfig;
  debug?: boolean;
  transport?: TrackTransport;
}

export interface QueueConfig {
  maxBatchSize?: number;
  flushInterval?: number;
  storageKey?: string;
}

export interface ExposureConfig {
  threshold?: number;
  duration?: number;
  root?: Element | Document | null;
  rootMargin?: string;
  once?: boolean;
}

export interface NormalizedTrackPlushConfig extends TrackPlushConfig {
  exposureThreshold: number;
  exposureOnce: boolean;
  exposureDuration: number;
  exposureRoot: Element | Document | null;
  exposureRootMargin: string;
  exposureQueueMaxSize: number;
  exposureQueueFlushInterval: number;
  exposureQueueStorageKey: string;
  debug: boolean;
}

export type TrackPayloadData = TrackPayload | TrackPayload[];

export interface TrackPayload extends Record<string, unknown> {
  buttonName?: string;
  exposureName?: string;
  userAgent: string;
  pageUrl: string;
  projectName: string;
  actionType: TrackAction;
  timestamp: number;
  pageName?: string;
}

export interface RequestConfig {
  baseURL: string;
  url: string;
  method?: TrackMethod;
  data: TrackPayloadData;
  debug?: boolean;
  timeout?: number;
  withCredentials?: boolean;
  headers?: Record<string, string>;
  retry?: number;
  retryDelay?: number;
}

export interface TrackTransport {
  send: (requestConfig: RequestConfig) => Promise<void> | void;
}

export interface DirectiveTrackEntry {
  type: 'instruction';
  el?: HTMLElement;
  vnode?: VNode;
  binding?: DirectiveBinding<TrackParamsValue | undefined>;
}

export interface CustomTrackEntry extends Record<string, unknown> {
  type: 'customize';
}

export type TrackEntry = DirectiveTrackEntry | CustomTrackEntry;

export interface TrackEventMeta {
  actionType: TrackAction;
  stringParamKey: 'buttonName' | 'pageName' | 'exposureName';
}

export interface TrackEventDefinition {
  type: TrackEventType;
  meta: TrackEventMeta;
}

export interface TrackDirectiveContext {
  el: HTMLElement;
  binding: DirectiveBinding<TrackParamsValue | undefined>;
  vnode: VNode;
}

export type Cleanup = () => void;
