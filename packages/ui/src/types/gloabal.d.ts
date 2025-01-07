// global.d.ts
import type { TemplateList } from './../../../core/src/question/template/type'

declare global {
  interface Window {
    ipc: {
      postMessage: (message: string) => void
    }
    create_uni_data: {
      templateList: TemplateList[]
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
