import './static/main.css'

import { createSSRApp } from 'vue'
import Pinia from 'pinia'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia())

  return {
    app,
    Pinia,
  }
}
