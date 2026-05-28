import { createRequest } from './fetch';
import type { DirectiveTrackEntry, TrackEntry, TrackPayload, TrackPlushConfig, TrackParamsValue } from './type';
import { getDirectiveTrackParams, normalizeCustomParams } from './utils';

const DEFAULT_EXPOSURE_THRESHOLD = 0.5;

export class ExposureTrack {
  private readonly trackPlushConfig: TrackPlushConfig;

  public constructor(trackPlushConfig: TrackPlushConfig) {
    this.trackPlushConfig = trackPlushConfig;
  }

  public handleExposureEvent(entry: TrackEntry): void {
    if (entry.type === 'customize') {
      this.sendExposureTrack(normalizeCustomParams(entry));
      return;
    }

    if (!entry.el) return;

    if (!('IntersectionObserver' in window)) {
      this.sendExposureTrack(this.resolveDirectiveParams(entry));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((observerEntry) => {
          if (!observerEntry.isIntersecting) return;

          this.sendExposureTrack(this.resolveDirectiveParams(entry));
          observer.unobserve(observerEntry.target);
          observer.disconnect();
        });
      },
      {
        threshold: this.resolveThreshold(),
      },
    );

    observer.observe(entry.el);
  }

  private resolveDirectiveParams(entry: DirectiveTrackEntry): Record<string, unknown> {
    const params: TrackParamsValue | undefined = getDirectiveTrackParams(entry);
    if (typeof params === 'string') return { exposureName: params };
    return params || {};
  }

  private resolveThreshold(): number {
    const threshold = this.trackPlushConfig.exposureThreshold;

    if (typeof threshold !== 'number' || Number.isNaN(threshold)) return DEFAULT_EXPOSURE_THRESHOLD;
    return Math.min(Math.max(threshold, 0), 1);
  }

  private sendExposureTrack(extraParams: Record<string, unknown>): void {
    this.handleSendTrack({
      userAgent: this.trackPlushConfig.userAgent || navigator.userAgent,
      pageUrl: this.trackPlushConfig.pageUrl || window.location.href,
      projectName: this.trackPlushConfig.projectName,
      actionType: '曝光事件',
      ...extraParams,
    });
  }

  private handleSendTrack(trackParams: TrackPayload): void {
    createRequest({
      baseURL: this.trackPlushConfig.baseURL,
      url: this.trackPlushConfig.url,
      method: this.trackPlushConfig.method,
      data: trackParams,
    });
  }
}

