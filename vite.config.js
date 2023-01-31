import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd())

  return {
    plugins: [
      vue(),
      AutoImport({
        imports: [
          'vue',
          {
            'naive-ui': [
              'createDiscreteApi',
            ]
          }
        ]
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      })
    ],
    resolve: {
      alias: {
        '~': path.resolve(process.cwd()),
        '@': path.resolve(__dirname, 'src'),
      }
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: viteEnv.VITE_HTTP_URL,
          secure: false,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '') // 不可以省略rewrite
        }
      }
    }
  }
})
