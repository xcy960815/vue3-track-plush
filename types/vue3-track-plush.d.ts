import { App } from 'vue';

export declare const browseEvent: (trackConfig: TrackConfig) => void;

export declare const clickEvent: (trackConfig: TrackConfig) => void;

declare const _default: {
    install: (app: App<any>, trackConfig: TrackConfig) => void;
};
export default _default;

export declare interface TrackConfig extends Record<string, any> {
    baseURL: string;
    url: string;
    projectName?: string;
}

export declare type TrackParams = {
    [key: string]: any;
} | string | boolean | number;

export { }
