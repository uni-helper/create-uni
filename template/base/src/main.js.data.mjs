export default function getData() {
  return {
    entries: [{
      id: 'vue',
      importer: `import { createSSRApp } from 'vue'`,
      use: 'const app = createSSRApp(App)',
      returner: 'app,',
    }],
  }
}
