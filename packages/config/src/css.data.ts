import type { Options } from './type'
import { trueColor as rgb } from 'kolorist'

export default [
  {
    label: '不需要',
    name: '不需要原子化CSS',
    hint: '不使用原子化 CSS',
    value: null,
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
    label: rgb(56, 189, 248)('TailwindCSS'),
    value: 'tailwindcss',
    name: 'tailwindcss',
    github: 'https://github.com/sonofmagic/weapp-tailwindcss',
    website: 'https://tw.weapp.dev/',
    hint: '通过 weapp-tailwindcss 适配小程序的原子化 CSS 框架',
  },
] as const satisfies readonly Options[]
