import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Collector from "vite-plugin-collector";

export default defineConfig({
  server: {
    open: true,
  },
  plugins: [
    vue(),
    Collector({
      build: true,
      open: true,
    }),
  ],
});
