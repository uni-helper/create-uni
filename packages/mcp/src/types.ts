import type { MODULES, PLUGINS, UI } from '@create-uni/config/src'
/**
 * MCP服务器的类型定义
 */

// 创建项目的基础选项
export interface BaseCreateOptions {
  name: string
  force?: boolean
}

// 使用模板创建选项
export interface CreateWithTemplateOptions extends BaseCreateOptions {
  templateType: string
}

// 自定义创建选项
export interface CreateCustomOptions extends BaseCreateOptions {
  needsTypeScript?: boolean
  pluginList?: typeof PLUGINS[number]['value'][]
  moduleList?: typeof MODULES[number]['value'][]
  UIName?: typeof UI[number]['value'] | ' '
  needsEslint?: boolean
}
