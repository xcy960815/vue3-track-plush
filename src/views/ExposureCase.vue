<template>
  <article v-track:browse="{ pageName: '曝光配置测试页', routeName: 'exposure' }" class="case-page">
    <header class="case-header">
      <h2>曝光配置</h2>
      <p>滚动容器查看不同曝光参数的触发行为。</p>
    </header>

    <section class="scroll-panel">
      <div class="spacer">向下滚动</div>
      <div
        v-track:exposure="{ exposureName: '默认曝光区域', routeName: 'exposure' }"
        class="exposure-box"
      >
        默认曝光：进入视口后上报一次
      </div>
      <div class="spacer small">继续滚动</div>
      <div
        v-track:exposure="{
          exposureName: '停留曝光区域',
          duration: 1000,
          threshold: 0.75,
          routeName: 'exposure',
        }"
        class="exposure-box strong"
      >
        停留曝光：可见 75% 且保持 1 秒
      </div>
    </section>
  </article>
</template>

<style scoped>
.scroll-panel {
  height: 420px;
  overflow-y: auto;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
}

.scroll-panel::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.scroll-panel::-webkit-scrollbar-thumb {
  border: 3px solid transparent;
  border-radius: 8px;
  background: var(--line);
  background-clip: content-box;
}

.scroll-panel::-webkit-scrollbar-thumb:hover {
  background: var(--faint);
  background-clip: content-box;
}

.spacer {
  height: 360px;
  display: grid;
  place-items: center;
  color: var(--faint);
}

.spacer.small {
  height: 220px;
}

.exposure-box {
  min-height: 140px;
  display: grid;
  padding: 0 16px;
  border: 1px solid var(--accent-border);
  border-radius: 10px;
  background: var(--accent-soft);
  color: var(--accent);
  place-items: center;
  font-weight: 600;
  text-align: center;
}

.exposure-box.strong {
  border-color: var(--accent-2-border);
  background: var(--accent-2-soft);
  color: var(--accent-2);
}
</style>
