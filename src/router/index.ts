import { createRouter, createWebHistory } from 'vue-router'
import { homeRouter } from './home'
import { adminRouter } from './admin'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...homeRouter, ...adminRouter],
})

export default router
