<template>
  <article class="case-page" v-track:browse="{ pageName: '基础指令测试页', routeName: 'basic' }">
    <header class="case-header">
      <h2>基础指令</h2>
      <p>测试推荐的指令 value 传参，进入路由触发浏览上报，点击按钮触发点击上报。</p>
    </header>

    <section class="case-panel">
      <button v-track:click="{ buttonName: '基础对象参数按钮', routeName: 'basic' }">
        指令点击上报（对象）
      </button>
      <button v-track:click="'基础字符串参数按钮'">指令点击上报（字符串）</button>
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

