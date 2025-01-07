// global.d.ts
import type { TemplateList } from './../../../core/src/question/template/type'
import type { Options } from './../../../core/src/question/type'

declare global {
  interface Window {
    ipc: {
      postMessage: (message: string) => void
    }
    create_uni_data: {
      templateList: TemplateList[]
      plugin: Options[]
      module: Options[]
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
