import { TrackPlushConfig, Entry, TrackParams } from "./index";
export default class Browse {
    trackPlushConfig: TrackPlushConfig;
    constructor(trackPlushConfig: TrackPlushConfig);
    handleBrowseEvent(entry: Entry): void;
    handleSendTrack(trackParams: TrackParams): void;
}
