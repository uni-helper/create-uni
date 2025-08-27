export default function getData({ oldData }) {
  const middlewarePlugin = {
    id: 'middleware',
    importer: `import UniMiddleware from '@uni-helper/vite-plugin-uni-middleware'`,
    initializer: `// https://uni-helper.js.org/vite-plugin-uni-middleware
    UniMiddleware()`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'uni' ? [middlewarePlugin, plugin] : plugin,
    ),
  }
}
