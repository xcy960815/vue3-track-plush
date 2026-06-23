import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';

import { demoCases } from './demoCases';

export const caseRoutes: RouteRecordRaw[] = demoCases;

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: demoCases[0]?.path ?? '/basic',
    },
    ...caseRoutes,
    {
      path: '/:pathMatch(.*)*',
      redirect: demoCases[0]?.path ?? '/basic',
    },
  ],
});
