export default function getData({ oldData }) {
  const UnoCSSPlugin = {
    id: 'UnoCSS',
    dynamicImporter: `const UnoCSS = (await import('unocss/vite')).default`,
    initializer: 'UnoCSS()',
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'uni' ? [plugin, UnoCSSPlugin] : plugin,
    ),
    dynamic: true,
  }
}
