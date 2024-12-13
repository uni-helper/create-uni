import { dim, green, lightMagenta, link } from 'kolorist'
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
  {
    title: `wot-demo`,
    description: `由${link(green('Wot Design Uni'), 'https://github.com/Moonofweisheng/wot-demo')}提供的基于vitesse-uni-app的快速启动模板`,
    value: {
      type: 'wot',
      url: {
        github: 'https://github.com/Moonofweisheng/wot-demo.git',
      },
    },
  },
  {
    title: `unisave`,
    description: `由${link(green('sunpm'), 'https://github.com/sunpm')}维护: 拥抱 web 开发，${lightMagenta('拯救')} uniapp。适配所有(app、mp、web)平台！！！`,
    value: {
      type: 'unisave',
      url: {
        github: 'https://github.com/sunpm/unisave.git',
      },
    },
  },
]
