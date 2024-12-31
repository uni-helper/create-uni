// global.d.ts
interface Window {
  ipc: {
    postMessage: (message: string) => void
  }
  create_uni_data?: any
}
