import { TrackerCore } from '../core/tracker';
import type { TrackDirectiveContext } from '../type';
import { addElementCleanup } from './cleanup';
import { getDirectiveTrackParams } from '../utils/params';

export const mountClickDirective = (tracker: TrackerCore, context: TrackDirectiveContext): void => {
  const handleClick = () => {
    tracker.track('click', getDirectiveTrackParams('click', context));
  };

  context.el.addEventListener('click', handleClick);
  addElementCleanup(context.el, () => {
    context.el.removeEventListener('click', handleClick);
  });
};

