import CLIInterface from '@/page/index'
import { render } from 'preact'
import { Footer } from './components/footer'
import { Header } from './components/header'
import './style.css'

export function App() {
  return (
    <div class="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 h-[100vh] overflow-y-auto transition-colors duration-200 flex flex-col">
      <Header />
      <CLIInterface />
      <Footer />
    </div>
  )
}

render(<App />, document.getElementById('app'))
