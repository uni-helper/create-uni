import { MODULES, UI } from '@create-uni/config'
import { expect, it } from 'vitest'
import { getConfigValuesAsEnum, promptBuilder } from '../src/utils'

it('promptBuilder', () => {
  expect(promptBuilder(MODULES, '需要安装的模块列表，增强应用功能')).toMatchInlineSnapshot(`
    "需要安装的模块列表，增强应用功能: 
    - pinia: 符合直觉的 Vue.js 状态管理库
    - unocss: 即时按需的原子级 CSS 引擎
    - uniNetwork: 为 uni-app 打造的基于 Promise 的网络请求库
    - uniUse: uni-app 组合式工具集
    - uniPromises: uni-app promise 化的 API
    - uniEcharts: 适用于 uni-app 的 Apache ECharts 组件"
  `)

  expect(promptBuilder(UI, '是否需要安装UI组件库')).toMatchInlineSnapshot(`
    "是否需要安装UI组件库: 
    - " ": 不安装
    - uni: UniApp官方组件库
    - wot: 高颜值、轻量化的uni-app组件库
    - uview-pro: 全面支持 Vue3.0、TypeScript 的 uni-app 生态框架
    - nut: 京东风格的轻量级移动端组件库
    - skiyee: 随心创造差异化
    - uv: 多平台快速开发的UI框架
    - ano: 轻量级、漂亮、快速的 UnoCSS 组件库"
  `)
})

it('getConfigValuesAsEnum', () => {
  expect(getConfigValuesAsEnum(UI)).toMatchInlineSnapshot(`
    [
      " ",
      "uni",
      "wot",
      "uview-pro",
      "nut",
      "skiyee",
      "uv",
      "ano",
    ]
  `)
})
