<template>
  <div class="centerRight2">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <i class="iconfont icon-vector" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">新增确诊榜</span>
        </div>
      </div>
      <div class="d-flex mt-1 jc-center body-box">
        <dv-scroll-board class="dv-scr-board" :config="config" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, getCurrentInstance, onMounted, onUnmounted } from "vue";
const config = reactive({
  header: ["省份", "总计", "新增"],
  data: [],
  //rowNum: 7, //表格行数
  waitTime: 2000,
  carousel: "page",
  headerHeight: 35,
  headerBGC: "#0f1325", //表头
  oddRowBGC: "#0f1325", //奇数行
  evenRowBGC: "#171c33", //偶数行
  index: true,
  columnWidth: [50],
  align: ["center"],
});
const { proxy } = getCurrentInstance() as any

const setData = async () => {
  const { data } = await proxy.$http.get("/getCenterRight2");
  config.data = [];
  for (let i = 0; i < data.length; i++) {
    const provinceName = data[i][0];
    const nowConfirm = data[i][1]["nowConfirm"];
    const newAdd = data[i][1]["confirmAdd"];
    let item = [
      provinceName,
      nowConfirm,
      `<span  class='colorGrass'>↑${newAdd}</span>`,
    ];
    config.data.push(item);
  }
};
let timer = null;
onMounted(() => {
  setData();
  timer = setInterval(() => {
    setData();
  }, 100000);
});
onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style lang="scss" scoped>
$box-height: 410px;
$box-width: 300px;
.centerRight2 {
  padding: 16px;
  padding-top: 20px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 10px;
    overflow: hidden;
    .dv-scr-board {
      width: 270px;
      height: 340px;
    }
  }
}
</style>
