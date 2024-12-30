// global.d.ts
interface Window {
  ipc: {
    postMessage: (message: string) => void
  }
}
