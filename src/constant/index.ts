import { ModuleInfo } from './index.d'

// 星期
export const WEEK = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

// 主题名称与副标题名称
export const title = '新冠疫情可视化大屏'
export const subtitle = ['全国疫情', '山东省疫情', '排行榜']

export const moduleInfo: ModuleInfo = [
  // 中间的几个模块
  {
    name: '全国疫情数据',
    icon: 'icon-chart-bar',
  },
  {
    name: '山东疫情数据',
    icon: 'icon-tongji4',
  },
  {
    name: '全国疫情总数据',
    icon: 'icon-align-left',
  },
  {
    name: '新增确诊排行榜',
    icon: 'icon-zhibiao2',
  },
  // 底部两个模块
  {
    name: '治愈&确诊统计图',
    icon: 'icon-vector',
  },
  {
    name: '疫苗接种统计图',
    icon: 'icon-fenxi7',
  },
]
