import type { Options } from '@create-uni/config'
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
 */
export function getConfigValuesAsEnum(config: Options[]) {
  return config.map(item => item.value || ' ') as [string, ...string[]]
}

/**
 * AI提示词构建器
 * 用于组装各种配置项的AI提示词描述
 */
export function promptBuilder(
  config: Options[],
  prefix: string,
): string {
  const descriptions = config.map((module) => {
    const parts = module.value ? [`- ${module.value}: ${module.hint}`] : [`- " ": 不安装`]

    return parts.join(' ')
  })

  return `${prefix}: \n${descriptions.join('\n')}`
}
