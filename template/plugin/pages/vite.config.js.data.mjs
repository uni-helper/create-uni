export default function getData({ oldData }) {
  const pagesPlugin = {
    name: 'pages',
    importer: `import UniPages from '@uni-helper/vite-plugin-uni-pages'`,
    initializer: `// https://github.com/uni-helper/vite-plugin-uni-pages
    UniPages()`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'uni' ? [pagesPlugin, plugin] : plugin,
    ),
  }
}
