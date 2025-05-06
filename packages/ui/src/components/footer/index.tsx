import { Button } from '@/components/ui/button'
import { USER_EVENT } from '@/constants/USER_EVENT'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'preact/hooks'

export function Footer() {
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'))

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    }
    else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <footer className="mt-auto p-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs rounded-t-xl">
      <div className="flex justify-between items-center">
        <div class="italic">
          <p>
            © 2025 Design by
            {' '}
            <span
              className="hover:underline whitespace-pre cursor-pointer"
              onClick={() => window.ipc.postMessage(`${USER_EVENT.OPEN}|https://github.com/FliPPeDround`)}
            >
              FliPPeDround
            </span>
            .
          </p>
          <span
            className="text-zinc-400/70 hover:underline whitespace-pre cursor-pointer"
            onClick={() => window.ipc.postMessage(`${USER_EVENT.OPEN}|https://github.com/uni-helper/create-uni`)}
          >
            MIT License
          </span>
        </div>

        <Button
          onClick={toggleDarkMode}
          variant="outline"
          size="icon"
          className="w-8 h-8 rounded-full"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </footer>
  )
}
