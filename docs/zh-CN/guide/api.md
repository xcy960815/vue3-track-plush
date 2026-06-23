# API

## 导出项

```ts
import Vue3TrackPlush, {
  vue3TrackPlush,
  clickEvent,
  browseEvent,
  exposureEvent,
} from 'vue3-track-plush';
```

- `default`：带 `install` 的 Vue 插件对象
- `vue3TrackPlush`：具名安装函数
- `clickEvent`：手动点击上报
- `browseEvent`：手动浏览上报
- `exposureEvent`：手动曝光上报

## 指令签名

| 指令 | 触发时机 | 字符串值映射字段 |
| --- | --- | --- |
| `v-track:click` | 用户点击绑定元素时 | `buttonName` |
| `v-track:browse` | 绑定元素挂载时 | `pageName` |
| `v-track:exposure` | 元素进入视口且满足曝光条件时 | `exposureName` |

### 推荐写法

```vue
<button v-track:click="{ buttonName: '保存', moduleName: 'profile' }">
  保存
</button>
```

### 兼容旧写法

```vue
<button v-track:click track-params="旧写法按钮">旧写法按钮</button>
```

## 手动上报

```ts
import { browseEvent, clickEvent, exposureEvent } from 'vue3-track-plush';

clickEvent({
  baseURL: 'https://example.com',
  url: '/api/track',
  projectName: 'example-app',
  buttonName: '创建订单',
});

browseEvent({
  baseURL: 'https://example.com',
  url: '/api/track',
  projectName: 'example-app',
  pageName: '订单详情',
});

exposureEvent({
  baseURL: 'https://example.com',
  url: '/api/track',
  projectName: 'example-app',
  exposureName: '促销 Banner',
});
```

## 核心配置

| 配置项 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `projectName` | `string` | 是 | 每条埋点都会携带的项目标识 |
| `baseURL` | `string` | 是 | 接口域名或基础路径 |
| `url` | `string` | 是 | 埋点接口路径 |
| `method` | `'GET' \| 'POST'` | 否 | 内置 transport 使用的请求方法 |
| `pageUrl` | `string` | 否 | 覆盖自动采集的页面地址 |
| `userAgent` | `string` | 否 | 覆盖自动采集的用户代理 |
| `debug` | `boolean` | 否 | 打印 payload 并跳过真实请求 |
| `transport` | `TrackTransport` | 否 | 替换内置上报实现 |

## 曝光相关配置

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `exposureThreshold` | `number` | `0.5` | 可见比例阈值 |
| `exposureDuration` | `number` | `0` | 持续可见时长，单位毫秒 |
| `exposureOnce` | `boolean` | `true` | 是否只上报一次 |
| `exposureRoot` | `Element \| Document \| null` | `null` | 自定义 `IntersectionObserver` root |
| `exposureRootMargin` | `string` | `'0px'` | 自定义 `IntersectionObserver` rootMargin |
| `exposureQueueMaxSize` | `number` | `20` | 队列达到该数量后立即上报 |
| `exposureQueueFlushInterval` | `number` | `2000` | 队列定时刷新间隔 |
| `exposureQueueStorageKey` | `string` | `'vue3-track-plush:exposure-queue'` | 待上报曝光数据缓存 key |
| `exposureQueueStorage` | `Storage` | `window.localStorage` | 自定义缓存实现 |

## 自定义 transport

```ts
import type { RequestConfig, TrackTransport } from 'vue3-track-plush';

const transport: TrackTransport = {
  send(requestConfig: RequestConfig) {
    console.log('report payload', requestConfig.data);
  },
};
```

## 类型导出

如果你要做更深的封装，可以直接复用 `TrackPlushConfig`、`TrackPayload`、`TrackTransport`、`RequestConfig`、`ExposureOptions` 等类型。
