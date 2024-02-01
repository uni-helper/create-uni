export default function getData({ oldData }) {
  const middlewarePlugin = {
    id: 'middleware',
    importer: `import UniMiddleware from '@uni-helper/vite-plugin-uni-middleware'`,
    initializer: `// https://github.com/uni-helper/vite-plugin-uni-middleware
    UniMiddleware()`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'uni' ? [plugin, middlewarePlugin] : plugin,
    ),
  }
}
