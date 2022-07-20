<template>
    <!-- 测试参数传递对象 -->
    <div class='example' v-track:browse :track-params="{ name: 'testName', pageName: 'pageName' }">
        <button v-track:click :track-params="{ buttonName: '指令点击上报(参数是对象)' }">指令点击上报(参数是对象)</button>
    </div>
    <!-- 测试参数传递字符串 -->
    <div class='example' v-track:browse track-params="example">
        <button v-track:click track-params="指令点击上报(参数是字符串)">指令点击上报(参数是字符串)</button>
    </div>

    <button @click="customClickReport">自定义点击上报</button>

    <button @click="customBrowseReport">自定义浏览上报</button>
</template>
<script lang='ts' setup>
import { browseEvent, clickEvent } from "vue3-track-plush"
// 自定义点击上报
const customClickReport = () => {
    clickEvent({
        baseURL: "<接口域名>",
        url: "<接口地址>",
        projectName: "测试开发",
        buttonName: "按钮名称",
        param1: "参数1",
        param2: "参数2",
        paramN: "参数n"
    })
}
// 自定义浏览上班
const customBrowseReport = () => {
    browseEvent({
        baseURL: "<接口域名>",
        url: "<接口地址>",
        projectName: "测试开发",
        pageName: "页面名称",
        param1: "参数1",
        param2: "参数2",
        paramN: "参数n"
    })
}
</script>
<style lang='less' scoped>
</style>


