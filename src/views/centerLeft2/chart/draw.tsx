import { defineComponent, watch, reactive } from 'vue';

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
    let options = reactive({})
    // 设置点的位置(经纬度)
    const geoCoordMap = {
      济南市: [36.650061, 117.113634],
      青岛市: [36.066351, 122.384024],
      烟台市: [37.260191, 123.248854],
      威海市: [37.624071,125.14396],
      东营市: [38.132243, 119.689012],
      淄博市: [36.508246, 118.776947],
      潍坊市: [36.990464, 120.16892],
      日照市: [35.194396, 120.532912],
      菏泽市: [34.82303, 115.494009],
      枣庄市: [33.804525, 118.113965],
      德州市: [37.422241, 116.354988],
      滨州市: [38.477755, 118.478949],
      临沂市: [35.097131, 119.35694],
      济宁市: [35.137314, 116.613982],
      聊城市: [36.248727, 115.569998],
      泰安市: [35.989288, 117.096971],
    }
    const seriesData = Object.keys(geoCoordMap)
    const convertData = function (data: any) {
      const scatterData = [];
      for (let i = 0; i < data.length; i++) {
        const geoCoord = geoCoordMap[data[i]];
        console.log([geoCoord[1], geoCoord[0], 20])
        if (geoCoord) {
          scatterData.push({
            name: data[i],
            value: [geoCoord[1], geoCoord[0]],
          });
        }
      }
      //console.log(scatterData)
      return scatterData;
    }
    // 监听
    watch(
      () => props.cdata,
      (newVal: any) => {

        options = reactive({
          showLegendSymbol: true,
          tooltip: {
            trigger: 'item',
            textStyle: {
              fontSize: 15,
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
          visualMap: {
            min: 0,
            max: 200,
            show: true,
            seriesIndex: 0,
            // 颜色
            inRange: {
              color: ['rgba(41,166,206, .5)', 'rgba(69,117,245, .9)'],
            },
          },
          // 底部背景
          geo: [{
            show: true,
            aspectScale: 1, //长宽比
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
              name: '累计确诊人数',
              type: 'map',
              aspectScale: 1, //长宽比
              zoom: 1.8, //缩放
              mapType: 'China', // 自定义扩展图表类型
              bottom: '10%',
              left: '26%',
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
                show: true,
                position: 'insideRight',
                textStyle: {
                  fontSize: 12,
                  color: '#efefef',
                },
                emphasis: {
                  textStyle: {
                    color: '#fff',
                  },
                },
              },
              data: newVal
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
                console.log('val', val)
                return Math.ceil(Math.random() * 25);
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
        })
      },
      {
        immediate: true,
        deep: true
      }
    )
    return () => {
      const height = "360px"
      const width = "550px"

      return <div>
        <echart options={options} height={height} width={width} />
      </div>
    }
  }
})

