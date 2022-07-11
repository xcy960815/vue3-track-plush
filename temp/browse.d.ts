import { TrackPlushConfig, Entry } from "./index";
export default class Browse {
    trackPlushConfig: TrackPlushConfig;
    constructor(trackPlushConfig: any);
    handleBrowseEvent(entry: Entry): void;
    handleSendTrack(data: any): void;
}
