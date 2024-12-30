import process from 'node:process'

export function getPkgManager() {
  const userAgent = process.env.npm_config_user_agent || ''
  if (userAgent.startsWith('yarn'))
    return 'yarn'
  if (userAgent.startsWith('pnpm'))
    return 'pnpm'
  if (userAgent.startsWith('bun'))
    return 'bun'
  return 'npm'
}

export function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent)
    return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  }
}
