<template>
  <div class="centerRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <i class="iconfont icon-align-left" />
        </span>
        <span class="fs-xl text mx-2">新增无症状Top5</span>
      </div>
      <div class="d-flex ai-center flex-column body-box">
        <dv-capsule-chart class="dv-cap-chart" :config="config" />
        <!-- <chart /> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive} from 'vue'
//import Chart from "./chart/index";

const config = reactive({
  data: [
    {
      name: "南阳",
      value: 167,
    },
   
  ]
});
</script>

<style lang="scss" scoped>
$box-height: 400px;
$box-width: 400px;  //340
.centerRight1 {
  padding: 5px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    padding: 5px;
    height: $box-height;
    width: $box-width;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 10px;
    overflow: hidden;
    .dv-cap-chart {
      width: 100%;
      height: 340px;
    }
  }
}
</style>
