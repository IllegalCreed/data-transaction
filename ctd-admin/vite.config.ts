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

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.VITE_BASE_URL || '/',
    server: {
      port: 5200,
      proxy: {
        '/dev-api': {
          target:
            env.VITE_BACK_TYPE === 'java' ? env.VITE_JAVA_SERVER_URL : env.VITE_NEST_SERVER_URL,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, '')
        }
      }
    },
    plugins: [
      vue(),
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
            dayjs: [['default', 'dayjs']],
            '@vueuse/router': [
              ['useRouteHash', 'useRouteHash'],
              ['useRouteParams', 'useRouteParams'],
              ['useRouteQuery', 'useRouteQuery']
            ]
          }
        ],
        dts: true,
        eslintrc: {
          enabled: true
        },
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
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
          api: 'modern-compiler',
          additionalData: `@use "@/styles/element/index.scss" as *;`
        }
      }
    },
    build: {
      chunkSizeWarningLimit: 1000
    }
  }
})
