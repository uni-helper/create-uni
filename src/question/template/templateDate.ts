import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { bold, dim, green, link } from 'kolorist'
import type { TemplateList } from './type'

export const templateList: TemplateList[] = [
  {
    title: `vitesse-uni-app${dim('(推荐)')}`,
    description: `由${link(green('Uni Helper'), 'https://github.com/uni-helper')}维护的快速启动模板`,
    value: {
      type: 'vitesse',
      url: {
        github: 'https://github.com/uni-helper/vitesse-uni-app.git',
      },
    },
  },
]
