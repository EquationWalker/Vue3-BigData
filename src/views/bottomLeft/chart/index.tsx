import { defineComponent, reactive, onMounted, getCurrentInstance } from 'vue'
import Draw from './draw'

export default defineComponent({
  components: {
    Draw
  },
  setup() {
    const cdata = reactive({
      category: [
        "市区",
        "万州",
        "江北",
        "南岸",
        "北碚",
        "綦南",
        "长寿",
        "永川",
        "璧山",
        "江津",
        "城口",
        "大足",
        "垫江",
        "丰都",
        "奉节",
        "合川",
        "江津区",
        "开州",
        "南川",
        "彭水",
        "黔江",
        "石柱",
        "铜梁",
        "潼南",
        "巫山",
        "巫溪",
        "武隆",
        "秀山",
        "酉阳",
        "云阳",
        "忠县",
        "川东",
        "检修"
      ],
      lineData: [
        18092,
        20728,
        24045,
        28348,
        32808,
        36097,
        39867,
        44715,
        48444,
        50415,
        56061,
        62677,
        59521,
        67560,
        18092,
        20728,
        24045,
        28348,
        32808,
        36097,
        39867,
        44715,
        48444,
        50415,
        36097,
        39867,
        44715,
        48444,
        50415,
        50061,
        32677,
        49521,
        32808
      ],
      barData: [
        4600,
        5000,
        5500,
        6500,
        7500,
        8500,
        9900,
        12500,
        14000,
        21500,
        23200,
        24450,
        25250,
        33300,
        4600,
        5000,
        5500,
        6500,
        7500,
        8500,
        9900,
        22500,
        14000,
        21500,
        8500,
        9900,
        12500,
        14000,
        21500,
        23200,
        24450,
        25250,
        75
      ],
      rateData: []
    })

    const { proxy } = getCurrentInstance() as any
    // methods
    const setData = async () => {

      const newData = await proxy.$http.get('/getBottomLeft')


      cdata.category.length = cdata.lineData.length = cdata.barData.length
       = cdata.rateData.length = 0

      for (let i = 0; i < newData.data.length; i++) {
        let healRate = newData.data[i]['healRate']
        
        if (healRate > 1) healRate = healRate - Math.floor(healRate) + 0.05
        if (healRate == 1) healRate = healRate - 0.01
        
        healRate = parseFloat(healRate).toFixed(2)
        cdata.category.push(newData.data[i]['date'])
        cdata.lineData.push(newData.data[i]['confirm'])
        cdata.barData.push(Math.ceil(newData.data[i]['confirm']*healRate))
        cdata.rateData.push(healRate )
      }

     
    }

    
    // 生命周期
    onMounted(() => {
      setData()
      // setInterval(()=>{
      //   setData()
      // }, 2500)
    })

    return () => {
      return <div>
        <Draw cdata={cdata} />
      </div>
    }
  }
})