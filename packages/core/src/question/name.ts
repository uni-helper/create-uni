import { text } from '@clack/prompts'

export default () => (
  text({
    message: '请输入项目名称:',
    placeholder: 'uni-app',
    validate: (value) => {
      if (!value)
        return '项目名称不能为空'
    },
  })
)
