import { execSync } from 'node:child_process'

export function getVSCodeExtensions() {
  try {
    const list = execSync(
      `code --list-extensions --show-versions`,
      {
        encoding: 'utf-8',
        stdio: [0, 'pipe', 'ignore'],
      },
    )
    return list.split(/\r?\n/).filter(line => line.trim() !== '')
  }
  catch {
    return null
  }
}

export function getUniHelperExtensions(extensions: string[]) {
  return extensions.filter(item => item.toLocaleLowerCase().includes('uni-helper.') || item.toLocaleLowerCase().includes('mrmaoddxxaa.create-uniapp-view'))
}

export function getVolarExtensions(extensions: string[]) {
  return extensions.filter(item => item.toLocaleLowerCase().includes('vue.volar'))
}

export function paserExtensionList(list: string[]) {
  return list.map((item) => {
    const [name_, version] = item.split('@')
    const [_, name] = name_.split('.')
    const bugs = `https://github.com/uni-helper/${name}/issues`
    return { name, version, bugs }
  })
}

// export async function getErrorExtensions(
//   argv: string,
//   uniHelperExtensions: ReturnType<typeof paserExtensionList>,
// ) {
//   if (!uniHelperExtensions)
//     return []

//   const choices = uniHelperExtensions.map(item => item.name)

//   let errorExtensions: typeof uniHelperExtensions = []
//   if (argv === 'all') {
//     errorExtensions = uniHelperExtensions
//   }
//   else {
//     const errorIndexList = await question(choices, '请选择需要反馈的vscode插件')

//     errorIndexList.forEach((item) => {
//       errorExtensions.push(uniHelperExtensions.find(i => i.name === item)!)
//     })
//   }
//   return errorExtensions
// }
