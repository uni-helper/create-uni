import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { bold, lightCyan } from 'kolorist'
import type { TemplateList } from './type'

export const templateList: TemplateList[] = [
  {
    title: `vitesse-uni-app(${bold('推荐')})`,
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
    description: `由${lightCyan('Uni Helper')}维护的快速启动模板`,
  },
]
