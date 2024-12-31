import process from 'node:process'
import { pkgFromUserAgent } from '@/utils'

export function composeCommand(
  command: string,
) {
  const { name, version } = pkgFromUserAgent(process.env.npm_config_user_agent)!
  const isYarn1 = name === 'yarn' && version.startsWith('1.')

  let pkgManager = 'npx'
  if (name === 'pnpm')
    pkgManager = 'pnpm dlx'
  if (name === 'yarn')
    pkgManager = 'yarn dlx'
  if (name === 'bun')
    pkgManager = 'bun x'

  return `${pkgManager} ${command}${isYarn1 ? '' : '@latest'}`
}
