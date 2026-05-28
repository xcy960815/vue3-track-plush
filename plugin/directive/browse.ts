import { TrackerCore } from '../core/tracker';
import type { TrackDirectiveContext } from '../type';
import { getDirectiveTrackParams } from '../utils/params';

export const mountBrowseDirective = (tracker: TrackerCore, context: TrackDirectiveContext): void => {
  tracker.track('browse', getDirectiveTrackParams('browse', context));
};

