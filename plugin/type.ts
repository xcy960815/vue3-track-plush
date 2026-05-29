import type { DirectiveBinding, VNode } from 'vue';

export type TrackEventType = 'click' | 'browse' | 'exposure';

export type TrackAction = '点击事件' | '浏览事件' | '曝光事件';

export type TrackMethod = 'GET' | 'POST' | 'get' | 'post';

export type TrackParamsValue = string | Record<string, unknown>;

export interface ExposureOptions {
  /** 当前曝光目标是否只上报一次。 */
  once?: boolean;
  /** 当前曝光目标使用的可见比例阈值。 */
  threshold?: number;
  /** 触发曝光上报前要求持续可见的毫秒数。 */
  duration?: number;
  /** 当前曝光目标自定义的 IntersectionObserver root。 */
  root?: Element | Document | null;
  /** 当前曝光目标自定义的 IntersectionObserver rootMargin。 */
  rootMargin?: string;
}

export interface TrackPlushConfig extends Record<string, unknown> {
  /** 项目标识，会附带到每一条埋点数据中。 */
  projectName: string;
  /** 埋点请求的域名或基础路径。 */
  baseURL: string;
  /** 埋点请求接口路径，会拼接到 baseURL 后。 */
  url: string;
  /** 手动浏览上报时默认使用的 pageName。 */
  pageName?: string;
  /** 覆盖默认页面地址，附带到每一条埋点数据中。 */
  pageUrl?: string;
  /** 覆盖默认 User-Agent，附带到每一条埋点数据中。 */
  userAgent?: Navigator['userAgent'];
  /** 内置 transport 使用的请求方法。 */
  method?: TrackMethod;
  /** 手动点击上报时默认使用的 buttonName。 */
  buttonName?: string;
  /** 手动曝光上报时默认使用的 exposureName。 */
  exposureName?: string;
  /** XHR 回退请求的超时时间，单位毫秒。 */
  timeout?: number;
  /** XHR 回退请求是否携带凭证。 */
  withCredentials?: boolean;
  /** 内置 XHR 回退 transport 附带的自定义请求头。 */
  headers?: Record<string, string>;
  /** 内置 XHR 回退 transport 的失败重试次数。 */
  retry?: number;
  /** 内置 XHR 回退 transport 的重试间隔，单位毫秒。 */
  retryDelay?: number;
  /** 曝光埋点默认的可见比例阈值。 */
  exposureThreshold?: number;
  /** 曝光目标默认是否只上报一次。 */
  exposureOnce?: boolean;
  /** 曝光埋点默认要求持续可见的毫秒数。 */
  exposureDuration?: number;
  /** 曝光埋点默认使用的 IntersectionObserver root。 */
  exposureRoot?: Element | Document | null;
  /** 曝光埋点默认使用的 IntersectionObserver rootMargin。 */
  exposureRootMargin?: string;
  /** 曝光队列达到该数量后立即上报。 */
  exposureQueueMaxSize?: number;
  /** 曝光队列自动上报间隔，单位毫秒。 */
  exposureQueueFlushInterval?: number;
  /** 持久化曝光队列数据时使用的存储 key。 */
  exposureQueueStorageKey?: string;
  /** 持久化曝光队列时使用的自定义 Storage 实现。 */
  exposureQueueStorage?: Storage;
  /** 兼容 Vue2 风格配置的旧 queue 别名。 */
  queue?: QueueConfig;
  /** 兼容 Vue2 风格配置的旧 exposure 别名。 */
  exposure?: ExposureConfig;
  /** 为 true 时只打印 payload，不发起真实网络请求。 */
  debug?: boolean;
  /** 自定义 transport，用于替换内置请求实现。 */
  transport?: TrackTransport;
}

export interface QueueConfig {
  /** exposureQueueMaxSize 的旧别名。 */
  maxBatchSize?: number;
  /** exposureQueueFlushInterval 的旧别名。 */
  flushInterval?: number;
  /** exposureQueueStorageKey 的旧别名。 */
  storageKey?: string;
}

export interface ExposureConfig {
  /** exposureThreshold 的旧别名。 */
  threshold?: number;
  /** exposureDuration 的旧别名。 */
  duration?: number;
  /** exposureRoot 的旧别名。 */
  root?: Element | Document | null;
  /** exposureRootMargin 的旧别名。 */
  rootMargin?: string;
  /** exposureOnce 的旧别名。 */
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
  /** 当前事件的点击名称。 */
  buttonName?: string;
  /** 当前事件的曝光名称。 */
  exposureName?: string;
  /** 当前事件采集到的 User-Agent。 */
  userAgent: string;
  /** 当前事件采集到的页面地址。 */
  pageUrl: string;
  /** 当前事件附带的项目标识。 */
  projectName: string;
  /** 可读的事件类型名称。 */
  actionType: TrackAction;
  /** 事件创建时间，毫秒时间戳。 */
  timestamp: number;
  /** 当前事件的页面名称。 */
  pageName?: string;
}

export interface RequestConfig {
  /** 请求使用的域名或基础路径。 */
  baseURL: string;
  /** 会拼接到 baseURL 后的接口路径。 */
  url: string;
  /** transport 使用的请求方法。 */
  method?: TrackMethod;
  /** 单条事件数据或曝光批量数据。 */
  data: TrackPayloadData;
  /** 为 true 时跳过请求，仅输出 payload。 */
  debug?: boolean;
  /** XHR 回退请求的超时时间，单位毫秒。 */
  timeout?: number;
  /** XHR 回退请求是否携带凭证。 */
  withCredentials?: boolean;
  /** 内置 XHR 回退 transport 附带的自定义请求头。 */
  headers?: Record<string, string>;
  /** 内置 XHR 回退 transport 的失败重试次数。 */
  retry?: number;
  /** 内置 XHR 回退 transport 的重试间隔，单位毫秒。 */
  retryDelay?: number;
}

export interface TrackTransport {
  /** 插件使用的自定义请求发送器。 */
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
