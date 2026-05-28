import type { RequestConfig, TrackPayload, TrackPlushConfig, TrackTransport } from '../type';

const DEFAULT_EXPOSURE_QUEUE_MAX_SIZE = 20;
const DEFAULT_EXPOSURE_QUEUE_FLUSH_INTERVAL = 2000;
const DEFAULT_EXPOSURE_QUEUE_STORAGE_KEY = 'vue3-track-plush:exposure-queue';

interface ExposureQueueOptions {
  config: TrackPlushConfig;
  transport: TrackTransport;
}

const canUseWindow = (): boolean => typeof window !== 'undefined';

const resolveStorage = (config: TrackPlushConfig): Storage | undefined => {
  if (config.exposureQueueStorage) return config.exposureQueueStorage;
  if (!canUseWindow()) return undefined;

  try {
    return window.localStorage;
  } catch (_error) {
    return undefined;
  }
};

export class ExposureQueue {
  private readonly config: TrackPlushConfig;

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
    this.maxSize = this.resolvePositiveNumber(
      this.config.exposureQueueMaxSize,
      DEFAULT_EXPOSURE_QUEUE_MAX_SIZE,
    );
    this.flushInterval = this.resolvePositiveNumber(
      this.config.exposureQueueFlushInterval,
      DEFAULT_EXPOSURE_QUEUE_FLUSH_INTERVAL,
    );
    this.storageKey = this.config.exposureQueueStorageKey || DEFAULT_EXPOSURE_QUEUE_STORAGE_KEY;
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

  private resolvePositiveNumber(value: unknown, fallback: number): number {
    if (typeof value !== 'number' || Number.isNaN(value) || value <= 0) return fallback;
    return value;
  }
}
