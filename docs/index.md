---
layout: home

hero:
  name: vue3-track-plush
  text: Vue 3 tracking with directive-first ergonomics
  tagline: A lightweight tracking plugin for click, browse, and exposure events with manual reporting APIs and a pluggable transport layer.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/install
    - theme: alt
      text: Try Demo
      link: /guide/demo
    - theme: alt
      text: npm
      link: https://www.npmjs.com/package/vue3-track-plush

features:
  - title: One directive, three event types
    details: Use `v-track:click`, `v-track:browse`, and `v-track:exposure` to cover the most common front-end tracking scenarios with a single mental model.
  - title: Manual APIs and custom transport
    details: Fall back to `clickEvent`, `browseEvent`, and `exposureEvent`, or replace the built-in request pipeline with your own transport implementation.
  - title: Exposure queue included
    details: Handle threshold, duration, one-shot reporting, queue flush intervals, and local storage persistence without additional infrastructure.
---

## Why `vue3-track-plush`

- It keeps directive syntax simple while still allowing per-event payload overrides.
- It works well for dashboards, marketing pages, and component libraries that need lightweight in-browser instrumentation.
- It ships with TypeScript types, browser-friendly defaults, and compatibility for the legacy `track-params` syntax.

## Links

- Documentation: [xcy960815.github.io/vue3-track-plush](https://xcy960815.github.io/vue3-track-plush/)
- Online demo: [guide/demo](https://xcy960815.github.io/vue3-track-plush/guide/demo)
- Source code: [github.com/xcy960815/vue3-track-plush](https://github.com/xcy960815/vue3-track-plush)
