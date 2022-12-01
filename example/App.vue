<template>
  <h2 align="center">vue3-track-plush 测试demo</h2>
  <!-- 测试参数传递对象 -->
  <!-- <div class="button-box" v-track:click="browseParams"> -->
  <button v-track:click="clickParams">指令点击上报(参数是对象)</button>
  <!-- </div> -->

  <!-- 测试参数传递字符串 -->
  <!-- <div class="button-box" v-track:browse track-params="example">
    <button v-track:click="'指令点击上报(参数是字符串)'">
      指令点击上报(参数是字符串)
    </button>
  </div>
  <div class="button-box">
    <button @click="customClickReport">自定义点击上报</button>
  </div>

  <div class="button-box">
    <button @click="customBrowseReport">自定义浏览上报</button>
  </div> -->

  <!-- 测试动态数据上报 -->
  <!-- <div class="button-box">
    <button @click="clickNumber++">动态修改上报点击数据</button> ===》{{
      clickNumber
    }}
    <button
      v-track:click="{
        buttonName: '点击的上报数据',
        currentNunber: clickNumber,
      }"
    >
      上报点击数据
    </button>
  </div> -->
  <!-- <div class="button-box">
    <button @click="browseNumber++">动态修改上报数据</button> ===》
    {{ browseNumber }}
    <button
      v-track:browse="{
        buttonName: '浏览的上报数据',
        currentNunber: browseNumber,
      }"
    >
      上报浏览数据
    </button>
  </div> -->
</template>
<script lang="ts" setup>
import { ref, watch, reactive, onMounted } from "vue";
const browseParams = ref(0);
const clickParams = ref(0);
// import { browseEvent, clickEvent } from "vue3-track-plush";
// const clickNumber = ref(0);
// const browseNumber = ref(0);
// watch(
//   () => clickNumber.value,
//   (val) => {
//     console.log("clickNumber", val);
//   }
// );
// watch(
//   () => browseParams,
//   (val) => {
//     console.log("browseNumber", val);
//   },
//   {
//     deep: true,
//   }
// );
// 自定义点击上报
const customClickReport = () => {
  // clickEvent({
  //   baseURL: "http://d.daily.vdian.net",
  //   url: "/api/action/record",
  //   projectName: "测试开发",
  //   buttonName: "按钮名称",
  //   param1: "参数1",
  //   param2: "参数2",
  //   paramN: "参数n",
  //   clickNumber: clickNumber.value,
  // });
  // clickNumber.value++;
};
// 自定义浏览上班
const customBrowseReport = () => {
  // browseEvent({
  //   // baseURL: "<接口域名>",
  //   // url: "<接口地址>",
  //   baseURL: "http://d.daily.vdian.net",
  //   url: "/api/action/record",
  //   projectName: "测试开发",
  //   pageName: "页面名称",
  //   param1: "参数1",
  //   param2: "参数2",
  //   paramN: "参数n",
  // });
};
onMounted(() => {
  //  延时器
  setTimeout(() => {
    clickParams.value++;
  }, 10000);
});
</script>
<style lang="less" scoped>
.button-box {
  margin-bottom: 10px;
  background-color: aqua;
  height: 100px;
}

button {
  margin-right: 10px;
}
</style>
