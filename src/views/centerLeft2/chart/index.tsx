import { defineComponent, onMounted, onUnmounted, reactive } from 'vue'
import Draw from './draw'

export default defineComponent({
  components: {
    Draw
  },
  setup() {
    const cdata = reactive([
      {
        name: '济南市',
        value:10
      },
      {
        name: '青岛市',
        value:8
      },
      {
        name: '烟台市',
        value:10
      },
      {
        name: '临沂市',
        value:10
      },
      {
        name: '日照市',
        value:10
      },
      {
        name: '济南市',
        value:10
      },
      {
        name: '泰安市',
        value:10
      },
      {
        name: '德州市',
        value:10
      },
    ])

    let timer = null
    onMounted(()=>{
      timer = setInterval(()=>{
        cdata.forEach((e)=>{
          e.value = Math.random();
        }, 1000)
      })
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