import process from 'node:process'
import { cancel, isCancel, select } from '@clack/prompts'
import { cancelMesssage } from '../onCancel'
import { templateList } from './template.data'
import type { BaseTemplateListWithList, TemplateValue } from './type'

export default async (): Promise<TemplateValue> => {
  const templateType = await select({
    message: '请选择 uni-app 模板：',
    options: [
      {
        label: '自定义模板',
        value: 'custom',
      },
      ...templateList.map((item => ({
        label: `${item.label}${item.list ? ' ▼' : ''}`,
        value: item.value,
        hint: item.description,
      }))),
    ],
    initialValue: 'custom',
  })
  if (isCancel(templateType)) {
    cancel(cancelMesssage)
    process.exit(0)
  }

  if (templateType === 'custom') {
    return { type: 'custom' }
  }

  const group = templateList.find((item) => {
    if (item.value === templateType && item.list) {
      return true
    }
    return false
  }) as BaseTemplateListWithList | undefined
  if (group) {
    const template = await select({
      message: `请选择 ${templateType} 模板`,
      options: group.list.map((item => ({
        label: item.label,
        value: item.value,
        hint: item.description,
      }))),
    })
    if (isCancel(template)) {
      cancel(cancelMesssage)
      process.exit(0)
    }
    else {
      const temp = group.list.find(item => item.value === template)!
      return {
        type: template,
        url: temp.url,
        callBack: temp?.callBack,
      }
    }
  }
  else {
    const temp = templateList.find(item => item.value === templateType)!
    return {
      type: templateType,
      url: temp.url!,
      callBack: temp?.callBack,
    }
  }
}
