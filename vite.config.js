import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(e => {
  const env= loadEnv(e.mode, './')
  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },

    server: {
      allowedHosts: 'all',
      port: env.VITE_PORT,
      proxy: {
        '/api': {
          target: env.VITE_API_BASEURL,
          ws: true,
          pathRewrite: {
            '^/api': '/'
          }
        }
      }
    },
  }
})
