import type { PluginData } from './types'
import { deepMerge } from './deepMerge'

function addResolver(plugin: PluginData, resolver: string) {
  if (plugin.initializer == null || plugin.initializer.includes(resolver)) {
    return plugin
  }

  return {
    ...plugin,
    initializer: plugin.initializer.replace(
      /(resolvers\s*:\s*\[)([\s\S]*?)(\])/,
      (_, prefix, content, suffix) => {
        const cont = content.trim()

        return `${prefix}${cont}${cont ? ', ' : ''}${resolver}${suffix}`
      },
    ),
  }
}

function mergeExtraConfig(oldConfig: Record<string, any> | null, config: Record<string, any>) {
  return deepMerge(oldConfig || {}, config)
}

export const injectUtils = {
  deepMerge,
  addResolver,
  mergeExtraConfig,
}
