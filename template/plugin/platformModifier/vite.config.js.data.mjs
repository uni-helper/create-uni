export default function getData({ oldData }) {
  const platformModifierPlugin = {
    id: 'platformModifier',
    importer: `import UniPlatformModifier from '@uni-helper/vite-plugin-uni-platform-modifier'`,
    initializer: `// https://github.com/uni-helper/vite-plugin-uni-platform-modifier
    UniPlatformModifier()`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'uni' ? [plugin, platformModifierPlugin] : plugin,
    ),
  }
}
