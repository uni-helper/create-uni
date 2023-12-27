import { green, link, trueColor } from 'kolorist'
import type { UIListType } from './type'

export const UIList: UIListType[] = [
  {
    title: link(green('Uni UI'), 'https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html'),
    description: 'UniApp官方组件库',
    value: 'uni',
  },
  {
    title: link(trueColor(147, 85, 224)('Ano UI'), 'https://ano-ui.netlify.app/'),
    description: '轻量级、漂亮、快速的 UnoCSS 组件库',
    value: 'ano',
  },
]
