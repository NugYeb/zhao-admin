import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { vitePluginForArco } from '@arco-plugins/vite-vue'
// import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginForArco({
      style: 'css',
      componentPrefix: 'a',
    }),
    // viteMockServe({
    //   mockPath: 'src/mock',
    //   enable: true,
    //   logger: true,
    // }),
    vueDevTools(),
  ],
  // css: {
  //   preprocessorOptions: {
  //     less: {
  //       modifyVars: {
  //         'color-bg-3': '#12345',
  //       },
  //       javascriptEnabled: true,
  //     },
  //   },
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: './dist',
    assetsInlineLimit: 6 * 1024,
    cssCodeSplit: true,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/vue') ||
            id.includes('node_modules/vue-router') ||
            id.includes('node_modules/pinia')
          ) {
            return 'vendor'
          }
          if (id.includes('node_modules/vue-i18n')) {
            return 'vue-i18n'
          }
        },
        entryFileNames: 'assets/js/[name].[hash].js',
        chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names.length > 0 ? assetInfo.names[0] : ''

          if (/\.(png|jpe?g|gif|webp)$/i.test(name)) {
            return 'assets/img/[name].[hash].[ext]'
          } else if (/\.(woff2?|ttf|eot|otf)$/i.test(name)) {
            return 'assets/font/[name].[hash].[ext]'
          } else if (/\.(css)$/i.test(name)) {
            return 'assets/css/[name].[hash].css'
          } else {
            return 'assets/other/[name].[hash].[ext]'
          }
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
  },
})
