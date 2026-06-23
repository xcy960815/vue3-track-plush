<template>
  <section class="track-demo">
    <header class="track-demo__hero">
      <div>
        <p class="track-demo__eyebrow">Interactive playground</p>
        <h2>Try the shipped scenarios in place</h2>
        <p>
          The demo runs in debug mode inside the docs, so every tracking action prints its payload to the
          browser console instead of sending a real request.
        </p>
      </div>
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
  </section>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import { demoCases } from '../demoCases';

const activeName = ref(demoCases[0]?.name ?? 'basic');

const activeCase = computed(() => {
  return demoCases.find((item) => item.name === activeName.value) ?? demoCases[0];
});
</script>

<style scoped>
.track-demo {
  display: grid;
  gap: 18px;
}

.track-demo__hero {
  padding: 24px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 20px;
  background:
    radial-gradient(circle at top left, rgba(14, 165, 233, 0.18), transparent 34%),
    linear-gradient(135deg, #f8fbff 0%, #eef5ff 100%);
}

.track-demo__hero h2 {
  margin: 0;
  font-size: 28px;
  line-height: 1.2;
  color: #0f172a;
}

.track-demo__hero p {
  margin: 10px 0 0;
  max-width: 780px;
  color: #475569;
  line-height: 1.7;
}

.track-demo__eyebrow {
  margin: 0 0 10px !important;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #0369a1 !important;
}

.track-demo__tabs {
  display: grid;
  gap: 12px;
}

.track-demo__tab {
  width: 100%;
  display: grid;
  gap: 4px;
  padding: 16px 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 16px;
  background: #ffffff;
  color: #0f172a;
  text-align: left;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

.track-demo__tab:hover {
  transform: translateY(-1px);
  border-color: rgba(2, 132, 199, 0.28);
  box-shadow: 0 14px 36px -26px rgba(14, 116, 144, 0.5);
}

.track-demo__tab strong {
  font-size: 15px;
}

.track-demo__tab span {
  color: #64748b;
  line-height: 1.5;
}

.track-demo__tab.is-active {
  border-color: rgba(2, 132, 199, 0.42);
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.08), rgba(59, 130, 246, 0.12));
  box-shadow: 0 18px 40px -28px rgba(37, 99, 235, 0.55);
}

.track-demo__panel {
  min-width: 0;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(248, 250, 252, 0.72), rgba(255, 255, 255, 1));
  overflow: hidden;
}

.track-demo__panel :deep(.case-page) {
  padding: 24px;
}

@media (min-width: 960px) {
  .track-demo__tabs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
