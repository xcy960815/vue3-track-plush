import 'intersection-observer';
export interface TrackPlushConfig {
    maxNum?: number;
}
export default class Exposure {
    trackPlushConfig: TrackPlushConfig;
    maxNum: number;
    _timer: any;
    _observer: IntersectionObserver;
    cacheDataArr: Array<string>;
    constructor(trackPlushConfig: any);
    init(): void;
    handleExposureEvent(entry: any): void;
    track(): void;
    storeIntoLocalStorage(data: any): void;
    trackFromLocalStorage(): void;
    beforeLeaveWebview(): void;
}
