import { App } from "vue";
export declare type Entry = {
    type: 'customize' | 'instruction';
    buttonName?: string;
    el?: HTMLElement;
    pageName?: string;
};
export declare type Method = 'GET' | 'POST';
export declare type TrackPlushConfig = {
    projectName: string;
    baseURL: string;
    url: string;
    pageName?: string;
    pageUrl?: string;
    userAgent?: Navigator['userAgent'];
    method?: Method;
    buttonName?: string;
};
export declare type RequestConfig = {
    baseURL: string;
    url: string;
    method: Method;
    data: any;
};
export declare const clickEvent: (trackPlushConfig: TrackPlushConfig) => void;
export declare const browseEvent: (trackPlushConfig: TrackPlushConfig) => void;
declare const _default: {
    install: (app: App<any>, trackPlushConfig: TrackPlushConfig) => void;
};
export default _default;
