import { MODULES, UI } from '@create-uni/config'
import templates from '@create-uni/config/src/template.data'
import { expect, it } from 'vitest'
import { getConfigValuesAsEnum, getTemplateValuesAsEnum, promptBuilder, templatePromptBuilder } from '../src/utils'

it('promptBuilder', () => {
  expect(promptBuilder(MODULES, '需要安装的模块列表，增强应用功能')).toMatchInlineSnapshot(`
    "需要安装的模块列表，增强应用功能: 
    - pinia: 符合直觉的 Vue.js 状态管理库
    - unocss: 即时按需的原子级 CSS 引擎
    - uniNetwork: 为 uni-app 打造的基于 Promise 的网络请求库
    - uniUse: uni-app 组合式工具集
    - uniPromises: uni-app promise 化的 API
    - uniEcharts: 适用于 uni-app 的 Apache ECharts 组件
    - zPaging: 高性能、全平台兼容的 uni-app 分页组件"
  `)

  expect(promptBuilder(UI, '是否需要安装UI组件库')).toMatchInlineSnapshot(`
    "是否需要安装UI组件库: 
    - " ": 不安装
    - uni: UniApp官方组件库
    - wot: 高颜值、轻量化的uni-app组件库
    - tdesign: Tencent Design 组件库的 uni-app 版本
    - uview-pro: 全面支持 Vue3.0、TypeScript 的 uni-app 生态框架
    - nut: 京东风格的轻量级移动端组件库
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
      "tdesign",
      "uview-pro",
      "nut",
      "uv",
      "ano",
    ]
  `)
})

it('templatePromptBuilder', () => {
  expect(templatePromptBuilder(templates, '请选择项目模板')).toMatchInlineSnapshot(`
    "请选择项目模板: 
    - vitesse: 由Uni Helper维护的快速启动模板
    - wot-starter: 由Wot UI提供的基于 vitesse-uni-app 的快速启动模板
    - wot-starter-retail: 基于Wot UI的 uni-app 零售行业模板
    - uview-pro-starter: 由 uView Pro 提供的基于 vitesse-uni-app 的快速启动模板
    - uview-pro-demo: 由 uView Pro 提供的完整组件演示模板
    - unisave: 拥抱 web 开发，拯救uniapp。适配所有 (app、mp、web) 平台
    - tmui32: 优质 Vue3 TS Pinia Vite 跨端组件库模板"
  `)
})

it('getTemplateValuesAsEnum', () => {
  expect(getTemplateValuesAsEnum(templates)).toMatchInlineSnapshot(`
    [
      "vitesse",
      "wot-starter",
      "wot-starter-retail",
      "uview-pro-starter",
      "uview-pro-demo",
      "unisave",
      "tmui32",
    ]
  `)
})
