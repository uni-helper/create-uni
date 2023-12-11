export default function getData() {
  return {
    plugins: [{
      id: 'vue',
      importer: `import { createSSRApp } from 'vue'`,
      use: 'const app = createSSRApp(App)',
      returner: 'app,',
    }],
  }
}
