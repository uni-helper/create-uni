import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { bold, dim, green } from 'kolorist'
import type { TemplateList } from './type'

export const templateList: TemplateList[] = [
  {
    title: `vitesse-uni-app${dim('(推荐)')}`,
    description: `由${green('Uni Helper')}${dim('(https://github.com/uni-helper)')}维护的快速启动模板`,
    value: {
      type: 'vitesse',
      url: {
        github: 'https://github.com/uni-helper/vitesse-uni-app.git',
      },
      callBack(root) {
        // 判断当前系统
        const isWin = process.platform === 'win32'
        // 如果非 Windows 系统，删除目录下的patches文件夹
        if (isWin)
          return
        rmSync(join(root, 'patches'), { recursive: true })

        const pkgPath = join(root, 'package.json')
        const packageJson = JSON.parse(readFileSync(pkgPath, 'utf8'))

        // 删除 package.json 中的 pnpm
        delete packageJson.pnpm

        writeFileSync(pkgPath, JSON.stringify(packageJson, null, 2))
      },
    },
  },
]
