import { rmSync } from 'node:fs'
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
        if (!isWin)
          rmSync(join(root, 'patches'), { recursive: true })
      },
    },
    description: `由${lightCyan('Uni Helper')}维护的快速启动模板`,
  },
]
