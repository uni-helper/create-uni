import type { TemplateList } from './type'
import { green, lightMagenta, trueColor as rgb } from 'kolorist'

export default [
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
    description: `由${green('Wot UI')}提供的基于 vitesse-uni-app 的快速启动模板`,
    value: 'wot',
    list: [
      {
        label: `wot-starter`,
        description: `由${rgb(77, 128, 240)('Wot UI')}提供的基于 vitesse-uni-app 的快速启动模板`,
        value: 'wot-starter',
        url: {
          github: 'https://github.com/wot-ui/wot-starter.git',
        },
        website: 'https://starter.wot-ui.cn/',
        playground: 'https://starter-demo.wot-ui.cn/',
      },
      {
        label: 'wot-starter-retail',
        description: `基于${rgb(77, 128, 240)('Wot UI')}的 uni-app 零售行业模板`,
        value: 'wot-starter-retail',
        url: {
          github: 'https://github.com/wot-ui/wot-starter-retail.git',
        },
        playground: 'https://starter-retail.wot-ui.cn/',
      },
    ],
  },
  {
    label: `unisave`,
    description: `拥抱 web 开发，${lightMagenta('拯救')}uniapp。适配所有 (app、mp、web) 平台`,
    value: 'unisave',
    url: {
      github: 'https://github.com/sunpm/unisave.git',
    },
    website: 'https://unisave-docs.netlify.app/',
    playground: 'https://uni-save.netlify.app/',
  },
  {
    label: `tmui3.2`,
    description: `优质 Vue3 TS Pinia Vite 跨端组件库模板`,
    value: 'tmui32',
    url: {
      gitee: 'https://gitee.com/LYTB/tmui-design.git',
    },
    website: 'https://tmui.design/',
    playground: 'https://tmui.design/h5by32/',
  },
] as TemplateList[]
