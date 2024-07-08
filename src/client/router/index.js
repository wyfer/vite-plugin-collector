import { createRouter, createMemoryHistory } from "vue-router/auto";

const router = createRouter({
  history: createMemoryHistory(),
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
