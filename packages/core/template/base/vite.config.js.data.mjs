export default function getData() {
  return {
    plugins: [{
      id: 'uni',
      importer: `import Uni from '@uni-helper/plugin-uni'`,
      initializer: `// https://github.com/uni-helper/plugin-uni
      Uni()`,
    }],
    extraConfig: null,
    dynamic: false,
  }
}
