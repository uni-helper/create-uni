import type { Options } from '@create-uni/config'

/**
 * AI提示词构建器
 * 用于组装各种配置项的AI提示词描述
 */
export class PromptBuilder {
  /**
   * 构建模块列表的AI提示词描述
   */
  static buildModulePrompt(modules: Options[]): string {
    const descriptions = modules.map((module) => {
      const parts = [`- ${module.value}: ${module.hint}`]

      return parts.join(' ')
    })

    return `需要安装的模块列表，增强应用功能：\n${descriptions.join('\n')}`
  }

  /**
   * 构建模板类型的AI提示词描述
   */
  static buildTemplatePrompt(templates: Array<{ value: string, label: string, description?: string }>): string {
    const descriptions = templates.map(template =>
      `- ${template.value}: ${template.description || template.label}`,
    )

    return `预设模板类型，每个模板都有不同的特点：\n${descriptions.join('\n')}`
  }

  /**
   * 构建插件列表的AI提示词描述
   */
  static buildPluginPrompt(plugins: Array<{ value: string, label: string, description: string }>): string {
    const descriptions = plugins.map(plugin =>
      `- ${plugin.value}: ${plugin.description}`,
    )

    return `需要安装的插件列表，每个插件提供特定功能：\n${descriptions.join('\n')}`
  }

  /**
   * 构建UI组件库的AI提示词描述
   */
  static buildUIPrompt(uiLibraries: Array<{ value: string, label: string, description?: string }>): string {
    const descriptions = uiLibraries.map(ui =>
      `- ${ui.value === '' ? '""' : ui.value}: ${ui.description || ui.label}`,
    )

    return `UI组件库名称，选择合适的组件库加速开发：\n${descriptions.join('\n')}`
  }

  /**
   * 构建通用枚举类型的AI提示词描述
   */
  static buildEnumPrompt(
    enumName: string,
    items: Array<{ value: string, description?: string }>,
    contextDescription: string,
  ): string {
    const descriptions = items.map((item) => {
      const desc = item.description || item.value
      return `- ${item.value}: ${desc}`
    })

    return `${contextDescription}：\n${descriptions.join('\n')}`
  }

  /**
   * 格式化枚举值为Zod schema可用的数组
   */
  static formatEnumValues(values: string[]): [string, ...string[]] {
    return values as [string, ...string[]]
  }

  /**
   * 构建完整的AI提示词上下文
   */
  static buildFullContext(context: {
    modules?: Options[]
    templates?: Array<{ value: string, label: string, description?: string }>
    plugins?: Array<{ value: string, label: string, description: string }>
    uiLibraries?: Array<{ value: string, label: string, description?: string }>
  }): string {
    const parts: string[] = []

    if (context.modules?.length) {
      parts.push(this.buildModulePrompt(context.modules))
    }

    if (context.templates?.length) {
      parts.push(this.buildTemplatePrompt(context.templates))
    }

    if (context.plugins?.length) {
      parts.push(this.buildPluginPrompt(context.plugins))
    }

    if (context.uiLibraries?.length) {
      parts.push(this.buildUIPrompt(context.uiLibraries))
    }

    return parts.join('\n\n')
  }
}

/**
 * 便捷的提示词构建函数
 */
export function buildPromptForModules(modules: Options[]): string {
  return PromptBuilder.buildModulePrompt(modules)
}

export function buildPromptForTemplates(templates: Array<{ value: string, label: string, description?: string }>): string {
  return PromptBuilder.buildTemplatePrompt(templates)
}

export function buildPromptForPlugins(plugins: Array<{ value: string, label: string, description: string }>): string {
  return PromptBuilder.buildPluginPrompt(plugins)
}

export function buildPromptForUI(uiLibraries: Array<{ value: string, label: string, description?: string }>): string {
  return PromptBuilder.buildUIPrompt(uiLibraries)
}
