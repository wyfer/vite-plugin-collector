import { defineConfig } from "vite";
import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueRouter from "unplugin-vue-router/vite";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Collector from '../node'

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@": __dirname,
      '~/': __dirname,
    },
  },
  plugins: [
    {
      name: 'local-object-transform',
      transform: {
        order: 'post',
        async handler(code) {
          return `${code}\n/* Injected with object hook! */`
        },
      },
    },
    {
      name: 'generate-error',
      load(id) {
        if (id === '/__LOAD_ERROR')
          throw new Error('Load error')
        if (id === '/__TRANSFORM_ERROR')
          return 'transform'
      },
      transform(code, id) {
        if (id === '/__TRANSFORM_ERROR')
          throw new SyntaxError('Transform error')
      },
    },

    {
      name: 'no-change',
      transform: {
        order: 'post',
        async handler(code) {
          return code
        },
      },
    },

    VueRouter({
      routesFolder: [
        {
          src: resolve(__dirname, "pages"),
        },
      ],
    }),
    vue({
      script: {
        defineModel: true,
      },
    }),
    vueJsx(),
    Components({
      dirs: ["components"],
    }),
    Collector({
      assets: {
        dir: './assets copy'
      },
      dependencyCruiserOptions: {
        dir: resolve(__dirname, ""),
        alias: {
          '@': resolve(__dirname, ""),
        }
      }
    }),
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/core"],
    }),

  ],

  optimizeDeps: {
    exclude: [
      'vite-hot-client',
    ],
  },

  build: {
    target: "esnext",
    outDir: resolve(__dirname, "../../dist/client"),
    minify: false, // 'esbuild',
    emptyOutDir: true,
  },
});
