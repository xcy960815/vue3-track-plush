<template>
  <article class="case-page" v-track:browse="{ pageName: '曝光配置测试页', routeName: 'exposure' }">
    <header class="case-header">
      <h2>曝光配置</h2>
      <p>滚动容器查看不同曝光参数的触发行为。</p>
    </header>

    <section class="scroll-panel">
      <div class="spacer">向下滚动</div>
      <div
        class="exposure-box"
        v-track:exposure="{ exposureName: '默认曝光区域', routeName: 'exposure' }"
      >
        默认曝光：进入视口后上报一次
      </div>
      <div class="spacer small">继续滚动</div>
      <div
        class="exposure-box strong"
        v-track:exposure="{ exposureName: '停留曝光区域', duration: 1000, threshold: 0.75, routeName: 'exposure' }"
      >
        停留曝光：可见 75% 且保持 1 秒
      </div>
    </section>
  </article>
</template>

<style scoped>
.case-page {
  display: grid;
  gap: 20px;
}

.case-header h2 {
  margin: 0 0 8px;
  font-size: 28px;
}

.case-header p {
  margin: 0;
  color: #667085;
}

.scroll-panel {
  height: 420px;
  overflow-y: auto;
  padding: 16px;
  border: 1px solid #d8dee9;
  border-radius: 8px;
  background: #ffffff;
}

.spacer {
  height: 360px;
  display: grid;
  place-items: center;
  color: #64748b;
}

.spacer.small {
  height: 220px;
}

.exposure-box {
  min-height: 140px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: #dcfce7;
  color: #166534;
  font-weight: 600;
}

.exposure-box.strong {
  background: #fef3c7;
  color: #92400e;
}
</style>

