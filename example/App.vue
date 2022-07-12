<template>
    <div class='example' v-track:browse track-params="example">
        <button v-track:click track-params="按钮名称">Click Me</button>
    </div>
</template>
<script lang='ts' setup>
import { onMounted, defineComponent } from "vue"

onMounted(() => {

})

</script>
<style lang='less' scoped>
</style>