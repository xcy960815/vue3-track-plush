import { VNode, DirectiveBinding, App } from 'vue';

type TrackAction = '点击事件' | '浏览事件' | '曝光事件';
type TrackMethod = 'GET' | 'POST';
type TrackParamsValue = string | Record<string, unknown>;
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
    exposureThreshold?: number;
}
interface TrackPayload extends Record<string, unknown> {
    buttonName?: string;
    exposureName?: string;
    userAgent: string;
    pageUrl: string;
    projectName: string;
    actionType: TrackAction;
    pageName?: string;
}
interface RequestConfig {
    baseURL: string;
    url: string;
    method?: TrackMethod;
    data: TrackPayload;
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

declare const install: (app: App<HTMLElement>, trackPlushConfig: TrackPlushConfig) => void;
declare const clickEvent: (trackPlushConfig: TrackPlushConfig) => void;
declare const browseEvent: (trackPlushConfig: TrackPlushConfig) => void;
declare const exposureEvent: (trackPlushConfig: TrackPlushConfig) => void;

declare const _default: {
    install: (app: App<HTMLElement>, trackPlushConfig: TrackPlushConfig) => void;
};

export { browseEvent, clickEvent, _default as default, exposureEvent, install as vue3TrackPlush };
export type { DirectiveTrackEntry, RequestConfig, TrackEntry, TrackMethod, TrackParamsValue, TrackPayload, TrackPlushConfig };
