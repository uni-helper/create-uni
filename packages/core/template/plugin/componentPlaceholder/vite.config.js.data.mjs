export default function getData({ oldData }) {
  const componentPlaceholderPlugin = {
    id: 'componentPlaceholder',
    importer: `import ComponentPlaceholder from '@binbinji/vite-plugin-component-placeholder'`,
    initializer: `// https://github.com/chouchouji/vite-plugin-component-placeholder
    ComponentPlaceholder()`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'uni' ? [componentPlaceholderPlugin, plugin] : plugin,
    ),
  }
}
