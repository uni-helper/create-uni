import { sync } from 'cross-spawn'
import { composeCommand } from '../composeCommand'

export function actionInfoCLI(argv: any) {
  // #if CREATE_UNI_DEV
  // @ts-expect-error compile
  const fullCustomCommand = 'pnpm create-uni-info'
  // #endif

  // #if !CREATE_UNI_DEV
  // @ts-expect-error compile
  // eslint-disable-next-line ts/no-redeclare
  const fullCustomCommand = composeCommand('@create-uni/info')
  // #endif

  const [command, ..._args] = fullCustomCommand.split(' ')
  const { error } = sync(command, [..._args, argv ?? ''], {
    stdio: 'inherit',
  })

  if (error)
    throw new Error(`Error executing command: ${error.message}`)
}
