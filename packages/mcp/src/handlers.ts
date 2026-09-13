import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import type { CreateCustomOptions, CreateWithTemplateOptions } from './types.js'
import { CSS, MODULES, PLUGINS, TEMPLATES, UI } from '@create-uni/config'
import { canSkipEmptying } from '@create-uni/shared'
import { sync } from 'cross-spawn'
import { flattenTemplateList } from './utils.js'

/**
 * 构建命令行参数
 */
function buildCommandArgs(options: CreateCustomOptions & { templateType?: string }): string[] {
  const args: string[] = []

  // 项目名称
  args.push(options.name)

  // TypeScript支持
  if (options.needsTypeScript) {
    args.push('--ts')
  }

  // ESLint配置
  if (options.needsEslint) {
    args.push('-e')
  }

  // UI组件库
  if (options.UIName) {
    args.push('-u', options.UIName)
  }

  // 原子化CSS
  if (options.cssType && options.cssType !== ' ') {
    args.push('--css', options.cssType)
  }

  // 插件列表
  if (options.pluginList?.length) {
    options.pluginList.forEach((plugin) => {
      args.push('-p', plugin)
    })
  }

  // 模块列表
  if (options.moduleList?.length) {
    options.moduleList.forEach((module) => {
      args.push('-m', module)
    })
  }

  // 强制覆盖
  if (options.force) {
    args.push('-f')
  }

  // 模板类型（如果指定）
  if (options.templateType) {
    args.push('-t', options.templateType)
  }

  return args
}

/**
 * 执行创建命令
 */
function executeCreateCommand(args: string[]): { success: boolean, error?: string } {
  const [command, ...commandArgs] = ['npx', 'create-uni@latest', ...args]

  const { error } = sync(command, commandArgs, { stdio: 'pipe' })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

/**
 * 检查目录是否可以创建项目
 */
function checkDirectory(name: string, force?: boolean): { canCreate: boolean, message?: string } {
  if (!force) {
    const canSkip = canSkipEmptying(name)
    if (!canSkip) {
      return {
        canCreate: false,
        message: `目标目录${name}非空，无法创建项目, 请使用 --force 强制覆盖`,
      }
    }
  }

  return { canCreate: true }
}

/**
 * 使用预设模板创建项目
 */
export async function createWithTemplate(options: CreateWithTemplateOptions): Promise<CallToolResult> {
  const { canCreate, message } = checkDirectory(options.name, options.force)

  if (!canCreate) {
    return {
      content: [{
        type: 'text',
        text: message!,
      }],
    }
  }

  const args = buildCommandArgs({
    name: options.name,
    templateType: options.templateType,
    force: options.force,
  })

  const result = executeCreateCommand(args)

  if (!result.success) {
    return {
      content: [{
        type: 'text',
        text: `创建项目失败: ${result.error}`,
      }],
    }
  }

  const flattenedTemplates = flattenTemplateList(TEMPLATES)
  const templateInfo = flattenedTemplates.find(t => t.value === options.templateType)?.description || options.templateType

  return {
    content: [{
      type: 'text' as const,
      text: `✅ 使用预设模板创建uni-app项目成功！

📁 项目路径: ${options.name}
🎯 模板类型: ${options.templateType}
📝 模板描述: ${templateInfo}

🚀 项目已创建完成，接下来可以：
1. cd ${options.name}
2. 安装依赖: pnpm install
3. 启动开发: pnpm dev
4. 重要：访问 https://uni-helper.js.org/ 查看更多文档信息`,
    }],
  }
}

/**
 * 使用自定义模板创建项目
 */
export async function createCustom(options: CreateCustomOptions): Promise<CallToolResult> {
  const { canCreate, message } = checkDirectory(options.name, options.force)

  if (!canCreate) {
    return {
      content: [{
        type: 'text',
        text: message!,
      }],
    }
  }

  const args = buildCommandArgs(options)
  const result = executeCreateCommand(args)

  if (!result.success) {
    return {
      content: [{
        type: 'text',
        text: `创建项目失败: ${result.error}`,
      }],
    }
  }

  const features = []
  if (options.needsTypeScript)
    features.push('✅ TypeScript支持')
  if (options.needsEslint)
    features.push('✅ ESLint代码规范')
  if (options.UIName) {
    const uiInfo = UI.find(ui => ui.value === options.UIName)?.hint || options.UIName
    features.push(`✅ UI组件库: ${uiInfo}`)
  }
  if (options.cssType && options.cssType !== ' ') {
    const cssInfo = CSS.find(css => css.value === options.cssType)?.hint || options.cssType
    features.push(`✅ 原子化CSS: ${cssInfo}`)
  }
  if (options.pluginList?.length) {
    const pluginNames = options.pluginList.map((p) => {
      const plugin = PLUGINS.find(plugin => plugin.value === p)
      return plugin ? `${p} (${plugin.hint})` : p
    })
    features.push(`✅ 插件: ${pluginNames.join(', ')}`)
  }
  if (options.moduleList?.length) {
    const moduleNames = options.moduleList.map((m) => {
      const module = MODULES.find(mod => mod.value === m)
      return module ? `${m} (${module.hint})` : m
    })
    features.push(`✅ 模块: ${moduleNames.join(', ')}`)
  }

  return {
    content: [{
      type: 'text',
      text: `✅ 创建uni-app项目成功！

📁 项目路径: ${options.name}
${features.length ? `\n🎯 已选择的功能:\n${features.join('\n')}` : ''}

🚀 项目已创建完成，接下来可以：
1. cd ${options.name}
2. 安装依赖: pnpm install
3. 启动开发: pnpm dev
4. 重要：访问 https://uni-helper.js.org/ 查看更多文档信息`,
    }],
  }
}
