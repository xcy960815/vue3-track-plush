import { defaultTransport } from '../transport';
import type {
  NormalizedTrackPlushConfig,
  TrackPayload,
  TrackPlushConfig,
  TrackTransport,
  TrackEventType,
} from '../type';
import { normalizeConfig } from '../utils/params';
import { ExposureQueue } from './exposure-queue';
import { getTrackEventDefinition } from './event';

export class TrackerCore {
  private readonly config: NormalizedTrackPlushConfig;

  private readonly transport: TrackTransport;

  private exposureQueue?: ExposureQueue;

  public constructor(config: TrackPlushConfig) {
    this.config = normalizeConfig(config);
    this.transport = this.config.transport || defaultTransport;
  }

  public track(type: TrackEventType, params: Record<string, unknown> = {}): void {
    const eventDefinition = getTrackEventDefinition(type);
    const payload: TrackPayload = {
      userAgent: this.config.userAgent || navigator.userAgent,
      pageUrl: this.config.pageUrl || window.location.href,
      projectName: this.config.projectName,
      actionType: eventDefinition.meta.actionType,
      timestamp: Date.now(),
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
      timeout: this.config.timeout,
      withCredentials: this.config.withCredentials,
      headers: this.config.headers,
      retry: this.config.retry,
      retryDelay: this.config.retryDelay,
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
