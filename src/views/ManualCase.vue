<template>
  <article class="case-page" v-track:browse="{ pageName: '手动上报测试页', routeName: 'manual' }">
    <header class="case-header">
      <h2>手动上报</h2>
      <p>测试 clickEvent、browseEvent 和 exposureEvent 三个导出方法。</p>
    </header>

    <section class="case-panel">
      <button type="button" @click="customClickReport">自定义点击上报</button>
      <button type="button" @click="customBrowseReport">自定义浏览上报</button>
      <button type="button" @click="customExposureReport">自定义曝光上报</button>
    </section>
  </article>
</template>

<script lang="ts" setup>
import { browseEvent, clickEvent, exposureEvent } from '../../plugin';
import { demoTrackConfig } from '../demoTrackConfig';

const customClickReport = () => {
  clickEvent({
    ...demoTrackConfig,
    buttonName: '自定义点击按钮',
    routeName: 'manual',
  });
};

const customBrowseReport = () => {
  browseEvent({
    ...demoTrackConfig,
    pageName: '自定义浏览页面',
    routeName: 'manual',
  });
};

const customExposureReport = () => {
  exposureEvent({
    ...demoTrackConfig,
    exposureName: '自定义曝光区域',
    routeName: 'manual',
  });
};
</script>

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

.case-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 24px;
  border: 1px solid #d8dee9;
  border-radius: 8px;
  background: #ffffff;
}
</style>
