<template>
  <section class="track-demo">
    <header class="track-demo__hero">
      <p class="track-demo__eyebrow">Interactive playground</p>
      <h2 class="track-demo__title">Shipped scenarios, running in place</h2>
      <p class="track-demo__desc">
        The embedded playground reuses this repository's demo cases and runs with
        <code>debug: true</code>. Tracking payloads print to the browser console and to the event
        log below — no real analytics requests.
      </p>
    </header>

    <nav class="track-demo__tabs" aria-label="Demo cases">
      <button
        v-for="item in demoCases"
        :key="item.name"
        type="button"
        class="track-demo__tab"
        :class="{ 'is-active': item.name === activeName }"
        @click="activeName = item.name"
      >
        <strong>{{ item.meta.title }}</strong>
        <span>{{ item.meta.description }}</span>
      </button>
    </nav>

    <div class="track-demo__panel">
      <component :is="activeCase.component" />
    </div>

    <TrackEventLog />
  </section>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import TrackEventLog from '../components/TrackEventLog.vue';
import { demoCases } from '../demoCases';

const activeName = ref(demoCases[0]?.name ?? 'basic');

const activeCase = computed(() => {
  return demoCases.find((item) => item.name === activeName.value) ?? demoCases[0];
});
</script>

<style>
/* -------------------------------------------------------------------------
   文档站内嵌 playground。
   变量从 VitePress 的 html.dark 派生（亮色为默认，.dark 时切暗色），
   与本地 demo 的 :root / html[data-theme='light'] 同一套值。
------------------------------------------------------------------------- */

.track-demo {
  /* light mode（文档站默认） */
  --mono: 'SFMono-Regular', ui-monospace, Menlo, Consolas, 'Liberation Mono', monospace;
  --surface: #ffffff;
  --surface-2: #f5f7fb;
  --surface-3: #eceff6;
  --line: #dfe5ee;
  --line-soft: #e8edf4;
  --text: #1b2733;
  --text-strong: #0f1922;
  --muted: #5d6b7b;
  --faint: #93a0ae;
  --accent: #3f9e22;
  --accent-strong: #36881d;
  --accent-2: #0d9488;
  --accent-soft: rgba(63, 158, 34, 0.1);
  --accent-border: rgba(63, 158, 34, 0.38);
  --accent-2-soft: rgba(13, 148, 136, 0.1);
  --accent-2-border: rgba(13, 148, 136, 0.32);
  --accent-contrast: #ffffff;
  --danger: #d5423c;

  display: grid;
  gap: 16px;
  min-width: 0;
}

.dark .track-demo {
  /* dark mode */
  --surface: #0c1119;
  --surface-2: #101722;
  --surface-3: #141c29;
  --line: #1e2836;
  --line-soft: #17202d;
  --text: #eef2f7;
  --text-strong: #f8fafc;
  --muted: #8b97a6;
  --faint: #5c6875;
  --accent: #9af068;
  --accent-strong: #7ddd45;
  --accent-2: #5eead4;
  --accent-soft: rgba(154, 240, 104, 0.12);
  --accent-border: rgba(154, 240, 104, 0.35);
  --accent-2-soft: rgba(94, 234, 212, 0.12);
  --accent-2-border: rgba(94, 234, 212, 0.32);
  --accent-contrast: #06130a;
  --danger: #ff8f88;
}

.track-demo .track-demo__hero {
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 22px 24px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background:
    radial-gradient(circle at 10% 0%, rgba(124, 92, 255, 0.1), transparent 42%),
    radial-gradient(circle at 90% 0%, rgba(94, 234, 212, 0.08), transparent 40%), var(--surface);
}

.track-demo .track-demo__eyebrow {
  margin: 0 0 8px;
  color: var(--accent);
  font: 700 11px/1 var(--mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.track-demo .track-demo__title {
  margin: 0;
  color: var(--text-strong);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.25;
}

.track-demo .track-demo__desc {
  margin: 10px 0 0;
  max-width: 780px;
  color: var(--muted);
  font-size: 13.5px;
  line-height: 1.75;
}

.track-demo .track-demo__desc code {
  padding: 1px 6px;
  border: 1px solid var(--accent-border);
  border-radius: 6px;
  background: var(--accent-soft);
  color: var(--accent);
  font-family: var(--mono);
  font-size: 12px;
}

.track-demo .track-demo__tabs {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.track-demo .track-demo__tab {
  display: grid;
  gap: 3px;
  padding: 12px 16px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
  color: var(--text);
  text-align: left;
  cursor: pointer;
  transition:
    border-color 160ms ease,
    background 160ms ease;
}

.track-demo .track-demo__tab strong {
  color: var(--text-strong);
  font-size: 13.5px;
}

.track-demo .track-demo__tab span {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.5;
}

.track-demo .track-demo__tab:hover {
  border-color: var(--accent-border);
}

.track-demo .track-demo__tab.is-active {
  border-color: var(--accent-border);
  background: var(--accent-soft);
}

.track-demo .track-demo__tab.is-active strong {
  color: var(--accent);
}

.track-demo .track-demo__panel {
  min-width: 0;
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--surface);
}

@media (max-width: 767px) {
  .track-demo .track-demo__tabs {
    grid-template-columns: 1fr;
  }

  .track-demo .track-demo__panel {
    padding: 16px;
  }
}
</style>
