import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'

Object.assign(process.env, loadEnv(process.env.NODE_ENV as string, process.cwd()))
// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_URL || '/',
  server: {
    port: 9001,
    proxy: {
      '/dev-api': {
        target: 'http://localhost:9001',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/dev-api/, '')
      }
    }
  },
  plugins: [
    vue(),
    visualizer({
      open: true, // 构建后自动打开分析结果
      filename: 'dist/stats.html' // 输出文件
    }),
    vueDevTools(),
    VueI18nPlugin({}),
    UnoCSS(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        'pinia',
        // 自定义导入
        {
          // 包导入
          axios: [
            // 默认别名导入
            ['default', 'axios'] // import { default as axios } from 'axios',
          ],
          dayjs: [['default', 'dayjs']]
        },
        {
          from: '.src/types',
          type: true,
          imports: ['ISort']
        }
      ],
      dirs: ['./src/utils', './src/composables', './src/apis/**', './src/stores/**'],
      dts: true,
      eslintrc: {
        enabled: true
      },
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dts: true,
      resolvers: [
        VueUseComponentsResolver(),
        IconsResolver(),
        ElementPlusResolver({ importStyle: 'sass' })
      ]
    }),
    Icons({
      compiler: 'vue3'
    })
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1000
  }
})
