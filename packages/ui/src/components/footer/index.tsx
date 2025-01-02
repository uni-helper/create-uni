import { Button } from '@/components/ui/button'
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
          <p>© 2025 Designed by FliPPeDround. </p>
          <p className="text-zinc-400/70">MIT License</p>
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
