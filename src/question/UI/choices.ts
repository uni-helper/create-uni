import { green, trueColor } from 'kolorist'
import type { ModelType } from '../type'

export const UIList: ModelType[] = [
  {
    title: '不需要组件库',
    description: '',
    value: null,
  },
  {
    title: green('Uni UI'),
    description: 'UniApp官方组件库',
    value: 'uni',
  },
  {
    title: trueColor(147, 85, 224)('Ano UI'),
    description: '轻量级、漂亮、快速的 UnoCSS 组件库',
    value: 'ano',
  },
]
