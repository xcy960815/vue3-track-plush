<template>
  <article class="case-page" v-track:browse track-params="兼容写法测试页">
    <header class="case-header">
      <h2>兼容写法</h2>
      <p>测试旧版本的静态和动态 track-params 属性，确保升级后仍可工作。</p>
    </header>

    <section class="case-panel">
      <button v-track:click track-params="静态 track-params 按钮">静态 track-params</button>
      <button v-track:click :track-params="{ buttonName: '动态 track-params 按钮', routeName: 'compatibility' }">
        动态 track-params
      </button>
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

