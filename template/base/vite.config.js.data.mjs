export default function getData() {
  return {
    plugins: [{
      id: 'uni',
      importer: 'import uni from \'@dcloudio/vite-plugin-uni\'',
      initializer: 'uni()',
    }],
  }
}
