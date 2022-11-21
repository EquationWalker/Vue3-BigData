import { defineComponent,onMounted, onUnmounted, reactive, getCurrentInstance } from 'vue'
import Draw from './draw'

export default defineComponent({
  components: {
    Draw,
  },
  setup() {
    let intervalInstance = null
    const cdata = reactive({
      xData: ['新增确诊', '累计治愈',  '累计确诊',  '累计死亡'],
      seriesData: [
        // { value: 10, name: '新增确诊' },
        // { value: 10, name: '新增境外' },
        // { value: 5, name: '累计治愈' },
        // { value: 15, name: '累计确诊' },
        // { value: 35, name: '累计死亡' },
      ],
    })

    const {proxy} = getCurrentInstance() as any

    const setData = async () => {

      const {data} = await proxy.$http.get("/getTotal")
      
      cdata.seriesData = [
        { value: data['localConfirmAdd'], name: '新增确诊' },
        { value: data['heal'], name: '累计治愈' },
        { value: data['local_acc_confirm'], name: '累计确诊' },
        { value: data['dead'], name: '累计死亡' },
      ]
    }
    onMounted(() => {
      setData()
      intervalInstance = setInterval(setData, 10000)
    })

    onUnmounted(() => {
      clearInterval(intervalInstance)
    })
    return () => {
      return (
        <div>
          <Draw cdata={cdata} />
        </div>
      )
    }
  }
})
