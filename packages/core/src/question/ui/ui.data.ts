import type { Options } from '../type'
import { green, trueColor as rgb } from 'kolorist'

export const UIList = [
  {
    label: '不需要组件库',
    name: '不需要组件库',
    hint: '',
    value: null,
  },
  {
    label: green('uni-ui'),
    hint: 'UniApp官方组件库',
    name: 'uni-ui',
    value: 'uni',
    website: 'https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html',
  },
  {
    label: rgb(77, 128, 240)('wot-design-uni'),
    hint: '高颜值、轻量化的uni-app组件库',
    name: 'wot-design-uni',
    value: 'wot',
    github: 'https://github.com/Moonofweisheng/wot-design-uni',
    website: 'https://wot-design-uni.cn/',
  },
  {
    label: rgb(250, 44, 25)('nutui-uniapp'),
    hint: '京东风格的轻量级移动端组件库',
    name: 'nutui-uniapp',
    value: 'nut',
    github: 'https://github.com/nutui-uniapp/nutui-uniapp',
    website: 'nutui-uniapp.pages.dev',
  },
  {
    label: rgb(60, 156, 255)('uv-ui'),
    hint: '多平台快速开发的UI框架',
    name: 'uv-ui',
    value: 'uv',
    github: 'https://github.com/climblee/uv-ui',
    website: 'https://www.uvui.cn/',
  },
  {
    label: rgb(147, 85, 224)('Ano UI'),
    hint: '轻量级、漂亮、快速的 UnoCSS 组件库',
    name: 'ano-ui',
    value: 'ano',
    github: 'https://github.com/ano-ui/ano-ui',
    website: 'https://ano-ui.netlify.app/',
  },
] as Options[]
