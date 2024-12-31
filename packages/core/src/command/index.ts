import process from 'node:process'
import { helpMessage } from '@/constants'
import { actionGuiCLI } from './actions/gui'
import { actionInfoCLI } from './actions/info'

const actions = {
  help: () => {
    console.log(helpMessage)
    process.exit(0)
  },
  info: (argv?: any) => {
    actionInfoCLI(argv)
    process.exit(0)
  },
  gui: () => {
    actionGuiCLI()
  },
}

export function commandAction(argv: any) {
  Object.keys(actions).forEach((key) => {
    if (argv[key]) {
      actions[key as keyof typeof actions](argv[key])
    }
  })
}
