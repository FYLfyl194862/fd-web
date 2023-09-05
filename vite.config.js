import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  //vite相关配置
  server: {
    port: 8088,
    proxy: {
      "/dev-api": {
        target: "http://vue.ruoyi.vip",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/dev-api/, "/prod-api"),
      },
    },
  },
});
