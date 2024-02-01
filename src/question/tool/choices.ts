import { trueColor as rgb } from 'kolorist'
import type { ModelType } from '../type'

export const modelList: ModelType[] = [
  {
    title: rgb(235, 186, 43)('Pinia'),
    value: 'pinia',
    description: '符合直觉的 Vue.js 状态管理库',
  },
  {
    title: rgb(204, 204, 204)('Unocss'),
    value: 'unocss',
    description: '即时按需的原子级 CSS 引擎',
  },
  {
    title: rgb(108, 92, 231)('uni-network'),
    value: 'uniNetwork',
    description: '为 uni-app 打造的基于 Promise 的 HTTP 客户端',
  },
  {
    title: rgb(63, 168, 125)('uni-use'),
    value: 'uniUse',
    description: 'uni-app 组合式工具集',
  },
  {
    title: rgb(52, 152, 219)('uni-promises'),
    value: 'uniPromises',
    description: 'uni-app promise 化的 API',
  },
]
