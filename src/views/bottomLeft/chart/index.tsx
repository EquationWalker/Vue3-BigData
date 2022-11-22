import { defineComponent, reactive, onMounted, getCurrentInstance
, onUnmounted } from 'vue'
import Draw from './draw'

export default defineComponent({
  components: {
    Draw
  },
  setup() {
    const cdata = reactive({
      category: [],
      lineData: [],
      barData: [],
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

    let timerInstance = null
    
    // 生命周期
    onMounted(() => {
      setData()
      timerInstance = setInterval(()=>{
        setData()
      }, 6000)
    })

    onUnmounted(() => {clearInterval(timerInstance)})

    return () => {
      return <div>
        <Draw cdata={cdata} />
      </div>
    }
  }
})