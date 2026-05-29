import { VNode, DirectiveBinding, App } from 'vue';

type TrackEventType = 'click' | 'browse' | 'exposure';
type TrackAction = '点击事件' | '浏览事件' | '曝光事件';
type TrackMethod = 'GET' | 'POST' | 'get' | 'post';
type TrackParamsValue = string | Record<string, unknown>;
interface ExposureOptions {
    once?: boolean;
    threshold?: number;
    duration?: number;
    root?: Element | Document | null;
    rootMargin?: string;
}
interface TrackPlushConfig extends Record<string, unknown> {
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
interface QueueConfig {
    maxBatchSize?: number;
    flushInterval?: number;
    storageKey?: string;
}
interface ExposureConfig {
    threshold?: number;
    duration?: number;
    root?: Element | Document | null;
    rootMargin?: string;
    once?: boolean;
}
type TrackPayloadData = TrackPayload | TrackPayload[];
interface TrackPayload extends Record<string, unknown> {
    buttonName?: string;
    exposureName?: string;
    userAgent: string;
    pageUrl: string;
    projectName: string;
    actionType: TrackAction;
    timestamp: number;
    pageName?: string;
}
interface RequestConfig {
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
interface TrackTransport {
    send: (requestConfig: RequestConfig) => Promise<void> | void;
}
interface DirectiveTrackEntry {
    type: 'instruction';
    el?: HTMLElement;
    vnode?: VNode;
    binding?: DirectiveBinding<TrackParamsValue | undefined>;
}
interface CustomTrackEntry extends Record<string, unknown> {
    type: 'customize';
}
type TrackEntry = DirectiveTrackEntry | CustomTrackEntry;
type Cleanup = () => void;

declare const install: (app: App<HTMLElement>, trackPlushConfig: TrackPlushConfig) => void;
declare const clickEvent: (trackPlushConfig: TrackPlushConfig) => void;
declare const browseEvent: (trackPlushConfig: TrackPlushConfig) => void;
declare const exposureEvent: (trackPlushConfig: TrackPlushConfig) => void;

declare const _default: {
    install: (app: App<HTMLElement>, trackPlushConfig: TrackPlushConfig) => void;
};

export { browseEvent, clickEvent, _default as default, exposureEvent, install as vue3TrackPlush };
export type { Cleanup, DirectiveTrackEntry, ExposureOptions, RequestConfig, TrackEntry, TrackEventType, TrackMethod, TrackParamsValue, TrackPayload, TrackPayloadData, TrackPlushConfig, TrackTransport };
