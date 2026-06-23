# API

## Exports

```ts
import Vue3TrackPlush, {
  vue3TrackPlush,
  clickEvent,
  browseEvent,
  exposureEvent,
} from 'vue3-track-plush';
```

- `default`: Vue plugin object with `install`
- `vue3TrackPlush`: named install function
- `clickEvent`: manual click reporting
- `browseEvent`: manual browse reporting
- `exposureEvent`: manual exposure reporting

## Directive signatures

| Directive | When it reports | String value maps to |
| --- | --- | --- |
| `v-track:click` | User clicks the bound element | `buttonName` |
| `v-track:browse` | Bound element mounts | `pageName` |
| `v-track:exposure` | Element enters the viewport and matches exposure options | `exposureName` |

### Recommended value style

```vue
<button v-track:click="{ buttonName: 'Save', moduleName: 'profile' }">
  Save
</button>
```

### Legacy compatibility

```vue
<button v-track:click track-params="Legacy button">Legacy button</button>
```

## Manual reporting

```ts
import { browseEvent, clickEvent, exposureEvent } from 'vue3-track-plush';

clickEvent({
  baseURL: 'https://example.com',
  url: '/api/track',
  projectName: 'example-app',
  buttonName: 'Create order',
});

browseEvent({
  baseURL: 'https://example.com',
  url: '/api/track',
  projectName: 'example-app',
  pageName: 'Order detail',
});

exposureEvent({
  baseURL: 'https://example.com',
  url: '/api/track',
  projectName: 'example-app',
  exposureName: 'Promotion banner',
});
```

## Core config

| Option | Type | Required | Description |
| --- | --- | --- | --- |
| `projectName` | `string` | Yes | Project identifier attached to every payload |
| `baseURL` | `string` | Yes | API origin or base path |
| `url` | `string` | Yes | Tracking endpoint path |
| `method` | `'GET' \| 'POST'` | No | Request method for the built-in transport |
| `pageUrl` | `string` | No | Override the collected page URL |
| `userAgent` | `string` | No | Override the collected user agent |
| `debug` | `boolean` | No | Print payloads and skip real requests |
| `transport` | `TrackTransport` | No | Replace the built-in request transport |

## Exposure config

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `exposureThreshold` | `number` | `0.5` | Minimum visible ratio |
| `exposureDuration` | `number` | `0` | Visible duration in milliseconds |
| `exposureOnce` | `boolean` | `true` | Whether an element reports only once |
| `exposureRoot` | `Element \| Document \| null` | `null` | Custom `IntersectionObserver` root |
| `exposureRootMargin` | `string` | `'0px'` | Custom `IntersectionObserver` root margin |
| `exposureQueueMaxSize` | `number` | `20` | Immediate flush threshold for queued exposure events |
| `exposureQueueFlushInterval` | `number` | `2000` | Timed flush interval |
| `exposureQueueStorageKey` | `string` | `'vue3-track-plush:exposure-queue'` | Local storage key for pending exposure payloads |
| `exposureQueueStorage` | `Storage` | `window.localStorage` | Custom storage implementation |

## Custom transport

```ts
import type { RequestConfig, TrackTransport } from 'vue3-track-plush';

const transport: TrackTransport = {
  send(requestConfig: RequestConfig) {
    console.log('report payload', requestConfig.data);
  },
};
```

## Exported types

The package also exports `TrackPlushConfig`, `TrackPayload`, `TrackTransport`, `RequestConfig`, `ExposureOptions`, and related utility types for advanced integrations.
