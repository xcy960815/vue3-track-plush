import type { DirectiveBinding, VNode } from 'vue';

export type TrackAction = '点击事件' | '浏览事件' | '曝光事件';

export type TrackMethod = 'GET' | 'POST';

export type TrackParamsValue = string | Record<string, unknown>;

export interface TrackPlushConfig extends Record<string, unknown> {
  projectName: string;
  baseURL: string;
  url: string;
  pageName?: string;
  pageUrl?: string;
  userAgent?: Navigator['userAgent'];
  method?: TrackMethod;
  buttonName?: string;
  exposureName?: string;
  exposureThreshold?: number;
}

export interface TrackPayload extends Record<string, unknown> {
  buttonName?: string;
  exposureName?: string;
  userAgent: string;
  pageUrl: string;
  projectName: string;
  actionType: TrackAction;
  pageName?: string;
}

export interface RequestConfig {
  baseURL: string;
  url: string;
  method?: TrackMethod;
  data: TrackPayload;
}

export interface DirectiveTrackEntry {
  type: 'instruction';
  el?: HTMLElement;
  vnode?: VNode;
  binding?: DirectiveBinding<TrackParamsValue | undefined>;
}

export interface CustomTrackEntry extends Record<string, unknown> {
  type: 'customize';
}

export type TrackEntry = DirectiveTrackEntry | CustomTrackEntry;
