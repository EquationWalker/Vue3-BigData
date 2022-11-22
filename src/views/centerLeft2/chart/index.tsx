import { defineComponent, onMounted, onUnmounted, reactive,
getCurrentInstance } from 'vue'
import Draw from './draw'

export default defineComponent({
  components: {
    Draw
  },
  setup() {
    const cdata = reactive([{
      name:"青岛市",
      value:1227
    }])
    const {proxy} = getCurrentInstance() as any

    const setData = async () => {
      const {data} = await proxy.$http.get('/getLocalProvince')
      cdata.length = 0
      data.forEach((e)=>{
        if (e['name'] == "地区待确认" || e['name'] == "境外输入") return
        cdata.push({
          name:e['name'] + "市", 
          value:e['total']['confirm']
        })
      })

      //console.log(cdata)

    }

    let timer = null
    onMounted(()=>{
      setData()
      timer = setInterval(setData, 6000)
      })

    onUnmounted(()=>{
      clearInterval(timer)
    })

    return () => {
      return <div>
        <Draw cdata={cdata} />
      </div>
    }
  }
})