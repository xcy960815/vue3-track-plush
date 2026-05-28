import { defaultTransport } from '../transport';
import type { TrackPayload, TrackPlushConfig, TrackTransport, TrackEventType } from '../type';
import { ExposureQueue } from './exposure-queue';
import { getTrackEventDefinition } from './event';

export class TrackerCore {
  private readonly config: TrackPlushConfig;

  private readonly transport: TrackTransport;

  private exposureQueue?: ExposureQueue;

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

    if (type === 'exposure') {
      this.getExposureQueue().push(payload);
      return;
    }

    this.transport.send({
      baseURL: this.config.baseURL,
      url: this.config.url,
      method: this.config.method,
      debug: this.config.debug,
      data: payload,
    });
  }

  private getExposureQueue(): ExposureQueue {
    if (!this.exposureQueue) {
      this.exposureQueue = new ExposureQueue({
        config: this.config,
        transport: this.transport,
      });
    }

    return this.exposureQueue;
  }
}
