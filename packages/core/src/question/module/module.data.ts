import { trueColor as rgb } from 'kolorist'
import type { Options } from '../type'

export default [
  {
    label: rgb(235, 186, 43)('Pinia'),
    value: 'pinia',
    hint: '符合直觉的 Vue.js 状态管理库',
  },
  {
    label: rgb(204, 204, 204)('Unocss'),
    value: 'unocss',
    hint: '即时按需的原子级 CSS 引擎',
  },
  {
    label: rgb(108, 92, 231)('uni-network'),
    value: 'uniNetwork',
    hint: '为 uni-app 打造的基于 Promise 的网络请求库',
  },
  {
    label: rgb(63, 168, 125)('uni-use'),
    value: 'uniUse',
    hint: 'uni-app 组合式工具集',
  },
  {
    label: rgb(52, 152, 219)('uni-promises'),
    value: 'uniPromises',
    hint: 'uni-app promise 化的 API',
  },
] as Options[]
