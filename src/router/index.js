import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
