import { ref } from 'vue';

import type { TrackPayload, TrackPayloadData } from '../plugin';

export interface DemoTrackLogEntry {
  id: number;
  eventKey: 'click' | 'browse' | 'exposure' | 'batch';
  actionType: string;
  title: string;
  json: string;
  time: string;
}

const MAX_LOG_ENTRIES = 50;

const EVENT_KEYS_BY_ACTION: Record<string, DemoTrackLogEntry['eventKey']> = {
  点击事件: 'click',
  浏览事件: 'browse',
  曝光事件: 'exposure',
};

const entries = ref<DemoTrackLogEntry[]>([]);

let nextEntryId = 0;

const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const pad = (value: number): string => `${value}`.padStart(2, '0');
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

const resolveTitle = (payload: TrackPayload): string => {
  const candidates = [payload.buttonName, payload.pageName, payload.exposureName];
  const title = candidates.find((item) => typeof item === 'string' && item.length > 0);
  return typeof title === 'string' ? title : String(payload.actionType ?? '未知事件');
};

export const recordTrackPayload = (data: TrackPayloadData): void => {
  const payloads = (Array.isArray(data) ? data : [data]).filter(
    (item): item is TrackPayload => Boolean(item) && typeof item === 'object',
  );
  if (!payloads.length) return;

  const first = payloads[0];
  const eventKey: DemoTrackLogEntry['eventKey'] =
    payloads.length > 1 ? 'batch' : (EVENT_KEYS_BY_ACTION[String(first.actionType)] ?? 'click');

  entries.value.unshift({
    id: (nextEntryId += 1),
    eventKey,
    actionType:
      payloads.length > 1 ? `曝光事件 ×${payloads.length}` : String(first.actionType ?? '未知事件'),
    title: payloads.length > 1 ? '队列打包上报' : resolveTitle(first),
    json: JSON.stringify(data, null, 2),
    time: formatTime(Date.now()),
  });

  if (entries.value.length > MAX_LOG_ENTRIES) entries.value.length = MAX_LOG_ENTRIES;
};

export const clearTrackLog = (): void => {
  entries.value = [];
};

export const demoTrackLogEntries = entries;
