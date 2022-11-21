import { defineComponent, onUnmounted, reactive } from 'vue'
import Draw from './draw'

export default defineComponent({
  components: {
    Draw,
  },
  setup() {
    let intervalInstance = null
    const cdata = reactive({
      xData: ['本土确诊', '新增境外', '无症状', '新增确诊', '现有确诊', '累计死亡'],
      seriesData: [
        { value: 10, name: '本土确诊' },
        { value: 5, name: '新增境外' },
        { value: 15, name: '无症状' },
        { value: 25, name: '确诊' },
        { value: 20, name: '现有确诊' },
        { value: 35, name: '累计死亡' },
      ],
    })
    intervalInstance = setInterval(() => {
      const data = cdata.seriesData
      cdata.seriesData = data.map((e) => {
        return { value: e.value + 10, name: e.name }
      })
    }, 1000)

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
  },
})
