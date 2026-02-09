import type { Options } from './type'
import { green, trueColor as rgb } from 'kolorist'

export default [
  {
    label: '不需要组件库',
    name: '不需要组件库',
    hint: '',
    value: null,
  },
  {
    label: green('Uni Ui'),
    hint: 'UniApp官方组件库',
    name: 'uni-ui',
    value: 'uni',
    website: 'https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html',
  },
  {
    label: rgb(77, 128, 240)('Wot Ui'),
    hint: '高颜值、轻量化的uni-app组件库',
    name: 'wot-design-uni',
    value: 'wot',
    github: 'https://github.com/Moonofweisheng/wot-design-uni',
    website: 'https://wot-ui.cn/',
  },
  {
    label: rgb(0, 82, 217)('TDesign Uni'),
    hint: 'TDesign 组件库 uni-app 版',
    name: 'TDesign',
    value: 'tdesign',
    github: 'https://github.com/Tencent/tdesign-miniprogram',
    website: 'https://tdesign.tencent.com/uni-app/',
  },
  {
    label: rgb(41, 121, 255)('uView Pro'),
    hint: '全面支持 Vue3.0、TypeScript 的 uni-app 生态框架',
    name: 'uView Pro',
    value: 'uview-pro',
    github: 'https://github.com/Tencent/tdesign-miniprogram',
    website: 'https://tdesign.tencent.com/uniapp/',
  },
  {
    label: rgb(250, 44, 25)('Nut Ui'),
    hint: '京东风格的轻量级移动端组件库',
    name: 'nutui-uniapp',
    value: 'nut',
    github: 'https://github.com/nutui-uniapp/nutui-uniapp',
    website: 'https://nutui-uniapp.pages.dev/',
  },
  {
    label: rgb(60, 156, 255)('Uv Ui'),
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
] as const satisfies readonly Options[]
