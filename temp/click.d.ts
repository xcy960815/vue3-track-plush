import { TrackPlushConfig, Entry } from "./index";
export default class Click {
    trackPlushConfig: TrackPlushConfig;
    constructor(trackPlushConfig: any);
    handleClickEvent(entry: Entry): void;
    handleSendTrack(trackParams: any): void;
}
