import { App } from 'vue';

export declare class Browse {
    trackConfig: TrackConfig;
    static instance: Browse;
    static getInstance(trackConfig: TrackConfig): Browse;
    constructor(trackConfig: TrackConfig);
    handleBrowseEvent(trackParams: TrackParams): void;
    handleSendTrack(trackParams: TrackParams): void;
}

export declare const browseEvent: (trackConfig: EventTrackConfig) => void;

export declare class Click {
    trackConfig: TrackConfig;
    trackParams: TrackParams;
    static instance: Click;
    constructor(trackConfig: TrackConfig);
    static getInstance(trackConfig: TrackConfig): Click;
    handleAddClickEvent(params: {
        el: HTMLElement;
        trackParams: TrackParams;
    }): void;
    handleRemoveClickEvent(el: HTMLElement): void;
    handleClickEvent: () => void;
    handleSendTrack(trackParams: TrackParams): void;
}

export declare const clickEvent: (trackConfig: EventTrackConfig) => void;

export declare interface EventTrackConfig extends TrackConfig {
    [key: string]: unknown;
}

export declare interface TrackConfig {
    baseURL: string;
    url: string;
    projectName?: string;
}

export declare type TrackParams = {
    [key: string]: any;
} | string | boolean | number;

declare class Vue3TrackPlush {
    clickInstance: Click;
    browserInstance: Browse;
    static install(app: App, trackConfig: TrackConfig): void;
}
export default Vue3TrackPlush;

export { }
