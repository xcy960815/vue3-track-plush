import type {
  NormalizedTrackPlushConfig,
  TrackPayload,
  TrackTransport,
} from '../type';

interface ExposureQueueOptions {
  config: NormalizedTrackPlushConfig;
  transport: TrackTransport;
}

const canUseWindow = (): boolean => typeof window !== 'undefined';

const resolveStorage = (config: NormalizedTrackPlushConfig): Storage | undefined => {
  if (config.exposureQueueStorage) return config.exposureQueueStorage;
  if (!canUseWindow()) return undefined;

  try {
    return window.localStorage;
  } catch (_error) {
    return undefined;
  }
};

export class ExposureQueue {
  private readonly config: NormalizedTrackPlushConfig;

  private readonly transport: TrackTransport;

  private readonly maxSize: number;

  private readonly flushInterval: number;

  private readonly storageKey: string;

  private readonly storage?: Storage;

  private queue: TrackPayload[] = [];

  private timer: ReturnType<typeof setTimeout> | null = null;

  private attachedLifecycleFlush = false;

  public constructor(options: ExposureQueueOptions) {
    this.config = options.config;
    this.transport = options.transport;
    this.maxSize = this.config.exposureQueueMaxSize;
    this.flushInterval = this.config.exposureQueueFlushInterval;
    this.storageKey = this.config.exposureQueueStorageKey;
    this.storage = resolveStorage(this.config);
    this.restoreFromStorage();
    this.attachLifecycleFlush();
  }

  public push(payload: TrackPayload): void {
    this.queue.push(payload);
    this.persist();

    if (this.queue.length >= this.maxSize) {
      this.flush();
      return;
    }

    this.scheduleFlush();
  }

  public flush(): void {
    if (!this.queue.length) return;

    this.clearTimer();
    const data = this.queue.splice(0, this.maxSize);
    this.persist();

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
      data,
    });

    if (this.queue.length) this.scheduleFlush();
  }

  private scheduleFlush(): void {
    if (this.timer) return;

    this.timer = setTimeout(() => {
      this.flush();
    }, this.flushInterval);
  }

  private clearTimer(): void {
    if (!this.timer) return;
    clearTimeout(this.timer);
    this.timer = null;
  }

  private persist(): void {
    if (!this.storage) return;

    if (!this.queue.length) {
      this.storage.removeItem(this.storageKey);
      return;
    }

    this.storage.setItem(this.storageKey, JSON.stringify(this.queue));
  }

  private restoreFromStorage(): void {
    if (!this.storage) return;

    const cacheData = this.storage.getItem(this.storageKey);
    if (!cacheData) return;

    try {
      const parsedData = JSON.parse(cacheData);
      if (Array.isArray(parsedData)) {
        this.queue.push(...(parsedData as TrackPayload[]));
      }
      this.persist();
      this.scheduleFlush();
    } catch (_error) {
      this.storage.removeItem(this.storageKey);
    }
  }

  private attachLifecycleFlush(): void {
    if (!canUseWindow() || this.attachedLifecycleFlush) return;

    const flushOnPageLeave = () => {
      this.flush();
    };

    window.addEventListener('pagehide', flushOnPageLeave);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flushOnPageLeave();
    });

    this.attachedLifecycleFlush = true;
  }

}
