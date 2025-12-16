import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
// https://vite.dev/config/
export default defineConfig((e) => {
  const env = loadEnv(e.mode, './')
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: 'types/auto-imports.d.ts',
      }),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      host: true,
      // allowedHosts: 'all',
      port: env.VITE_PORT,
      proxy: {
        '/api': {
          changeOrigin: true,
          target: env.VITE_APP_API_BASEURL,
          ws: true,
          secure: false,
          rewrite: (path) => {
            const res = path.replace('/api', '')
            return res
          },
        },
      },
    },
  }
})
