import type { UniPresetEnvInfo } from '../types'

export function getBaseDependencies(packageInfo: UniPresetEnvInfo['npmPackages']) {
  const baseDependenciesName = ['vue', 'vite', '@dcloudio/uni-app']
  const baseDependencies: Record<string, string> = {}
  for (const name of baseDependenciesName) {
    const version = packageInfo[name]?.installed
    if (version)
      baseDependencies[name] = version
  }
  return baseDependencies
}

export function getUniHelperDependencies(packageInfo: UniPresetEnvInfo['npmPackages']) {
  const uniHelperDependencies: Record<string, string> = {}
  for (const name in packageInfo) {
    if (name.includes('@uni-helper'))
      uniHelperDependencies[name] = packageInfo[name]?.installed || ''
  }
  return uniHelperDependencies
}

// export async function getErrorDependencies(
//   argv: string,
//   uniHelperDependencies: Record<string, string>,
// ) {
//   if (!uniHelperDependencies)
//     return {}
//   let errorDependencies: Record<string, string> = {}
//   if (argv === 'all') {
//     errorDependencies = uniHelperDependencies
//   }
//   else {
//     const uniHelperDependenciesName = Object.keys(uniHelperDependencies)
//     const errorIndexList = await question(uniHelperDependenciesName, '请选择需要反馈的依赖')

//     errorIndexList.forEach((item) => {
//       errorDependencies[item] = uniHelperDependencies[item]
//     })
//   }
//   return errorDependencies
// }
