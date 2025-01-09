import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard',
      component: HomeView,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/home/DashBoard.vue'),
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('../views/home/UserAdmin.vue'),
        },
        {
          path: 'article',
          name: 'article',
          redirect: '/article/list',
          children: [
            {
              path: 'list',
              name: 'list',
              component: () => import('../views/home/ArticleAdmin.vue'),
            },
            {
              path: 'edit',
              name: 'edit',
              component: () => import('../views/home/MdEdit.vue'),
            },
          ],
        },
        {
          path: 'system',
          name: 'system',
          component: () => import('../views/home/SystemAdmin.vue'),
        }
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
  ],
})

export default router
