<template>
  <div class='rollup-vue3-ts-template'>
    rollup-vue3-ts-template
  </div>
</template>
<script lang="ts">
import { testFun } from "./test"
import { onMounted, defineComponent } from "vue"
export default defineComponent({
  name: "rollup-vue3-ts-template",
  setup() {
    onMounted(() => {
      console.log('onMounted');
      testFun()
    })
  }
}) 
</script>
<style lang='less' scoped>
</style>