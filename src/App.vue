<template>
  <main class="demo-shell">
    <aside class="demo-sidebar">
      <div class="brand">
        <h1>vue3-track-plush</h1>
        <p>Route based tracking demo</p>
      </div>

      <nav class="nav-list" aria-label="Demo cases">
        <RouterLink
          v-for="routeItem in navRoutes"
          :key="routeItem.path"
          class="nav-link"
          :to="routeItem.path"
        >
          <span>{{ routeItem.meta.title }}</span>
          <small>{{ routeItem.meta.description }}</small>
        </RouterLink>
      </nav>
    </aside>

    <section class="demo-content">
      <RouterView />
    </section>
  </main>
</template>

<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router';

import { caseRoutes } from './router';

const navRoutes = caseRoutes;
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
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
</style>

<style scoped>
.demo-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
}

.demo-sidebar {
  min-height: 100vh;
  padding: 28px 20px;
  border-right: 1px solid #d8dee9;
  background: #ffffff;
}

.brand {
  padding: 0 8px 20px;
  border-bottom: 1px solid #e5e7eb;
}

.brand h1 {
  margin: 0 0 8px;
  font-size: 22px;
  line-height: 1.2;
}

.brand p {
  margin: 0;
  color: #667085;
}

.nav-list {
  display: grid;
  gap: 8px;
  margin-top: 20px;
}

.nav-link {
  display: grid;
  gap: 4px;
  padding: 12px;
  border-radius: 8px;
  color: #1f2937;
  text-decoration: none;
}

.nav-link small {
  color: #667085;
  line-height: 1.4;
}

.nav-link.router-link-active {
  background: #eef2ff;
  color: #3730a3;
}

.demo-content {
  min-width: 0;
  padding: 32px;
}

@media (max-width: 760px) {
  .demo-shell {
    grid-template-columns: 1fr;
  }

  .demo-sidebar {
    min-height: auto;
    border-right: 0;
    border-bottom: 1px solid #d8dee9;
  }
}
</style>
