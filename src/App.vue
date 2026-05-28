<template>
  <main class="demo-page">
    <section class="demo-panel" v-track:browse :track-params="{ pageName: '对象参数浏览', name: 'demo' }">
      <h1>vue3-track-plush</h1>
      <p>Vue 3 directive tracking plugin demo.</p>

      <div class="actions">
        <button v-track:click :track-params="{ buttonName: '对象参数点击' }">指令点击上报（对象）</button>
        <button v-track:click track-params="字符串参数点击">指令点击上报（字符串）</button>
        <button type="button" @click="customClickReport">自定义点击上报</button>
        <button type="button" @click="customBrowseReport">自定义浏览上报</button>
        <button type="button" @click="customExposureReport">自定义曝光上报</button>
      </div>

      <div class="scroll-area">
        <div class="spacer">向下滚动查看曝光区域</div>
        <div
          class="exposure-box"
          v-track:exposure
          :track-params="{ exposureName: 'Demo曝光区域', moduleName: 'scroll-area' }"
        >
          曝光埋点区域
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { browseEvent, clickEvent, exposureEvent } from '../plugin';

const requestConfig = {
  baseURL: '/track-api',
  url: '/action/record',
  projectName: 'vue3-track-plush-demo',
};

const customClickReport = () => {
  clickEvent({
    ...requestConfig,
    buttonName: '自定义点击按钮',
    source: 'demo',
  });
};

const customBrowseReport = () => {
  browseEvent({
    ...requestConfig,
    pageName: '自定义浏览页面',
    source: 'demo',
  });
};

const customExposureReport = () => {
  exposureEvent({
    ...requestConfig,
    exposureName: '自定义曝光区域',
    source: 'demo',
  });
};
</script>

<style scoped>
.demo-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  margin: 0;
  padding: 32px;
  box-sizing: border-box;
  background: #f5f7fb;
  color: #1f2937;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

.demo-panel {
  width: min(720px, 100%);
  padding: 32px;
  border: 1px solid #d8dee9;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 12px 36px rgb(15 23 42 / 8%);
}

h1 {
  margin: 0 0 8px;
  font-size: 28px;
  line-height: 1.2;
}

p {
  margin: 0 0 24px;
  color: #667085;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

button {
  min-height: 40px;
  padding: 0 14px;
  border: 1px solid #c7d2fe;
  border-radius: 6px;
  background: #eef2ff;
  color: #3730a3;
  font: inherit;
  cursor: pointer;
}

button:hover {
  background: #e0e7ff;
}

.scroll-area {
  height: 220px;
  overflow-y: auto;
  margin-top: 28px;
  border: 1px solid #d8dee9;
  border-radius: 8px;
  background: #f8fafc;
}

.spacer {
  height: 260px;
  display: grid;
  place-items: center;
  color: #64748b;
}

.exposure-box {
  min-height: 120px;
  display: grid;
  place-items: center;
  margin: 0 16px 16px;
  border-radius: 8px;
  background: #dcfce7;
  color: #166534;
  font-weight: 600;
}
</style>
