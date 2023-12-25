export default function getData() {
  return {
    config: [{
      id: 'unocss',
      importer: `import { presetUni } from '@uni-helper/unocss-preset-uni'`,
      initializer: 'presetUni()',
    }],
  }
}
