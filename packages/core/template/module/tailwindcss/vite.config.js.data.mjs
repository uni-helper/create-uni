export default function getData({ oldData }) {
  const WeappTailwindcssPlugin = {
    id: 'weapp-tailwindcss',
    importer: `import { WeappTailwindcss } from 'weapp-tailwindcss/vite'`,
    initializer: `// https://tw.weapp.dev/
    WeappTailwindcss({
      // Tailwind CSS 4 的入口文件，需要被项目实际引入
      cssEntries: [fileURLToPath(new URL('./src/app.css', import.meta.url))],
      cssOptions: {
        // 将 rem 转换为 rpx，保证小程序端的尺寸表现
        rem2rpx: true,
      },
    })`,
  }

  return {
    ...oldData,
    plugins: oldData.plugins.flatMap(plugin =>
      plugin.id === 'uni' ? [plugin, WeappTailwindcssPlugin] : plugin,
    ),
  }
}
