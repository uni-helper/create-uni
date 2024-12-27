import CLIInterface from '@/page/index'
import { render } from 'preact'
import './style.css'

export function App() {
  return (
    <CLIInterface />
  )
}

render(<App />, document.getElementById('app'))
