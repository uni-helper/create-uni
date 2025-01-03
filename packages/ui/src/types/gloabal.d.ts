// global.d.ts
interface Window {
  ipc: {
    postMessage: (message: string) => void
  }
  create_uni_data?: any
  create_uni_current_dir: string
}
