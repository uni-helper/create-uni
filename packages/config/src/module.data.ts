import type { Options } from './type'
import { trueColor as rgb } from 'kolorist'

export default [
  {
    label: rgb(235, 186, 43)('Pinia'),
    value: 'pinia',
    name: 'pinia',
    website: 'https://pinia.vuejs.org/zh/',
    github: 'https://github.com/vuejs/pinia',
    hint: '符合直觉的 Vue.js 状态管理库',
  },
  {
    label: rgb(204, 204, 204)('Unocss'),
    value: 'unocss',
    name: 'unocss',
    github: 'https://github.com/unocss/unocss',
    website: 'https://unocss.dev/',
    hint: '即时按需的原子级 CSS 引擎',
  },
  {
    label: rgb(108, 92, 231)('uni-network'),
    value: 'uniNetwork',
    name: 'uni-network',
    github: 'https://github.com/uni-helper/uni-network',
    website: 'https://uni-network.netlify.app/',
    hint: '为 uni-app 打造的基于 Promise 的网络请求库',
  },
  {
    label: rgb(63, 168, 125)('uni-use'),
    value: 'uniUse',
    name: 'uni-use',
    github: 'https://github.com/uni-helper/uni-use',
    website: 'https://uni-helper.github.io/uni-use/',
    hint: 'uni-app 组合式工具集',
  },
  {
    label: rgb(52, 152, 219)('uni-promises'),
    value: 'uniPromises',
    name: 'uni-promises',
    github: 'https://github.com/uni-helper/uni-promises',
    hint: 'uni-app promise 化的 API',
  },
  {
    label: rgb(24, 121, 78)('uni-echarts'),
    value: 'uniEcharts',
    name: 'uni-echarts',
    github: 'https://github.com/xiaohe0601/uni-echarts',
    hint: '适用于 uni-app 的 Apache ECharts 组件',
  },
] as Options[]
