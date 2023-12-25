import { green, link, trueColor } from 'kolorist'
import type { UIListType } from './type'

export const UIList: UIListType[] = [
  {
    title: 'Uni-UI',
    description: `${link(green('Uni App'), 'https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html')}官方组件库`,
    value: 'uni',
  },
  {
    title: 'Ano-UI',
    description: `${link(trueColor(147, 85, 224)('Ano UI'), 'https://ano-ui.netlify.app/')}轻量级、漂亮、快速的 UnoCSS 组件库`,
    value: 'ano',
  },
]
