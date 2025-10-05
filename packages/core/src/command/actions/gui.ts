import process from 'node:process'
import { templateList } from '@/question/template/template.data'
import { MODULES, PLUGINS, UI } from '@create-uni/config'
import { sync } from 'cross-spawn'
import { composeCommand } from '../composeCommand'

export function actionGuiCLI() {
  // #if CREATE_UNI_DEV
  // @ts-expect-error compile
  const fullCustomCommand = 'pnpm create-uni-gui'
  // #endif

  // #if !CREATE_UNI_DEV
  // @ts-expect-error compile
  // eslint-disable-next-line ts/no-redeclare
  const fullCustomCommand = composeCommand('@create-uni/gui')
  // #endif

  const input = JSON.stringify({
    templateList,
    plugin: PLUGINS,
    module: MODULES,
    ui: UI,
  })

  const [command, ..._args] = fullCustomCommand.split(' ')

  process.env.CREATE_UNI_GUI_INPUT = input
  const { error, stdout } = sync(command, [..._args], {
    stdio: 'pipe',
  })

  if (error)
    throw new Error(`Error executing command: ${error.message}`)

  let data: any
  if (stdout.length > 0) {
    const data_string = stdout.toString()
    try {
      const _data = JSON.parse(data_string)
      if (_data.useTemplate) {
        if (_data.projectName === '') {
          _data.projectName = 'uni-app'
        }
        if (_data.useTemplate === 'custom') {
          _data.useTemplate = null
        }
        data = _data
      }
    }
    catch {
      process.exit(0)
    }
  }

  if (!data?.projectName) {
    process.exit(0)
  }
  return data
}
