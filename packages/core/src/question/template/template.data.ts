import type { TemplateList } from './type'
import { green, lightMagenta, trueColor as rgb } from 'kolorist'

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
    label: `wot`,
    description: `由${green('Wot Design Uni')}提供的基于vitesse-uni-app的快速启动模板`,
    value: 'wot',
    list: [
      {
        label: `wot-demo`,
        description: `由${rgb(77, 128, 240)('Wot Design Uni')}提供的基于vitesse-uni-app的快速启动模板`,
        value: 'wot-demo',
        url: {
          github: 'https://github.com/Moonofweisheng/wot-demo.git',
        },
        playground: 'https://wot-demo.netlify.app/',
      },
      {
        label: 'wot-starter-retail',
        description: `基于${rgb(77, 128, 240)('Wot Design Uni')}的uni-app零售行业模板`,
        value: 'wot-starter-retail',
        url: {
          github: 'https://github.com/Moonofweisheng/wot-starter-retail.git',
        },
        playground: 'https://moonofweisheng.github.io/wot-starter-retail/',
      },
    ],
  },
  {
    label: `unisave`,
    description: `拥抱 web 开发，${lightMagenta('拯救')}uniapp。适配所有(app、mp、web)平台`,
    value: 'unisave',
    url: {
      github: 'https://github.com/sunpm/unisave.git',
    },
    website: 'https://unisave-docs.netlify.app/',
    playground: 'https://uni-save.netlify.app/',
  },
  {
    label: `tmui3.2`,
    description: `优质Vue3 TS Pinia Vite跨端组件库`,
    value: 'tmui32',
    url: {
      github: 'https://gitee.com/LYTB/tmui-design.git',
    },
    website: 'https://tmui.design/',
    playground: 'https://tmui.design/h5by32/',
  },
]
