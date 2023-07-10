declare module '@vue/create-eslint-config' {
  export default function createESLintConfig(options: {
    vueVersion: '3.x',
    styleGuide: 'default',
    hasTypeScript: boolean,
    needsPrettier: boolean,
  }): {
    pkg: {
      devDependencies: {
        eslint: string,
        prettier?: string,
        'eslint-plugin-vue': string,
        '@rushstack/eslint-patch'?: string,
        '@vue/eslint-config-typescript'?: string,
        '@vue/eslint-config-prettier'?: string,
      },
    },
    files: {
      '.eslintrc.cjs': string,
      '.prettierrc.json'?: string,
    },
  }
}
