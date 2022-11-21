<template>
  <div class="centreLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <i class="iconfont icon-tongji4" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">数据统计</span>
          <dv-decoration-3 class="dv-dec-3" />
        </div>
      </div>
      <div class="d-flex jc-center">
        <chart />
      </div>
      <!-- 4个主要的数据 -->
      <div class="bottom-data">
        <div
          class="item-box mt-2"
          v-for="(item, index) in numberData"
          :key="index"
        >
          <div class="d-flex jc-end">
            <i class="iconfont" :class="[iconFont[index]]" />
            <dv-digital-flop class="dv-digital-flop" :config="item.config" />
          </div>
          <p>
            <span> {{ item.text }} </span>
            <span class="colorYellow">(万人)</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  onMounted,
  onUnmounted,
  reactive,
  getCurrentInstance,
} from "vue";
import Chart from "./chart/index";
const iconFont = [
  "icon-diagnose",
  "icon-monitoring",
  "icon-cloudupload",
  "icon-clouddownload",
];
const numberData = reactive([]);
let intervalInstance = null;
onMounted(() => {
  setData();
  changeTiming();
});

const { proxy } = getCurrentInstance() as any;
const strIdx = ["localConfirmAdd", "confirm", "heal", "dead"];
const label = ["新增确诊", "累计确诊", "累计治愈", "累计死亡"];
const setData = async () => {
  const { data } = await proxy.$http.get("/getTotal");
  numberData.length = 0;
  strIdx.forEach((e, idx) => {
    numberData.push({
      config: {
        number: [data[e] / 10000],
        toFixed: 1,
        content: "{nt}",
        style: {
          fontSize: 24,
        },
      },
      text: label[idx],
    });
  });
};

const changeTiming = () => {
  intervalInstance = setInterval(setData, 5000);
}
onUnmounted(() => {
  clearInterval(intervalInstance);
})
</script>

<style lang="scss" scoped>
$box-width: 300px;
$box-height: 410px;

.centreLeft1 {
  padding: 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 10px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .dv-dec-3 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }

  .bottom-data {
    .item-box {
      & > div {
        padding-right: 5px;
      }
      font-size: 14px;
      float: right;
      position: relative;
      width: 50%;
      color: #d3d6dd;
      .dv-digital-flop {
        width: 120px;
        height: 30px;
      }
      i {
        font-size: 20px;
        line-height: 30px;
        margin-left: 20px;
      }
      .colorYellow {
        color: yellowgreen;
      }
      p {
        text-align: center;
      }
    }
  }
}
</style>
