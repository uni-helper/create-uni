import { USER_EVENT } from '@/constants/USER_EVENT'

export function Header() {
  return (
    <div
      className="flex items-start p-6 select-none"
      onMouseMove={() => window.ipc.postMessage(USER_EVENT.DRAG_WINDOW)}
      style={{ 'app-region': 'drag' }}
    >
      <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-200">Uni Creator</h1>
      <span className="ml-2 px-2 py-1 text-xs font-semibold bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-md">Beta</span>
    </div>
  )
}
