export default function getData({ oldData }) {
  const piniaPlugin = {
    id: 'pinia',
    importer: 'import * as Pinia from \'pinia\'',
    use: 'app.use(Pinia.createPinia())',
    returner: 'Pinia,',
  }
  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'vue' ? [plugin, piniaPlugin] : plugin,
    ),
  }
}
