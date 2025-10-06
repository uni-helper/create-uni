import type { Options } from '@create-uni/config'
import type { BaseTemplateListWithUrl, TemplateList } from '@create-uni/config/src/type'
import { existsSync, readdirSync } from 'node:fs'

export function canSkipEmptying(dir: string) {
  if (!existsSync(dir))
    return true

  const files = readdirSync(dir)
  if (files.length === 0)
    return true

  if (files.length === 1 && files[0] === '.git')
    return true

  return false
}

/**
 * 从配置里获取全部的value作为枚举列表
 * @template T - 具体的配置项类型，用于从常量中提取字面量类型
 * @returns 返回与输入数组顺序对应的值数组，包含具体的字面量类型
 */
export function getConfigValuesAsEnum<T extends readonly Options[]>(config: T) {
  return config.map(item => item.value || ' ') as {
    [K in keyof T]: T[K] extends { value: infer V }
      ? V extends string
        ? V
        : ' '
      : ' '
  }
}

/**
 * AI提示词构建器
 * 用于组装各种配置项的AI提示词描述
 */
export function promptBuilder(
  config: readonly Options[],
  prefix: string,
): string {
  const descriptions = config.map((module) => {
    const parts = module.value ? [`- ${module.value}: ${module.hint}`] : [`- " ": 不安装`]

    return parts.join(' ')
  })

  return `${prefix}: \n${descriptions.join('\n')}`
}

/**
 * 扁平化模板数据结构
 * 将包含分组的模板数据展开为单层数组
 */
export function flattenTemplateList(templates: TemplateList[]): BaseTemplateListWithUrl[] {
  const result: BaseTemplateListWithUrl[] = []

  for (const template of templates) {
    if ('list' in template && template.list) {
      // 处理有子列表的分组模板
      result.push(...template.list)
    }
    else if ('url' in template) {
      // 处理单个模板（没有子列表）
      result.push(template as BaseTemplateListWithUrl)
    }
  }

  return result
}

/**
 * 从模板配置中获取所有的value作为枚举列表
 */
export function getTemplateValuesAsEnum(templates: TemplateList[]): [string, ...string[]] {
  const flattened = flattenTemplateList(templates)
  return flattened.map(item => item.value) as [string, ...string[]]
}

/**
 * 模板AI提示词构建器
 * 用于组装模板选项的AI提示词描述
 */
export function templatePromptBuilder(
  templates: TemplateList[],
  prefix: string,
): string {
  const flattened = flattenTemplateList(templates)
  const descriptions = flattened.map((template) => {
    return `- ${template.value}: ${template.description || '暂无描述'}`
  })

  return `${prefix}: \n${descriptions.join('\n')}`
}
