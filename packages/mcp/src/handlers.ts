import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import type { CreateCustomOptions, CreateWithTemplateOptions } from './types.js'
import { sync } from 'cross-spawn'
import { canSkipEmptying } from './utils.js'

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

  const templateInfo = {
    'vitesse': '由Uni Helper维护的快速启动模板',
    'wot-starter': '由Wot UI提供的基于 vitesse-uni-app 的快速启动模板',
    'wot-starter-retail': '基于Wot UI的 uni-app 零售行业模板',
    'unisave': '拥抱 web 开发，拯救uniapp。适配所有 (app、mp、web) 平台',
    'tmui32': '优质 Vue3 TS Pinia Vite 跨端组件库',
  }[options.templateType] || options.templateType

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
4. 访问 https://uni-helper.js.org/ 查看更多文档信息`,
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
    const uiInfo = {
      uni: 'UniApp官方组件库',
      wot: '高颜值、轻量化的uni-app组件库',
      nut: '京东风格的轻量级移动端组件库',
      skiyee: '随心创造差异化',
      uv: '多平台快速开发的UI框架',
      ano: '轻量级、漂亮、快速的 UnoCSS 组件库',
    }[options.UIName] || options.UIName
    features.push(`✅ UI组件库: ${uiInfo}`)
  }
  if (options.pluginList?.length) {
    features.push(`✅ 插件: ${options.pluginList.join(', ')}`)
  }
  if (options.moduleList?.length) {
    const moduleDescriptions = {
      pinia: 'Vue.js状态管理',
      unocss: '原子级CSS引擎',
      uniNetwork: '网络请求库',
      uniUse: '组合式工具集',
      uniPromises: 'Promise化API',
    }
    const moduleNames = options.moduleList.map(m => moduleDescriptions[m as keyof typeof moduleDescriptions] || m)
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
4. 访问 https://uni-helper.js.org/ 查看更多文档信息`,
    }],
  }
}
