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
    return actionGuiCLI()
  },
}

export function commandAction(argv: any) {
  if (argv.help) {
    actions.help()
  }
  else if (argv.info) {
    actions.info(argv)
  }
  else if (argv.gui) {
    return actions.gui()
  }
}
