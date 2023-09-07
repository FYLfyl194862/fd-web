import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "@/styles/index.scss";
// createApp(App).mount("#app");
import { createPinia } from "pinia";
const pinia = createPinia();
const app = createApp(App);
//全局注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(pinia);
//路由
app.use(router);
//ElementPlus
app.use(ElementPlus);

app.mount("#app");
