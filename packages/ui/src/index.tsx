import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import CLIInterface from '@/page/index'
import { render } from 'preact'
import { Footer } from './components/footer'
import { Header } from './components/header'
import { USER_EVENT } from './constants/USER_EVENT'
import './style.css'

export function App() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div class="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 h-[100vh] overflow-y-auto transition-colors duration-200 flex flex-col">
          <Header />
          <CLIInterface />
          <Footer />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-40">
        <ContextMenuItem
          onClick={() => window.ipc.postMessage(`${USER_EVENT.OPEN}|https://github.com/uni-helper/create-uni`)}
        >
          Github
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => window.ipc.postMessage(`${USER_EVENT.OPEN}|https://afdian.com/a/flippedround`)}
        >
          Sponsor
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={() => window.location.reload()}
        >
          Reload
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => window.ipc.postMessage(USER_EVENT.CLOSE)}
        >
          Exit
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>

  )
}

render(<App />, document.getElementById('app'))
