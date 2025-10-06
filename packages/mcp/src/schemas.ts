import { MODULES, PLUGINS, TEMPLATES, UI } from '@create-uni/config'
import { z } from 'zod'
import { getConfigValuesAsEnum, getTemplateValuesAsEnum, promptBuilder, templatePromptBuilder } from './utils'
/**
 * 基于core包中的数据定义Zod schema
 * 为AI提供更好的理解和描述
 */

// 模板类型schema
export const templateTypeSchema = z.enum(getTemplateValuesAsEnum(TEMPLATES))
  .describe(templatePromptBuilder(TEMPLATES, '预设模板类型, 每个模板都有不同的特点'))

// 插件类型schema
export const pluginListSchema = z.array(z.enum(getConfigValuesAsEnum(PLUGINS)))
  .optional()
  .default([])
  .describe(promptBuilder(PLUGINS, '支持安装的插件列表, 每个插件提供特定功能'))

// 模块类型schema
export const moduleListSchema = z.array(z.enum(getConfigValuesAsEnum(MODULES)))
  .optional()
  .default([])
  .describe(promptBuilder(MODULES, '支持安装的模块列表, 每个模块提供特定功能'))

// UI组件库类型schema
export const uiNameSchema = z.enum(getConfigValuesAsEnum(UI))
  .optional()
  .default(' ')
  .describe(promptBuilder(UI, 'UI组件库名称, 选择合适的组件库加速开发'))

// 基础创建参数schema
export const baseCreateSchema = {
  name: z.string().describe('项目路径名称（将作为文件夹名称）').default('.'),
  force: z.boolean().optional().describe('是否强制覆盖已存在的目录, 默认为false').default(false),
}

// 预设模板创建schema
export const createWithTemplateSchema = z.object({
  ...baseCreateSchema,
  templateType: templateTypeSchema,
})

// 自定义模板创建schema
export const createCustomSchema = z.object({
  ...baseCreateSchema,
  needsTypeScript: z.boolean().optional().describe('是否需要TypeScript支持, 提供类型安全和更好的开发体验').default(false),
  pluginList: pluginListSchema,
  moduleList: moduleListSchema,
  UIName: uiNameSchema,
  needsEslint: z.boolean().optional().describe('是否需要ESLint配置, 统一代码风格和质量').default(false),
})
