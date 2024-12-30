import process from 'node:process'

export function getPkgManager() {
  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  return pkgInfo ? pkgInfo.name : 'npm'
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
