export default function getData({ oldData }) {
  // 一次性检测所有包
  const existing = new Set(
    oldData.plugins
      .filter(p => p.importer)
      .map(p => p.importer)
      .join(' ')
      .match(/@[\w-]+\/[\w-]+/g) || [],
  )

  // 检查是否已存在 Components 插件
  const hasComponentsPlugin = oldData.plugins.some(p =>
    p.initializer?.includes('Components('),
  )

  // TMUI resolver 函数 - 优化版本
  const tmuiResolver = `(name) => {
  if (!name.startsWith('Tm')) return
  const comp = name.slice(2).replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, 'tm-')
  return { name, from: \`tmui-uni/components/\${comp}/\${comp}.vue\` }
}`

  // 基础配置优化
  const baseConfig = {
    ...oldData,
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: true,
      __VUE_I18N_PROD_DEVTOOLS__: false,
      ...oldData.define,
    },
    build: {
      target: 'es6',
      cssCodeSplit: true,
      ...oldData.build,
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['legacy-js-api'],
        },
      },
      ...oldData.css,
    },
    server: {
      port: 1314,
      proxy: {
        '/pag': {
          target: 'https://cdn.tmui.design',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '/api'),
        },
      },
      ...oldData.server,
    },
  }

  // 创建插件工厂函数
  const createPlugins = () => {
    const plugins = []

    // Components 插件
    if (!hasComponentsPlugin) {
      plugins.push({
        id: 'tmuiComponents',
        ...(!existing.has('@uni-helper/vite-plugin-uni-components') && {
          importer: `import Components from '@uni-helper/vite-plugin-uni-components'`,
        }),
        initializer: `Components({
  dts: true,
  resolvers: [${tmuiResolver}],
  include: [/\\.vue$/, /\\.uvue$/]
})`,
      })
    }

    // Vue JSX 插件
    plugins.push({
      id: 'vueJsx',
      ...(!existing.has('@vitejs/plugin-vue-jsx') && {
        importer: 'import vueJsx from "@vitejs/plugin-vue-jsx"',
      }),
      initializer: 'vueJsx()',
    })

    return plugins
  }

  // 合并现有 Components 插件配置
  const mergeComponentsPlugin = (plugin) => {
    const hasTmuiResolver = plugin.initializer.includes('tmui-uni/components')
    if (hasTmuiResolver)
      return plugin

    // 解析现有配置
    const configMatch = plugin.initializer.match(/Components\(\{([^}]+)\}\)/)
    if (!configMatch)
      return plugin

    const existingConfig = configMatch[1]
    const configItems = []

    // 提取并规范化配置项
    const extractConfig = (key, defaultValue) => {
      const match = existingConfig.match(new RegExp(`${key}:\\s*([^,\\n}]+)`))
      return match ? `${key}: ${match[1].trim()}` : `${key}: ${defaultValue}`
    }

    configItems.push(extractConfig('dts', 'true'))

    // 处理 resolvers
    const resolversMatch = existingConfig.match(/resolvers:\s*\[([^\]]*)\]/)
    if (resolversMatch) {
      const existingResolvers = resolversMatch[1].trim()
      const resolversList = existingResolvers
        ? `${existingResolvers.split('\n').map(line => line.trim()).filter(Boolean).join(',\n      ')},\n      ${tmuiResolver}`
        : tmuiResolver
      configItems.push(`resolvers: [\n      ${resolversList}\n    ]`)
    }
    else {
      configItems.push(`resolvers: [${tmuiResolver}]`)
    }

    // 处理 include
    const includeMatch = existingConfig.match(/include:\s*\[([^\]]*)\]/)
    configItems.push(includeMatch
      ? `include: [${includeMatch[1]}]`
      : 'include: [/\\.vue$/, /\\.uvue$/]',
    )

    return {
      ...plugin,
      initializer: `Components({\n    ${configItems.join(',\n    ')}\n  })`,
    }
  }

  // 插入插件到正确位置
  const insertPlugins = (plugins, newPlugins) => {
    const autoImportIndex = plugins.findIndex(p => p.id === 'autoImport')
    const uniIndex = plugins.findIndex(p => p.id === 'uni')
    const insertIndex = autoImportIndex !== -1 ? autoImportIndex + 1 : uniIndex

    const result = [...plugins]
    result.splice(insertIndex, 0, ...newPlugins)
    return result
  }

  // 主逻辑
  if (hasComponentsPlugin) {
    const updatedPlugins = baseConfig.plugins.map(plugin =>
      plugin.initializer?.includes('Components(')
        ? mergeComponentsPlugin(plugin)
        : plugin,
    )

    // 只添加 vueJsx 插件
    const vueJsxPlugin = createPlugins().find(p => p.id === 'vueJsx')
    return {
      ...baseConfig,
      plugins: vueJsxPlugin ? insertPlugins(updatedPlugins, [vueJsxPlugin]) : updatedPlugins,
    }
  }

  // 添加所有新插件
  return {
    ...baseConfig,
    plugins: insertPlugins(baseConfig.plugins, createPlugins()),
  }
}
