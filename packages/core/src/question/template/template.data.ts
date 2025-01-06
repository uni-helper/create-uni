import type { TemplateList } from './type'
import { green, lightMagenta, link } from 'kolorist'

export const templateList: TemplateList[] = [
  {
    label: `vitesse-uni-app`,
    description: `由${green('Uni Helper')}维护的快速启动模板`,
    value: 'vitesse',
    url: {
      github: 'https://github.com/uni-helper/vitesse-uni-app.git',
    },
    website: 'https://vitesse-docs.netlify.app/',
    playground: 'https://vitesse-uni-app.netlify.app/',
  },
  {
    label: `wot-demo`,
    description: `由${green('Wot Design Uni')}提供的基于vitesse-uni-app的快速启动模板`,
    value: 'wot',
    url: {
      github: 'https://github.com/Moonofweisheng/wot-demo.git',
    },
    website: 'https://vitesse-docs.netlify.app/',
  },
  {
    label: `unisave`,
    description: `由${green('sunpm')}维护: 拥抱 web 开发，${lightMagenta('拯救')}uniapp。适配所有(app、mp、web)平台`,
    value: 'unisave',
    url: {
      github: 'https://github.com/sunpm/unisave.git',
    },
    website: 'https://unisave-docs.netlify.app/',
  },
  {
    label: `uni-app-template`,
    description: `由${link(green('Uni Helper'), 'https://github.com/uni-helper')}维护的uni-app模板`,
    value: 'uni-app-template',
    list: [
      {
        label: `uni-app-template-vue3`,
        description: `uni-app-template的vue3版本`,
        value: 'uni-app-template-vue3',
        url: {
          github: 'https://github.com/uni-helper/uni-app-template-vue3.git',
        },
      },
      {
        label: `uni-app-template-vue2`,
        description: `uni-app-template的vue2版本`,
        value: 'uni-app-template-vue2',
        url: {
          github: 'https://github.com/uni-helper/uni-app-template-vue2.git',
        },
      },
    ],
  },
]
