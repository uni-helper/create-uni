// global.d.ts
import type { TemplateList } from '@create-uni/config'
import type { Options } from '@create-uni/config'

declare global {
  interface Window {
    ipc: {
      postMessage: (message: string) => void
    }
    create_uni_data: {
      templateList: TemplateList[]
      plugin: Options[]
      module: Options[]
      ui: Options[]
    }
    create_uni_current_dir: string
  }

  interface PathEventDetail {
    path: string
  }

  interface PathEvent extends CustomEvent<PathEventDetail> {}

  interface WindowEventMap {
    pathEvent: PathEvent
  }
}
