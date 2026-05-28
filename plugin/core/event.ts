import type { TrackEventDefinition, TrackEventType } from '../type';

export const TRACK_EVENT_DEFINITIONS: Record<TrackEventType, TrackEventDefinition> = {
  click: {
    type: 'click',
    meta: {
      actionType: '点击事件',
      stringParamKey: 'buttonName',
    },
  },
  browse: {
    type: 'browse',
    meta: {
      actionType: '浏览事件',
      stringParamKey: 'pageName',
    },
  },
  exposure: {
    type: 'exposure',
    meta: {
      actionType: '曝光事件',
      stringParamKey: 'exposureName',
    },
  },
};

export const getTrackEventDefinition = (type: TrackEventType): TrackEventDefinition => {
  return TRACK_EVENT_DEFINITIONS[type];
};

