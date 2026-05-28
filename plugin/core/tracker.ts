import { defaultTransport } from '../transport';
import type { TrackPayload, TrackPlushConfig, TrackTransport, TrackEventType } from '../type';
import { getTrackEventDefinition } from './event';

export class TrackerCore {
  private readonly config: TrackPlushConfig;

  private readonly transport: TrackTransport;

  public constructor(config: TrackPlushConfig) {
    this.config = config;
    this.transport = config.transport || defaultTransport;
  }

  public track(type: TrackEventType, params: Record<string, unknown> = {}): void {
    const eventDefinition = getTrackEventDefinition(type);
    const payload: TrackPayload = {
      userAgent: this.config.userAgent || navigator.userAgent,
      pageUrl: this.config.pageUrl || window.location.href,
      projectName: this.config.projectName,
      actionType: eventDefinition.meta.actionType,
      ...params,
    };

    this.transport.send({
      baseURL: this.config.baseURL,
      url: this.config.url,
      method: this.config.method,
      data: payload,
    });
  }
}

