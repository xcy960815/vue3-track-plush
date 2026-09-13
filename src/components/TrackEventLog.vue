<template>
  <section class="track-log">
    <header class="track-log__head">
      <span class="track-log__title">Event Log</span>
      <span class="track-log__count">{{ entries.length }} 条</span>
      <button
        type="button"
        class="track-log__clear"
        :disabled="!entries.length"
        @click="clearTrackLog"
      >
        清空
      </button>
    </header>

    <p v-if="!entries.length" class="track-log__empty">
      暂无上报 —— 触发点击 / 浏览 / 曝光后，payload 会实时打印在这里（同步输出到控制台）。
    </p>

    <ul v-else class="track-log__list">
      <li v-for="entry in entries" :key="entry.id" class="track-log__item">
        <div class="track-log__meta">
          <span class="track-log__chip">{{ entry.actionType }}</span>
          <span class="track-log__name">{{ entry.title }}</span>
          <time class="track-log__time">{{ entry.time }}</time>
        </div>
        <pre class="track-log__json">{{ entry.json }}</pre>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import { clearTrackLog, demoTrackLogEntries } from '../demoEventLog';

const entries = demoTrackLogEntries;
</script>

<style scoped>
.track-log {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
  overflow: hidden;
}

.track-log__head {
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--line);
  align-items: center;
  background: var(--surface-2);
}

.track-log__title {
  color: var(--faint);
  font: 700 10px/1 var(--mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.track-log__count {
  padding: 2px 8px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--muted);
  font: 600 10.5px/1.4 var(--mono);
}

.track-log__clear {
  margin-left: auto;
  min-height: 24px;
  padding: 0 10px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: transparent;
  color: var(--muted);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition:
    color 160ms ease,
    border-color 160ms ease;
}

.track-log__clear:hover:not(:disabled) {
  border-color: var(--danger);
  color: var(--danger);
}

.track-log__clear:disabled {
  opacity: 0.45;
  cursor: default;
}

.track-log__empty {
  margin: 0;
  padding: 20px 14px;
  color: var(--faint);
  font-size: 12.5px;
  line-height: 1.7;
  text-align: center;
}

.track-log__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 260px;
  margin: 0;
  padding: 12px;
  list-style: none;
  overflow-y: auto;
}

.track-log__meta {
  display: flex;
  gap: 8px;
  align-items: center;
}

.track-log__chip {
  padding: 2px 8px;
  border: 1px solid var(--accent-border);
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
}

.track-log__name {
  color: var(--text-strong);
  font: 600 12px/1.5 var(--mono);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.track-log__time {
  margin-left: auto;
  color: var(--faint);
  font: 500 10.5px/1.5 var(--mono);
}

.track-log__json {
  margin: 6px 0 0;
  padding: 10px 12px;
  border: 1px solid var(--line-soft);
  border-radius: 8px;
  background: var(--surface-2);
  color: var(--text);
  font: 400 11.5px/1.65 var(--mono);
  overflow-x: auto;
}

.track-log__list::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.track-log__list::-webkit-scrollbar-thumb {
  border: 3px solid transparent;
  border-radius: 8px;
  background: var(--line);
  background-clip: content-box;
}

.track-log__list::-webkit-scrollbar-thumb:hover {
  background: var(--faint);
  background-clip: content-box;
}
</style>
