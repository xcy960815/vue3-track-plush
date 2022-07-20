import { TrackPlushConfig, Entry, TrackParams } from "./index";
export default class Click {
    trackPlushConfig: TrackPlushConfig;
    constructor(trackPlushConfig: TrackPlushConfig);
    handleClickEvent(entry: Entry): void;
    handleSendTrack(trackParams: TrackParams): void;
}
