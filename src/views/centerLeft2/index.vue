<template>
  <div class="centreLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <i class="iconfont icon-layer-group" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">地图数据</span>
          <dv-decoration-1 class="dv-dec-1" />
        </div>
      </div>
      <div class="d-flex jc-center">
        <chart />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Chart from './chart/index'
</script>

<style lang="scss" scoped>
.centreLeft1 {
  $box-width: 600px;  // 300
  $box-height: 410px;
  padding: 16px;
  height: $box-height;
  min-width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .dv-dec-1 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }
  .chart-box {
    margin-top: 16px;
    width: 170px; // 170
    height: 170px;
    .active-ring-name {
      padding-top: 10px;
    }
  }
}
</style>
