import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// main.ts中全局引入
import DataVVue3 from '@kjgl77/datav-vue3'
// 引入全局css
import './assets/scss/style.scss';
// 引入图表（所有图标见 icon 目录下的 demo_index.html）
import './assets/icon/iconfont.css'
// 引入 全局注册组件
import PublicComponent from '@/components/componentInstall';

import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:5000'

const app = createApp(App)
app.config.globalProperties.$http = axios
app.use(PublicComponent)
app.use(DataVVue3)
app.use(store)
app.use(router)

app.mount('#app')




