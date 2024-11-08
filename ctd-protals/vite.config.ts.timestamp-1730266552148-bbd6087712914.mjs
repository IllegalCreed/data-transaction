// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "file:///E:/workspace/beitou/cultural_tourism_platform_v1/ctd-protals/node_modules/.pnpm/vite@5.4.9_@types+node@22.7.5_sass@1.79.5/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/workspace/beitou/cultural_tourism_platform_v1/ctd-protals/node_modules/.pnpm/@vitejs+plugin-vue@5.1.4_vite@5.4.9_@types+node@22.7.5_sass@1.79.5__vue@3.5.12_typescript@5.6.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueDevTools from "file:///E:/workspace/beitou/cultural_tourism_platform_v1/ctd-protals/node_modules/.pnpm/vite-plugin-vue-devtools@7.4.6_rollup@4.20.0_vite@5.4.9_@types+node@22.7.5_sass@1.79.5__vue@3.5.12_typescript@5.6.3_/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import VueI18nPlugin from "file:///E:/workspace/beitou/cultural_tourism_platform_v1/ctd-protals/node_modules/.pnpm/@intlify+unplugin-vue-i18n@5.2.0_@vue+compiler-dom@3.5.12_eslint@9.12.0_jiti@2.0.0__rollup@4._vazjsduoc6mx5ahhopx2h3ltgu/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import UnoCSS from "file:///E:/workspace/beitou/cultural_tourism_platform_v1/ctd-protals/node_modules/.pnpm/unocss@0.63.4_postcss@8.4.47_rollup@4.20.0_vite@5.4.9_@types+node@22.7.5_sass@1.79.5_/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///E:/workspace/beitou/cultural_tourism_platform_v1/ctd-protals/node_modules/.pnpm/unplugin-auto-import@0.18.3_@vueuse+core@11.1.0_vue@3.5.12_typescript@5.6.3___rollup@4.20.0_webpack-sources@3.2.3/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/workspace/beitou/cultural_tourism_platform_v1/ctd-protals/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.25.3_rollup@4.20.0_vue@3.5.12_typescript@5.6.3_/node_modules/unplugin-vue-components/dist/vite.js";
import Icons from "file:///E:/workspace/beitou/cultural_tourism_platform_v1/ctd-protals/node_modules/.pnpm/unplugin-icons@0.19.3_@vue+compiler-sfc@3.5.12/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///E:/workspace/beitou/cultural_tourism_platform_v1/ctd-protals/node_modules/.pnpm/unplugin-icons@0.19.3_@vue+compiler-sfc@3.5.12/node_modules/unplugin-icons/dist/resolver.js";
import {
  ElementPlusResolver,
  VueUseComponentsResolver
} from "file:///E:/workspace/beitou/cultural_tourism_platform_v1/ctd-protals/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.25.3_rollup@4.20.0_vue@3.5.12_typescript@5.6.3_/node_modules/unplugin-vue-components/dist/resolvers.js";
import { visualizer } from "file:///E:/workspace/beitou/cultural_tourism_platform_v1/ctd-protals/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0_rollup@4.20.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_import_meta_url = "file:///E:/workspace/beitou/cultural_tourism_platform_v1/ctd-protals/vite.config.ts";
Object.assign(
  process.env,
  loadEnv(process.env.NODE_ENV, process.cwd())
);
var vite_config_default = defineConfig({
  base: process.env.VITE_BASE_URL || "/",
  server: {
    port: 9001,
    proxy: {
      "/dev-api": {
        target: "http://10.105.21.63:8080",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/dev-api/, "")
      }
    }
  },
  plugins: [
    vue(),
    visualizer({
      open: true,
      // 构建后自动打开分析结果
      filename: "dist/stats.html"
      // 输出文件
    }),
    vueDevTools(),
    VueI18nPlugin({}),
    UnoCSS(),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "@vueuse/core",
        "pinia",
        // 自定义导入
        {
          // 包导入
          axios: [
            // 默认别名导入
            ["default", "axios"]
            // import { default as axios } from 'axios',
          ],
          dayjs: [["default", "dayjs"]],
          "@vueuse/router": [
            ["useRouteHash", "useRouteHash"],
            ["useRouteParams", "useRouteParams"],
            ["useRouteQuery", "useRouteQuery"]
          ]
        },
        {
          from: ".src/types",
          type: true,
          imports: ["ISort"]
        }
      ],
      dirs: ["./src/utils", "./src/composables", "./src/apis/**"],
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
        ElementPlusResolver({ importStyle: "sass" })
      ]
    }),
    Icons({
      compiler: "vue3"
    })
  ],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./", __vite_injected_original_import_meta_url)),
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        additionalData: `@use "@/styles/element/index.scss" as *;`
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1e3
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFx3b3Jrc3BhY2VcXFxcYmVpdG91XFxcXGN1bHR1cmFsX3RvdXJpc21fcGxhdGZvcm1fdjFcXFxcY3RkLXByb3RhbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHdvcmtzcGFjZVxcXFxiZWl0b3VcXFxcY3VsdHVyYWxfdG91cmlzbV9wbGF0Zm9ybV92MVxcXFxjdGQtcHJvdGFsc1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovd29ya3NwYWNlL2JlaXRvdS9jdWx0dXJhbF90b3VyaXNtX3BsYXRmb3JtX3YxL2N0ZC1wcm90YWxzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuaW1wb3J0IFZ1ZUkxOG5QbHVnaW4gZnJvbSAnQGludGxpZnkvdW5wbHVnaW4tdnVlLWkxOG4vdml0ZSdcclxuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IEljb25zIGZyb20gJ3VucGx1Z2luLWljb25zL3ZpdGUnXHJcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJ1xyXG5pbXBvcnQge1xyXG4gIEVsZW1lbnRQbHVzUmVzb2x2ZXIsXHJcbiAgVnVlVXNlQ29tcG9uZW50c1Jlc29sdmVyLFxyXG59IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcclxuXHJcbk9iamVjdC5hc3NpZ24oXHJcbiAgcHJvY2Vzcy5lbnYsXHJcbiAgbG9hZEVudihwcm9jZXNzLmVudi5OT0RFX0VOViBhcyBzdHJpbmcsIHByb2Nlc3MuY3dkKCkpLFxyXG4pXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgYmFzZTogcHJvY2Vzcy5lbnYuVklURV9CQVNFX1VSTCB8fCAnLycsXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiA5MDAxLFxyXG4gICAgcHJveHk6IHtcclxuICAgICAgJy9kZXYtYXBpJzoge1xyXG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly8xMC4xMDUuMjEuNjM6ODA4MCcsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIHJld3JpdGU6IHAgPT4gcC5yZXBsYWNlKC9eXFwvZGV2LWFwaS8sICcnKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWUoKSxcclxuICAgIHZpc3VhbGl6ZXIoe1xyXG4gICAgICBvcGVuOiB0cnVlLCAvLyBcdTY3ODRcdTVFRkFcdTU0MEVcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTUyMDZcdTY3OTBcdTdFRDNcdTY3OUNcclxuICAgICAgZmlsZW5hbWU6ICdkaXN0L3N0YXRzLmh0bWwnLCAvLyBcdThGOTNcdTUxRkFcdTY1ODdcdTRFRjZcclxuICAgIH0pLFxyXG4gICAgdnVlRGV2VG9vbHMoKSxcclxuICAgIFZ1ZUkxOG5QbHVnaW4oe30pLFxyXG4gICAgVW5vQ1NTKCksXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgaW1wb3J0czogW1xyXG4gICAgICAgICd2dWUnLFxyXG4gICAgICAgICd2dWUtcm91dGVyJyxcclxuICAgICAgICAnQHZ1ZXVzZS9jb3JlJyxcclxuICAgICAgICAncGluaWEnLFxyXG4gICAgICAgIC8vIFx1ODFFQVx1NUI5QVx1NEU0OVx1NUJGQ1x1NTE2NVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIC8vIFx1NTMwNVx1NUJGQ1x1NTE2NVxyXG4gICAgICAgICAgYXhpb3M6IFtcclxuICAgICAgICAgICAgLy8gXHU5RUQ4XHU4QkE0XHU1MjJCXHU1NDBEXHU1QkZDXHU1MTY1XHJcbiAgICAgICAgICAgIFsnZGVmYXVsdCcsICdheGlvcyddLCAvLyBpbXBvcnQgeyBkZWZhdWx0IGFzIGF4aW9zIH0gZnJvbSAnYXhpb3MnLFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIGRheWpzOiBbWydkZWZhdWx0JywgJ2RheWpzJ11dLFxyXG4gICAgICAgICAgJ0B2dWV1c2Uvcm91dGVyJzogW1xyXG4gICAgICAgICAgICBbJ3VzZVJvdXRlSGFzaCcsICd1c2VSb3V0ZUhhc2gnXSxcclxuICAgICAgICAgICAgWyd1c2VSb3V0ZVBhcmFtcycsICd1c2VSb3V0ZVBhcmFtcyddLFxyXG4gICAgICAgICAgICBbJ3VzZVJvdXRlUXVlcnknLCAndXNlUm91dGVRdWVyeSddLFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZyb206ICcuc3JjL3R5cGVzJyxcclxuICAgICAgICAgIHR5cGU6IHRydWUsXHJcbiAgICAgICAgICBpbXBvcnRzOiBbJ0lTb3J0J10sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgZGlyczogWycuL3NyYy91dGlscycsICcuL3NyYy9jb21wb3NhYmxlcycsICcuL3NyYy9hcGlzLyoqJ10sXHJcbiAgICAgIGR0czogdHJ1ZSxcclxuICAgICAgZXNsaW50cmM6IHtcclxuICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgfSksXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgZHRzOiB0cnVlLFxyXG4gICAgICByZXNvbHZlcnM6IFtcclxuICAgICAgICBWdWVVc2VDb21wb25lbnRzUmVzb2x2ZXIoKSxcclxuICAgICAgICBJY29uc1Jlc29sdmVyKCksXHJcbiAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcih7IGltcG9ydFN0eWxlOiAnc2FzcycgfSksXHJcbiAgICAgIF0sXHJcbiAgICB9KSxcclxuICAgIEljb25zKHtcclxuICAgICAgY29tcGlsZXI6ICd2dWUzJyxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ34nOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGNzczoge1xyXG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICBzY3NzOiB7XHJcbiAgICAgICAgYXBpOiAnbW9kZXJuLWNvbXBpbGVyJyxcclxuICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEB1c2UgXCJAL3N0eWxlcy9lbGVtZW50L2luZGV4LnNjc3NcIiBhcyAqO2AsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcclxuICB9LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdY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
