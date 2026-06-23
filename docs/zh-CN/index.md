---
layout: home

hero:
  name: vue3-track-plush
  text: 基于自定义指令的 Vue 3 埋点插件
  tagline: 轻量、浏览器友好，支持点击、浏览、曝光三类事件，也支持手动上报与自定义 transport。
  actions:
    - theme: brand
      text: 快速开始
      link: /zh-CN/guide/install
    - theme: alt
      text: 在线体验
      link: /zh-CN/guide/demo
    - theme: alt
      text: npm
      link: https://www.npmjs.com/package/vue3-track-plush

features:
  - title: 一套指令覆盖核心场景
    details: 统一使用 `v-track`，通过 `click`、`browse`、`exposure` 参数声明不同埋点类型，学习成本低。
  - title: 手动 API 与扩展能力并存
    details: 除了指令，还能使用 `clickEvent`、`browseEvent`、`exposureEvent` 手动上报，并可接入自定义 transport。
  - title: 内置曝光队列能力
    details: 默认处理曝光阈值、停留时长、单次上报、批量刷新与本地缓存，适合真实业务落地。
---

## 为什么用 `vue3-track-plush`

- 保留了适合业务项目的简洁指令写法，同时允许按事件携带自定义字段。
- 对营销页、后台系统、组件库示例页这类需要轻量埋点的前端场景很友好。
- 自带 TypeScript 类型、浏览器端默认 transport，以及对旧版 `track-params` 写法的兼容。

## 相关链接

- 文档地址：[xcy960815.github.io/vue3-track-plush/zh-CN/](https://xcy960815.github.io/vue3-track-plush/zh-CN/)
- 在线 Demo：[zh-CN/guide/demo](https://xcy960815.github.io/vue3-track-plush/zh-CN/guide/demo)
- 源码仓库：[github.com/xcy960815/vue3-track-plush](https://github.com/xcy960815/vue3-track-plush)
