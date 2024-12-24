import { green, trueColor as rgb } from 'kolorist'
import type { Options } from '../type'

export const UIList: Options[] = [
  {
    label: '不需要组件库',
    hint: '',
    value: null,
  },
  {
    label: green('Uni UI'),
    hint: 'UniApp官方组件库',
    value: 'uni',
  },
  {
    label: rgb(77, 128, 240)('wot-design-uni'),
    hint: '高颜值、轻量化的uni-app组件库',
    value: 'wot',
  },
  {
    label: rgb(250, 44, 25)('nutui-uniapp'),
    hint: '京东风格的轻量级移动端组件库',
    value: 'nut',
  },
  {
    label: rgb(60, 156, 255)('uv-ui'),
    hint: '多平台快速开发的UI框架',
    value: 'uv',
  },
  {
    label: rgb(147, 85, 224)('Ano UI'),
    hint: '轻量级、漂亮、快速的 UnoCSS 组件库',
    value: 'ano',
  },
]
