import { createRequest } from './fetch';
import type { DirectiveTrackEntry, TrackEntry, TrackPayload, TrackPlushConfig, TrackParamsValue } from './type';
import { getDirectiveTrackParams, normalizeCustomParams } from './utils';

export class BrowseTrack {
  private readonly trackPlushConfig: TrackPlushConfig;

  public constructor(trackPlushConfig: TrackPlushConfig) {
    this.trackPlushConfig = trackPlushConfig;
  }

  public handleBrowseEvent(entry: TrackEntry): void {
    if (entry.type === 'customize') {
      this.sendBrowseTrack(normalizeCustomParams(entry));
      return;
    }

    this.sendBrowseTrack(this.resolveDirectiveParams(entry));
  }

  private resolveDirectiveParams(entry: DirectiveTrackEntry): Record<string, unknown> {
    const params: TrackParamsValue | undefined = getDirectiveTrackParams(entry);
    if (typeof params === 'string') return { pageName: params };
    return params || {};
  }

  private sendBrowseTrack(extraParams: Record<string, unknown>): void {
    this.handleSendTrack({
      userAgent: this.trackPlushConfig.userAgent || navigator.userAgent,
      pageUrl: this.trackPlushConfig.pageUrl || window.location.href,
      projectName: this.trackPlushConfig.projectName,
      actionType: '浏览事件',
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
