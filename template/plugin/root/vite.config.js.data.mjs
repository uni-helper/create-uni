export default function getData({ oldData }) {
  const rootPlugin = {
    id: 'root',
    importer: `import UniRoot from '@uni-ku/root'`,
    initializer: `// https://github.com/uni-ku/root
    UniRoot()`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'uni' ? [rootPlugin, plugin] : plugin,
    ),
  }
}
