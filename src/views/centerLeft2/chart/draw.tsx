import { defineComponent, watch, shallowReactive, nextTick, ref, onUnmounted } from 'vue';

// 声明类型
const PropsType = {
  cdata: {
    type: Array,
    require: true
  }
} as const

// 定义主体
export default defineComponent({
  props: PropsType,
  setup(props) {
    // 配置项
    let options = shallowReactive({showLegendSymbol:null,tooltip:null,geo:null,series:null})
    // 设置点的位置(经纬度)
    const geoCoordMap = {
      济南市: [117.120083,36.652989, 20],
      青岛市: [120.388516,36.075735, 20],
      烟台市: [121.432217,37.466132, 20],
      临沂市: [118.367031,35.065966, 20],
      日照市: [119.52179,35.411679, 20],
      济宁市: [116.577454,35.400486, 20],
      泰安市: [117.110291,36.180246, 20],
      德州市: [116.368714,37.429304, 20],
    }
    const seriesData = [
      {
        name: '济南市',
      },
      {
        name: '青岛市',
      },
      {
        name: '烟台市',
      },
      {
        name: '临沂市',
      },
      {
        name: '日照市',
      },
      {
        name: '济南市',
      },
      {
        name: '泰安市',
      },
      {
        name: '德州市',
      },
    ]
    const convertData = function (data) {
      const scatterData = [];
      for (let i = 0; i < data.length; i++) {
        const geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          scatterData.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
          });
        }
      }
      return scatterData;
    }
    // 监听
    watch(
      () => props.cdata,
      (val: any) => {
        options = {
          showLegendSymbol: true,
          tooltip: {
            trigger: 'item',
            textStyle: {
              fontSize: 14,
              lineHeight: 22,
            },
            position: point => {
              // 固定在顶部
              return [point[0] + 50, point[1] - 20];
            },
            // 如果需要自定义 tooltip样式，需要使用formatter
            /*
              formatter: params => {
                return `<div style=""> ... </div>`
              }
            */
          },
          // 如果需要根据不同的数据展示深浅不一的颜色，则把这里打开
          // visualMap: {
          //   min: 0,
          //   max: 10,
          //   show: false,
          //   seriesIndex: 0,
          //   // 颜色
          //   inRange: {
          //     color: ['rgba(41,166,206, .5)', 'rgba(69,117,245, .9)'],
          //   },
          // },
          // 底部背景
          geo: [{
            show: true,
            aspectScale: 0.85, //长宽比
            zoom: 1.16,
            bottom: '10%',
            left: '17%',
            map: 'China',
            roam: false,
            itemStyle: {
              normal: {
                borderColor: '#7ad5ff7f',
                shadowOffsetY: 5,
                shadowBlur: 15,
                areaColor: 'rgba(5,21,35,0.1)'
              }
            }
          }],
          series: [
            {
              name: '感染人数',
              type: 'map',
              aspectScale: 0.92, //长宽比
              zoom: 1.16, //缩放
              mapType: 'China', // 自定义扩展图表类型
              bottom: '6%',
              left: '6%',
              itemStyle: {
                normal: {
                  // 背景渐变色
                  areaColor: {
                    type: 'linear-gradient',
                    x: 0,
                    y: 300,
                    x2: 0,
                    y2: 0,
                    colorStops: [{
                      offset: 0,
                      color: 'RGBA(19,96,187,1)' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: 'RGBA(7,193,223,1)' // 50% 处的颜色
                    }],
                    global: true // 缺省为 false
                  },
                  borderColor: '#4ECEE6',
                  borderWidth: 1,
                },
                emphasis: {
                  areaColor: '#4f7fff',
                  borderColor: 'rgba(0,242,252,.6)',
                  borderWidth: 2,
                  shadowBlur: 10,
                  shadowColor: '#00f2fc',
                },
              },
              label: {
                formatter: params => `${params.name}`,
                show: false,
                position: 'insideRight',
                textStyle: {
                  fontSize: 14,
                  color: '#efefef',
                },
                emphasis: {
                  textStyle: {
                    color: '#fff',
                  },
                },
              },
              data: val,
            },
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              effectType: 'ripple',
              legendHoverLink: false,
              showEffectOn: 'render',
              rippleEffect: {
                period: 4,
                scale: 2.5,
                brushType: 'stroke',
              },
              zlevel: 1,
              symbolSize: function (val) {
                return val[2]/4 ; 
            },
              itemStyle: {
                normal: {
                  color: '#99FBFE',
                  shadowBlur: 5,
                  shadowColor: '#fff',
                },
              },
              data: convertData(seriesData),
            },
          ],
        }
      },
      {
        immediate: true,
        deep: true
      }
    )
    return () => {
      const height = "360px"
      const width = "330px"

      return <div>
        <echart options={options} height={height} width={width} />
      </div>
    }
  }
})

