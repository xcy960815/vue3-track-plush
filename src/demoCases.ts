import type { Component } from 'vue';

import BasicCase from './views/BasicCase.vue';
import CompatibilityCase from './views/CompatibilityCase.vue';
import ExposureCase from './views/ExposureCase.vue';
import ManualCase from './views/ManualCase.vue';

export interface DemoCaseDefinition {
  path: string;
  name: string;
  component: Component;
  meta: {
    title: string;
    description: string;
  };
}

export const demoCases = [
  {
    path: '/basic',
    name: 'basic',
    component: BasicCase,
    meta: {
      title: '基础指令',
      description: '测试指令 value 传参、点击和浏览上报。',
    },
  },
  {
    path: '/compatibility',
    name: 'compatibility',
    component: CompatibilityCase,
    meta: {
      title: '兼容写法',
      description: '测试静态和动态 track-params 属性。',
    },
  },
  {
    path: '/exposure',
    name: 'exposure',
    component: ExposureCase,
    meta: {
      title: '曝光配置',
      description: '测试 threshold、duration、once 等曝光参数。',
    },
  },
  {
    path: '/manual',
    name: 'manual',
    component: ManualCase,
    meta: {
      title: '手动上报',
      description: '测试 clickEvent、browseEvent 和 exposureEvent。',
    },
  },
] satisfies DemoCaseDefinition[];
