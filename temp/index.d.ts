import { App, VNode } from "vue";
export declare type Entry = {
    type: 'customize' | 'instruction';
    el?: HTMLElement;
    VNode?: VNode;
    pageName?: string;
    buttonName?: string;
} & {
    [key: string]: any;
};
export declare type Method = 'GET' | 'POST';
export interface TrackPlushConfig extends Record<string, string | undefined> {
    projectName: string;
    baseURL: string;
    url: string;
    pageName?: string;
    pageUrl?: string;
    userAgent?: Navigator['userAgent'];
    method?: Method;
    buttonName?: string;
}
export declare type EventParams = {
    [key: string]: any;
};
export declare type TrackParams = {
    buttonName?: string;
    userAgent: string;
    pageUrl: string;
    projectName: string;
    actionType: '点击事件' | '浏览事件';
    pageName?: string;
};
export declare type RequestConfig = {
    baseURL: string;
    url: string;
    method: Method;
    data: TrackParams;
};
export declare const clickEvent: (trackPlushConfig: TrackPlushConfig) => void;
export declare const browseEvent: (trackPlushConfig: TrackPlushConfig) => void;
declare const _default: {
    install: (app: App<any>, trackPlushConfig: TrackPlushConfig) => void;
};
export default _default;
