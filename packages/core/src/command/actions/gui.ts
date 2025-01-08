import moduleData from '@/question/module/module.data'
import pluginData from '@/question/plugin/plugin.data'
import { templateList } from '@/question/template/template.data'
import { UIList } from '@/question/ui/ui.data'
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
    plugin: pluginData,
    module: moduleData,
    ui: UIList,
  })

  const [command, ..._args] = fullCustomCommand.split(' ')
  const { error, stdout } = sync(command, [..._args], {
    input,
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
    catch (e) {
      throw new Error(`Error parsing JSON: ${e}`)
    }
  }

  return data
}
