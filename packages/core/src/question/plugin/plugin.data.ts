import type { Options } from '../type'
import { trueColor as rgb } from 'kolorist'

export default [
  {
    label: rgb(236, 112, 99)('vite-plugin-uni-components'),
    value: 'import',
    hint: '按需自动引入组件',
  },
  {
    label: rgb(243, 156, 18)('vite-plugin-uni-pages'),
    value: 'pages',
    hint: '提供基于文件系统的路由',
  },
  {
    label: rgb(241, 196, 15)('vite-plugin-uni-layouts'),
    value: 'layouts',
    hint: '提供类 nuxt 的 layouts 系统',
  },
  {
    label: rgb(46, 204, 113)('vite-plugin-uni-manifest'),
    value: 'manifest',
    hint: '自动生成 manifest.json 文件',
  },
  {
    label: rgb(52, 152, 219)('vite-plugin-uni-platform'),
    value: 'filePlatform',
    hint: '基于文件名 (*.<h5|mp-weixin|app>.*) 的按平台编译插件',
  },
  {
    label: rgb(155, 89, 182)('vite-plugin-uni-platform-modifier'),
    value: 'platformModifier',
    hint: '为属性、指令提供平台修饰符并按需编译',
  },
  {
    label: rgb(149, 165, 166)('vite-plugin-uni-middleware'),
    value: 'middleware',
    hint: '使用路由中间件',
  },
  {
    label: rgb(146, 220, 210)('uni-ku-root'),
    value: 'root',
    hint: '模拟虚拟根组件(支持SFC的App.vue)',
  },
] as Options[]
