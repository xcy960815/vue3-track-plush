# 在线 Demo

这个在线演示直接复用了仓库里已经存在的示例场景，而不是单独维护一套“文档专用 demo”。

## 包含的测试场景

- 基础指令点击与浏览上报
- 旧版 `track-params` 兼容写法
- 带 `threshold`、`duration`、`once` 的曝光配置
- `clickEvent`、`browseEvent`、`exposureEvent` 手动上报

::: tip 调试说明
内嵌 playground 以 `debug: true` 运行，所以交互后会把 payload JSON 打印到浏览器控制台，而不会请求真实埋点接口。
:::

<ClientOnly>
  <DocsEmbeddedDemo />
</ClientOnly>
